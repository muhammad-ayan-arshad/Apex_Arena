# Basketball — Page Developer Guide (`basketball.html`)

## Files used

- HTML: `basketball.html`
- CSS, in load order: `Assets/styles/themes.css`, `Assets/styles/apex-refresh.css`, `Assets/styles/sports.css`
- JavaScript, in load order: `Assets/scripts/components.js`, `Assets/scripts/arena-data.js`, `Assets/scripts/sport.js`
- Shared navigation, footer and FAQ behavior: `Assets/scripts/components.js` (see `TEAM_DEVELOPER_GUIDE.md`).

## Sections and how to edit them

### 1. Sport hero

`.sports-hero`, `.sports-hero-photo`, `.sports-dim`, `.sport-inner`, `.crumbs`, `.sport-tag`, `.sport-dot`, `.sport-title`, `.sport-sub`, `.btn-row`, `.btn-main` and `.btn-line` build the hero. The page sets `body[data-sport]` to `basketball`; `sport.js` uses it to load the correct shared sport record. Update this page's image and copy in HTML.

### 2. Quick facts

`.facts`, `.facts-inner`, `.fact`, `.fact-num` and `.fact-label` display the basketball court facts. Values are static HTML; layout is shared in `sports.css`.

### 3. Court information and gallery

`.block`, `.sports-body`, `.sports-main`, `.sport-section`, `.spec-grid`, `.spec`, `.tick-row`, `.gallery`, `.shot-btn`, `.shot-cap` and `.side-card` build the details, rules, gallery and booking sidebar. The sidebar booking link passes `sport=basketball`. `sport.js` builds today's availability and controls the photo lightbox. Add gallery photos using `.shot-btn` elements with their own image and caption.

### 4. Related sports

`.band`, `.band-inner`, `.other-grid`, `.other-card`, `.other-img`, `.other-body`, `.other-name` and `.other-price` link to the other sport pages. Shared styles are in `sports.css`.

### 5. Closing booking prompt

`.sport-cta-box`, `.sport-cta-title` and `.sport-cta-text` form the final booking prompt. Update the link in the page HTML.

## JavaScript behavior

`arena-data.js` provides the sport data and shared slot-status functions. `sport.js` reads the page's `body[data-sport]`, builds the court availability display in `#today-list` when present, and creates the image lightbox for `.shot-btn` items. The photo viewer supports previous/next buttons, Escape to close, and clicking the dark backdrop to close.

## Safe changes

Keep the common sport template in `sports.css`, because all four sport pages load it. Change only the current page's text, images, facts and links in its HTML. If you add a gallery item, use the existing `.shot-btn` structure and include a meaningful `data-caption`. If you change a sport slug, update `body[data-sport]`, the `SPORTS` list in `arena-data.js` and any booking query links.

## Shared components

Navigation, mobile navigation, footer, shared styles and FAQ accordion are documented once in `TEAM_DEVELOPER_GUIDE.md`. Use that guide when changing shared behavior.
