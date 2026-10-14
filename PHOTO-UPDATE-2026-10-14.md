# Photo coverage update — 14 October 2026

Six previously empty galleries now have local photographs: the beginner area, Pionniers / Plein Sud, Sherpa des Balcons, La Folie Douce Méribel-Courchevel and both Carrefour branches. The Intersport gallery now shows Les Balcons instead of Caron.

All 25 place records have at least one photo. The seven added files total 803,678 bytes. Captions distinguish the contextual beginner lesson and Place Péclet square photos from close views of a named facility. Sources, credits and licence observations are recorded in `photo-sources-2026-10-14.json`; they do not establish an open licence for promotional images. The Pionniers image is credited to Florian Pépellin under CC BY-SA 4.0 and its resize/WebP conversion is declared.

Photo loading now recovers when the next image succeeds. The full-size viewer offers a readable unavailable state and retry. Card/guide error handlers no longer permanently hide the shared detail photo. Back, gallery arrows and full-size closing retain their existing behaviour.

## Verification before publication

- All 98 local WebP assets fully decode.
- Static checks parse all inline scripts, require local correctly cased photo paths for all 25 records, and preserve non-photo place data plus the complete shared-state implementation.
- Browser checks at 375 px verified all seven changed detail photographs, captions and full-size viewing. A 320 px detail check and the 1440 px desktop grocery grid had no horizontal overflow.
- An isolated local 404 fixture verified unavailable detail and full-size states, retry, movement to a valid photo, and closing back to details. The fixture redirects shared-store access locally and is not part of the published site.
- Actual-handler regression checks cover failed-to-valid images, empty galleries, lightbox fitting/retry, generic image ownership and recovered accessibility labels.
- No group records were changed during this update or its checks. Physical-phone testing was not performed.

The existing incorrect Caron files remain on disk for history but are no longer referenced by the Intersport Balcons record.
