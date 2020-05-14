import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

import rootComponent from "./index";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  errorBoundary(err, info, props) {
    return (
      <div>
        <p>Unable to load MAAS.</p>
        <p>
          Please refresh your browser, and if the issue persists submit an issue
          at:{" "}
          <span>
            https://github.com/canonical-web-and-design/maas-ui/issues
          </span>{" "}
          with the following details:
        </p>
        <p>{err}</p>
        <p>{info}</p>
      </div>
    );
  },
});

export const { bootstrap } = reactLifecycles;
export const { mount } = reactLifecycles;
export const { unmount } = reactLifecycles;
