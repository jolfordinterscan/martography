# Photograph Inventory Audit

## Scope

This audit covers every photograph record and every base production image under
`public/images/`. It also reconciles the 56 photographic source files under
`source-photos/founding-collection/`, including Batch-02 and Batch-03. Source files remain
unchanged.

## Findings

- 52 photograph records exist: 22 published, 9 public and awaiting an artist title, and 21
  intentional drafts.
- 51 records have production images. The remaining record, Painted Bunting Portrait, is an
  intentional image placeholder because `birds-painted-bunting-portrait.jpg` is absent.
- Every one of the 51 production images has exactly one content record. There are no unregistered
  base production images.
- Every image-backed public wildlife record appears in the Gallery and on its generated Species
  page.
- Every image-backed record hidden from the public site has explicit `draft` status and
  `galleryVisible: false`.
- The Paul Marto portrait is supporting content rather than a wildlife archive record. It appears
  on Home and About.
- Nine source-only works uncovered by this audit now have optimized production assets and explicit
  draft records: White Ibis, hummingbird at a flower, yellow songbird, Bald Eagle portrait, black
  spider, songbird in rain, American Kestrel, Golden-crowned Kinglet, and Blue Jay in flight.
- Repeated source files and the alternate Red-shouldered Hawk composition are intentionally mapped
  to an existing record or retained as an unpublished alternate; they do not create duplicate
  photograph records.

## Complete content inventory

“Public — awaiting title” is a public workflow state. It uses the factual working title until an
artist title is supplied.

| Production filename | Status | Species / subject | Category | Website visibility |
| --- | --- | --- | --- | --- |
| `bobcat-hero.jpg` | Public — awaiting title | Bobcat | Mammals | Yes — Gallery + Species |
| `birds-painted-bunting-salvia.jpg` | Public — awaiting title | Painted Bunting | Birds | Yes — Gallery + Species |
| `birds-painted-bunting-portrait.jpg` | Public — awaiting title | Painted Bunting | Birds | Placeholder only — Species + Print; image absent |
| `birds-bunting-in-flight.jpg` | Published | Painted Bunting | Birds | Yes — Gallery + Species |
| `birds-california-quail.jpg` | Published | California Quail | Birds | Yes — Gallery + Species |
| `mammals-fox.jpg` | Published | Red Fox | Mammals | Yes — Gallery + Species |
| `behavior-roadrunner.jpg` | Published | Greater Roadrunner | Birds | Yes — Gallery + Species |
| `conservation-hummingbird-nest.jpg` | Published | Anna's Hummingbird | Birds | Yes — Gallery + Species |
| `about-paul-portrait.png` | Published | Paul Marto supporting portrait | Not wildlife | Yes — Home + About |
| `otter-carrying-fish.jpg` | Published | North American River Otter | Mammals | Yes — Gallery + Species |
| `painted-bunting-green-leaves.jpg` | Published | Painted Bunting | Birds | Yes — Gallery + Species |
| `wood-duck-flight.jpg` | Published | Wood Duck | Birds | Yes — Gallery + Species |
| `bald-eagle-pair.jpg` | Published | Bald Eagle | Birds | Yes — Gallery + Species |
| `otter-family-swimming.jpg` | Published | North American River Otter | Mammals | Yes — Gallery + Species |
| `green-anole-dewlap.jpg` | Published | Green Anole | Reptiles | Yes — Gallery + Species |
| `wood-duck-portrait.jpg` | Published | Wood Duck | Birds | Yes — Gallery + Species |
| `red-shouldered-hawk-feeding.jpg` | Published | Red-shouldered Hawk | Birds | Yes — Gallery + Species |
| `tarantula.jpg` | Published | Tarantula | Arachnids | Yes — Gallery + Species |
| `copperhead-tongue.jpg` | Draft | Copperhead | Reptiles | No — intentional Draft |
| `horse-fly-reflection.jpg` | Published | Horse Fly | Insects | Yes — Gallery + Species |
| `raccoon-tree-hollow.jpg` | Draft | Raccoon | Mammals | No — intentional Draft |
| `roadrunner-snake.jpg` | Draft | Greater Roadrunner | Birds | No — intentional Draft |
| `barred-owl-portrait.jpg` | Draft | Barred Owl | Birds | No — intentional Draft |
| `indigo-bunting-wings-raised.jpg` | Draft | Indigo Bunting | Birds | No — intentional Draft |
| `crow-portrait.jpg` | Draft | Crow | Birds | No — intentional Draft |
| `scissor-tailed-flycatcher-insect-toss.jpg` | Published | Scissor-tailed Flycatcher | Birds | Yes — Gallery + Species |
| `longhorn-beetle-flight.jpg` | Published | Cottonwood Borer | Insects | Yes — Gallery + Species |
| `blue-wasp-white-flowers.jpg` | Draft | Blue Wasp | Insects | No — intentional Draft |
| `roadrunner-portrait.jpg` | Draft | Greater Roadrunner | Birds | No — intentional Draft |
| `painted-buntings-interaction.jpg` | Published | Painted Bunting | Birds | Yes — Gallery + Species |
| `painted-bunting-sunflowers-flight.jpg` | Published | Painted Bunting | Birds | Yes — Gallery + Species |
| `painted-bunting-sunflower-bee.jpg` | Published | Painted Bunting | Birds | Yes — Gallery + Species |
| `downy-woodpecker.jpg` | Draft | Downy Woodpecker | Birds | No — intentional Draft |
| `sphinx-moth-hovering.jpg` | Draft | White-lined Sphinx Moth | Insects | No — intentional Draft |
| `dragonfly-head-on-flight.jpg` | Published | Common Green Darner | Insects | Yes — Gallery + Species |
| `otter-open-mouth.jpg` | Draft | North American River Otter | Mammals | No — intentional Draft |
| `otter-carrying-object.jpg` | Draft | North American River Otter | Mammals | No — intentional Draft |
| `coyote-standing.jpg` | Public — awaiting title | Coyote | Mammals | Yes — Gallery + Species |
| `coyote-portrait.jpg` | Public — awaiting title | Coyote | Mammals | Yes — Gallery + Species |
| `beaver-lodge.jpg` | Public — awaiting title | North American Beaver | Mammals | Yes — Gallery + Species |
| `bobcat-walking.jpg` | Public — awaiting title | Bobcat | Mammals | Yes — Gallery + Species |
| `bobcat-profile.jpg` | Public — awaiting title | Bobcat | Mammals | Yes — Gallery + Species |
| `deer-fawn.jpg` | Public — awaiting title | Deer | Mammals | Yes — Gallery + Species |
| `white-ibis-portrait.jpg` | Draft | White Ibis | Birds | No — intentional Draft |
| `hummingbird-at-flower.jpg` | Draft | Hummingbird | Birds | No — intentional Draft |
| `yellow-songbird-calling.jpg` | Draft | Yellow Songbird | Birds | No — intentional Draft |
| `bald-eagle-portrait.jpg` | Draft | Bald Eagle | Birds | No — intentional Draft |
| `black-spider-on-rocks.jpg` | Draft | Unknown Spider Species | Arachnids | No — intentional Draft |
| `songbird-in-rain-with-insect.jpg` | Draft | Unknown Songbird Species | Birds | No — intentional Draft |
| `american-kestrel-portrait.jpg` | Draft | American Kestrel | Birds | No — intentional Draft |
| `golden-crowned-kinglet.jpg` | Draft | Golden-crowned Kinglet | Birds | No — intentional Draft |
| `blue-jay-flight.jpg` | Draft | Blue Jay | Birds | No — intentional Draft |

## Requested wildlife verification

| Wildlife | Repository state | Public visibility | Filter / metadata finding |
| --- | --- | --- | --- |
| Bobcats | Three production images and records | All three visible in Mammals, Gallery, and Bobcat Species | No exclusion; artist titles pending |
| Coyotes | Two production images and records | Both visible in Mammals, Gallery, and Coyote Species | No exclusion; artist titles pending |
| Beavers | One production image and record | Visible in Mammals, Gallery, and North American Beaver Species | No exclusion; artist title pending |
| Spiders | Tarantula plus one black-spider source | Tarantula is public; black spider is intentional Draft | Exact black-spider species is unresolved |
| Insects | Horse Fly, Cottonwood Borer, Blue Wasp, Sphinx Moth, Common Green Darner | Horse Fly, Cottonwood Borer, and Darner public; Wasp and Moth intentional Draft | Exact Blue Wasp species is unresolved |

## Source-file reconciliation

- Batch-02's 24 files retain the dispositions in `BATCH_02_EDITORIAL_REPORT.md`: 19 content
  records, four exact matches to existing records, and one alternate hawk composition.
- Batch-03's six files now resolve to one public Bobcat record and five intentional draft records.
- The founding-collection root contains archival duplicates of ten Batch-02 sources, two copies of
  the selected Bobcat-in-grass source, the six mammal sources imported in v1.1, existing founding
  works, and the four newly registered draft bird works.
- No source file was renamed, moved, optimized in place, or deleted.

## Metadata still requiring editorial confirmation

- Exact species: black spider, yellow songbird, rain-perched songbird, hummingbird, Blue Wasp,
  Crow, and Deer.
- Artist titles remain pending for the nine public `awaiting-title` records.
- `birds-painted-bunting-portrait.jpg` is not present in either the production assets or the source
  archive. Its content record remains a visible placeholder linked from Species and Prints.
