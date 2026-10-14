# Trip-detail phone audit — 14 October 2026

Source references below are to the original `index.html` before the new phone pass is inlined. This review inspected the source and existing data handlers; it did not change shared trip data.

## Audit

1. **Bookings compresses eight columns into the phone** (line 93; rows generated at 852–884) → booking targets shrink to 29 px and payment targets to 28 px, with 9 px labels → retain the existing row data and controls but show one traveller card with two columns of labelled, 48 px booking actions. Keep price basis beside its booking label and include textual state, not colour alone.
2. **The invite list requires 650 px** (line 1; 744–760, 815) → names, attendance and notes cannot be used together on a 320–390 px screen → show each guest as a record with full-width fields; use 16 px field text to avoid iPhone focus zoom. Give every input an accessible name containing the real guest name.
3. **Nine trip tabs overflow a masked strip** (93, 283) → later sections are concealed and users must discover horizontal navigation → provide a native section selector on phones, with all nine names and a section count. Keep desktop tabs and their original hash/history behaviour.
4. **The dialog scroll position is shared between tabs** (1658–1664) → a newly selected panel can open part-way through its content → separate the fixed header from the scrolling content and remember each panel's scroll position. Maintain panel semantics and keyboard focus after row rerenders.
5. **Prices and operational comparisons use wide tables** (581–607, 613–626, 704–707) → narrower columns force fragmented reading and imply horizontal exploration → retain table headers in the accessibility tree and present rows as labelled records with explicit prices/bases.
6. **Small destructive actions and crowded controls** (93, 95, 744–749) → narrow sport toggles and anonymous removal crosses are easy to hit by mistake → use 44–48 px controls, clearly label removal and keep original confirmation behaviour. Do not replace original event handlers or duplicate editable state.
7. **Legacy comparison content remains in the selected trip** (562–734) → St Anton, Trip B, old tariff years and a £2,081 food total conflict with the visible £2,132 Costs total → keep these source facts intact during a presentation refactor and identify them as reference material pending a separate factual refresh. Do not invent a corrected fare or change shared records to make the screen look cleaner.
8. **Different modal systems have different focus behaviour** (1389–1408, 1560–1571, 1644–1655) → the pocket sheet, place sheet, lightbox and native trip dialog need coordinated background inertness and close focus → parent shell should own global overlay focus and history. Avoid nested overlays when navigating from one to another.
9. **Photo fallbacks are partly implemented** (1582–1598) → an image failure hides the photo but leaves photo controls and caption available; the lightbox has no matching load-error state → parent detail pass should cover failed photos separately from places that have no photo, with no broken preview or inaccessible full-screen image.
10. **Synthetic landscape pins are not geographic** (1509–1511, 1544, 1554) → a phone utility user may interpret the scenic background as a real navigational map → browse cards and actual Maps actions should be primary; label scenic pins honestly wherever retained.
11. **A global story-card style makes trip facts white** (211) → bold check-in/check-out times disappear on the white Week card → explicitly scope dark bold text inside trip key-value rows. This was found in the integrated 375 px screenshots and fixed in `mobile-trip.css`.

## Fix

`mobile-trip.css` and `mobile-trip.js` implement points 1–6 without replacing data storage, original IDs, or original event handlers. They activate visually via `html.mobile-ui`. The native selector triggers the existing tab buttons so sharing, hashes and browser Back continue to use the site's current route handling. Dynamic table decoration disconnects its MutationObserver while adding presentation markup, preventing observer loops. Existing booking/task actions retain focus after their rows are rebuilt.

## Elevate

- Consistent fixed header, readable editorial section titles and one content margin across nine panels.
- Per-person booking cards show words for all three states and a count of completed/not-needed items from actual rendered state.
- A local-only person selector lets a traveller get straight to their own bookings without scrolling through everyone else.
- Full-height phone dialog, safe-area padding and one native scroll surface.
- Explicit local-versus-shared descriptions in the header, based on existing behaviour.
- Real table headers retained while presentation becomes readable labelled records.

## Stress test

JavaScript syntax check passes. An isolated browser run checked the core trip layout across all nine panels at 320, 390 and 768 px: the content scroll width equalled its viewport, and every visible button/input/select was at least 44 px high. The run intercepted Supabase requests and recorded zero attempted writes and zero page errors. A 1440 px check confirmed the original table presentation, compact hire-day labels and hidden mobile navigation. Bookings, Costs and Who’s in screenshots were visually reviewed. Final integration checks still apply after combining this layer with the parent shell. This source review does not claim a physical-phone gesture or performance test.

The integrated preview was then reviewed using CUA at 375 × 812: all nine sections had matching selected names and URL hashes, no horizontal scrolling, and no visible button/input/select below 44 px. Every section's first viewport was visually inspected. The person filter showed only the selected actual guest. Home → Bookings → browser Back returned Home. Section scroll memory was verified at 812 px → another section at 0 → back at 812 px. Browser warning/error logs were empty. No shared controls or fields were changed. Direct hash-entry Close initially left the page; the parent shell corrected its owned history state, and a fresh deep-link retest now closes into `#trip`. Final Week, Costs and Food screenshots confirmed restored dark bold times and both source-note banners.

Required final checks: longest guest name and note; 1 and 12 travellers; all booking states; no booking rows; real payment amounts; table overflow at 320 px; keyboard section switching; close/Back; 16 px field text; preserved desktop tables. Bright/missing-photo checks apply to the parent shell and place sheet.
