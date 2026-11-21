# About Us — Page Developer Guide (`about_us.html`)

## Files used

- HTML: `about_us.html`
- CSS, in load order: `Assets/styles/themes.css`, `Assets/styles/apex-refresh.css`, `Assets/styles/inner.css`, `Assets/styles/aboutus.css`
- JavaScript, in load order: `Assets/scripts/components.js`, `Assets/scripts/arena-data.js`, `Assets/scripts/inner.js`, `Assets/scripts/aboutus.js`
- Shared navigation, footer and FAQ behavior: `Assets/scripts/components.js` (see `TEAM_DEVELOPER_GUIDE.md`).

## Sections and how to edit them

### 1. Page introduction

`.page-top`, `.page-inner`, `.crumbs`, `.page-title`, `.page-title-em`, `.page-text`, `.page-lines`, `.page-circle` introduce the facility. Shared page-top styling is in `inner.css`; the Forest + Warm Ivory layer is in `apex-refresh.css`.

### 2. About the facility

`.block`, `.two-col`, `.panel`, `.kicker`, `.block-title`, `.block-text` and `.btn-main` explain the facility and provide a booking/contact link. The layout is shared in `inner.css`; About-specific refinements are in `aboutus.css`.

### 3. Statistics

`.about-stats`, `.about-stats-inner`, `.about-stat`, `.about-num` and `.about-label` display animated facility figures. `aboutus.js` watches elements with `data-count` and counts them up when visible. It uses `data-plus="yes"` for values that finish with a plus sign.

### 4. Facilities and opening hours

`.block`, `.two-col`, `.table-box`, `.hours-table`, `.th-head`, `.th-row`, `.td-cell`, `.tick-row`, `.tick-img`, `.tick-text` and `#open-status` display facilities, hours and the current opening status. `aboutus.js` calls `openStatus()` from `arena-data.js` and updates `#open-status`.

### 5. Events

`.band`, `.band-inner`, `.event-grid`, `.event`, `.event-date`, `.event-day`, `.event-month`, `.event-text`, `.item-title` and `.item-text` display event cards. The content is static HTML.

### 6. Rules and location

`#rules.block`, `.two-col`, `.tick-row`, `.map-box`, `.map-circle`, `.map-line`, `.map-pin` and `.map-label` present arena rules and the location illustration. Update the text and map illustration in HTML; styling is in `aboutus.css`.

## JavaScript behavior

`aboutus.js` updates `#open-status` using `openStatus()` from `arena-data.js`. It observes `[data-count]` items and animates their values when they enter view. `inner.js` adds the shared reveal behavior to `[data-reveal]` items and provides `toast()` for pages that need temporary messages.

## Safe changes

Keep shared page-top and content primitives in `inner.css`. Keep About-only table, event, statistics and map styles in `aboutus.css`. When editing an animated statistic, keep its `data-count` value numeric and use `data-plus="yes"` only when the displayed number should end with a plus sign.

## Shared components

Navigation, mobile navigation, footer, shared styles and FAQ accordion are documented once in `TEAM_DEVELOPER_GUIDE.md`. Use that guide when changing shared behavior.
