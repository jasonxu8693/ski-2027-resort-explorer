# Ski 2027 · design review and implementation

Tier 3 — whole-site design pass, 14 October 2026.

Objective: make the existing Val Thorens week useful to open on a phone, while keeping the alpine identity and the desktop gondola journey.

## Audit

1. The scenic ride was the main route into practical content → phones spent much of their screen on a cabin and giant chapter numbers → replace the phone landing and navigation with a dedicated companion.
2. Seven chapters were arranged as a horizontally clipped stop picker over independently scrolling cards → finding a specific place required knowing which chapter contained it → expose all 25 existing places through search, category and area filters.
3. Tiny portrait thumbnails replaced meaningful photography → atmosphere survived but the actual places were hard to inspect → use consistent landscape crops and full-width guide images, with accessible galleries.
4. The nine trip-detail tabs overflowed sideways → several sections were hard to discover → use a labelled native section selector and remember each section's scroll position.
5. Booking grids compressed controls to 29px or less → it was easy to change the wrong shared status → reuse the original controls in per-person cards, with 44–48px targets and a person filter.
6. Some bold itinerary times inherited white text on a white card → important logistics disappeared → scope text colours to the trip panels.
7. Place details used a constrained floating sheet → long descriptions had too little reading space → use full-height phone details with a persistent title, save/share controls, and source/map actions.
8. There was no personal revisit mechanism → people had to find the same places repeatedly → add a local saved list with count, Undo, empty state and persistence across reloads.
9. The booked apartment invited users to “Check availability” → the action contradicted the existing booking status → label it “View booked stay” and target the actual residence in Maps.
10. Costs and Food still included older comparison material and inconsistent totals → visual polish risked implying those prices were freshly verified → preserve every figure and visibly flag the reference status and discrepancy.

## Fix

The phone app uses Home / Places / Saved / Trip. Its content scrolls naturally inside one main viewport, above a labelled bottom navigation bar. The original trip data, 25 place records, seven chapters, source links, photos, nine trip panels and shared-state implementation remain intact.

Home prioritises destination identity, the real next group job, and shortcuts to the apartment, bookings and packing. Places supports accent-insensitive search across names, areas, notes and facts, eight category choices, and an area selector. Saved entries are explicitly personal. Trip exposes every organiser panel and the existing directions, Tricount and hire-shop links.

All seven guide chapters retain their summary, facts, complete detail text, links and primary action. Both button and link actions are preserved, including lift-pass booking. Closing a detail returns to the correct view and reading position. Opening a link directly has a safe return destination. Browser Back closes the full-screen photograph before the place detail.

## Elevate

- A consistent alpine editorial system: ink blue, warm snow surfaces, restrained green accents, serif destination/place titles and Inter controls.
- Real landscape photography with protected overlays and predictable crops. Missing images receive a deliberate fallback.
- Full-screen reading, persistent context, sticky primary actions, 16px form fields and keyboard focus treatment.
- Fast, short transform/opacity transitions; no phone scroll-scrubbing, animated price counters, snow canvas or smooth-scroll interception.
- Desktop keeps the scenic arrival and gains the same searchable directory, saved list and organiser entry points.
- Existing guest data, bookings and group tasks remain shared. The redesign adds no new shared writes; local preferences are labelled separately.

Primary references informed patterns rather than copying a visual template: [Apple tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [Apple sheets](https://developer.apple.com/design/human-interface-guidelines/sheets), [Airbnb group wishlists](https://news.airbnb.com/airbnb-2024-summer-release-highlights), [Material motion](https://m3.material.io/styles/motion), and [W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). The existing site is a booked trip organiser, so a resort comparison feature would add the wrong workflow; the saved list instead applies to its actual places.

## Stress test

| Case | Final result |
|---|---|
| White and noisy test images | Pass at 320px: save controls have solid containers, readable icons and 44px targets. Fixture isolated from shared writes. |
| Long names, approximately twice normal length | Pass: titles wrap, no clipped action and no horizontal overflow. |
| 1 and 12 confirmed travellers | Pass in isolated booking fixtures at 320px: readable person cards and matching totals; original room-price basis remains explicit. |
| Empty and populated saved list | Pass: useful empty state, singular/plural count, save/remove/Undo and persistence. No voting feature exists, so vote-count testing is not applicable. |
| Missing photo and optional area/badge | Pass: intentional photo fallback and no broken icon or empty badge. |
| 320, 375, 768 and 1440px | Pass in browser viewport checks: no horizontal document overflow; 2/3/4-column place browsing and readable guide pages. |
| All nine trip panels | Pass: integrated 375px checks plus isolated 320/390/768px checks; section selection, person filtering and retained reading positions work. |
| Direct links and browser Back | Pass: fresh trip-section entry stays inside the site on Close; Home → Bookings → Back returns Home; place links and photo dismissal preserve context. |
| Motion disabled | Pass: the companion's computed view animation becomes `none`; all controls remain available. |
| Original data and shared persistence | Static integration checks confirm original place data and shared-store code unchanged. Browser tests did not toggle real shared bookings or tasks. |
| Script syntax and inline packaging | Pass: all inline scripts parse; companion files embedded once; fixtures excluded from production. |

## Self-critique and second pass

The first implementation still inherited a few desktop assumptions: staggered information reveals, a price count-up, a missing anchor CTA, and a shallow browser-history check. The second pass removed information delays on phones, restored all primary actions, counted only app-owned history entries, protected gallery Back navigation and retained guide reading position. It also corrected low-contrast task text, stale supplemental links, duplicate photo credits and saved-list keyboard focus.

The remaining limitation is physical-device validation. Browser viewport checks do not prove iOS Safari keyboard behaviour, real thumb reach, real-phone rendering performance or every assistive-technology combination. The next useful check is the actual phone journey: open the home, find a lunch spot, save it, open its photos, press Back, then find your own bookings. This pass did not re-research travel facts or replace the existing backend.
