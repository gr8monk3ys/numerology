---
name: Numen
description: A numerology reading drawn as a gothic astronomical clock, with every sum shown.
colors:
  gold-300: "#d9a441"
  gold-200: "#ecc978"
  gold-100: "#f6e3b0"
  gold-400: "#c08a2c"
  gold-600: "#74501a"
  sky-700: "#16255c"
  sky-600: "#1b2c6e"
  sky-800: "#111d4a"
  sky-500: "#2a3f8f"
  rubric-400: "#c45a34"
  rubric-300: "#e89270"
  rubric-500: "#a8482a"
  sage-400: "#78ad96"
  ink-950: "#0a0911"
  ink-900: "#0f0e1a"
  ink-850: "#141326"
  bone-50: "#f3e9d2"
  bone-100: "#e9dcc0"
  bone-200: "#d6c9ad"
  bone-300: "#b9ad95"
  bone-400: "#9a907d"
  bone-500: "#888070"
  bone-600: "#6b6883"
  bone-300-on-sky: "#cfcbe0"
  bone-400-on-sky: "#b9b8d6"
  bone-500-on-sky: "#a9aad0"
  line: "rgba(217, 164, 65, 0.2)"
  line-strong: "rgba(217, 164, 65, 0.45)"
  iron: "rgba(233, 220, 192, 0.13)"
  iron-on-sky: "rgba(233, 220, 192, 0.22)"
typography:
  display:
    fontFamily: "UnifrakturCook, 'Old English Text MT', serif"
    fontSize: "clamp(2.75rem, 5.4vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.02
  headline:
    fontFamily: "UnifrakturCook, 'Old English Text MT', serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.02
  numeral:
    fontFamily: "UnifrakturCook, 'Old English Text MT', serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "Texturina, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Texturina, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  figures:
    fontFamily: "Texturina, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum', 'lnum'"
  label:
    fontFamily: "Texturina, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.06em"
    fontFeature: "'smcp', 'c2sc'"
rounded:
  none: "0"
  full: "9999px"
spacing:
  gutter: "1.25rem"
  gutter-wide: "2rem"
  plate: "1.25rem"
  plate-wide: "1.5rem"
  section: "6rem"
  header: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.gold-300}"
    textColor: "{colors.ink-950}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.gold-200}"
    textColor: "{colors.ink-950}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.bone-50}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-secondary-hover:
    textColor: "{colors.gold-200}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone-200}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "2.75rem"
  field:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.bone-50}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 0.875rem"
    height: "3rem"
  field-focus:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.bone-50}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.bone-200}"
    rounded: "{rounded.none}"
    padding: "0.0625rem 0.5rem"
  tag-accent:
    textColor: "{colors.gold-200}"
  tag-rubric:
    textColor: "{colors.rubric-300}"
  medallion:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.bone-50}"
    typography: "{typography.numeral}"
    rounded: "{rounded.full}"
    size: "2.75rem"
  medallion-master:
    backgroundColor: "{colors.sky-600}"
    textColor: "{colors.gold-100}"
    rounded: "{rounded.full}"
  medallion-karmic:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.rubric-300}"
    rounded: "{rounded.full}"
  plate-row:
    backgroundColor: "transparent"
    textColor: "{colors.bone-50}"
    rounded: "{rounded.none}"
    padding: "0.75rem"
  plate-row-hover:
    backgroundColor: "{colors.ink-850}"
  plate-row-pressed:
    backgroundColor: "{colors.sky-700}"
  sky-plate:
    backgroundColor: "{colors.sky-700}"
    textColor: "{colors.bone-100}"
    rounded: "{rounded.none}"
  nav-link:
    textColor: "{colors.bone-200}"
    typography: "{typography.body}"
  nav-link-current:
    textColor: "{colors.gold-200}"
  segmented-pressed:
    backgroundColor: "{colors.gold-300}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.none}"
---

# Design System: Numen

## Overview

**Creative North Star: "The Astronomical Clock"**

Numen is drawn as a gothic astronomical clock read at night. A name and a birth date turn its rings; a hand points at the number being read; the sums that produced each number are written out beside it. The ground is night, the one coloured field is an ultramarine sky, a thin vermilion band of twilight crosses the dial, and everything that is drawn rather than read is a gilt line. The system is flat and ruled: nothing floats, nothing glows, nothing sits in a box.

Density is that of a reference plate, not a landing page. Text is set at a generous reading size in a pen-cut text face, figures line up in columns, and blackletter is saved for the few things that deserve to be carved: the wordmark, the two top heading levels and the numerals. The instrument does the persuading, so the page around it stays quiet.

The system rejects the category's starfield-and-glow hero and the centred headline over a card form. It also rejects card chrome of any kind: content sits between rules.

**Key Characteristics:**
- Night ground, one ultramarine sky field, gilt lines, bone lettering.
- Two shapes only: the circle (dial, medallion) and the rule (plates, grids).
- Blackletter for h1, h2, the wordmark and numerals; a text face for everything read.
- Vermilion is rationed; gilt is structural; unlit things are drawn in iron, not hidden.
- Every sum is shown in tabular figures next to the number it produced.
- One authored motion: the dial settling.

## Colors

A night palette with one metal and one sky: near-black violet ink, warm bone lettering, gilt for everything drawn, ultramarine for the single filled field, and a rationed vermilion.

### Primary
- **Gilt** (`gold-300`): rings, the dial rim and hand, rules (at 20% as `line`, 45% as `line-strong`), the one primary button, the pressed segment, the checked checkbox, the meter fill, lit numerals on the dial rim.
- **Pale Gilt** (`gold-200`): gilt when it is text: links, the current nav item, field labels, worked sums and the highlighted figure in a sum, the focus outline, the dial hand.
- **Leaf Highlight** (`gold-100`): link hover and the numeral of a master medallion.
- **Worn Gilt** (`gold-400`): the medallion ring and the field border on hover.
- **Tarnish** (`gold-600`): the dial's minor ticks, the inner centre ring, the scrollbar thumb.

### Secondary
- **Ultramarine Field** (`sky-700`): the sky plate and the pressed row of the number plate. The only fill colour besides night.
- **Day Sky** (`sky-600`): the upper field of the dial and the face of a master medallion.
- **Deep Sky** (`sky-800`): wells (fields, medallions) when they sit on a sky plate.
- **Selection Blue** (`sky-500`): text selection only.

### Tertiary
- **Twilight Vermilion** (`rubric-400`): the ring of a master or karmic medallion, the body of a master or karmic number on the dial, the border of a rubric tag and of a field in error.
- **Pale Vermilion** (`rubric-300`): vermilion as text: the karmic numeral, the rubric tag, a field's error message.
- **Twilight Band** (`rubric-500`): the horizon band painted across the dial, and the inner ring of a karmic medallion.
- **Verdigris** (`sage-400`): strengths only: the "Strengths" and "Gifts" labels and their plus marks.

### Neutral
- **Night** (`ink-950`): the page ground, the header, the dial rim and centre, text on gilt.
- **Well** (`ink-900`): the inside of fields, checkboxes and ordinary medallions; the night half of the dial.
- **Lamp-lit Night** (`ink-850`): hover on a row or a grid cell, a focused field.
- **Bone** (`bone-50`): headings, numerals, entered text. (`bone-100`): body text. (`bone-200`): lead paragraphs, nav links, tags.
- **Faded Bone** (`bone-300`): secondary prose. (`bone-400`): labels, hints, the ad label. (`bone-500`): placeholders.
- **Iron** (`bone-600` for numerals, `iron` for rules): unlit numerals on the dial rim; the rules between cells, between plate rows, around tags, around an ad.
- **Sky retints** (`bone-300-on-sky`, `bone-400-on-sky`, `bone-500-on-sky`, `iron-on-sky`): on a sky plate the secondary text and iron rules shift toward the field so they never read as grey on blue.

### Named Rules
**The Rubric Rule.** Among numbers and tags, vermilion marks a master number or a karmic debt and nothing else. Its two other standing places are fixed: the twilight band on the dial, and a field in error. It is never decoration, emphasis or a call to action.

**The Gilt Is Drawn Rule.** Gilt belongs to what is drawn or pressed: rings, rules, numerals and figures, links, field labels, and the one primary button. It is never used to emphasise a word inside a heading; an `em` in a heading stays upright and in the heading's own bone.

**The Iron Rule.** A position that is not lit is still drawn. Numerals no ring points at stay on the rim in iron; inactive rings stay at 38% gilt. Nothing is hidden to show that it is off.

## Typography

**Display Font:** UnifrakturCook 700 (with "Old English Text MT", serif)
**Body Font:** Texturina, optical-size axis on (with Georgia, serif)
**Label/Mono Font:** none; labels and figures are Texturina with small caps or tabular lining figures.

**Character:** A carved blackletter over a text face cut from the same broad pen. The blackletter is loud and rare; Texturina carries every sentence, label and sum, so the page reads easily while still belonging to the clock.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 5.4vw, 5rem)`, 1.02): the home h1. Page-header h1s sit at 3rem, 3.75rem from 640px.
- **Headline** (700, 2.25rem rising to 3rem at 640px, 1.02): section h2s. Section rows inside tool pages step down to 1.875rem / 2.25rem. Balanced wrapping.
- **Numeral** (700, line-height 1): every numeral in a medallion and on the dial. Medallion sizes: 2rem / 1rem numeral, 2.75rem / 1.5rem, 3.5rem / 1.875rem, 5rem / 3rem, 7rem / 4.5rem; figures of three or more digits step down to stay inside the ring.
- **Title** (Texturina 600, 1.25rem or 1.125rem, 1.25): h3 and h4, row names, definition terms.
- **Body** (Texturina 400, 1.0625rem, 1.6): everything read. Lead paragraphs 1.125rem in `bone-200`. Paragraphs cap at 72ch with pretty wrapping.
- **Figures** (Texturina 400, 1.125rem to 1.25rem, tabular lining): sums, reduction chains (`37 → 10 → 1`), dates, scores.
- **Label** (Texturina 500, 1.0625rem, all small caps, 0.06em): definition terms, meta beside a section heading, captions under a medallion, tags (at 1rem, 0.05em).

### Named Rules
**The Carved Letters Rule.** Blackletter is for h1, h2, the wordmark and numerals. h3 and below, labels, buttons, nav and every sentence are Texturina: below the top two levels blackletter is too dense to scan.

**The No Label Above A Heading Rule.** A heading opens its own section. A small-caps label may sit beside a heading as meta, or under a medallion as its caption, or as a term in a list; it never sits on the line above a heading to introduce it.

**The Shown Sum Rule.** A number never appears without a route to its working. Sums are set in tabular lining figures in pale gilt, one sum to a line, with `→` between reductions.

## Layout

A single centred column of 72rem with gutters of 1.25rem, 2rem from 640px. A sticky header 4rem tall sits on the night ground with a gilt hairline under it; anchor jumps clear it with 5rem of scroll padding. Sections are separated by 5rem to 6rem of air and by rules, never by alternating backgrounds; the footer opens with a gilt double rule after 7rem.

The home hero breaks the column on purpose. From 1024px it is two columns: the dial takes a 46vw column and runs to the left viewport edge, sized `min(100%, 100svh - 6rem)` and pinned under the header while the right column (h1, sentence, form, number plate) scrolls; the right column's outer edge aligns to the 72rem container. Below 1024px it is one column in the order h1, form, dial, plate; the dial is capped at 40svh wide, centred, and pinned under the header on an opaque night ground with a hairline below, so the plate rows scroll under it and each pressed row stays in view (rows carry a scroll margin of `40svh + 7rem`).

Ruled grids go to two columns at 640px and three at 1024px. The grid of archetype medallions is three, four, then six across. Plates are padded 1.25rem to 1.5rem; plate rows 0.75rem. Breakpoints in use: 640px, 768px (nav collapses below it), 1024px.

## Elevation & Depth

Flat. There are no shadows, no blur, no gradients and no translucent layers anywhere in the system. Depth is three grounds laid side by side: night (`ink-950`), the well (`ink-900`, inside fields and medallions), and the sky field (`sky-700`). The sticky header and the pinned dial are opaque night with a hairline, not a frosted bar. The single `box-shadow` in the stylesheet is a 1px iron ring that draws the shared rules between cells of a ruled grid; it is a line, not a shadow.

### Named Rules
**The Three Grounds Rule.** A surface is night, a well, or sky. Lift is never shown; a thing is separated from its neighbour by a rule or by changing ground.

## Shapes

Two shapes: the circle and the rule. Corners are square (0) on every button, field, tag, plate and grid. Circles (`9999px`) are reserved for the dial, the medallions and the round menu button on a phone.

Rules carry a fixed grammar. A gilt double rule (3px double, `line-strong`) opens a plate, a page header and the footer. A gilt hairline (1px, `line`) closes a plate and underlines the header. An iron rule (1px, `iron`) divides cells, plate rows and tags. A sky plate takes a solid gilt double rule (3px double, `gold-300`) above and below. No plate has side borders.

Every medallion is a small dial face: a gilt ring with a second, iron ring inset 9%.

## Components

### Buttons
Plain and square; the gilt one is a struck plate, the rest are ruled outlines.
- **Shape:** square corners (0), 2.75rem tall, 0 1.25rem padding, Texturina 600 at 1rem. Small size 2.25rem tall, 0.9375rem.
- **Primary:** `gold-300` plate with `ink-950` text. One per plate or form; it is the action the section exists for.
- **Secondary:** transparent with a `line-strong` rule and `bone-50` text; on hover the rule goes full gilt and the text pale gilt.
- **Ghost:** `bone-200` text, no rule; pale gilt on hover.
- **Hover / Focus:** primary lightens to `gold-200`. Focus is a 2px `gold-200` outline offset 3px, on every focusable thing. Pressed moves down 1px. Disabled is 50% opacity. Colour transitions take 150ms.
- **Icon:** a 1rem line arrow may follow the label.

### Tags
A word between thin rules, no pill.
- **Style:** 1px iron border, square, 0.0625rem 0.5rem padding, small caps at 1rem, `bone-200`.
- **Variants:** accent (gilt rule, pale gilt text) for the standing privacy note; rubric (vermilion rule and text) for "Master" and "Karmic 13/14/16/19" only; muted (`bone-400`) for correspondences.

### Plates and ruled grids
The replacement for cards.
- **Plate:** content between a gilt double rule above and a gilt hairline below. No fill, no side borders, no radius. Padding 1.25rem to 1.5rem.
- **Sky plate:** the one filled surface: `sky-700` between solid gilt double rules, with secondary text and iron retinted for the field and wells dropped to `sky-800`.
- **Ruled grid:** cells share single iron rules, with a strong gilt rule above the grid and a hairline below; no outer box. A cell that is a link darkens to `ink-850` on hover over 200ms.
- **Section row:** an h2 with optional small-caps meta or a link at its right, closed by a `line-strong` rule.
- **Sum:** a worked sum between a strong rule and a hairline, tabular figures at line-height 1.9, keys in small caps, the result in pale gilt.

### Inputs / Fields
A dark well with a gilt rule.
- **Style:** 3rem tall, square, `ink-900` well, 1px `line-strong` border, `bone-50` text at 1.0625rem, `bone-500` placeholder. Label above in Texturina 600, 0.9375rem, pale gilt. Hint below at 0.875rem in `bone-400`.
- **Hover / Focus:** border to `gold-400` on hover; on focus the border goes `gold-200` and the well lightens to `ink-850`.
- **Error:** border `rubric-400`, message below at 0.9375rem in `rubric-300`, focus moved to the field.
- **Date field:** native, dark colour scheme, with a gilt line calendar indicator.
- **Checkbox:** 1.125rem square well with a `line-strong` rule; checked, it fills gilt with an ink tick.
- **Segmented control:** ruled group; the pressed option inverts to a gilt plate with ink text.
- **Meter:** a 4px iron track with a gilt fill.

### Navigation
- **Header:** sticky, 4rem, night ground, hairline below. Blackletter wordmark at 2rem in `bone-50` on the left; Texturina links in `bone-200` on the right, 1.5rem apart.
- **States:** hover turns a link pale gilt; the current page is pale gilt with a 1px gilt underline and `aria-current`.
- **Phone (below 768px):** links collapse behind a round 2.75rem ruled button; the sheet is a night panel of 1.125rem links divided by iron rules.
- **Footer:** opens with a gilt double rule; wordmark and a short note, link columns headed by small-caps labels, a closing line under a hairline that repeats the privacy promise.
- **Links in text:** pale gilt, 1px underline in `line-strong` offset 4px; hover lightens both.

### Medallion
Every number on the site is a round medallion: a blackletter numeral in bone on a well, inside a gilt ring with an inset iron ring.
- **Master (11, 22, 33):** `sky-600` face, vermilion outer ring, gilt inner ring, `gold-100` numeral.
- **Karmic (13, 14, 16, 19):** well face, vermilion outer ring, `rubric-500` inner ring, pale vermilion numeral.
- **Sizes:** 2rem, 2.75rem, 3.5rem, 5rem, 7rem.

### The Dial
The signature. A 1000-unit SVG: a night rim carrying the nine numerals in blackletter (gilt where a ring points, iron elsewhere) with tarnish ticks between them; inside it a sky plate split by the horizon into day sky, a vermilion twilight band and night; six concentric gilt rings, one per number, always in the same order from the outside in (Life Path, Expression, Soul Urge, Personality, Birthday, Maturity); a body on each ring turned to the numeral its number reduces to (masters rest on their root); a pale gilt hand; and a night centre showing the active number.
- **Active ring:** full-strength gilt at 3 units with a larger body ringed in bone; the others sit at 38% and 1.5 units.
- **Flagged body:** a master or karmic number's body is vermilion instead of gilt.
- **Motion:** on load each body leaves twelve o'clock and settles on its numeral over 1.6s, outer ring first, 90ms apart, on `cubic-bezier(0.16, 1, 0.3, 1)`. Afterwards the hand and bodies turn to a new position over 1.1s on the same curve. Rim numerals change between iron and gilt over 0.5s. With `prefers-reduced-motion: reduce` both are off and the dial is simply set.
- **Accessible name:** the dial is one image whose label states every number and where the hand points.

### The Number Plate
The dial's controls. One row per ring: a small medallion, the number's name with any rubric tag, a line saying what it is summed from, and its reduction chain in pale gilt figures at the right (under the description on a phone). Rows are buttons divided by iron rules. Pressing a row fills it with the sky field, swings the hand to it, changes the centre numeral, and writes its full working out in place of the chain, one sum to a line.

### Ad Unit
An advertisement is ruled like any other plate but never styled as content: iron rules above and below, 1rem of padding, a centred small-caps "Advertisement" label in `bone-400`. It sits between sections, never inside the dial hero or between rows of a plate.

## Do's and Don'ts

### Do:
- **Do** put every number in a round medallion with a blackletter numeral, and use the master and karmic variants whenever the number is one.
- **Do** separate things with rules: gilt double rule to open, hairline to close, iron between cells.
- **Do** keep unlit positions on the page in iron (`bone-600` numerals, `iron` rules, rings at 38%).
- **Do** show the working next to the number, in tabular lining figures, one sum to a line.
- **Do** keep the six rings in one order everywhere: Life Path, Expression, Soul Urge, Personality, Birthday, Maturity.
- **Do** give every focusable thing the 2px `gold-200` outline offset 3px, and keep touch targets at 2.75rem.
- **Do** keep the privacy promise visible beside any field that takes a name or a birth date.
- **Do** turn the dial off under `prefers-reduced-motion: reduce` and gate any new movement the same way.

### Don't:
- **Don't** use vermilion for anything but master numbers, karmic debts, the dial's twilight band and a field in error.
- **Don't** colour a word in a heading gilt, or italicise it; heading emphasis stays in the heading's ink.
- **Don't** set blackletter below h2, in buttons, labels, nav or running text.
- **Don't** place a small-caps label on the line above a heading.
- **Don't** draw a card: no rounded box, no four-sided border around a block of content, no shadow, no fill other than the sky field.
- **Don't** add shadows, glows, blur, gradients or starfields.
- **Don't** round a corner. A thing is square or it is a circle.
- **Don't** add a second authored animation. State changes are 150ms to 200ms colour transitions; the dial settling is the only choreography.
- **Don't** style an advertisement to resemble a plate of content, or place one where it interrupts the dial.
