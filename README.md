# React Business Platform — Nova Movement Studio

A React web application for **Nova Movement Studio**, a fictional boutique
group-fitness studio in Islamabad. Built for CS4032 (Web Programming)
Assignment 02 at FAST-NUCES, Islamabad Campus.

## Student details

| Field | Value |
|---|---|
| Name | Roshni Fawad |
| Roll number | 23i-2107 |
| Section | C |
| Course | CS4032 — Web Programming, Fall 2026 |
| Repository | https://github.com/roshni-5/react-business-platform |
| Deployment | https://react-business-platform.vercel.app |
| Final commit hash | _[Fill in with the final `git rev-parse HEAD` before submission]_ |

## Project description

Nova Movement Studio lets customers browse boutique fitness classes (yoga,
HIIT, strength, cycling, dance, boxing, recovery, Pilates), search/filter/sort
the schedule, view full class details, build a multi-class booking with a
chosen session and spot count, complete a booking form, review a calculated
summary, and reach a confirmation — the full journey required by the
assignment brief. All data, bookings, and payments are **simulated**; no
backend, real payment, or real personal data is involved.

## Business profile

| Element | Detail |
|---|---|
| Business identity | Nova Movement Studio — boutique group-fitness classes |
| Primary audience | Working professionals and university students in Islamabad |
| Operating area | F-7 Markaz, Islamabad (Studios A–C), 6am–10pm daily |
| Main customer task | Find and book a class session that fits their schedule and level |
| Business goal | Completed class bookings (simulated) |
| Offering | 13 classes across 8 categories, each with 3 upcoming sessions |

## Three operating rules

| Rule | Category | Condition |
|---|---|---|
| Spots per booking | Availability/capacity | 1–4 spots per booking, never more than the session's remaining capacity |
| Experience level | Eligibility/compatibility | Customer's declared level must meet the class's required level (Beginner < Intermediate < Advanced) |
| Booking cutoff | Pricing/fulfilment | Bookings close 2 hours before a session starts |

Full detail (exact conditions, UI location, boundary cases) is in the final
PDF report and in `src/rules/*.js`.

## Technology stack

React 19 · Vite 8 · react-router-dom 7 · plain authored CSS (no UI kit) ·
React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, context) ·
local JS data (`src/data/classes.js`) · `localStorage` · Node's built-in
`node:test` + `node:assert/strict` for the automated rule test.

## Installation & commands

```bash
npm install
```

```bash
npm run dev       # start the Vite dev server (http://localhost:5173)
```

```bash
npm run build     # production build to dist/
```

```bash
npm run preview   # preview the production build locally
```

```bash
npm test          # node --test — runs tests/capacityRule.test.js
```

All 7 automated test cases pass (`npm test`): valid quantities, the exact
boundary (4 spots), one above the limit (5), below the minimum (0), a
quantity within 1–4 but above remaining session capacity, a fully booked
session, and non-integer input.

## Main routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, featured classes |
| `/classes` | Full schedule: search, filter, sort (FR04/FR05) |
| `/classes/:id` | Class detail, session picker, add-to-booking (FR02/FR06/FR07) |
| `/cart` | Review/modify bookings, shared state (FR07/FR08) |
| `/checkout` | Controlled booking form + validation + rules + summary (FR09–FR12) |
| `/confirmation` | Final booking confirmation (FR16) |
| `/about` | Business profile and studio policies |
| any other path | 404 page |

## Feature summary

- Search across name/category/instructor/tagline, with a category filter, a
  level filter, and 4 sort modes — all combinable (FR04/FR05).
- Class detail page with full pricing, duration, equipment, location, and a
  session picker showing live capacity and the booking-cutoff state
  (FR02/FR06).
- Multi-class booking cart with quantity steppers enforcing the capacity
  rule, shared consistently between listing, detail, cart, and checkout
  (FR07/FR08).
- Controlled checkout form (name, email, phone, experience level, notes)
  with 4 validation rules and specific per-field error messages; valid
  fields are preserved on a failed submit (FR09/FR10).
- Calculated summary: per-item subtotal, spot counts, a flat service fee,
  and a grand total, recomputed from live cart state (FR11).
- All three operating rules enforced at both selection time and checkout
  (FR12).
- Booking cart persisted to `localStorage` and restored on reload, including
  re-validation against current rules (FR13).
- Mock asynchronous data loading with distinct loading / error+retry / empty
  states (FR14/FR15).
- Clear confirmation screen with a booking reference (FR16).
- Verified at 390px and 1280px widths with no horizontal overflow, and fully
  keyboard-operable (FR17).
- "Demo controls" panel (bottom-right on every page) for simulating a failed
  data load and changing a session's availability without devtools.

## Reproducing edge cases

All of the following are driven from the UI — no devtools required:

1. **Loading failure + retry** — open the "Demo controls" panel (bottom
   right), check "Simulate schedule load failure", then visit/refresh
   `/classes`. An error state with a **Retry** button appears. Uncheck the
   box and click Retry (or just uncheck it) to recover.
2. **Changed availability** — in "Demo controls", pick a class + session and
   click "Mark sold out" or "Open up 2 spots". Revisit `/classes` or the
   class's detail page to see the live badge change.
3. **Invalid class ID** — visit `/classes/this-id-does-not-exist` directly;
   a "We couldn't find that class" message with a link back to the schedule
   is shown instead of a crash.
4. **Invalid route** — visit any unknown path (e.g. `/nonsense`) to see the
   404 page.
5. **No search results** — on `/classes`, search for `zzzznotfound`; an
   empty-results message with a "Clear filters" action appears (distinct
   from an empty dataset message, which would show if `CLASSES` were empty).
6. **Invalid form input** — on `/checkout`, enter a 2-letter name, an email
   without `@`, and a 3-digit phone number; each field shows a specific
   error on blur/submit, and correcting one field does not clear the others.
7. **Capacity boundary** — open any class detail page and use the `+`
   button on the spots stepper; it disables at 4 (the rule's maximum) or at
   the session's remaining capacity, whichever is lower.
8. **Eligibility conflict** — add an Advanced class (e.g. "Olympic Lifting
   Lab") to your bookings, then at checkout select "Beginner" as your
   experience level and submit; a specific conflict message appears with a
   one-click "Remove from booking" action.
9. **Booking cutoff** — "Advanced HIIT Shred" and "Sunrise Power Yoga" each
   have a session starting within the next couple of hours; its radio
   option is disabled and labelled "Booking closed" once within the 2-hour
   cutoff.
10. **Stale/invalid saved selection** — open the browser console and run
    `localStorage.setItem('nova.cart.v1', JSON.stringify([{classId:'sunrise-power-yoga',sessionId:'s1',spots:99}]))`,
    then reload `/cart`. The item is shown with a clear "Needs attention"
    explanation (not silently dropped), and can be fixed via the quantity
    stepper or removed.
11. **Nested-route refresh** — navigate to any `/classes/:id` and hard-refresh
    the browser; the page loads correctly instead of 404ing (see
    "Deployment" for the server-side rewrite rule this depends on in
    production).

## Simulated operations

Everything that looks like a transaction — adding a class to "My Bookings",
checking out, and the final confirmation — is simulated entirely in the
browser. No network request is made for a booking, no payment is processed,
and no email is sent. Simulated areas are explicitly labelled in the UI
(checkout page, confirmation page, footer).

## Deployment

The repository already includes SPA rewrite config for both targets
(`vercel.json` and `netlify.toml` / `public/_redirects`), so nested routes
like `/classes/sunrise-power-yoga` resolve correctly on refresh (FR19).

**Vercel (recommended — zero config needed):**
1. Go to https://vercel.com/new and sign in with GitHub.
2. Import `roshni-5/react-business-platform`.
3. Framework preset: Vite (auto-detected). Build command `npm run build`,
   output directory `dist` (auto-detected). Click **Deploy**.
4. After it finishes, open the given `*.vercel.app` URL and verify: the
   homepage loads, `/classes` loads, open any class and refresh the page
   (confirms the nested-route rewrite works), and check the browser console
   for errors.
5. Copy the deployment URL into this README's "Student details" table and
   into the final PDF report.

**Netlify (alternative):**
1. Go to https://app.netlify.com/start and sign in with GitHub.
2. Pick `roshni-5/react-business-platform`. Build command `npm run build`,
   publish directory `dist` (already set in `netlify.toml`). Click **Deploy**.
3. Verify the same checks as above.

Re-deploy after any further commit so the deployed version matches the
submitted final commit hash.

## Known limitations

- The mock data loader always "succeeds" after a fixed delay unless the demo
  failure toggle is on; there's no real backend or network variability.
- Confirmed bookings are not persisted back into the class data, so booking
  a session doesn't permanently reduce its listed capacity between browser
  sessions (the capacity rule is still fully enforced against the cart's
  current, in-memory view of each session).
- No authentication/accounts — the app is single-user per browser via
  `localStorage`.
- Reference-site screenshots for the investigation are the student's
  responsibility to capture (see the PDF report); this development
  environment has no access to external websites.

## React/JavaScript concept map

| Concept | File | Component/function |
|---|---|---|
| Function components, JSX | `src/pages/*.jsx`, `src/components/*.jsx` | All page/component files |
| Props & callback props | `src/components/ClassCard.jsx`, `QuantityStepper.jsx` | `classItem` prop; `onChange`/`onSelect` callbacks |
| `useState` | `src/pages/ClassDetailPage.jsx` | `sessionId`, `spots`, `justAdded` |
| Functional state updates | `src/context/BookingContext.jsx` | `setRawItems((prev) => ...)` in `addItem`/`updateSpots`/`removeItem` |
| Controlled forms | `src/pages/CheckoutPage.jsx`, `src/components/FormField.jsx` | `form` state + `handleChange`/`handleBlur` |
| Immutable object updates | `src/pages/CheckoutPage.jsx` | `setForm((prev) => ({ ...prev, [name]: value }))` |
| Immutable array updates | `src/context/BookingContext.jsx` | `addItem`, `updateSpots`, `removeItem` (map/filter/spread, no mutation) |
| Lists & keys | `src/pages/ClassesPage.jsx`, `CartPage.jsx` | `.map(...)` with `classItem.id` / `item.key` |
| Conditional rendering | `src/pages/ClassesPage.jsx` | loading/error/empty/success branches |
| Shared state via context | `src/context/BookingContext.jsx`, `DemoContext.jsx` | `useBooking()`, `useDemo()` |
| Derived values | `src/context/BookingContext.jsx` | `validItems`, `totalSpots`, `subtotal` via `useMemo` |
| `useEffect` + cleanup | `src/hooks/useClasses.js` | data fetch effect with `cancelled` flag cleanup |
| `useEffect` dependencies | `src/hooks/useClasses.js` | `[forceFail, overrides, retryKey]` |
| Async/await & Promises | `src/services/classService.js` | `fetchClasses()` (Promise + `setTimeout`) |
| Browser storage | `src/hooks/useLocalStorage.js` | generic read/write/validate hook |
| Routing & URL params | `src/App.jsx`, `src/pages/ClassDetailPage.jsx` | `<Route path="/classes/:id">`, `useParams()` |
| Query-string state | `src/pages/ClassesPage.jsx` | `useSearchParams()` |
| Business rule functions | `src/rules/capacityRule.js`, `eligibilityRule.js`, `cutoffRule.js` | `validateBookingQuantity`, `checkEligibility`, `checkBookingCutoff` |
| Array methods / spread / destructuring | throughout `src/` | `.filter`, `.map`, `.reduce`, `{ ...prev }`, `const { id } = useParams()` |

## Development history

This repository was developed incrementally through five milestones
(initial setup & data → browsing features → selection/forms/rules →
responsive design & accessibility → edge cases, tests, and docs), each as
its own commit — see `git log` for the full history.
