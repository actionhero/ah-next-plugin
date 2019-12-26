import { Initializer, api, env, log, config, route } from "actionhero";
import next from "next";
import path from "path";

export class Next extends Initializer {
  constructor() {
    super();
    this.loadPriority = 9999;
    this.name = "next";
  }

  async initialize() {
    api.next = {
      render: async connection => {
        if (connection.type !== "web") {
          throw new Error('Connections for NEXT apps must be of type "web"');
        }

        const req = connection.rawConnection.req;
        const res = connection.rawConnection.res;
        return api.next.handle(req, res);
      }
    };

    api.next.dev = env === "development";

    if (config.servers.web.enabled === true) {
      route.registerRoute("get", "/", "next:render", null, true);
    }
  }

  async start() {
    if (config.servers.web.enabled !== true) {
      return;
    }

    if (api.next.dev) {
      log("Running next in development mode...");
    }

    api.next.app = next({
      dev: api.next.dev,
      dir: path.join(__dirname, "..", "..", "..", "web")
    });

    api.next.handle = api.next.app.getRequestHandler();
    await api.next.app.prepare();
  }

  async stop() {
    if (api.next.app) {
      await api.next.app.close();
    }
  }
}
