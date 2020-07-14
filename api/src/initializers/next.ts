import { Initializer, Connection, api, log, config, route } from "actionhero";
import next from "next";

export class Next extends Initializer {
  constructor() {
    super();
    this.loadPriority = 1000;
    this.startPriority = 899;
    this.startPriority = 101;
    this.name = "next";
  }

  async initialize() {
    api.next = {
      render: async (connection: Connection) => {
        if (connection.type !== "web") {
          throw new Error('Connections for NEXT apps must be of type "web"');
        }

        const req = connection.rawConnection.req;
        const res = connection.rawConnection.res;

        return api.next.handle(req, res);
      },
    };
  }

  async start() {
    if (config.servers.web.enabled !== true) {
      return;
    }

    if (!config.next.enabled) {
      log("next disabled");
      return;
    }

    if (config.next.dev) {
      log("Running next in development mode...");
    }

    if (!config.general.paths.next) {
      throw new Error(
        "configuration required for `config.general.paths.next = []`"
      );
    }

    api.next.app = next({
      dev: config.next.dev,
      quiet: config.next.quiet,
      dir: config.general.paths.next[0],
    });

    api.next.handle = api.next.app.getRequestHandler();
    await api.next.app.prepare();

    if (config.servers.web.enabled === true) {
      route.registerRoute("get", "/", "next:render", null, true);
    }
  }

  async stop() {
    if (api.next.app) {
      await api.next.app.close();
    }
  }
}
