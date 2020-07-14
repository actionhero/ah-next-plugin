import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Page from "../../pages/index";

describe("Pages/index", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("can render the page", () => {
    act(() => {
      ReactDOM.render(<Page />, container);
    });

    const header = container.querySelector("h1");
    expect(header.textContent).toBe("Hello from Actionhero and Next.js!");
  });
});
