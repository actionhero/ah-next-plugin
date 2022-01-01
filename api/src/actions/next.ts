import { Action, ActionProcessor, ActionheroLogLevel, api } from "actionhero";

export class NextRender extends Action {
  name = "next:render";
  description = "render react pages via next.js";
  logLevel = "debug" as ActionheroLogLevel;
  blockedConnectionTypes = ["websocket", "socket"];

  async run(data: ActionProcessor<any>) {
    if (data.connection.rawConnection.responseHttpCode == 200) {
      data.toRender = false;
      return api.next.render(data.connection);
    }
  }
}
