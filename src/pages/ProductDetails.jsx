import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allProducts, getProductByRouteId } from "../data/allProducts";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const formatPrice = (price) =>
  `Rs. ${Number(price || 0).toLocaleString("en-PK")}.00 PKR`;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("55 ML");
  const [selectedImage, setSelectedImage] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const product = getProductByRouteId(id);
  const galleryImages = product ? [product.image] : [];

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product not found</h1>
        <p>This fragrance may have been moved or is unavailable.</p>
        <Link to="/men">Continue shopping</Link>
      </main>
    );
  }

  const soldOut = Boolean(product.soldOut);
  const selectedPrice =
    selectedSize === "110 ML" ? product.price * 2 : product.price;
  const cartItem = items.find(
    (item) =>
      item.routeId === product.routeId && item.selectedSize === selectedSize
  );
  const activeImage = selectedImage || galleryImages[0] || product.image;
  const categoryPath =
    product.category === "women"
      ? "/women"
      : product.category === "premium"
        ? "/premium-signature"
        : product.category === "new"
          ? "/new-arrivals"
          : "/men";
  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.routeId !== product.routeId &&
        item.category !== "home" &&
        !item.soldOut
    )
    .slice(0, 4);

  function handleAddToCart() {
    if (soldOut) return;
    addToCart({ ...product, price: selectedPrice, selectedSize }, quantity);
    navigate("/cart");
  }

  function handleBuyNow() {
    if (soldOut) return;
    addToCart({ ...product, price: selectedPrice, selectedSize }, quantity);
    navigate("/checkout");
  }

  async function handleShare() {
    try {
      const shareUrl = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: product.name, url: shareUrl });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("Product link copied.");
      } else {
        setShareMessage("Sharing is not available in this browser.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setShareMessage("Unable to share this product right now.");
      }
    }
  }

  return (
    <main className="product-details-page">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={categoryPath}>{product.category} fragrances</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-details-layout">
        <div className="product-details-gallery">
          <div className="product-details-image-wrap">
            {soldOut && <span className="product-details-soldout">Sold out</span>}
            <img
              className="product-details-image"
              src={activeImage}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = "/images/products/office-for-men.png";
              }}
            />
          </div>
          <div className="product-details-thumbnails">
            {galleryImages.map((image, index) => (
              <button
                type="button"
                className={`product-details-thumbnail${activeImage === image ? " is-selected" : ""}`}
                key={`${image}-${index}`}
                onClick={() => setSelectedImage(image)}
                aria-label={`Show product image ${index + 1}`}
                aria-pressed={activeImage === image}
              >
                <img src={image} alt="" />
              </button>
            ))}
            <div className="product-details-information-tile">
              <span>EVERLAST FRAGRANCES</span>
              <strong>{selectedSize}</strong>
              <small> Eau de Parfum</small>
            </div>
            <div className="product-details-information-tile product-how-to-wear">
              <span>HOW TO WEAR</span>
              <strong>YOUR SCENT</strong>
              <small>Apply to pulse points</small>
            </div>
          </div>
        </div>

        <div className="product-details-info">
          <p className="product-details-brand">EVERLAST FRAGRANCES</p>
          <h1>{product.name}</h1>

          <p className="product-details-price">{formatPrice(selectedPrice)}</p>
          <a className="product-details-tax-link" href="#product-description">
            Shipping calculated at checkout.
          </a>

          <fieldset className="product-size-selector">
            <legend>Size</legend>
            {["55 ML", "110 ML"].map((size) => (
              <button
                type="button"
                className={selectedSize === size ? "is-selected" : ""}
                key={size}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </fieldset>

          <div className="product-quantity product-details-quantity">
            <span>Quantity {cartItem ? `(In cart: ${cartItem.quantity})` : ""}</span>
            <div className="product-quantity-control">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={quantity <= 1 || soldOut}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
                disabled={soldOut}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="product-add-button"
            onClick={handleAddToCart}
            disabled={soldOut}
          >
            {soldOut ? "Sold Out" : "Add to Cart"}
          </button>

          <button
            type="button"
            className="product-buy-button"
            onClick={handleBuyNow}
            disabled={soldOut}
          >
            Buy It Now
          </button>

          <div className="product-details-description" id="product-description">
            Discover your signature scent with Everlast Fragrances. A carefully
            selected fragrance for your everyday style and special occasions.
          </div>

          {product.bottleLabel && (
            <p className="product-details-note">
              Premium Edition fragrance
            </p>
          )}

          <div className="product-details-benefits">
            <span>Free Shipping</span>
            <span>Lower Cost than Others</span>
            <span>80% to 90% similar notes</span>
          </div>

          <p className="product-details-reviews">
            <span aria-label="5 stars">★★★★★</span>
            {product.reviews > 0 ? `${product.reviews} reviews` : "No reviews"}
          </p>
          <button
            type="button"
            className="product-share-button"
            onClick={handleShare}
          >
            ↗ Share
          </button>
          {shareMessage && (
            <span className="product-share-message" role="status">
              {shareMessage}
            </span>
          )}
        </div>
      </section>

      <section className="product-recommendations">
        <h2>You may also like</h2>
        <div className="product-recommendations-grid">
          {relatedProducts.map((item) => (
            <Link
              className="product-recommendation-card"
              to={`/product/${item.routeId}`}
              key={item.routeId}
            >
              <img src={item.image} alt={item.name} loading="lazy" />
              <span>{item.name}</span>
              <span className="recommendation-rating">★★★★★ · {item.reviews || 0} reviews</span>
              <strong>{formatPrice(item.price)}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="product-customer-reviews">
        <h2>Customer Reviews</h2>
        <p>★★★★★</p>
        <span>{product.reviews || 0} reviews for {product.name}</span>
      </section>
    </main>
  );
}