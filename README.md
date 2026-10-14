# Ski 2027 · Mountain Explorer

Photo-led trip site for the 9-16 January 2027 week in Val Thorens: the apartment, ski schools, hire, lifts, apres, food and groceries, plus the link valleys (Meribel, Courchevel, Orelle).

Live: https://jasonxu8693.github.io/ski-2027-resort-explorer/

## Phone companion · 14 October 2026

Phones open a companion organised around **Trip plan, Places and Guide**. The first visit introduces the trip and practical next steps; returning users can resume their tab, filters and reading position within the browser session. Places contains all 25 venues and an All / Saved collection switch. Guide contains seven topics. Favourites remain personal localStorage data. Desktop retains the gondola journey and an **Open trip planner** entry into the same companion.

Ordinary chapters, places and trip sections stay inside the persistent three-tab shell. Each has a named return route. Only full-screen photographs use an overlay, and photo-labelled actions open it directly. The nine original panels, source data and shared Supabase handlers are preserved; booking rows use readable person cards and the person filter remembers its local choice.

`index.html` contains all CSS and JavaScript and opens directly from disk alongside the existing images. No runtime build, package installation or server is required. Editable companion sources are `mobile-explorer.css` / `.js`, `mobile-trip.css` / `.js` and `mobile-flow.css`. After editing, run `node build-ui.cjs` to embed them; `node verify-ui.cjs` checks syntax, embedding and unchanged original data/shared-store code against the last commit.

Phone animations use brief transform/opacity transitions. The phone companion does not run the scenic snow, Lenis or scroll-driven gondola animation. Both the system reduced-motion preference and the Motion control are respected. Research dates and unconfirmed prices remain visible; older Costs/Food comparisons have explicit reference notices.

See `docs/phone-experience-strategy.md`, `docs/experience-methods.md`, `docs/navigation-audit-v2.md`, `docs/experience-walkthrough-scenarios.md` and `docs/phone-release-verification.md` for the current strategy, research, acceptance journeys and verification. The earlier `docs/design-review.md` and `docs/trip-detail-mobile-audit.md` describe the first pass, whose navigation was superseded after user feedback.

## Structure

The following describes the original scenic layers; the phone companion supersedes their presentation on small screens.

1. Hero over a real Val Thorens photograph (Florian Pepellin, CC BY-SA 4.0, credited on the page).
2. Story stage: the hero photograph parts like a pair of doors onto three close-ups with a panel each - where we stay, how we get there, beyond Val Thorens. One sticky viewport over a long scroll track; JS writes CSS custom properties per frame (`--split`, `--sp1..3`, `--dof`, `--sb1..3`, per-panel `--o`/`--y`) and CSS turns them into transform / opacity (filter blur on fine-pointer devices only).
3. "The week, in pictures" mosaic - a tile flies into the detail sheet with GSAP Flip.
4. Explorer: two regions, category chips, pins over the landscape (which pans when you look beyond Val Thorens), a card rail, detail sheets, lightbox (shared-element flight both ways).
5. "Trip details" modal: To do, Bookings, The week, Costs, Food plan, Who's in, Gotchas, Sources.

## Links that open a specific place

- `#todo` `#bookings` `#week` `#packing` `#costs` `#food` `#whos-in` `#gotchas` `#sources` open an ordinary trip section in the companion on both phones and desktop. The scenic desktop's own Trip details button retains its original modal.
- `#p/<place id>` opens the explorer at that place, e.g. `#p/vt-intersport`, `#p/2` (the apartment).
- `#pictures` and `#explore` jump to those sections.

## Motion

Lenis 1.3.26, GSAP 3.13.0 + ScrollTrigger + Flip, loaded deferred from CDN with SRI; the site works without them (scroll-driven values still run off a rAF-throttled scroll listener). "Motion off" and `prefers-reduced-motion` stop Lenis, tweens, pointer parallax and smoothing; the story stage stays scrubbable but steps instead of easing.

## Shared state

People, group tasks and bookings live in one Supabase row (`board_key='ski-2027-trip-board'`). Personal tasks stay in localStorage.
