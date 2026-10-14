# Phone navigation audit · second pass

14 October 2026. Trigger: the phone experience still feels unintuitive, requires too much back-and-forth and loses the user's sense of location. This is the pre-change audit and acceptance contract. Implemented behaviour and recorded checks are in phone-release-verification.md.

## Audit

1. **Home and Trip overlap.** Home mixes a large destination introduction, group task, organiser shortcuts, seven guide topics and featured places. Trip contains the actual organiser. Users must remember which entrance they used rather than choose a clear destination.
2. **Navigation disappears inside content.** The full-screen place sheet and native trip dialog cover the bottom bar. A traveller reading bookings must close the dialog before finding a restaurant or the guide.
3. **Saved occupies a permanent tab despite being a subset of Places.** Its empty state sends users straight back to Places. The feature adds a top-level choice without adding another content area.
4. **The selected tab does not describe the current page.** Guide pages mark Home selected; organiser routes opened from Home or Guide preserve that underlying screen identity.
5. **Back labels and destinations disagree.** The guide's “The guide” control navigates to Home. Place and organiser closes depend on global history depth rather than a visibly named parent.
6. **“Our stay” has three meanings.** It opens a guide topic on Home, names a Places category and opens Google Maps from Trip. The labels conceal the difference between reading, filtering and leaving the site.
7. **Photo actions open prose.** “Open gallery” and “All 17 photos” route into a place-details sheet. Another tap is needed to see the full-screen photograph.
8. **Guide and place detail repeat information without explaining the boundary.** A guide topic can lead to similar venue copy in another screen, making it unclear whether the user moved to another section or deeper into the same one.
9. **Organiser navigation is duplicated.** The nine-card Trip index leads into a second navigation system: a full-screen dialog with a section selector. The original tab layout has been made smaller, but the task flow remains indirect.
10. **Unlabelled cross-area journeys accumulate history.** A guide can open a venue, a venue can open photos, and organiser shortcuts can originate elsewhere. A generic close or browser-history fallback does not tell users where they will land.

## Fix intent

Use exactly three persistent tabs, in this order:

| Tab | Owns | Landing content |
|---|---|---|
| **Trip plan** | To do, Bookings, The week, Packing, Costs, Food plan, Who’s in, Good to know and Sources | Destination, dates, booked base and travel context first; organiser grouped as Get ready, Our week and Reference. Next group job is subordinate. |
| **Places** | All 25 existing place records, search, category/area filters and personal favourites | Search and a visible All / Saved switch. Saved remains local to the device. |
| **Guide** | The seven existing editorial topics | A compact trip introduction and a complete topic index: Our apartment; Travel & arrival; Lessons & passes; Après & food; On the mountain; Beyond Val Thorens; Gear & packing. |

Remove Home as a separate destination. Chapter, place and organiser content must remain ordinary pages inside the same shell. Keep all three tabs visible and reachable. Reserve an overlay for full-screen photos; its close returns to the exact originating page.

Use precise action labels: **Our apartment** for its information, **Directions to apartment** for Maps, **Place details** for a venue page and **Photos** for a gallery. A photo-labelled action must open photographs directly. Do not rewrite or silently reconcile existing travel facts during this navigation change.

### Canonical ownership and return behaviour

| Page or action | Selected tab | Return rule |
|---|---|---|
| Organiser index or any organiser section | Trip plan | Section Back names and returns to Trip plan; a cross-area entry can retain an explicit, labelled origin. |
| Place directory, Saved filter or a place detail | Places | Preserve the originating directory's search, filters and scroll position. A guide-origin detail names that origin, e.g. “Back to Lessons & passes.” |
| Guide index or chapter | Guide | Chapter Back returns to the guide index at its retained position. |
| Full-screen photo | Underlying page retains its owner | Close and browser Back dismiss only the photo first; retain the place/chapter and reading position. |
| External Maps, official site, telephone or Tricount action | Current owner remains selected | Label the action's actual purpose. Returning from the external action must retain the page. |

These are canonical destinations for direct links and root navigation. For a contextual link, preserve the originating tab and an explicit, named return route instead of automatically switching tabs. The selected destination represents the current navigation stack, not merely the data type of the content. This follows the Apple navigation reference reviewed after the initial audit. A fresh deep link needs a safe in-site parent. Switching tabs must not require closing the current page first; it must not leave a hidden overlay or an inert shell behind.

## Acceptance task paths

These are required end-to-end checks, not recorded passes. Tap targets count from a different tab or ordinary detail page, unless the row states otherwise. A native person selection counts as one selector interaction rather than its operating-system-specific taps.

| Task | Required path | Target |
|---|---|---:|
| Find bookings | Trip plan → Bookings | 2 taps |
| Find one traveller's bookings | Trip plan → Bookings → person selector | 3 interactions |
| Read the daily schedule | Trip plan → The week | 2 taps |
| Open packing | Trip plan → Packing | 2 taps |
| Find a restaurant | Places → Food → restaurant | 3 taps |
| Read lesson guidance | Guide → Lessons & passes | 2 taps |
| Inspect apartment photos from its guide | Photos | 1 tap |
| Reopen a favourite | Places → Saved → place | 3 taps |
| Move from bookings to restaurant browsing | Places → Food | 2 taps, without a close step |
| Return from a venue to its filtered list | Labelled Back | 1 tap |
| Move between two guide topics | Back to Guide → another topic | 2 taps |
| Leave a photo | Close or browser Back | 1 action; underlying page remains open |

### End-to-end release checks

- Start at Trip plan; open Bookings; filter to one actual traveller; switch directly to Places; browse Food; open a place; save it; open Photos; go Back; return to the filtered list. Selected tabs, Back labels and retained state must remain correct at every step.
- Start in Guide; open Lessons & passes; open a school; inspect Photos; return to the school; follow the labelled return to Lessons & passes; return to the guide index. No generic Home detour and no unexpected chapter reset.
- Enter a place, guide chapter and organiser section through fresh direct links. Each page must select its owner and offer a safe in-site return without relying on unrelated browser history.
- Navigate to all nine organiser sections and all seven guide topics. Confirm every original action remains reachable, including lift-pass booking, apartment photos, source links and Maps.
- Switch all three tabs while reading a long page. Confirm bottom navigation stays visible, the route matches the visible page and no closed dialog or sheet blocks input.
- Repeat the main journeys at 320 px and 375 px, with reduced motion and keyboard navigation. Back/focus restoration must work after list rendering, saving and section changes.
- Verify the desktop scenic entry still works and the shared booking/task/guest data handlers remain unchanged. Use isolated fixtures for mutations; do not toggle real shared records to test navigation.

Physical-phone validation remains necessary for Safari keyboard behaviour, real thumb reach and perceived navigation clarity. Layout or syntax checks alone do not establish that the task flows above are intuitive.
