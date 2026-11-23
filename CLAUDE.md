# numerology

## Agent skills

### Issue tracker

GitHub Issues on `gr8monk3ys/numerology`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, label string equal to role name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Checks

`bun run check` runs lint, typecheck, dependency boundaries (`lint:boundaries`), unit tests and the build. `bun run test:e2e` runs the Playwright smoke spec. A pre-commit hook (simple-git-hooks) runs staged lint and typecheck; `bun install` installs it.
