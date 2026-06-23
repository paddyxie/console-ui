import * as __cu_react from "react";
import * as __cu_react_dom from "react-dom";
const require = (id) => {
  if (id === "react") return __cu_react;
  if (id === "react-dom") return __cu_react_dom;
  throw new Error("console-ui: unexpected require(\"" + id + "\")");
};
import {
  parse
} from "./chunk-GXT4F7GH.js";
import "./chunk-UWGDIDHB.js";
import "./chunk-WICTAWLW.js";
import "./chunk-ZNKNVO63.js";
import "./chunk-FPB4D26E.js";
import "./chunk-LRXAUPLP.js";
import "./chunk-HYFYXW4Q.js";
import "./chunk-RLGIZXXF.js";
import "./chunk-B5BGH5WI.js";
import "./chunk-X4A7Y6Q3.js";
import "./chunk-HTUBMKTH.js";
import "./chunk-PL2HDBUT.js";
import {
  selectSvgElement
} from "./chunk-MASQUDJF.js";
import {
  configureSvgSize
} from "./chunk-6AZXI6XH.js";
import {
  __name,
  log
} from "./chunk-MZJUJ7JO.js";
import "./chunk-CKEHATKM.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-5YYISTIA.mjs
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.15.0" + (true ? "" : "-tiny")
};
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
