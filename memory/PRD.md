# Rizqi Fauzan — Cosmic Portfolio (PRD)

## Problem Statement
Cosmic-themed single-page portfolio for Rizqi Fauzan (Fullstack Developer, PT. INKA, Polinema, Malang, Indonesia). Six sections built per the V0 spec with omnipotent / cosmic-horror design language.

## User Choices
- Contact form: frontend-only (no backend storage)
- Download CV: file link (placeholder `/cv.pdf`)
- About photo: silhouette placeholder

## Implemented (2025-12)
- Hero — jumbotron parallax text + star particles + magnetic CTAs + Japanese vertical tagline
- About — cosmic entity image + draggable framer-motion chips + ghost face reveal
- Projects — 4 cards orbiting around CSS black hole, hover halts orbit
- Skills — SVG constellation map (Aquila/Lyra/Cygnus/Orion/Vela) with star tooltips
- Awards — flippable cosmic newspaper (front/back) with two award stories
- Contact — cosmic whale animation, "swallow" transition to form, fake submit success, footer with email/github/linkedin
- Typography: Oswald (headings), Shippori Mincho (Japanese), Outfit (body)

## Tech
- Frontend only feature. Backend untouched.
- framer-motion added; Google Fonts linked.

## Backlog (P1/P2)
- Replace About cosmic-entity ghost placeholder with actual photo (user-provided)
- Hook up real CV PDF at /cv.pdf
- Optional: real email submission via Resend
- Optional: lazy-loaded star particle library for richer motion
