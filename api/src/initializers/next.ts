import { Initializer, Connection, api, log, config, route } from "actionhero";
import * as http from "http";
declare module "actionhero" {
  export interface Api {
    next: {
      app?: any;
      render?: (connection: Connection) => void;
      handle?: (req: http.ClientRequest, res: http.ServerResponse) => void;
    };
  }
}

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
          throw new Error('Connections for next.js apps must be of type "web"');
        }

        const { req, res } = connection.rawConnection;
        return api.next.handle(req, res);
      },
    };
  }

  async start() {
    if (config.web.enabled !== true) return;

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

    // We don't want to statically import next until we know we need it. It loads a lot and has problems in test mode
    const next = await import("next");

    api.next.app = next.default({
      dev: config.next.dev,
      quiet: config.next.quiet,
      dir: config.general.paths.next[0],
    });

    api.next.handle = api.next.app.getRequestHandler();
    await api.next.app.prepare();

    if (config.web.enabled === true) {
      route.registerRoute("get", "/", "next:render", null, true);
    }
  }

  async stop() {
    if (api.next.app) await api.next.app.close();
  }
}
