# APEX ARENA — Developer Guide

## Project overview

APEX ARENA is a static HTML5, CSS and Vanilla JavaScript court-booking website. It contains eight pages and uses browser localStorage for booking records and contact-form messages. It does not use a server, database, payment gateway or email service.

## Project structure

- `index.html` — homepage
- `badminton.html` — badminton court details
- `basketball.html` — basketball court details
- `volleyball.html` — volleyball court details
- `futsal.html` — futsal court details
- `about_us.html` — facility information, opening hours, events and rules
- `booking.html` — court selection and booking flow
- `contact_us.html` — contact form and FAQs
- `Assets/images/` — logos, hero photographs and court images
- `Assets/styles/` — shared and page-specific stylesheets
- `Assets/scripts/` — shared and page-specific JavaScript
- `PAGE_01_HOMEPAGE.md` through `PAGE_08_CONTACT_US.md` — page guides
- `AUDIT_AND_CHANGELOG.md` — project review and change record

## Shared components

The shared component code is in `Assets/scripts/components.js`. Each page contains `#nav-box` and `#footer-box` placeholders. When the page finishes loading, the script replaces those placeholders with the shared header and footer. Do not copy the navigation or footer markup into individual HTML pages.

### Navigation

The shared `navbarHTML` template creates the `.header`, `.nav`, `.logo`, `.links`, `.drop`, `.drop-list`, `.drop-link`, `.menu-btn` and `.nav-book` elements. Navigation links point to the eight HTML pages. The script compares the current filename with each link and adds `.active` to the matching link. On sport pages, it also marks the Sports Courts dropdown link as active.

### Mobile navigation

The `#menu-btn` button opens and closes the `#menu` list by adding or removing `.open`. The script updates `aria-expanded` and sets `aria-controls`. On small screens, the Sports Courts dropdown link toggles `.open-drop`. The mobile menu closes after a normal navigation link is selected.

The responsive navigation styles are in `Assets/styles/themes.css` and `Assets/styles/apex-refresh.css`. If you change `#menu` or `#menu-btn`, update the selectors and accessibility attributes in `components.js` too.

### Footer

The shared `footerHTML` template creates the footer columns, brand block, quick links, sport links, location and opening-hours text. Edit the shared template in `components.js` when the footer needs to change across the whole site.

### Shared FAQ accordion

The shared FAQ behavior is also in `components.js`. FAQ items use `.qa`, `.ask` and `.answer`. Clicking an `.ask` button opens its answer, closes other answers, updates `aria-expanded`, and sets the answer's `maxHeight`. The shared behavior is used by the homepage and Contact Us page. Keep these class names consistent in both pages.

### Shared styles and buttons

- `Assets/styles/themes.css` contains the base reset, core theme variables, typography defaults, shared header/footer, and base button styles.
- `Assets/styles/apex-refresh.css` applies the Forest + Warm Ivory visual theme and shared refinements across pages.
- Shared button classes include `.btn-main`, `.btn-line`, `.btn-primary`, `.nav-book`, `.contact-book` and `.contact-submit`. Page styles may set their layout or size, while the shared refresh stylesheet supplies common theme treatments.
- The main palette is Deep Forest `#14251E`, Forest Green `#263B30`, Warm Ivory `#F2EFE6`, Muted Sage `#A6B88A` and Warm Gold `#D5A96C`.

Load stylesheets in the order already used by each HTML page. Later stylesheets can override earlier ones.

## JavaScript files

| File | Responsibility |
|---|---|
| `components.js` | Inserts navigation and footer, sets active links, controls mobile navigation and shared FAQ accordions |
| `arena-data.js` | Shared sport information, opening hours, booking storage, date/time helpers and slot status |
| `index.js` | Hides the homepage loading screen after the page loads |
| `sport.js` | Builds today's court availability and controls the sport-page photo lightbox |
| `inner.js` | Provides the toast message and scroll-reveal behavior for inner pages |
| `aboutus.js` | Displays the opening status and animates About page statistics |
| `booking.js` | Handles sport/court/hour selection, validation, booking creation, booking pass and cancellation |
| `contact.js` | Validates the contact form and stores messages in localStorage |

## Booking and localStorage

The booking system is browser-based. `Assets/scripts/arena-data.js` defines `OPEN_HOUR`, `CLOSE_HOUR`, `STORE_KEY` and the `SPORTS` list. The current daily booking window is 7:00 AM to 10:00 PM. The `SPORTS` array contains each sport's slug, display name, hourly price, number of courts, player limit and image.

Booking records are stored under the localStorage key `apex-arena-bookings`. `readBookings()` safely reads the array and `writeBookings()` safely saves it. `slotState()` returns `past`, `taken` or `free`. The slot status includes generated sample occupancy and saved bookings. This sample occupancy is local demonstration data, not a live booking feed shared between visitors or devices.

`booking.js` manages the current selection in the `pick` object. It limits a booking to three consecutive hours, validates the visitor's name, Pakistani mobile number, email and player count, then saves a booking record. A successful booking displays a pass and remains in that browser's localStorage. The user can print the pass or cancel a saved booking from the same browser.

The contact form uses a separate localStorage key, `apex-arena-messages`. It displays a success message after saving locally. It does not send an email.

## Safe modification guide

1. Identify the page and section before editing.
2. Keep shared navigation, footer and FAQ behavior in `components.js`.
3. Keep common theme changes in `themes.css` or `apex-refresh.css`.
4. Keep sport-page layout changes in `sports.css`, because all four sport pages share it.
5. Keep booking layout changes in `booking.css` and booking logic in `booking.js`.
6. Keep the sport catalogue and shared booking helpers in `arena-data.js`.
7. If an HTML ID or class used by JavaScript changes, update the matching selector in the relevant script.
8. If a class changes, search all HTML, CSS, JavaScript and Markdown guides for the old name.
9. Preserve stylesheet and script load order.
10. Test the affected page and at least one other page that uses the same shared component or stylesheet.

## Code conventions

Use semantic HTML5 elements, clear class names, short functions and direct event listeners. Prefer a dedicated class for a special visual treatment rather than adding a long selector chain. Keep CSS properties on separate lines and group responsive rules near the end of each stylesheet. Code files should not contain comments; use the Markdown guides for explanations.

## Page guides

- [Homepage](PAGE_01_HOMEPAGE.md)
- [Badminton](PAGE_02_BADMINTON.md)
- [Basketball](PAGE_03_BASKETBALL.md)
- [Futsal](PAGE_04_FUTSAL.md)
- [Volleyball](PAGE_05_VOLLEYBALL.md)
- [About Us](PAGE_06_ABOUT_US.md)
- [Booking](PAGE_07_BOOKING.md)
- [Contact Us](PAGE_08_CONTACT_US.md)
