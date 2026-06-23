import * as __cu_react from "react";
import * as __cu_react_dom from "react-dom";
const require = (id) => {
  if (id === "react") return __cu_react;
  if (id === "react-dom") return __cu_react_dom;
  throw new Error("console-ui: unexpected require(\"" + id + "\")");
};
import {
  AbstractMermaidValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  WardleyGrammarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject
} from "./chunk-PL2HDBUT.js";

// node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-PUPMXCY4.mjs
var _a;
var WardleyValueConverter = (_a = class extends AbstractMermaidValueConverter {
  runCustomConverter(rule, input, _cstNode) {
    switch (rule.name.toUpperCase()) {
      case "LINK_LABEL":
        return input.substring(1).trim();
      default:
        return void 0;
    }
  }
}, __name(_a, "WardleyValueConverter"), _a);
var WardleyModule = {
  parser: {
    ValueConverter: /* @__PURE__ */ __name(() => new WardleyValueConverter(), "ValueConverter")
  }
};
function createWardleyServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Wardley = inject(
    createDefaultCoreModule({ shared }),
    WardleyGrammarGeneratedModule,
    WardleyModule
  );
  shared.ServiceRegistry.register(Wardley);
  return { shared, Wardley };
}
__name(createWardleyServices, "createWardleyServices");

export {
  WardleyModule,
  createWardleyServices
};
