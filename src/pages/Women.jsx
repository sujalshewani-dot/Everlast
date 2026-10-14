
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/womenProducts";
import "./Women.css";

const ITEMS_PER_PAGE = 16;

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}.00 PKR`;
}

export default function Women() {
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (availability === "available") {
      result = result.filter((product) => !product.soldOut);
    } else if (availability === "soldout") {
      result = result.filter((product) => product.soldOut);
    }

    if (sortBy === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high-low") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [availability, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="women-collection">
      <h1 className="women-title">Women's Perfumes</h1>

      <div className="women-toolbar">
        <div className="women-filters">
          <label>
            Filter:
            <select
              value={availability}
              onChange={(event) => {
                setAvailability(event.target.value);
                setPage(1);
              }}
            >
              <option value="all">Availability</option>
              <option value="available">In stock</option>
              <option value="soldout">Sold out</option>
            </select>
          </label>

          <label>
            Price:
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(1);
              }}
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price, low to high</option>
              <option value="high-low">Price, high to low</option>
              <option value="name">Alphabetically</option>
            </select>
          </label>
        </div>

        <div className="women-sort-summary">
          <label>
            Sort by:
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(1);
              }}
            >
              <option value="featured">Best selling</option>
              <option value="low-high">Price, low to high</option>
              <option value="high-low">Price, high to low</option>
              <option value="name">Alphabetically</option>
            </select>
          </label>
          <span>{filteredProducts.length} products</span>
        </div>
      </div>

      <div className="women-product-grid">
        {visibleProducts.map((product) => (
          <Link
            className="women-product-card"
            key={product.id}
            to={`/product/women-${product.id}`}
            aria-label={`View ${product.name}`}
          >
            <div className="women-product-image">
              <img src={product.image} alt={product.name} loading="lazy" />
              {product.soldOut && (
                <span className="women-sold-out">Sold out</span>
              )}
            </div>

            <div className="women-product-details">
              <h2>{product.name}</h2>
              <div className="women-product-reviews">
                <span className="women-stars" aria-label="5 stars">★★★★★</span>
                <span>
                  {product.reviews > 0 ? `${product.reviews} reviews` : "No reviews"}
                </span>
              </div>
              <p className="women-product-price">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="women-no-products">No products found.</p>
      )}

      {totalPages > 1 && (
        <nav className="women-pagination" aria-label="Product pages">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              className={currentPage === pageNumber ? "current-page" : ""}
              onClick={() => setPage(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </nav>
      )}
    </main>
  );
}
