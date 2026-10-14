import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./PremiumEdition.css";

export const premiumProducts = [
  {
    id: 1,
    name: "Imagination ( Premium) - Louis Vuitton",
    image: "/images/products/LV.png",
    reviews: 25,
    price: 3200,
    priceFrom: true,
    bottleLabel: "EVERLAST FRAGRANCES | IMAGINATION PREMIUM",
  },
  {
    id: 2,
    name: "Imperial Valley - Gissah",
    image: "/images/products/imperial-valley.png",
    reviews: 8,
    price: 3200,
    priceFrom: true,
    bottleLabel: "EVERLAST FRAGRANCES | IMPERIAL VALLEY",
  },
  {
    id: 3,
    name: "Bleu De Chanel Premium",
    image: "/images/products/bleu-de-chanel.png",
    reviews: 4,
    price: 3200,
    bottleLabel: "EVERLAST FRAGRANCES | BLEU DE CHANEL",
  },
  {
    id: 4,
    name: "Oud Ispahan - Dior",
    image: "/images/products/oud-ispahan.png",
    reviews: 0,
    price: 3200,
    soldOut: true,
    bottleLabel: "EVERLAST FRAGRANCES | OUD ISPAHAN",
  },
  {
    id: 5,
    name: "Nawab of Oudh",
    image: "/images/products/nawab-of-oudh.png",
    reviews: 0,
    price: 3000,
    soldOut: true,
    bottleLabel: "EVERLAST FRAGRANCES | NAWAB OF OUDH",
  },
];

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}.00 PKR`;
}

export default function PremiumEdition() {
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...premiumProducts];

    if (availability === "available") {
      result = result.filter((product) => !product.soldOut);
    } else if (availability === "soldout") {
      result = result.filter((product) => product.soldOut);
    }

    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [availability, sortBy]);

  return (
    <main className="premium-collection">
      <h1 className="premium-title">PREMIUM EDITION</h1>

      <div className="premium-toolbar">
        <div className="premium-filters">
          <label>
            Filter:
            <select
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
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
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price, low to high</option>
              <option value="high-low">Price, high to low</option>
              <option value="name">Alphabetically</option>
            </select>
          </label>
        </div>

        <div className="premium-sort-summary">
          <label>
            Sort by:
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
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

      <div className="premium-product-grid">
        {filteredProducts.map((product) => (
          <Link
            className="premium-product-card"
            key={product.id}
            to={`/product/premium-${product.id}`}
            aria-label={`View ${product.name}`}
          >
            <div className="premium-product-image">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
              />

              {product.soldOut && (
                <span className="premium-sold-out">Sold out</span>
              )}
            </div>

            <div className="premium-product-details">
              <h2>{product.name}</h2>

              <div className="premium-product-reviews">
                <span
                  className={`premium-stars ${
                    product.reviews === 0 ? "premium-no-stars" : ""
                  }`}
                  aria-label={
                    product.reviews > 0 ? "5 stars" : "No ratings"
                  }
                >
                  {product.reviews > 0 ? "★★★★★" : "☆☆☆☆☆"}
                </span>

                <span>
                  {product.reviews > 0
                    ? `${product.reviews} reviews`
                    : "No reviews"}
                </span>
              </div>

              <p className="premium-product-price">
                {product.priceFrom ? "From " : ""}
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="premium-no-products">No products found.</p>
      )}
    </main>
  );
}