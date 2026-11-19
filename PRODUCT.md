# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Curious believers: people already drawn to astrology, tarot and spiritual practice who want a deep, sincere reading of their own name and birth date (and sometimes a partner's). They come to understand themselves through the tradition, not to laugh at it.

## Product Purpose

Numen reveals the numbers written into a name and birth date: Pythagorean and Chaldean core numbers, karmic debts and lessons, pinnacles and cycles, tarot birth card, compatibility, forecasts, angel numbers and a number-by-number encyclopedia. Success is a visitor who finishes a reading feeling it was thorough, earnest and theirs.

## Positioning

Every reduction is shown in full (70 → 7), and the engine is tested against worked examples from published method guides, so the arithmetic is traceable rather than oracular. Everything is computed in the browser; nothing is sent anywhere.

## Capabilities and Constraints

- Next.js App Router, Tailwind v4, Bun. Engine in `lib/numerology` is framework-free and tested.
- Routes: `/`, `/reading`, `/compatibility`, `/forecast`, `/angel-numbers`, `/numbers`, `/numbers/[number]`, `/about`.
- Funded by Google AdSense (same account as healthcalc.xyz). Ad consent in the EEA/UK is handled by Google's own consent message (AdSense › Privacy & messaging), not a site banner.
- Ads must never receive a visitor's name or birth date (no personal data in ad-request URLs).

## Brand Commitments

- Name: Numen.
- Show-the-math: reductions are always displayed in full.
- Privacy promise stays visible: computed locally, nothing uploaded. With ads present, this means the visitor's inputs are never sent; the ad script itself is third-party.

## Evidence on Hand

Method worked examples in `content/data/methods_*.json`; meanings and correspondences in `content/data`. No testimonials, user counts or press exist; do not invent them.

## Product Principles

1. Treat the tradition sincerely; never wink at the visitor.
2. Show the working; the numbers earn trust by being traceable.
3. The visitor's name and birth date stay on their device.
4. Depth over spectacle: a reading should feel complete, not teased.
