---
status: accepted
date: 2026-11-22
---

# The engine is framework-free pure TypeScript and runs in the browser

The numerology engine (`lib/numerology`) imports no framework, and a reading is computed in the visitor's browser. The site has no database and no API route; a name and birth date are never sent anywhere (README, PRODUCT.md).

Why: the arithmetic must be traceable and testable against worked examples from published method guides, and visitors are entrusted with a name and date of birth that ads must never see.

## Consequences

- Every function in the engine can be unit tested without React or Next (`vitest`).
- Text content lives as JSON in `content/data` and is joined to a reading in `lib/content`.
- `lib/numerology` is a deep module: the site imports its entry points only, enforced by dependency-cruiser (`.dependency-cruiser.cjs`).
