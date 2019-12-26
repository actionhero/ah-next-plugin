import request from "request-promise-native";
import { Process, env, id, config } from "actionhero";
const actionhero = new Process();
let url: string;

describe("ah-next-plugin", () => {
  beforeAll(async () => {
    await actionhero.start();
    url = "http://localhost:" + config.servers.web.port;
  });

  afterAll(async () => {
    await actionhero.stop();
  });

  test("should have booted into the test env", () => {
    expect(process.env.NODE_ENV).toEqual("test");
    expect(env).toEqual("test");
    expect(id).toBeTruthy();
  });

  test("can get HTML responses from next pages", async () => {
    const response = await request.get(url);
    expect(response).toContain("__NEXT_DATA__");
    expect(response).toContain("Hello from Next.js and React!");
  });
});
