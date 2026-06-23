import { defineConfig } from 'tsup'

export default defineConfig({
  // Three entry points so consumers only pull what they import:
  //   console-ui        -> theme + shell + lightweight components (no editor/markdown)
  //   console-ui/editor -> rich-text Editor (tiptap, prosemirror, mermaid, lowlight)
  //   console-ui/md     -> Md (react-markdown)
  // esbuild code-splits shared code into chunks; the editor's CSS is emitted as editor.css.
  entry: {
    index: 'src/index.ts',
    editor: 'src/editor/index.ts',
    md: 'src/md.ts',
  },
  format: ['esm'],
  splitting: true,
  // Browser target: convert CJS `require('react')` in bundled deps into real imports
  // instead of a runtime `__require` shim (which throws "Dynamic require not supported").
  platform: 'browser',
  dts: true,
  clean: true,
  sourcemap: false,
  // Peers stay external — they must resolve to the consuming app's single copy,
  // otherwise React / MUI / emotion identity breaks (duplicate-instance bugs).
  // Everything else (tiptap, prosemirror, react-markdown, mermaid, lowlight,
  // highlight.js, uuid, react-icons, …) is bundled into dist so consumers never
  // have to pre-bundle console-ui's private dependency tree.
  external: [
    /^react$/,
    /^react\//,
    /^react-dom($|\/)/,
    /^react-router-dom($|\/)/,
    /^@mui\//,
    /^@emotion\//,
  ],
  // The 6 global CSS side-effect imports are concatenated by esbuild into a single
  // dist/index.css, exposed to consumers as `console-ui/styles.css`.
  //
  // use-sync-external-store (pulled in by @tiptap/react) is CJS-only and does a literal
  // `require("react")`. With react kept external, esbuild emits a `__require` shim that
  // throws "Dynamic require not supported" in the browser. esbuild's shim first checks
  // `typeof require !== "undefined"`, so we satisfy that branch with a tiny `require`
  // that maps the external peers back to their ESM namespace imports.
  banner: {
    js: [
      'import * as __cu_react from "react";',
      'import * as __cu_react_dom from "react-dom";',
      'const require = (id) => {',
      '  if (id === "react") return __cu_react;',
      '  if (id === "react-dom") return __cu_react_dom;',
      '  throw new Error("console-ui: unexpected require(\\"" + id + "\\")");',
      '};',
    ].join('\n'),
  },
})
