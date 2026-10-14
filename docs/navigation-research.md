# Mobile navigation research and correction

14 October 2026. Primary-source guidance for the navigation correction. This document records the design decision and acceptance criteria; it does not assert that implementation or validation is complete.

## The problem to fix

Jason reported that the phone experience was still unintuitive, involved too much back-and-forth, and had a poorly considered bottom bar. The previous pass improved layout without establishing a clear navigation model. Guide chapters lived under Home, venue details opened a full-screen overlay, and practical information opened a separate organiser with a section dropdown. Ordinary browsing repeatedly removed the navigation landmarks.

## Primary guidance

| Source | Relevant guidance | Application here |
| --- | --- | --- |
| [Apple Human Interface Guidelines: Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars?changes=l_1__4&language=objc), updated June 2026 | Tabs represent top-level destinations, retain each section's navigation state, and remain visible during normal navigation. Labels make destinations understandable. | Three stable destinations: **Trip plan / Places / Guide**. Keep the same bar on ordinary child pages and restore context when switching sections. Saved is a collection within Places. |
| [Apple Human Interface Guidelines: Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars?changes=la), accessed 14 October 2026 | Back retraces a hierarchy; Close dismisses a modal. Navigation controls should look and behave consistently. | Use one child-page header pattern with the current title and a contextual return. A place opened from a chapter returns to that chapter; a practical section returns to Trip plan. Reserve Close for genuinely temporary surfaces. |
| [Apple Human Interface Guidelines: Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets?changes=_1), updated March 2026 | Sheets serve scoped tasks. Prolonged flows need other structures; closing one sheet should not unexpectedly expose another sheet. | Practical panels and venue reading become ordinary pages within the phone shell. Use modal presentation for photos and short actions where it has a clear purpose. |

The three-destination structure and visual specifications below are design recommendations for this site, inferred from the guidance rather than prescribed by Apple.

## Agreed interaction model

- **Trip plan:** next group job, week overview, bookings, to do, packing, people, costs and reference information. Group these links visibly; avoid a generic Home hub plus a second organiser hub.
- **Places:** searchable directory, area/category filters and an All / Saved collection control. Place details retain the originating list, search, filters and reading position.
- **Guide:** the seven guide topics, chapter details and related places. The Guide root is a real destination, not a hidden subsection of Home.
- Each route records its section and parent. A direct link gets a deterministic parent when no entry context exists. Browser Back/Forward and on-page return controls must both work.
- Each section retains its current child route and scroll position. Switching sections must not discard the task in progress. Viewport checks alone cannot establish this.

Use a solid, full-width bottom bar with three equal targets, persistent labels, legible inactive states and one quiet selected-state treatment. Keep it in the same place on ordinary detail pages. Use literal destination names in headings; expressive copy belongs beneath them. Approximately 60–64 px plus the device safe area is the proposed bar height, with 22–24 px icons and 12 px labels. Animation is secondary to immediate, predictable navigation.

## Required task-path checks

| Journey | Evidence required before claiming a pass |
| --- | --- |
| Trip plan → Bookings → Places → Trip plan | Return to Bookings with its person filter and reading position retained. |
| Places → filter/search → venue → photos → return | Close photos to the venue, then return to the same filtered list and position. |
| Guide → chapter → related place → return | Return to the originating chapter and its reading position; the section indicator remains meaningful throughout. |
| Any ordinary child page → another main destination | Main navigation is visible, reachable and has an unambiguous active state. |
| Direct link → contextual return; then browser Back/Forward | Safe parent without a navigation loop, blank view or unintended exit. |
| Saved → place → unsave → return | Saved state and empty state remain coherent; focus and return context remain usable. |

Run these paths through real controls at phone widths, alongside overflow, contrast, touch-target and content stress checks. Report browser evidence separately from physical-phone validation. Do not alter live shared bookings, guests or group tasks during tests; use isolated fixtures or block shared writes.
