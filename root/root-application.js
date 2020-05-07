/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import * as singleSpa from "single-spa";
import legacyLifecycles from "../legacy/src/app/entry";

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

singleSpa.registerApplication(
  "legacy",
  () => import(legacyLifecycles),
  showWhenAnyOf(["/"])
);

singleSpa.start();
