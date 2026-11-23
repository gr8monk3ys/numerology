# Numen

A numerology calculator: from a name and a birth date it computes the Pythagorean and Chaldean numbers written into them, all in the browser.

## Language

### Reducing numbers

**Reduction**:
Repeatedly summing a number's digits until one digit (1-9) remains, with the master numbers excepted. Every reduction is shown in full (70 -> 7).
_Avoid_: collapse, digital root

**Master number**:
11, 22 or 33, which reduction never touches. A **Dial** rests a master on its root digit (11 -> 2, 22 -> 4, 33 -> 6).

**Karmic debt**:
One of 13, 14, 16 or 19, flagged on a number whose unreduced total (the last step before it reduced) hits it.

**Insight** (`NumberInsight`):
A fully annotated number ready for display: final value, whether it is a master, any karmic debt, the raw total and the reduction chain (e.g. 58 -> 13 -> 4).

### Systems

**Pythagorean**:
The letter table that maps A-Z onto 1-9. The default system for every core number.

**Chaldean**:
The letter table that maps onto 1-8 only (9 is never assigned). Its raw sum is the **compound number**; the reduced form is the **root number**.

**Y as vowel**:
A reading option that treats Y as a vowel when separating Soul Urge from Personality.

### The reading

**Reading** (`Reading`):
Everything the engine computes for one name and birth date: **core numbers**, **advanced numbers**, the **Chaldean** result and the **forecast**. The site renders it; nothing is stored or sent.

**Core numbers**:
Life Path, Expression (also Destiny), Soul Urge, Personality, Birthday, Maturity and Balance.

**Life Path**:
The number reduced from the birth date.

**Expression**:
The number reduced from every letter of the name.

**Soul Urge**:
The number reduced from the vowels of the name.

**Personality**:
The number reduced from the consonants of the name.

**Maturity**:
Life Path and Expression added together.

**Advanced numbers**:
Karmic debts, karmic lessons, hidden passion, subconscious self, rational thought, and the cornerstone, capstone and first vowel of the first name.

**Karmic lessons**:
The values 1-9 that appear nowhere in the name.

**Hidden passion**:
The value or values that appear most often in the name.

**Working** (`CoreWorkings`):
The written-out sum behind a core number: the addends, then the reduction chain. Display only.

### Time

**Forecast**:
The cycles that move over a lifetime: **personal cycles**, **pinnacles** and **challenges**.

**Personal year / month / day**:
The cycle numbers for a target date (the date of the reading).

**Pinnacle**:
One of four peak periods of life, each with a value and an age range.

**Challenge**:
One of four plain single-digit lessons (0 allowed), timed like the pinnacles.

**Life cycle**:
One of three long periods ruled by the birth month, day and year, with age ranges.

### Esoterica

**Bridge number**:
The gap between two core numbers: Life Path to Expression, and Soul Urge to Personality.

**Planes of expression**:
Letters sorted into Physical, Mental, Emotional and Intuitive; the **dominant** plane is the largest.

**Tarot birth card**:
The major arcana card tied to the Life Path.

**Cosmic profile** (`CosmicProfile`):
A reading joined to its written content: tarot, sun sign, Chinese zodiac, planes, life cycles, bridges and lucky numbers.

### Other pages

**Compatibility**:
A 0-100 harmony score between two Life Paths, with a tier (soulmates, harmonious, balanced, growth).

**Angel number**:
A repeating or patterned sequence (111, 1221, 1234), classified as triple, quadruple, repeating pair, mirror, ascending, descending or plain sequence.

**Dial**:
The astronomical-clock graphic: nine numerals on the rim, one ring per core number, a hand pointing at the active one.

## Flagged ambiguities

- **Expression** and **Destiny** name the same number in the code (`expressionNumber`); the site says Expression.
