# Ski 2027 · Mountain Explorer

Photo-led trip site for the 9-16 January 2027 week in Val Thorens: the apartment, ski schools, hire, lifts, apres, food and groceries, plus the link valleys (Meribel, Courchevel, Orelle).

Live: https://jasonxu8693.github.io/ski-2027-resort-explorer/

## Structure

1. Hero over a real Val Thorens photograph (Florian Pepellin, CC BY-SA 4.0, credited on the page).
2. Story stage: the hero photograph parts like a pair of doors onto three close-ups with a panel each - where we stay, how we get there, beyond Val Thorens. One sticky viewport over a long scroll track; JS writes CSS custom properties per frame (`--split`, `--sp1..3`, `--dof`, `--sb1..3`, per-panel `--o`/`--y`) and CSS turns them into transform / opacity (filter blur on fine-pointer devices only).
3. "The week, in pictures" mosaic - a tile flies into the detail sheet with GSAP Flip.
4. Explorer: two regions, category chips, pins over the landscape (which pans when you look beyond Val Thorens), a card rail, detail sheets, lightbox (shared-element flight both ways).
5. "Trip details" modal: To do, Bookings, The week, Costs, Food plan, Who's in, Gotchas, Sources.

## Links that open a specific place

- `#todo` `#bookings` `#week` `#costs` `#food` `#whos-in` `#gotchas` `#sources` open the trip modal on that tab (the phone back button closes it).
- `#p/<place id>` opens the explorer at that place, e.g. `#p/vt-intersport`, `#p/2` (the apartment).
- `#pictures` and `#explore` jump to those sections.

## Motion

Lenis 1.3.26, GSAP 3.13.0 + ScrollTrigger + Flip, loaded deferred from CDN with SRI; the site works without them (scroll-driven values still run off a rAF-throttled scroll listener). "Motion off" and `prefers-reduced-motion` stop Lenis, tweens, pointer parallax and smoothing; the story stage stays scrubbable but steps instead of easing.

## Shared state

People, group tasks and bookings live in one Supabase row (`board_key='ski-2027-trip-board'`). Personal tasks stay in localStorage.
