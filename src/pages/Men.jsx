import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./Men.css";

export const products = [
  { id: 1, name: "Nishane Hacivat", image: "/images/products/nishane-hacivat.png", reviews: 12, price: 3200 },
  { id: 2, name: "Bvlgari Tygar", image: "/images/products/bvlgari-tygar.png", reviews: 5, price: 3200 },
  { id: 3, name: "Tom Ford Tuscan Leather", image: "/images/products/tuscan-leather.png", reviews: 2, price: 2200 },
  { id: 4, name: "Megal Mare", image: "/images/products/mega-mare.png", reviews: 2, price: 2700 },
  { id: 5, name: "Office for men", image: "/images/products/OFM.png", reviews: 150, price: 2300 },
  { id: 6, name: "Oud Maracuja", image: "/images/products/oud-maracuja.png", reviews: 1, price: 3200 },
  { id: 7, name: "YSL Y", image: "/images/products/ysl-y.png", reviews: 2, price: 2500 },
  { id: 8, name: "Imagination (Premium) - Louis Vuitton", image: "/images/products/LV.png", reviews: 25, price: 3200 },
  { id: 9, name: "Ombre Nomade - Louis Vuitton", image: "/images/products/ombre-nomade.png", reviews: 2, price: 3200 },
  { id: 10, name: "Acqua Di Gio", image: "/images/products/acqua-di-gio.png", reviews: 0, price: 2400 },
  { id: 11, name: "Azzaro - Most Wanted", image: "/images/products/azzaro-most-wanted.png", reviews: 0, price: 2200 },
  { id: 12, name: "YSL Tuxedo", image: "/images/products/ysl-tuxedo.png", reviews: 1, price: 2200, soldOut: true },
  { id: 13, name: "Afternoon Swim - Louis Vuitton", image: "/images/products/afternoon-swim.png", reviews: 2, price: 3200 },
  { id: 14, name: "Angels' Share by Kilian", image: "/images/products/angels-share-kilian.png", reviews: 7, price: 2800, soldOut: true },
  { id: 15, name: "Tom Ford - Tobacco Vanille", image: "/images/products/tobacco-vanille.png", reviews: 3, price: 2200, soldOut: true },
  { id: 16, name: "Stronger with You - Intense", image: "/images/products/stronger-with-you-intense.png", reviews: 2, price: 2800 },
  { id: 17, name: "Afternoon Swim - Louis Vuitton", image: "/images/products/afternoon-swim.png", reviews: 2, price: 3200 },
  { id: 18, name: "TomFord - Tobacco Vanille", image: "/images/products/tobacco-vanille.png", reviews: 3, price: 2200, soldOut: true },
  { id: 19, name: "Ganymede", image: "/images/products/ganymede.png", reviews: 1, price: 2700, soldOut: true },
  { id: 20, name: "Tomford Oud Wood", image: "/images/products/oud-wood.png", reviews: 1, price: 2200 },
  { id: 21, name: "Silver Mountain Water - Creed", image: "/images/products/silver-mountain-water.png", reviews: 1, price: 2500 },
  { id: 22, name: "One Million - Paco Rabanne", image: "/images/products/one-million.png", reviews: 1, price: 2400 },
  { id: 23, name: "Mega Mare", image: "/images/products/mega-mare.png", reviews: 2, price: 2700 },
  { id: 24, name: "Acqua Di Gio", image: "/images/products/acqua-di-gio.png", reviews: 0, price: 2400 },
  { id: 25, name: "Baccarat Rouge 540", image: "/images/products/baccarat-rouge-540.png", reviews: 1, price: 2500, soldOut: true },
  { id: 26, name: "Tomford Ombre Leather", image: "/images/products/ombre-leather.png", reviews: 1, price: 2200 },
  { id: 27, name: "Versace Eros", image: "/images/products/versace-eros.png", reviews: 0, price: 2400, soldOut: true },
  { id: 28, name: "Oud Maracuja", image: "/images/products/oud-maracuja.png", reviews: 1, price: 3200 },
  { id: 29, name: "Azzaro - Most Wanted", image: "/images/products/azzaro-most-wanted.png", reviews: 0, price: 2200 },
  { id: 30, name: "Roja Elysium", image: "/images/products/roja-elysium.png", reviews: 0, price: 3200, soldOut: true },
  { id: 31, name: "TK NO 4", image: "/images/products/tk-no-4.png", reviews: 1, price: 3000, soldOut: true },
  { id: 32, name: "Espresso", image: "/images/products/espresso.png", reviews: 1, price: 2500 },
  { id: 33, name: "Pacific Chill - Louis Vuitton", image: "/images/products/pacific-chill.png", reviews: 1, price: 3000, soldOut: true },
  { id: 34, name: "Oud Veil - White Oud", image: "/images/products/oud-veil.png", reviews: 0, price: 2200, soldOut: true },
  { id: 35, name: "Coastal Chill", image: "/images/products/coastal-chill.png", reviews: 1, price: 2500, soldOut: true },
  { id: 36, name: "Aqua Sapphire", image: "/images/products/aqua-sapphire.png", reviews: 1, price: 3200, soldOut: true },
  { id: 37, name: "Erba Pura - Xerjoff", image: "/images/products/erba-pura.png", reviews: 1, price: 3200 },
  { id: 38, name: "Oud Ispahan - Dior", image: "/images/products/oud-ispahan.png", reviews: 0, price: 3200, soldOut: true },
  { id: 39, name: "Nawab of Oudh", image: "/images/products/nawab-of-oudh.png", reviews: 0, price: 3000, soldOut: true },
  { id: 40, name: "Meydan - The Spirit of Dubai", image: "/images/products/meydan.png", reviews: 1, price: 3200 },
  { id: 41, name: "YSL Tuxedo", image: "/images/products/ysl-tuxedo.png", reviews: 1, price: 2200, soldOut: true },
];

const ITEMS_PER_PAGE = 16;

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}.00 PKR`;
}

export default function Men() {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    if (availability === "available") {
      result = result.filter((product) => !product.soldOut);
    } else if (availability === "soldout") {
      result = result.filter((product) => product.soldOut);
    }

    if (sortBy === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high-low") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [availability, sortBy, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );
  const currentPage = Math.min(page, totalPages);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="men-collection">
      <h1 className="men-title">
        {searchQuery
          ? `Search results for "${searchParams.get("search")}"`
          : "Men's Perfumes"}
      </h1>

      {searchQuery && (
        <p className="men-search-summary">
          {filteredProducts.length} matching product
          {filteredProducts.length === 1 ? "" : "s"}
        </p>
      )}

      <div className="men-toolbar">
        <div className="men-filters">
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

        <div className="men-sort-summary">
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

      <div className="men-product-grid">
        {visibleProducts.map((product) => (
          <Link
            className="men-product-card"
            key={product.id}
            to={`/product/men-${product.id}`}
            aria-label={`View ${product.name}`}
          >
            <div className="men-product-image">
              <img src={product.image} alt={product.name} loading="lazy" />
              {product.soldOut && (
                <span className="men-sold-out">Sold out</span>
              )}
            </div>

            <div className="men-product-details">
              <h2>{product.name}</h2>
              <div className="men-product-reviews">
                <span className="men-stars" aria-label="5 stars">
                  ★★★★★
                </span>
                <span>
                  {product.reviews > 0
                    ? `${product.reviews} reviews`
                    : "No reviews"}
                </span>
              </div>
              <p className="men-product-price">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="men-no-products">No products found.</p>
      )}

      {totalPages > 1 && (
        <nav className="men-pagination" aria-label="Product pages">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                className={currentPage === pageNumber ? "current-page" : ""}
                onClick={() => setPage(pageNumber)}
                aria-current={
                  currentPage === pageNumber ? "page" : undefined
                }
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </nav>
      )}
    </main>
  );
}