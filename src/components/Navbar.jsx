
import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { allProducts } from "../data/allProducts";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="7" />
      <line x1="16" y1="16" x2="21.5" y2="21.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24"
      fill="none" stroke="currentColor" strokeWidth="1.3"
      aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4.3 3.5-7 8-7s8 2.7 8 7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26"
      fill="none" stroke="currentColor" strokeWidth="1.3"
      aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const previousScrollY = useRef(0);
  const visibleRef = useRef(true);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    previousScrollY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const difference = currentY - previousScrollY.current;

        if (currentY <= 10 || difference < -4) {
          if (!visibleRef.current) {
            visibleRef.current = true;
            setIsVisible(true);
          }
        } else if (difference > 4) {
          if (visibleRef.current) {
            visibleRef.current = false;
            setIsVisible(false);
          }
        }

        previousScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const scrollToTop = () => {
    visibleRef.current = true;
    setIsVisible(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const results = searchTerm.trim()
    ? allProducts
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
        .filter(
          (product, index, array) =>
            array.findIndex(
              (item) =>
                item.category === product.category &&
                item.name.toLowerCase() === product.name.toLowerCase()
            ) === index
        )
        .slice(0, 10)
    : [];

  const openProduct = (product) => {
    setSearchOpen(false);
    setSearchTerm("");
    navigate(`/product/${product.routeId}`);
    scrollToTop();
  };

  const navLinkClass = ({ isActive }) =>
    `main-menu-link${isActive ? " active" : ""}`;

  return (
    <header
      className={`main-header ${
        isVisible ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <div className="header-main">
        <button
          className="header-search"
          type="button"
          aria-label="Open perfume search"
          onClick={() => setSearchOpen((open) => !open)}
        >
          <SearchIcon />
        </button>

        <Link to="/" className="everlast-logo" onClick={scrollToTop}>
          EVERLAST FRAGRANCES
        </Link>

        <div className="header-actions">
          <Link
            to="/login"
            className="header-action"
            aria-label="Login"
            onClick={scrollToTop}
          >
            <UserIcon />
          </Link>
          <Link
            to="/cart"
            className="header-action"
            aria-label="Shopping cart"
            onClick={scrollToTop}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="cart-count-badge" aria-label={`${cartCount} items`}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar-search-panel">
          <div className="navbar-search-field">
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="search"
              value={searchTerm}
              placeholder="Search perfumes..."
              aria-label="Search all perfumes"
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                  setSearchTerm("");
                }
                if (event.key === "Enter" && results.length > 0) {
                  openProduct(results[0]);
                }
              }}
            />
            <button
              type="button"
              className="search-close"
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
              }}
              aria-label="Close search"
            >
              ×
            </button>
          </div>

          {searchTerm.trim() && (
            <div className="navbar-search-results">
              {results.length > 0 ? (
                results.map((product) => (
                  <button
                    type="button"
                    className="navbar-search-result"
                    key={`${product.category}-${product.id}`}
                    onClick={() => openProduct(product)}
                  >
                    <img src={product.image} alt="" />
                    <span>{product.name}</span>
                    <small>
                      {product.category === "men" ? "Men" : "Women"}
                    </small>
                  </button>
                ))
              ) : (
                <p className="search-no-results">
                  No matching perfumes found.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <nav className="main-menu" aria-label="Main navigation">
        <NavLink to="/" end onClick={scrollToTop} className={navLinkClass}>
          <span>⌂</span> Home
        </NavLink>
        <NavLink to="/men" onClick={scrollToTop} className={navLinkClass}>
          <span>♂</span> MEN PERFUMES
        </NavLink>
        <NavLink to="/women" onClick={scrollToTop} className={navLinkClass}>
          <span>♀</span> WOMEN PERFUMES
        </NavLink>
        <NavLink
          to="/new-arrivals"
          onClick={scrollToTop}
          className={navLinkClass}
        >
          <span>✺</span> NEW ARRIVALS
        </NavLink>
        <NavLink
          to="/premium-signature"
          onClick={scrollToTop}
          className={navLinkClass}
        >
          PREMIUM SIGNATURE
        </NavLink>
        <NavLink
          to="/contact"
          onClick={scrollToTop}
          className={navLinkClass}
        >
          <span>☎</span> CONTACT
        </NavLink>
      </nav>

      <div className="payment-message">
        ALL PAYMENTS WILL BE CONFIRMED WITHIN 24 HOURS
      </div>
    </header>
  );
}

export default Navbar;
