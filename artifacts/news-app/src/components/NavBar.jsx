import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">NewsMonkey</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/General">General</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/bookmarks">
                    Saved
                    {bookmarks.length > 0 && (
                      <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                        {bookmarks.length}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>

              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search news..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ minWidth: '200px' }}
                />
                <button className="btn btn-outline-light" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
