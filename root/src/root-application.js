/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* global System */
/*eslint no-undef: "error"*/
import { registerApplication, start } from "single-spa";

function showWhenAnyOf(routes) {
  return function (location) {
    return routes.some((route) => location.pathname === route);
  };
}

function showWhenPrefix(routes) {
  return function (location) {
    return routes.some((route) => location.pathname.startsWith(route));
  };
}

function showExcept(routes) {
  return function (location) {
    return routes.every((route) => location.pathname !== route);
  };
}


registerApplication({
  name: "legacy-app",
  app: () => System.import("../../legacy/dist/assets/js/main.js"),
  activeWhen: "/",
});


/*
singleSpa.registerApplication({
  name: "legacy-app",
  app: () => {
    return System.import("../legacy/dist/assets/js/main").then(
      (m) => console.log("loaded", m),
      (err) => console.error("error", err)
    );
  },
  activeWhen: "/",
});
*/

start();
