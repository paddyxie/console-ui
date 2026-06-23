import * as __cu_react from "react";
import * as __cu_react_dom from "react-dom";
const require = (id) => {
  if (id === "react") return __cu_react;
  if (id === "react-dom") return __cu_react_dom;
  throw new Error("console-ui: unexpected require(\"" + id + "\")");
};
import {
  __name
} from "./chunk-MZJUJ7JO.js";

// node_modules/mermaid/dist/chunks/mermaid.core/chunk-4BX2VUAB.mjs
function populateCommonDb(ast, db) {
  if (ast.accDescr) {
    db.setAccDescription?.(ast.accDescr);
  }
  if (ast.accTitle) {
    db.setAccTitle?.(ast.accTitle);
  }
  if (ast.title) {
    db.setDiagramTitle?.(ast.title);
  }
}
__name(populateCommonDb, "populateCommonDb");

export {
  populateCommonDb
};
