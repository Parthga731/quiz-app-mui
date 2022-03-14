import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";

import ReactDOM from "react-dom";
import { Question } from "../page/Question";

describe("details snapshot ", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <Question />
        </Provider>
      </BrowserRouter>,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("final", () => {
    expect(container).toMatchSnapshot();
  });
});
