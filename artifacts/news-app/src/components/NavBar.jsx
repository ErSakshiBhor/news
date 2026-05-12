import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks';
import { useTheme } from '../hooks/useTheme';

const NavBar = () => {
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
    <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark py-0" style={{ height: '56px' }}>
      <div className="container-fluid h-100">
        <Link className="navbar-brand fw-bold fs-5" to="/">⚡ QuickNews</Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0 flex-row gap-2">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1 px-2" to="/bookmarks">
                🔖 Saved
                {bookmarks.length > 0 && (
                  <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>{bookmarks.length}</span>
                )}
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              {isDark ? '☀️' : '🌙'}
            </button>

            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control form-control-sm me-1"
                type="search"
                placeholder="Search news..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ minWidth: '160px' }}
              />
              <button className="btn btn-outline-light btn-sm" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
