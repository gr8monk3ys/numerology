# Numen · Esoteric Numerology

A fun little calculator site for esoteric numerology calculations — the numbers
written into your name and birth date, read across the Pythagorean and Chaldean
systems with a full layer of esoteric correspondences, styled as a dark gothic
grimoire.

## Features

- **Cosmic profile** — Tarot Birth Card, Western sun sign, Chinese zodiac,
  Planes of Expression, Life Cycles, Bridge numbers and lucky numbers/days/colors
- **Full reading** — enter a name + birth date for a complete chart:
  - Core numbers: **Life Path, Expression/Destiny, Soul Urge, Personality,
    Birthday, Maturity, Balance**
  - Advanced: **Karmic Debt (13/14/16/19), Karmic Lessons, Hidden Passion,
    Subconscious Self, Cornerstone, Capstone, First Vowel, Rational Thought**
  - Master numbers **11 / 22 / 33** preserved, with a **Y-as-vowel** toggle
  - **Chaldean** name vibration alongside the Pythagorean chart
- **Forecast** — Personal Year / Month / Day plus the four **Pinnacles** and
  **Challenges**, with the currently-active cycle highlighted
- **Compatibility** — compare two Life Paths for a harmony score and guidance
- **Angel numbers** — decode 111, 222, 1234… with a searchable library
- **Number encyclopedia** — every number 1–9, 11, 22, 33 across all contexts,
  with **tarot, ruling planet, zodiac, element, chakra, gemstone & color**
  correspondences

Everything is calculated **client-side** — no data leaves the browser.

## Tech

- [Next.js](https://nextjs.org) 15 (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first theme) with a custom cosmic design system
- [Bun](https://bun.sh) as the package manager & runtime
- A typed, unit-tested numerology engine in [`lib/numerology`](lib/numerology)
- Content datasets in [`content/data`](content/data)

## Development

```bash
bun install
bun run dev     # http://localhost:3000
bun run test    # run the engine test suite (vitest)
bun run build   # production build
```

## The engine

The calculation engine ([`lib/numerology`](lib/numerology)) is framework-agnostic
and verified against worked examples from reputable numerology sources
(Hans Decoz / World Numerology, numerology.com, Tokenrock and others). Every
documented algorithm has a corresponding case in
[`numerology.test.ts`](lib/numerology/numerology.test.ts).

## Disclaimer

Numerology is offered here for reflection, inspiration and entertainment.
Trust your own intuition above all. ✦
