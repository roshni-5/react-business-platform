import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import DemoControlsPanel from './DemoControlsPanel.jsx';

export default function Layout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="app-main">
        <Outlet />
      </main>
      <Footer />
      <DemoControlsPanel />
    </div>
  );
}
