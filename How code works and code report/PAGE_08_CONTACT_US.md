# Contact Us — Page Developer Guide (`contact_us.html`)

## Files used

- HTML: `contact_us.html`
- CSS, in load order: `Assets/styles/themes.css`, `Assets/styles/apex-refresh.css`, `Assets/styles/contactus.css`
- JavaScript, in load order: `Assets/scripts/components.js`, `Assets/scripts/inner.js`, `Assets/scripts/contact.js`
- Shared navigation, footer and FAQ behavior: `Assets/scripts/components.js` (see `TEAM_DEVELOPER_GUIDE.md`).

## Sections and how to edit them

### 1. Contact hero

`.contact-page`, `.contact-hero`, `.contact-kicker`, `.contact-title-accent`, `.contact-intro` and the hero heading introduce the contact page. Page layout and typography are in `contactus.css`; shared colors and buttons are in `apex-refresh.css`.

### 2. Contact information and form

`#contact-form` is inside `.contact-layout` and `.contact-panel`. `.contact-details`, `.contact-detail`, `.detail-icon`, `.contact-note`, `.field-error`, `.input`, `.contact-submit` and `.contact-success` style the contact information and form. Form fields use `#c-name`, `#c-email`, `#c-topic` and `#c-msg`; validation messages use `#e-name`, `#e-email` and `#e-msg`. `contact.js` validates the name, email and message, then stores valid messages under `apex-arena-messages`. The success message clearly states that the form saves in this browser and does not send email.

### 3. FAQs

`#contact-faq` contains `.qa`, `.ask`, `.ask-icon`, `.answer` and `.answer-text`. The shared click behavior is explained once in `TEAM_DEVELOPER_GUIDE.md`; do not add a second accordion implementation in `contact.js`. FAQ styling is in `contactus.css` and shared refresh styles.

## JavaScript behavior

`contact.js` uses `setError()` to show or clear field messages and `check()` to validate the name, email and message. On a valid submission, it stores the message in localStorage under `apex-arena-messages`, displays `#c-success` and resets the form. It does not send an email. `inner.js` provides the shared reveal behavior and toast helper.

## Safe changes

Keep the field IDs and error IDs synchronized with the `fields` object and `setError()` calls in `contact.js`. If you change the form fields, update both the HTML and validation logic. Do not describe the form as email delivery unless a real service is added.

## Shared components

Navigation, mobile navigation, footer, shared styles and FAQ accordion are documented once in `TEAM_DEVELOPER_GUIDE.md`. Use that guide when changing shared behavior.
