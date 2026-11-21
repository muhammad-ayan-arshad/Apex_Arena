# Booking — Page Developer Guide (`booking.html`)

## Files used

- HTML: `booking.html`
- CSS, in load order: `Assets/styles/themes.css`, `Assets/styles/apex-refresh.css`, `Assets/styles/inner.css`, `Assets/styles/booking.css`
- JavaScript, in load order: `Assets/scripts/components.js`, `Assets/scripts/arena-data.js`, `Assets/scripts/inner.js`, `Assets/scripts/booking.js`
- Shared navigation, footer and FAQ behavior: `Assets/scripts/components.js` (see `TEAM_DEVELOPER_GUIDE.md`).

## Sections and how to edit them

### 1. Page introduction

`.page-top`, `.page-inner`, `.crumbs`, `.page-title`, `.page-title-em` and `.page-text` form the booking page introduction. Shared styles are in `inner.css` and `apex-refresh.css`.

### 2. Booking form and steps

`#book-form` is the main form. `.book-grid`, `.book-left`, `.step-box`, `.step-head`, `.step-num`, `.step-title-row` divide the flow into selection steps. `#sort` changes sport ordering. `#sport-pick` is filled by `drawSports()` using `.pick-card`, `.pick-img`, `.pick-body`, `.pick-name`, `.pick-price` and `.pick-meta`. `#court-pick` is filled by `drawCourts()` using `.court-btn`. `#slot-grid` is filled by `drawSlots()` using `.slot-btn`; disabled slots are unavailable, and selected slots use `.selected`.

### 3. Booking details and validation

The form fields use `#date`, `#name`, `#phone`, `#email`, `#players` and `#notes`. `.field`, `.label`, `.input`, `.hint` and `.error` style the form. `validate()` checks the selected sport, date, consecutive hours, name, Pakistani mobile number, email and player limit. `showError()` writes field messages and toggles `.bad` and `aria-invalid`.

### 4. Live summary

`#summary` contains `.summary`, `.summary-top`, `.summary-rows`, `.sum-row`, `.sum-label`, `.sum-value`, `.sum-total` and related total classes. `refreshSummary()` updates sport, court, date, time, hourly rate, number of hours and total price whenever a selection changes.

### 5. Booking confirmation

After validation, the submit handler rechecks slot availability, creates an ID with `newId()`, stores the booking through `writeBookings()` and calls `showPass()`. The pass is created inside `#form-area` and uses `.pass`, `.pass-title`, `.pass-text`, `.pass-id` and `.pass-rows`. The print button calls the browser print dialog. Payment is described as on-site; this project does not process payments.

### 6. Saved bookings

`#my-section` and `#my-list` show saved bookings. `drawMine()` builds `.my-card` entries and attaches a cancel handler to `.my-cancel`. Cancellation updates localStorage, refreshes the list and redraws the available slots.

## JavaScript behavior

`booking.js` uses `drawSports()`, `choose()`, `drawCourts()`, `drawSlots()` and `toggleHour()` to manage selections. `inARow()` and `timeRange()` handle consecutive hours. `refreshSummary()` updates the summary. `validate()` and `showError()` handle form validation. `newId()` creates a booking reference, `showPass()` displays the confirmation and `drawMine()` displays/cancels saved bookings. `arena-data.js` supplies `SPORTS`, `OPEN_HOUR`, `CLOSE_HOUR`, `slotState()`, `readBookings()` and `writeBookings()`.

## Safe changes

Keep the IDs referenced by `booking.js` unchanged unless you also update every matching `el("...")` lookup. Keep sport slugs and `SPORTS` records consistent. Test a valid booking, an invalid form, a consecutive multi-hour selection, a taken slot, a page refresh and cancellation. localStorage data is per browser and is not shared between devices.

## Shared components

Navigation, mobile navigation, footer, shared styles and FAQ accordion are documented once in `TEAM_DEVELOPER_GUIDE.md`. Use that guide when changing shared behavior.
