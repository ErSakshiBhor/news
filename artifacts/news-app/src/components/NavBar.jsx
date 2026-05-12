import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks';
import { useTheme } from '../hooks/useTheme';
import { COUNTRIES } from '../hooks/useCountry';

const NavBar = ({ country, setCountry, currentCountry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();
  const { isDark, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">QuickNews</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/General">General</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Entertainment">Entertainment</Link></li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/bookmarks">
                Saved
                {bookmarks.length > 0 && (
                  <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>{bookmarks.length}</span>
                )}
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* Country selector */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                <span>{currentCountry.flag}</span>
                <span className="d-none d-lg-inline">{currentCountry.name}</span>
                <span className="d-inline d-lg-none">{currentCountry.code.toUpperCase()}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{
                background: isDark ? '#1e1e1e' : '#fff',
                minWidth: '180px',
              }}>
                {COUNTRIES.map(c => (
                  <li key={c.code}>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => setCountry(c.code)}
                      style={{
                        background: c.code === country ? (isDark ? '#333' : '#f0f0f0') : 'transparent',
                        color: isDark ? '#e4e6eb' : '#212529',
                        fontWeight: c.code === country ? 600 : 400,
                        cursor: 'pointer',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        padding: '6px 16px',
                      }}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                      {c.code === country && <span className="ms-auto" style={{ color: '#dc3545' }}>✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dark mode toggle */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Search */}
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search news..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ minWidth: '160px' }}
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
