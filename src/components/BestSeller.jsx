import { Link } from "react-router-dom";
import "./BestSeller.css";

function BestSeller() {
  return (
    <section className="top-seller-section">
      <div className="top-seller-container">

        <h2 className="top-seller-heading">
          TOP SELLER
        </h2>

        <div className="top-seller-product">

          {/* Large Product Image */}
          <Link
            to="/product/men-5"
            className="top-seller-main-image"
            aria-label="View Office for men"
          >
            <img
              src="/images/products/office-for-men-main.png"
              alt="Office for men"
            />
          </Link>

          {/* Product Card */}
          <Link
            to="/product/men-5"
            className="top-seller-info"
            aria-label="View Office for men"
          >

            <div className="top-seller-product-image">
              <img
                src="/images/products/office-for-men.png"
                alt="Office for men"
              />
            </div>

            <span className="sold-out">
              Sold out
            </span>

            <p className="product-name">
              Office for men
            </p>

            <div className="product-reviews">
              <span className="stars">★★★★★</span>
              <span className="review-count">
                148 reviews
              </span>
            </div>

            <p className="product-price">
              From Rs.2,300.00 PKR
            </p>

          </Link>

        </div>
      </div>
    </section>
  );
}

export default BestSeller;