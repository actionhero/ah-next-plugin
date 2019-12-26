import { Action, api } from "actionhero";

export class NextRender extends Action {
  constructor() {
    super();
    this.name = "next:render";
    this.description = "render react pages via next.js";
    this.outputExample = {};
    this.inputs = {};
    this.logLevel = "debug";
  }

  async run(data) {
    data.toRender = false;
    return api.next.render(data.connection);
  }
}
