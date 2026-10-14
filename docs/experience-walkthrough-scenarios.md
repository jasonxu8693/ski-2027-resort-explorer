# Ski 2027 · experience walkthrough scenarios

Prepared from `phone-experience-strategy.md` and `experience-methods.md`. These are neutral task prompts and inspection criteria. They are not participant findings, a completed usability study, or proof that the interface is intuitive.

Use the prompts without exposing the expected route or destination labels. Setup and success observations are for the reviewer. In the immediate review, report **expert cognitive walkthrough** evidence. Actual first-time group testing and physical-phone validation remain pending.

## 1. Understand the trip from a newly received link

**Prompt:** “A friend has just sent you this trip link. Work out when and where you are going, where you will stay, and what appears to be arranged versus still needing attention.”

**Starting context:** First visit, with no familiarity with earlier versions. Review the ordinary landing page first. Repeat the same goal from a shared child link as a separate entry variant, without manufacturing prior browser history.

**Success observations:** The visitor can identify the dates, destination and booked base from visible information; they can distinguish confirmed arrangements, estimates and outstanding tasks. The page makes clear which trip a shared link belongs to, what content it opens, and how to reach its parent. A prominent overdue task does not prevent basic orientation. Closing or returning from the child page stays within the trip.

**Watch for:** A destination chosen only because the reviewer already knows the site; uncertainty over whether the content is a trip, resort catalogue or old comparison; a return that depends on previous history; a departure from the website when a parent is expected.

## 2. Resume personal arrangements after looking up hire information

**Prompt:** “You checked your arrangements earlier. Find what you still need to arrange, look up the information about collecting your hire equipment, then carry on reviewing your arrangements.”

**Starting context:** Return visit with a real guest previously selected in the local booking filter and a meaningful reading position. Shared booking records stay untouched.

**Success observations:** The visitor can distinguish that person's status from group-wide totals. The previously selected person remains selected, and the filter's local scope is visible. Looking up the hire information and returning preserves the booking context and reading position. Ordinary navigation does not require dismissing a modal or reopening a concealed menu. The visitor can recover using a named parent, the main destinations, or browser Back without losing their task.

**Watch for:** A reset to everyone, a return to the wrong destination, a misleading selected destination, or an action that appears to change a booking when it merely filters the view.

## 3. Choose a lunch option and return to the other possibilities

**Prompt:** “Find somewhere you might want lunch. Look at its photographs, keep it for later, and find how you would get there. Then return to the other options you were considering.”

**Starting context:** A first browse, or a return visit without a specific venue already selected. Use only the site's actual venue information. Any favourite change is device-local and its starting state should be restored after the inspection.

**Success observations:** The venue directory, categories and saved collection are discoverable for this goal. The place's existing notes support the choice. An action labelled Photos opens photographs directly; the visitor can leave photos without losing the place. Saving has a visible result and honest local scope. Directions explicitly leads to Maps. Returning restores the actual query, category, area, Saved selection and list position used during the task.

**Watch for:** A gallery button that opens an intermediate page; unexplained movement between main destinations; lost filters or list position; a save action that silently opens details; a map label that disguises an external destination.

## 4. Understand lessons, inspect a provider, and continue reading

**Prompt:** “You are unsure what lesson arrangement would suit the trip. Find the relevant explanation, inspect one of the providers mentioned, then return to the explanation where you left off.”

**Starting context:** First-time reader of the guidance. Use a chapter with an actual linked provider and read far enough for restoration to matter. Do not assume chapter numbers or a required reading order.

**Success observations:** The guidance is discoverable through its purpose and topic names. The visitor can distinguish explanatory advice from a provider or booking link. A related venue retains the correct chapter as its return context. Coming back restores the same chapter and reading position, while the permanent main navigation remains available throughout ordinary reading. No new prices or claims are inferred from the interface.

**Watch for:** Returning to the directory root, losing the paragraph, a guide link labelled as photographs, or being forced through unrelated chapters to reach the explanation.

## 5. Continue packing after an interruption

**Prompt:** “You are getting ready to leave. Show how you would keep track of what you have packed. Briefly check somewhere you might want to eat, then return and carry on packing.”

**Starting context:** Return visit. Use an isolated test context for a device-local packing tick; do not change live shared tasks, guests or bookings. Include a reload or later revisit after the interruption to distinguish persistence from a still-open screen.

**Success observations:** The packing list is found from its purpose, and the visitor understands that ticks belong to this device. A tick produces clear feedback. The visitor can leave through the persistent main navigation and return through the named parent or destination, with checklist progress and reading position retained. The already-selected main destination gives a predictable route back to its overview.

**Watch for:** Confusing personal packing with shared group tasks; progress that disappears after a reload; a destination that sometimes returns to a child and sometimes to an overview without a consistent rule; a trapped reading surface.

## Recording each expert walkthrough

At each meaningful decision, record:

1. Is the next action plausible for the stated goal without prior site knowledge?
2. Can the relevant control be found?
3. Does its wording predict the result?
4. Does the resulting screen make location, progress and return clear?

Record the actual starting URL/state, first chosen destination, navigation actions/taps, scrolling, wrong turns, recovery, retained/lost state, and evidence for the result. Keep **pass / friction / failure / untested** separate. Do not invent a completion-time target or report an expert's chosen path as unaided participant behaviour.

An orientation failure remains a release issue even if every control is visible, clickable and correctly sized. Static screenshots, breakpoint checks and source audits complement these journeys; they do not replace them.
