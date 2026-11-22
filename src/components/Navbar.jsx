import { NavLink } from 'react-router-dom';
import { useBooking } from '../context/BookingContext.jsx';

export default function Navbar() {
  const { totalSpots } = useBooking();

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" aria-label="Nova Movement Studio home">
          <span className="navbar__mark" aria-hidden="true">N</span>
          Nova Movement
        </NavLink>

        <nav className="navbar__nav" aria-label="Primary">
          <NavLink to="/classes" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Classes
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            About
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `navbar__cart ${isActive ? 'is-active' : ''}`}
          >
            My Bookings
            {totalSpots > 0 && <span className="navbar__cart-count">{totalSpots}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
