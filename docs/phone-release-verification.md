# Phone release verification · 14 October 2026

Final local build inspected in the browser. `index.html` SHA-256: `5744EFA2AA820EAEDB7A790D208FA48D61614D5CCCD770D988190B85A9ECD741` (before Git line-ending normalisation). This is expert inspection and task walkthrough evidence, not an observed human usability study.

The acceptance basis is [phone-experience-strategy.md](phone-experience-strategy.md), the assessed [experience methods](experience-methods.md), and the five [neutral task scenarios](experience-walkthrough-scenarios.md). No live shared bookings, guests or group tasks were changed. Packing tests were undone; stress fixtures stubbed application fetches and used disposable data.

## Audit

1. Overlapping Home/Trip entrances → first-time visitors had to learn the site's structure before acting → one Trip plan overview, with destination/date/base before preparation links.
2. Ordinary details concealed the bottom navigation → bookings, advice and venue browsing required repeated close steps → embed ordinary pages within a persistent three-destination shell.
3. Generic Back controls and photo-labelled buttons concealed their outcomes → people could land in an unexpected parent or prose screen → named parents and one-tap full-screen photos.
4. Saved occupied a permanent destination → an empty collection added a choice and a detour → All / Saved within Places, with visible categories.
5. Interrupted tasks lost their screen on reload → saved ticks alone did not provide continuity → validated session memory for tabs, criteria, reading positions and expanded details.
6. Historical return labels could disagree with a later list → Back to Saved could open All → store directory criteria with each route and preserve scroll separately for each criteria set.
7. A fresh place link inherited an unrelated Saved parent → an unsaved venue could claim it came from favourites → direct links return to an unfiltered Places list; contextual links retain their actual origin.
8. Empty bookings claimed everyone was sorted → an empty tracker looked complete → show the empty-state instructions and hide that summary until guests exist.
9. Desktop density obscured bookings on phones → small cells required sideways reading → retain original handlers while presenting labelled person cards and a locally remembered person filter.

## Fix

Trip plan, Places and Guide have stable meanings. All nine organiser sections, seven topics and 25 places remain available. Ordinary content retains the bottom bar; photographs alone use an overlay. A contextual school or venue keeps its originating tab and names the chapter it returns to. Direct links use canonical parents.

Session storage preserves navigation within the current browser tab. Local packing, favourite places and booking-person choice survive reload independently. Nothing new writes to the shared group store. Existing price caveats and reference notices remain; this was not a travel-price refresh.

Observed walkthroughs:

| Journey | Result |
| --- | --- |
| Trip plan → apartment → Photos → close → Trip plan | Photos open directly; close restores the chapter and its Trip plan parent. |
| Bookings → Kat → Places → reload → Trip plan | Resumes Bookings with Kat selected. Focus returns to the content's Back control. |
| Places → Food → restaurant → another tab → Places → Back | Resumes the restaurant, then its Food-filtered list and previous scroll position. |
| Saved → venue → active Places tab → All → browser Back → named Back | Returns to Saved, with matching label and criteria. |
| Guide → Lessons & passes → ESF → browser Back | Retains Guide ownership and the named chapter parent. |
| Packing, scrolled down → Places → reload → Trip plan | Resumes Packing at 1,624 px. A further reload retains that position. |
| Packing tick → reload | Tick persists; test tick then removed. |
| Save → Unsave → Undo → reload | Favourite state and Undo work; saved state survives reload. |
| Fresh place, guide, organiser and photo links | Safe in-site parents. A fresh place/photo link returns to All places even after a previous Saved visit. |
| All nine sections and seven topics at 320 px | Reachable; ordinary pages have no native modal; dock remains available and no horizontal overflow observed. |
| Desktop scenic exit and planner re-entry | Original scenic experience remains accessible. |

Static verification parsed ten scripts, confirmed source layers embedded once, and matched the original place data and shared-store code to the base commit. The final whitespace check passed. No browser errors were recorded in the inspected final fixture session.

## Elevate

- The real Val Thorens image and booked base establish the trip before tasks; preparation, the week and reference material have separate groups.
- Sticky contextual headers and reachable venue actions support long reading. The bottom bar has three equal destinations with explicit labels.
- Every guide card now opens a matching literal heading. All types is distinct from the All places collection switch.
- Phone controls inspected in the directory, navigation and packing were at least 44 px. Focus restoration excludes the global bar; save feedback offers Undo.
- Place cards share photo treatment and deliberate fallbacks. Wide-screen galleries now fill their content column.
- Native scrolling remains the phone default. No new calculator or quantity control was added; original shared controls retain their behaviour.

## Stress test

The required rows were rerun against the final generated sources after the last change.

| Case | Final result |
| --- | --- |
| White and noisy photographs | Pass at 320 px: save/photo/action controls remain readable; actions stay above the dock. |
| Names at least twice normal length | Pass at 320 px: card and detail titles wrap, with no horizontal overflow or displaced action bar. |
| 1 and 12 travellers; additional 0 case | Pass: correct singular/plural counts and cards. Zero shows the empty state and hides the misleading completion summary; nonzero restores it. |
| Missing image and optional metadata | Pass: ESF shows the deliberate school fallback; omitted badge leaves no empty badge and known region remains available. |
| 320 px and 1440 px | Pass for inspected overview, directory/detail and organiser layouts. Final gallery/actions fit both; 375 px task journeys and 768 px overview were also inspected during the pass. |

Not tested: a real first-time participant, physical Safari, real phone keyboard/thumb/gesture behaviour, or changing the operating-system reduced-motion setting. The next human check should use the neutral task prompts without teaching the navigation first. These browser checks establish working routes and layout resilience, not universal accessibility or unaided usability.
