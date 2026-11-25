# numerology

## How we work

`.claude/settings.json` loads four plugins from the `lorenzos-claude-code`
marketplace (gr8monk3ys/skills), in every clone and every cloud session. Use
them every time, not only when one happens to trigger:

- **Matt Pocock's skills** (`mattpocock-skills`) for the engineering process:
  `grilling` before building something new, `tdd` for any behaviour change,
  `diagnosing-bugs` for bugs, `code-review` before calling work done and `pr`
  for the PR body. Prefer them over overlapping skills from other plugins.
- **Impeccable** for any UI, layout, styling or on-screen copy: run
  `/impeccable critique` or `/impeccable audit` on it before you're done.
- **Ponytail** is always on: the simplest code that works, no unrequested
  abstractions or dependencies. Run `ponytail-review` on the diff before
  opening a PR and cut what the task didn't need.
- **Tests:** `./scripts/verify` is the fast gate (`bun run check` minus the
  build: lint, typecheck, dependency boundaries, unit tests). A hook runs it
  before a session can finish and won't let it end while it fails. Still run
  `bun run check` and `bun run test:e2e` before a PR, as "Checks" says. Never
  skip, weaken or delete a test to get it green.

## Agent skills

### Issue tracker

GitHub Issues on `gr8monk3ys/numerology`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, label string equal to role name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Checks

`bun run check` runs lint, typecheck, dependency boundaries (`lint:boundaries`), unit tests and the build. `bun run test:e2e` runs the Playwright smoke spec. A pre-commit hook (simple-git-hooks) runs staged lint and typecheck; `bun install` installs it.
