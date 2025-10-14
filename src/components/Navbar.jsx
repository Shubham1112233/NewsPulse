import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CountryContext } from "../contexts/CountryContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import useWindowResize from "../hooks/useWindowResize";
import "./Navbar.css";

const Navbar = () => {
  const { handleCountryChange, country } = useContext(CountryContext);
  const { theme, handleThemeChange } = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const { width } = useWindowResize();

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleBookmarks = () => {
    navigate("/bookmarks");
    if (width < 992) {
      setIsNavCollapsed(true);
    }
  };

  const countries = [
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
  ];

  // Auto-collapse navbar on resize to desktop
  useEffect(() => {
    if (width >= 992) {
      setIsNavCollapsed(false);
    } else {
      setIsNavCollapsed(true);
    }
  }, [width]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (width < 992 && !isNavCollapsed) {
        const navbar = document.getElementById('navbarSupportedContent');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (navbar && !navbar.contains(event.target) && !toggler.contains(event.target)) {
          setIsNavCollapsed(true);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [width, isNavCollapsed]);

  return (
    <nav className="navbar navbar-expand-lg main-navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          📰 NewsHub
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div 
          className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} 
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/category/business">
                    Business
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/category/entertainment"
                  >
                    Entertainment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category/health">
                    Health
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category/science">
                    Science
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category/sports">
                    Sports
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category/technology">
                    Technology
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Country
              </NavLink>
              <ul className="dropdown-menu country-dropdown-menu ">
                {countries.map((specificCountry) => {
                  const isActive = specificCountry.code === country;
                  return (
                    <div key={specificCountry.code}>
                      <li className="country-dropdown-item" role="button">
                        <a
                          className={`dropdown-item cursor-pointer ${
                            isActive ? "active" : ""
                          }`}
                          onClick={() =>
                            handleCountryChange(specificCountry.code)
                          }
                        >
                          {specificCountry.name}
                        </a>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2 justify-content-between me-4">
            <form
              className="d-flex search-form"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search news..."
                aria-label="Search"
                onChange={handleSearchQueryChange}
                value={searchQuery}
              />
              <button className="btn btn-primary search-btn" type="submit">
                Search
              </button>
            </form>
            <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-primary theme-toggle-btn"
              onClick={handleThemeChange}
            >
                {theme === "light" ? "☾" : "𖤓"}
              </button>
            <button
              className="btn btn-primary bookmarks-btn"
              onClick={handleBookmarks}
            >
               Bookmarks
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
