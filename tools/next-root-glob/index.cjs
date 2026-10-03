// Scoped adapter for @next/eslint-plugin-next's sole fast-glob call:
// globSync(rootPattern, { onlyDirectories: true }). Keep literal directories
// literal; tinyglobby otherwise expands them recursively by default.
const { globSync } = require("tinyglobby");
const { isAbsolute } = require("node:path");

exports.globSync = (pattern, options) =>
  globSync(pattern, {
    ...options,
    absolute: options?.absolute ?? isAbsolute(pattern),
    expandDirectories: false,
  }).map((entry) =>
    entry === "/" || /^[A-Za-z]:\/$/.test(entry) ? entry : entry.replace(/\/$/, ""),
  );
