# Homepage — Page Developer Guide (`index.html`)

## Files used

- HTML: `index.html`
- CSS, in load order: `Assets/styles/themes.css`, `Assets/styles/apex-refresh.css`, `Assets/styles/index.css`
- JavaScript, in load order: `Assets/scripts/components.js`, `Assets/scripts/index.js`
- Shared navigation, footer and FAQ behavior: `Assets/scripts/components.js` (see `TEAM_DEVELOPER_GUIDE.md`).

## Sections and how to edit them

### 1. Hero

`.hero`, `.hero-inner`, `.hero-left`, `.hero-title`, `.hero-accent`, `.hero-dim`, `.hero-lines`, `.hero-circle`, `.hero-line`, `.hero-p`, `.hero-btns`, `.hero-proof`, `.tag` and `.book-card` build the opening banner, calls to action and booking preview. The hero buttons link visitors to booking and sport information. Edit the hero copy and links in `index.html`; adjust its image, overlay and layout in `index.css` and shared theme refinements in `apex-refresh.css`.

### 2. Statistics

`.stats`, `.stats-inner` and `.stat` show the facility highlights. The section is static HTML; its layout is in `index.css`.

### 3. Sports cards

`#games.sports` contains `.head`, `.reviews-head`, `.cards`, `.card`, `.card-img`, `.card-body`, `.card-foot`, `.price` and `.card-btn`. The cards link to `badminton.html`, `basketball.html`, `futsal.html` and `volleyball.html`. Update card content and destinations in HTML; update the shared card layout in `index.css`.

### 4. Booking steps

`#how.how` uses `.steps`, `.step`, `.step-no`, `.step-img`, `.step-line` and `.how-text` to explain the booking process. It is informational and does not create a booking. Styles are in `index.css`.

### 5. Why choose the arena

`.why`, `.why-box`, `.why-intro`, `.why-photo`, `.perks`, `.perk`, `.perk-text` and `.why-text` form the feature section. Edit its text and image in HTML and its layout in `index.css`.

### 6. Reviews

`.reviews`, `.review-grid`, `.review`, `.avatar`, `.person`, `.person-name`, `.quote` and `.review-text` display the testimonial cards. These are static sample testimonials in the page markup.

### 7. FAQs

`.faq`, `.faq-head`, `.faq-list`, `.qa`, `.ask`, `.answer` and `.plus` form the FAQ accordion. The click behavior is shared and explained in `TEAM_DEVELOPER_GUIDE.md`; the homepage provides the questions and answers. Styles are in `index.css` and `apex-refresh.css`.

### 8. Closing call to action

`.cta`, `.cta-box`, `.cta-content` and `.cta-dim` create the final booking prompt. The booking link is in `index.html`; presentation is in `index.css`.

## JavaScript behavior

`index.js` waits for the page `load` event, then hides and removes `#loader`. The homepage has no booking data logic. Sport links and booking links navigate to the relevant pages.

## Safe changes

Keep homepage-only layout in `index.css`. If you change a shared header, footer or FAQ element, follow the shared-component guide. Verify all four sport-card destinations after editing.

## Shared components

Navigation, mobile navigation, footer, shared styles and FAQ accordion are documented once in `TEAM_DEVELOPER_GUIDE.md`. Use that guide when changing shared behavior.
