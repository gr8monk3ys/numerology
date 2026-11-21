# Numen

Live at https://numen.lscaturchio.xyz.

A numerology calculator: type a name and a birth date, get the Pythagorean and
Chaldean numbers written into them, set on a gothic astronomical clock: a
dial whose rings turn to your numbers, blackletter numerals, and every
reduction shown in full. Everything is computed in the browser; a name and a
birth date are never sent anywhere.

The engine is pure TypeScript with no framework imports
([`lib/numerology`](lib/numerology)), and it is tested against worked examples
from published method guides rather than against its own output. The cases in
[`content/data/methods_*.json`](content/data) carry the arithmetic by hand;
the tests assert the same numbers. "Thomas John Hancock", for instance, must
come out as Expression 70 -> 7, Soul Urge 20 -> 2, Personality 50 -> 5, Karmic
Lessons [7, 9], Hidden Passion 1, Subconscious Self 7, Balance 2, and a Life
Path of 3 for 1990-05-15. 59 tests across 2 files, ~13 ms.

<p align="center">
  <img src="docs/screenshot.png" alt="The home page: an astronomical dial set to a sample name, beside the form that sets it to yours" width="720">
</p>

## What it calculates

The engine lives in [`lib/numerology`](lib/numerology) and is plain TypeScript
with no framework imports, so each function can be called and tested on its
own.

- **Core numbers** ([`core.ts`](lib/numerology/core.ts)): Life Path,
  Expression/Destiny, Soul Urge, Personality, Birthday and Maturity. Master
  numbers 11, 22 and 33 are kept unreduced, and Y can be treated as a vowel.
- **Advanced numbers** ([`advanced.ts`](lib/numerology/advanced.ts)):
  Balance, Karmic Lessons, Hidden Passion, Subconscious Self, Rational
  Thought, Cornerstone, Capstone and First Vowel. Karmic Debt (13, 14, 16,
  19) is flagged on any core number whose unreduced total hits one.
- **Chaldean** ([`chaldean.ts`](lib/numerology/chaldean.ts)): the compound
  and root name number under the Chaldean letter table.
- **Cycles** ([`cycles.ts`](lib/numerology/cycles.ts)): Personal Year, Month
  and Day, plus the four Pinnacles and Challenges with their age ranges.
- **Esoteric extras** ([`esoteric.ts`](lib/numerology/esoteric.ts)): Tarot
  Birth Card, Planes of Expression, Life Cycles, Bridge numbers, Western sun
  sign and Chinese zodiac.
- **Compatibility** ([`compatibility.ts`](lib/numerology/compatibility.ts)):
  a 0-100 harmony score between two Life Paths.
- **Angel numbers** ([`angel.ts`](lib/numerology/angel.ts)): classifies
  sequences such as 111, 1221 or 1234 as repeating, mirrored or ascending.

[`report.ts`](lib/numerology/report.ts) assembles all of the above into one
`Reading` object, which is what the site renders. The text for each number
(meanings, correspondences, the angel-number library) is JSON in
[`content/data`](content/data).

The site has pages for a full reading, compatibility, forecast, angel numbers
and a number-by-number encyclopedia.

## Ads

The site carries Google AdSense under the same publisher account as
healthcalc.xyz ([`lib/adsense.ts`](lib/adsense.ts), [`public/ads.txt`](public/ads.txt)).
No ad code loads until `NEXT_PUBLIC_ADSENSE_GOOGLE_CMP=1` is set, which is
done once a consent message is published in AdSense under Privacy &
messaging (Google's tag then asks for ad consent where the law requires it).
With it set, the tag loads on every page in production and Auto ads work.
Two in-page units stay hidden until their slot ids are also set:

- `NEXT_PUBLIC_ADSENSE_SLOT_READING`: under the core numbers of a reading.
- `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`: on the home page and each number's page.

## Running it

Package manager is [Bun](https://bun.sh).

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build
bun run start    # serve the build
```

## Tests and checks

```bash
bun run test     # vitest, lib/numerology/*.test.ts
bun run lint     # eslint via next lint
bunx tsc --noEmit
bun run test:mutation  # Stryker on lib/numerology, report in reports/mutation/ (local only, ~1.5 min)
```

The test cases are worked examples from published numerology method guides
(Decoz, numerology.com and others), recorded in
[`content/data/methods_*.json`](content/data). CI runs lint, typecheck, tests
and the build on every push and pull request.

Built with Next.js 15, React 19, Tailwind CSS v4 and TypeScript.

## Disclaimer

This is for reflection and entertainment. It makes no claims about anything.
