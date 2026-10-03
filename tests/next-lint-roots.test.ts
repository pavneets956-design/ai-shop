import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { createRequire } from "node:module";

// Exercise the consumer, not just the adapter: an upstream lint-plugin change
// must not silently break the scoped dependency replacement.
const require = createRequire(import.meta.url);
const { getRootDirs } = require("@next/eslint-plugin-next/dist/utils/get-root-dirs.js");
let root: string;
const slash = (path: string) => path.replace(/\\/g, "/");
const resolve = (rootDir?: string | (string | null)[]) =>
  getRootDirs({ cwd: root, settings: { next: { rootDir } } }).map(slash).sort();

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "handbuilt-lint-roots-"));
  mkdirSync(join(root, "apps", "studio", "app"), { recursive: true });
  mkdirSync(join(root, "apps", "tools"), { recursive: true });
  writeFileSync(join(root, "apps", "README.md"), "Not a project directory");
});
afterAll(() => rmSync(root, { recursive: true, force: true }));

describe("Next lint project roots", () => {
  it("loads the checked-in adapter without falling back to a parent installation", () => {
    const fromPlugin = createRequire(require.resolve("@next/eslint-plugin-next"));
    expect(realpathSync(fromPlugin.resolve("fast-glob"))).toBe(
      realpathSync(join(process.cwd(), "tools/next-root-glob/index.cjs")),
    );
  });
  it("keeps the current directory when no root is configured", () => {
    expect(resolve()).toEqual([slash(root)]);
  });
  it("keeps a literal project root without expanding its children", () => {
    expect(resolve(join(root, "apps", "studio"))).toEqual([slash(join(root, "apps", "studio"))]);
  });
  it("expands workspace globs into directories only", () => {
    expect(resolve(`${slash(root)}/apps/*`)).toEqual([
      `${slash(root)}/apps/studio`, `${slash(root)}/apps/tools`,
    ]);
  });
  it("accepts brace patterns and root arrays with Windows separators", () => {
    expect(resolve(`${slash(root)}/apps/{studio,tools}`)).toEqual([
      `${slash(root)}/apps/studio`, `${slash(root)}/apps/tools`,
    ]);
    expect(resolve([`${slash(root)}/apps/studio`.replace(/\//g, "\\"), null])).toEqual([
      `${slash(root)}/apps/studio`,
    ]);
  });
  it("returns no project for missing roots", () => {
    expect(resolve(`${slash(root)}/missing/*`)).toEqual([]);
  });
  it("preserves relative roots without adding trailing separators", () => {
    const pattern = slash(relative(process.cwd(), join(root, "apps")));
    expect(resolve(`${pattern}/*`)).toEqual([`${pattern}/studio`, `${pattern}/tools`]);
  });
});
