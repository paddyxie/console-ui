import * as __cu_react from "react";
import * as __cu_react_dom from "react-dom";
const require = (id) => {
  if (id === "react") return __cu_react;
  if (id === "react-dom") return __cu_react_dom;
  throw new Error("console-ui: unexpected require(\"" + id + "\")");
};

// node_modules/devlop/lib/default.js
function ok() {
}
function unreachable() {
}

export {
  ok,
  unreachable
};
