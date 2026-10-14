# Experience methods for the Ski 2027 phone site

Research checked against primary sources on 14 October 2026. This is a selected working method, not a catalogue of inspiration. No public skill was installed. Proposed user needs below are hypotheses drawn from the existing site and Jason's feedback; they are not findings from interviews with the group.

## The recommended approach

Use **task analysis → a small context map → first-use walkthrough → realistic prototype → observed task testing**. Apply visual design and implementation auditing after the journey is coherent. The immediate objective is that someone unfamiliar with the site can find what they need, understand where they are, act safely and return without restarting.

### 1. Define the jobs before deciding the screens

[NN/g's Task Analysis](https://www.nngroup.com/articles/task-analysis/) distinguishes a person's goal from the steps an interface makes them perform. It recommends gathering evidence, then examining sequence, hierarchy and complexity; simulations alone do not replace observing users.

For this site, start with these five concrete jobs. The destinations are design hypotheses to test, not instructions to give a test participant.

| User goal | Proposed entry | Done means | Return/interruption case |
| --- | --- | --- | --- |
| Know what I still need to arrange | Trip plan | The person can distinguish their own outstanding bookings/jobs from group status | Check a venue, then resume the same person's booking view |
| Find a lunch or après option suitable for the day | Places | They can inspect existing notes, save an option and reach its actual map/source link | Photos and an external map do not erase the list/filter context |
| Understand a ski topic before deciding what to do | Guide | They can find the relevant chapter and distinguish advice from linked places/actions | Opening a related venue returns to the same chapter position |
| Get ready to leave | Trip plan | They can find and use the packing list and understand its device-local scope | Leaving and returning retains checklist progress |
| Orient myself from a shared link | Any direct-linked page | They understand which trip/content they opened and how to explore its parent | Return is safe even without earlier browser history |

For each job, record the current steps, expected next action, entry/exit, information needed and avoidable detours. Reduce duplicate routes and ambiguous labels before adding features. Do not invent completion-time targets or claim observed success without evidence.

### 2. Map the travel context, not just the site pages

[NN/g's Journey Mapping 101](https://www.nngroup.com/articles/journey-mapping-101/) frames a journey around one actor and scenario, with phases, actions and opportunities. [GOV.UK's experience-mapping guide](https://www.gov.uk/service-manual/user-research/creating-an-experience-map) is useful when an experience spans time, people, locations and related services. It calls for evidence from users rather than an invented emotional narrative.

Keep a compact planning map for this trip:

| Phase | Question to validate | Existing information that should be reachable | Possible interruption to test |
| --- | --- | --- | --- |
| Before departure | What is sorted and what is mine to do? | Bookings, group jobs, personal tasks, packing | Open a supplier link and return to the outstanding item |
| Arrival and getting set up | Where are we going and what happens next? | Existing week/logistics, stay and ski-hire details | Switch from route directions to the relevant arrival information |
| Choosing a mountain-day activity | What fits today's plan and where is it? | Guide, place notes, saved places, existing map links | Read advice, inspect an option, compare with the week, then resume |

These questions are planning hypotheses, not fresh travel facts. Retain the site's source labels and uncertainty. Use separate views for organiser and traveller only if actual research shows materially different journeys; do not invent personas or claim measured emotions.

### 3. Use one clear navigation hierarchy

The most relevant app-design resource is [Apple's Explore navigation design for iOS](https://developer.apple.com/videos/play/wwdc2022/10001/). Its transcript uses a cycling/travel app to explain balanced destinations, the confusion caused by duplicate Home functionality, contextual returns, and the difference between normal detail navigation and focused modal work. It also discusses the Slopes ski app. The [current Tab bars guidance](https://developer.apple.com/design/human-interface-guidelines/tab-bars?changes=l_1__4&language=objc) reinforces stable destinations and preserved state.

Apply those principles to **Trip plan / Places / Guide**. Each has a clear purpose; ordinary children retain access to the main navigation. Saved belongs within Places. A contextual link can open related content without silently moving the user to a different main tab. Each page needs a literal title and a predictable return. A photograph can be a modal; routine movement between bookings, advice and venues should not require dismissing full-screen overlays repeatedly.

This adapts Apple's information-architecture principles to the web; it does not require copying iOS styling or gestures. Details and acceptance paths are in [navigation-research.md](navigation-research.md).

### 4. Run a focused first-use walkthrough before polishing

[NN/g's cognitive walkthrough](https://www.nngroup.com/articles/cognitive-walkthroughs/) is an expert inspection of learnability, not a user test. It is particularly relevant to unfamiliar or complex interactions; a full workshop for every ordinary button would be excessive.

Use it on this site's problem paths: direct-link arrival, guide-to-venue-to-guide, switching tabs mid-booking review, and photos followed by Back. At each meaningful step, check four things: whether the next step makes sense for the goal, whether its control is discoverable, whether its wording predicts the outcome, and whether the result clearly communicates progress. Record a failure when any answer is no. A button being visible and clickable is not enough.

For example, a new visitor trying to understand lessons should not have to infer that a generically named Home contains the Guide. Someone returning from a venue should recognise the chapter they left, not land at an unrelated directory root. These are the specific design questions the walkthrough should resolve.

### 5. Test realistic journeys with neutral goals

[GOV.UK's prototyping guidance](https://www.gov.uk/service-manual/design/making-prototypes) recommends trying alternatives before committing to production, with code prototypes useful for realistic interaction. Use the existing local build and isolated data to exercise navigation, phone scrolling, Back and external-link returns; another tooling stack is unnecessary.

[GOV.UK's moderated usability-testing guide](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing) recommends watching actual or likely users attempt believable goals without giving away the route. [NN/g's usability-testing introduction](https://www.nngroup.com/articles/usability-testing-101/) likewise separates facilitator, participant and tasks. The designer's successful scripted path is not evidence that someone else can discover it.

Suggested participant prompts:

- You have just been sent this trip link. Work out when the trip is and what you still need to arrange.
- Find somewhere you might want lunch, keep it for later and find how to get there. Then return to the other options you were considering.
- You want to understand the lesson options. Find the relevant advice, inspect a linked provider, then return to the advice.
- Check your recorded bookings, look up the hire shop, then continue reviewing your bookings.
- Start packing for the trip. Show how you would keep track of what you have already packed.

Record unaided completion, first chosen destination, hesitations/wrong turns, recovery, state retention and any facilitator help. Ask what they expected after an unclear interaction. Do not teach the tab labels in the task or rescue a navigation problem by explaining the interface. Keep live shared bookings, guests and tasks untouched; use isolated fixtures for actions that write.

The immediate release gate is that the implemented task paths work and the expert walkthrough has no unresolved orientation failures. Actual group testing and physical-phone validation remain distinct evidence; mark them pending until performed. If users choose a different destination than expected, reconsider the labels/grouping rather than adding onboarding instructions automatically.

## Two public agent skills worth using in the right role

The official source files were read, including Vercel's referenced rules. Third-party install counts and older mirrored copies were not used to assess them.

| Skill | What the inspected source actually does | Role on this site and limitation |
| --- | --- | --- |
| [Anthropic frontend-design — official SKILL.md](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md) | Plans an intentional visual direction, reviews it against the brief, builds and critiques. Current guidance includes useful structural semantics, restrained unsolicited motion, accessible basics and consistent plain-language actions. | Use after the task structure is settled to refine alpine identity, type, imagery and hierarchy. My assessment: it does not prescribe task research, first-use walkthroughs or observed usability sessions, so it cannot establish that a flow is intuitive. |
| [Vercel web-design-guidelines — official SKILL.md](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/web-design-guidelines/SKILL.md) and its [current rule source](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) | Reviews code against accessibility, focus, forms, motion, content, navigation/state, touch and layout rules, returning located findings. | Use for implementation QA: focus hidden by bars, semantic links/actions, deep links, readable empty states, reduced motion and gesture alternatives. My assessment: it audits components and state mechanics; it does not decide which destinations match this group's mental model. |

Chosen sequence: **NN/g task analysis and focused first-use inspection → Apple navigation principles → GOV.UK prototype/task testing → Anthropic visual craft → Vercel implementation audit → rerun the same journeys.** The existing `ui-redesign-pass` stress tests still apply. They complement this sequence rather than replacing the journey checks. No skill installation or modification was performed.
