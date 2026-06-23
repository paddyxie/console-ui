import * as __cu_react from "react";
import * as __cu_react_dom from "react-dom";
const require = (id) => {
  if (id === "react") return __cu_react;
  if (id === "react-dom") return __cu_react_dom;
  throw new Error("console-ui: unexpected require(\"" + id + "\")");
};
import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-PBLW2LY2.js";
import "./chunk-KBYJQNH5.js";
import "./chunk-4PSHRX7Z.js";
import "./chunk-PEEWTBN3.js";
import "./chunk-XWYF6VMI.js";
import "./chunk-4WS7IN5C.js";
import "./chunk-Y5UVUPWS.js";
import "./chunk-T5N6VODM.js";
import "./chunk-NDNONF5E.js";
import "./chunk-BLQ7MF5Q.js";
import "./chunk-JYOCFTOZ.js";
import "./chunk-XN5WSCV2.js";
import "./chunk-FSV5KATF.js";
import "./chunk-6AZXI6XH.js";
import {
  __name
} from "./chunk-MZJUJ7JO.js";
import "./chunk-CKEHATKM.js";

// node_modules/mermaid/dist/chunks/mermaid.core/stateDiagram-v2-BHNVJYJU.mjs
var diagram = {
  parser: stateDiagram_default,
  get db() {
    return new StateDB(2);
  },
  renderer: stateRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.state) {
      cnf.state = {};
    }
    cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
