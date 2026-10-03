# Next lint root matcher

This private adapter replaces `fast-glob` **only inside** `@next/eslint-plugin-next`.
Next 15.5.25 uses its `globSync` export with `onlyDirectories: true` to resolve
configured project roots. The adapter uses maintained `tinyglobby` and disables
its default directory expansion to preserve literal-root behavior.

This removes the unpatched `braces` dependency (GHSA-vfj7-8cjw-p6xm), without
downgrading Next's lint rules or weakening `npm audit`. It is not a general
replacement for every fast-glob API. Integration tests exercise the actual Next
root resolver, including explicit roots, glob patterns and Windows separators.
The override's relative file path is resolved from the lint plugin's package
directory; the lockfile must resolve it to the repository's `tools/next-root-glob`.
Tests also pin that resolved location, preventing a parent-level installation
from hiding a broken link on a developer machine.
Recheck this contract when upgrading the lint plugin; remove the override when
upstream uses a dependency tree with no affected braces release.
