# Frontend Decisions — Nova Movement Studio

Three decisions, one per investigated problem (see README.md § "Reference-site
investigation" for the problems themselves). Each ties to a specific file and
is demonstrable in the running app.

---

## Decision 1 — Show price, level, and live availability on every class card

**Problem:** Observed on ClassPass (`classpass.com/search`, "Fitness Studios
in London Congestion Charging Zone"): every result card shows a photo,
category tags, studio name, address, and a star rating — but no price and
no class time anywhere on the card (see
`evidence/problem1-classpass-search-grid.webp`). Comparing several studios
means opening each one individually just to find out what it costs or when
a class runs.

**Decision:** Every `ClassCard` (`src/components/ClassCard.jsx`) shows
category, level, instructor, duration, price per spot, the next session's
date/time, and a live "N spots left / Fully booked" badge — all without
leaving the grid (`src/pages/ClassesPage.jsx`).

**Alternative considered:** Keep cards minimal (image + name + "View
details") and move all of this onto the detail page, which is the more
common pattern and less visually busy.

**Reason:** The assignment's customer journey starts with *comparing*
options, not committing to one. Information hierarchy should put
decision-relevant facts (price, level, availability) at the point of
comparison, not one click deeper.

**Tradeoff:** Cards are denser and taller, which costs vertical space and
means fewer cards fit per screen (especially on mobile, where the grid drops
to one column). We accepted this because the alternative — hiding the same
information — is the exact problem being fixed.

**Code location:** `src/components/ClassCard.jsx` (card layout),
`src/utils/formatters.js` (`remainingSpots`, `formatCurrency`,
`formatSessionDateTime`).

**Evidence:** `/classes` — every card shows level, price, and an
availability badge (e.g. "Fully booked" on Vinyasa Flow, "2 spots left" on
Spin Ride 45) without opening a single detail page. See screenshot
`02-classes-1280.png`, compared against
`evidence/problem1-classpass-search-grid.webp`.

---

## Decision 2 — Never let a floating element cover page content (information hierarchy / mobile layout)

**Problem:** Observed on ClassPass at a 400px mobile width
(`classpass.com/search/.../fitness-classes/...`): a persistent floating
"Get 14 days free" pill is fixed to the bottom of the viewport and overlaps
the last visible class card in the list, covering its text (see
`evidence/problem3-classpass-mobile-overlap.png`). On a screen where every
row of vertical space is already scarce, a promotional element permanently
eats into the content area.

**Decision:** Nova Movement Studio has exactly one floating UI element in
the whole app — the small, explicitly-labelled "Demo controls" panel used
for assignment evaluation (`src/components/DemoControlsPanel.jsx`), never
shown as part of the real customer journey's selling points. Every primary
action (Add to my bookings, Continue to checkout, Confirm booking) sits
inline within the normal page flow instead of pinned to the viewport.

**Alternative considered:** A sticky bottom action bar — e.g. a "Book Now"
button that stays visible while scrolling a long class detail page, a
common mobile pattern that keeps the primary action always reachable.

**Reason:** A sticky bar guarantees one-tap access to an action, but
permanently costs a fixed strip of screen height on every screen, and risks
exactly the problem observed above — overlapping the content the user is
actually trying to read or tap. We chose to keep the full viewport
available for content and accept that the user scrolls to the button.

**Tradeoff:** On longer pages (e.g. the checkout form), the primary button
is below the fold until the user scrolls down, rather than being always
one tap away.

**Code location:** No component under `src/components/` or `src/pages/`
uses fixed/sticky positioning for a customer-facing control; the only
`position: fixed` rule in `src/styles/layout.css` is `.demo-panel`, scoped
to the evaluation-only `DemoControlsPanel.jsx`.

**Evidence:** Compare `mobile-classes.png` / `mobile-detail.png` (390px —
nothing obscures the list or detail content) against
`evidence/problem3-classpass-mobile-overlap.png`, where the fixed
promotional pill sits over the bottom list item.

---

## Decision 3 — Surface capacity, eligibility, and booking-cutoff state before the user commits (interaction/state behaviour)

**Problem:** Observed on ClassPass (`classpass.com/studios/barrys-soho-london`):
the studio detail page shows photos, rating, and address, but **no class
schedule, no prices, and no availability at all** (see
`evidence/problem2-classpass-studio-detail.webp`). The only call to action
is "Get 14 days free" — a full membership trial signup. A customer cannot
find out whether a session is even available, or what it costs, without
committing to create an account first.

**Decision:** Availability (`remainingSpots`), the booking cutoff
(`checkBookingCutoff`), and experience-level requirements are all shown
**on the session picker itself**, before the user chooses a quantity or
enters any details: sold-out and closed sessions are visibly disabled with a
labelled reason inline (`SessionPicker.jsx`), and an "Experience required"
badge appears on the card, the detail page, and a dedicated notice before
booking.

**Alternative considered:** Let the user select any session and only
validate against capacity/cutoff/eligibility at the final "Confirm booking"
step, showing one combined error if something's wrong. This is simpler to
implement (validation lives in one place) but matches the exact "charges or
restrictions appear late" problem being investigated.

**Reason:** This is the interaction/state-behaviour decision: which session
options are even selectable changes live, in response to application state
(remaining capacity, the current time versus the cutoff) — a sold-out or
past-cutoff session's radio button is disabled and labelled with the exact
reason, rather than silently accepted and rejected only at the end. It also
touches information hierarchy on mobile: availability and restriction
badges sit directly next to the control they affect (the session radio
button), not in a separate "terms" section a user might skip while
scrolling on a 390px screen.

**Tradeoff:** Validation logic is now checked in more than one place (at
selection time in `ClassDetailPage`/`SessionPicker`, and again at checkout
in `CartPage`/`CheckoutPage` against possibly-changed data). We mitigated
the duplication risk by keeping the actual rule logic in one shared module
(`src/rules/`) and only re-reading live data at each check — the UI layers
call the same pure functions rather than re-implementing the conditions.

**Code location:** `src/components/SessionPicker.jsx`,
`src/pages/ClassDetailPage.jsx`, `src/rules/cutoffRule.js`,
`src/rules/eligibilityRule.js`.

**Evidence:** `/classes/olympic-lifting-lab` shows an "Experience required"
badge and disabled, reason-labelled sold-out/past-cutoff sessions before
any detail is entered — compare to
`evidence/problem2-classpass-studio-detail.webp`, where no such information
is available at all without signing up.

**Evidence:** Opening `/classes/olympic-lifting-lab` (an Advanced class)
shows an "Experience required" badge and inline notice before any session
is even chosen; a sold-out or past-cutoff session's radio button is
disabled with a labelled reason ("Fully booked" / "Booking closed") rather
than silently failing at the end. See `19-detail-390.png`.
