import { useState } from "react";
import { demoReviews } from "../data/reviews";
import "./Reviews.css";

function Reviews() {
const [currentIndex, setCurrentIndex] = useState(0);

const averageRating = (
demoReviews.reduce(
(total, review) => total + review.rating,
0
) / demoReviews.length
).toFixed(1);

const visibleReviews = Array.from(
{ length: Math.min(3, demoReviews.length) },
(_, index) =>
demoReviews[
(currentIndex + index) % demoReviews.length
]
);

function showPrevious() {
setCurrentIndex(
(index) =>
(index - 1 + demoReviews.length) % demoReviews.length
);
}

function showNext() {
setCurrentIndex(
(index) => (index + 1) % demoReviews.length
);
}

return (
<> <section className="customer-reviews"> <div className="reviews-header"> <h2>Let customers speak for us</h2> <div className="reviews-header-stars">★★★★★</div> <p>Demo reviews for development</p> </div>

    <p className="demo-notice">
      Preview only — these are fictional sample reviews.
    </p>

    <div className="reviews-grid">
      {visibleReviews.map((review) => (
        <article className="review-card" key={review.id}>
          <div
            className="review-stars"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>

          <h3>{review.title}</h3>

          <p className="review-text">
            {review.reviewText}
          </p>

          <p className="review-customer">
            {review.customerName}
          </p>

          <p className="review-product">
            {review.productName}
          </p>
        </article>
      ))}
    </div>

    <div className="review-controls">
      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous reviews"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Next reviews"
      >
        ›
      </button>
    </div>

    <div className="reviews-summary">
      <span className="verified-check">✓</span>
      <strong>{averageRating}</strong>
      <span className="summary-stars">★★★★★</span>
      <span className="summary-divider" />
      <span>
        Average of {demoReviews.length} demo reviews
      </span>
    </div>
  </section>

  <section className="service-features">
    <article className="service-feature">
      <span className="service-icon" aria-hidden="true">♧</span>
      <h3>Free Shipping</h3>
      <p>Order today, receive tomorrow</p>
    </article>

    <article className="service-feature">
      <span className="service-icon" aria-hidden="true">♙</span>
      <h3>24/7 Support</h3>
      <p>We are here for you</p>
    </article>

    <article className="service-feature">
      <span className="service-icon" aria-hidden="true">♧</span>
      <h3>Premium Quality</h3>
      <p>Created with Premium Quality</p>
    </article>
  </section>
</>

);
}

export default Reviews;
