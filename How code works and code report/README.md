# APEX ARENA — Project V7

APEX ARENA is an eight-page sports court booking website built with HTML5, CSS and Vanilla JavaScript.

## Pages

1. `index.html` — Homepage
2. `badminton.html` — Badminton
3. `basketball.html` — Basketball
4. `volleyball.html` — Volleyball
5. `futsal.html` — Futsal
6. `about_us.html` — About Us
7. `booking.html` — Booking
8. `contact_us.html` — Contact Us

## Run the website

Open `index.html` in a browser. For a local development server, run this command from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Project folders

- `Assets/images/` contains the logo and court photography.
- `Assets/styles/` contains the shared and page-specific stylesheets.
- `Assets/scripts/` contains the shared and page-specific Vanilla JavaScript files.
- `PAGE_01_HOMEPAGE.md` through `PAGE_08_CONTACT_US.md` explain each page.
- `TEAM_DEVELOPER_GUIDE.md` explains shared components, the booking data and the project structure.
- `AUDIT_AND_CHANGELOG.md` records cleanup changes and test results.

## Booking behavior

Bookings are saved in the visitor's browser using localStorage under `apex-arena-bookings`. The contact form saves messages locally under `apex-arena-messages`. These records are not sent to a server and are not shared between browsers or devices. Payment is not processed by this website.

## Design theme

- Deep Forest: `#14251E`
- Forest Green: `#263B30`
- Warm Ivory: `#F2EFE6`
- Muted Sage: `#A6B88A`
- Warm Gold: `#D5A96C`

See `TEAM_DEVELOPER_GUIDE.md` before changing shared navigation, footer, FAQ behavior or booking data.
