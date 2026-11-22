# Frontend Decisions — Nova Movement Studio

Three decisions, one per investigated problem (see README.md § "Reference-site
investigation" for the problems themselves). Each ties to a specific file and
is demonstrable in the running app.

---

## Decision 1 — Show price, level, and live availability on every class card

**Problem:** Class/session listings on many public booking sites only show a
name and photo; price, duration, level, and remaining capacity are hidden
until you open each item individually. Comparing five classes means five
page loads.

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
`02-classes-1280.png`.

---

## Decision 2 — Keep search, filter, and sort state in the URL (interaction/state decision)

**Problem:** On several booking-style sites, opening an item's detail page
and pressing Back resets any search text, category filter, or sort order
that was active — the user has to redo their search from scratch to keep
comparing options.

**Decision:** `ClassesPage` reads and writes `q`, `category`, `level`, and
`sort` through React Router's `useSearchParams` instead of local
`useState`. The filter state lives in the URL (`/classes?q=yoga&level=Beginner`),
so browser Back/Forward restores it exactly, and a filtered view can be
bookmarked or shared.

**Alternative considered:** Store filter state in a parent/context object
that persists across route changes in memory (e.g., a `FilterContext`).
This also survives navigation, but doesn't survive a page refresh or a
shared link, and adds another context provider for what is fundamentally
page-local UI state.

**Reason:** URL state is the idiomatic React Router solution for
page-scoped, shareable, back/forward-aware state, and requires no extra
provider — it reuses state the browser already manages.

**Tradeoff:** Every keystroke in the search box updates the URL (via
`history.replace`-like `setSearchParams`), which is slightly more verbose
URLs than a clean `/classes` path, and ties the filter implementation to
`react-router-dom`'s API rather than being portable to a plain `useState`.

**Code location:** `src/pages/ClassesPage.jsx` (`handleFilterChange`,
`useSearchParams`), `src/components/SearchFilterBar.jsx` (controlled
inputs bound to the parent's URL-derived props).

**Evidence:** From `/classes`, search "yoga" and set Level to "Beginner",
open a class, then press the browser Back button — the search box and level
filter are still set, and the same filtered results reappear (verified in
the Playwright smoke test; see `03-classes-filtered.png`).

---

## Decision 3 — Surface capacity, eligibility, and booking-cutoff state before the user commits

**Problem:** On several booking platforms, whether a slot is still available
— or whether you're even eligible for it — only becomes clear after you've
opened a multi-step booking form, sometimes after entering contact details.

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

**Reason:** This is also the information-hierarchy/mobile-layout decision:
on narrow (390px) layouts especially, screen space is scarce, so
availability and restriction badges are placed directly next to the
control they affect (the session radio button), not in a separate
"terms" section a user might skip while scrolling on mobile.

**Tradeoff:** Validation logic is now checked in more than one place (at
selection time in `ClassDetailPage`/`SessionPicker`, and again at checkout
in `CartPage`/`CheckoutPage` against possibly-changed data). We mitigated
the duplication risk by keeping the actual rule logic in one shared module
(`src/rules/`) and only re-reading live data at each check — the UI layers
call the same pure functions rather than re-implementing the conditions.

**Code location:** `src/components/SessionPicker.jsx`,
`src/pages/ClassDetailPage.jsx`, `src/rules/cutoffRule.js`,
`src/rules/eligibilityRule.js`.

**Evidence:** Opening `/classes/olympic-lifting-lab` (an Advanced class)
shows an "Experience required" badge and inline notice before any session
is even chosen; a sold-out or past-cutoff session's radio button is
disabled with a labelled reason ("Fully booked" / "Booking closed") rather
than silently failing at the end. See `19-detail-390.png`.
