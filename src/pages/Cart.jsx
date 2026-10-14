import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const formatPrice = (price) =>
  `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <h1>Your cart is empty</h1>
          <p>You haven't added any fragrances to your cart yet.</p>
          <Link to="/men" className="cart-continue-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1 className="cart-heading">Your Shopping Cart</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.cartKey}>
              <Link
                to={`/product/${item.routeId}`}
                className="cart-item-image-link"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(event) => {
                    event.currentTarget.src =
                      "/images/products/office-for-men.png";
                  }}
                />
              </Link>

              <div className="cart-item-info">
                <Link
                  to={`/product/${item.routeId}`}
                  className="cart-item-name"
                >
                  {item.name}
                </Link>

                <p className="cart-item-price">
                  {formatPrice(item.price)}
                </p>
                {item.selectedSize && (
                  <p className="cart-item-size">{item.selectedSize}</p>
                )}

                <div className="cart-item-actions">
                  <div className="cart-quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.cartKey, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.cartKey, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => removeFromCart(item.cartKey)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="cart-item-subtotal">
                {formatPrice(Number(item.price) * item.quantity)}
              </p>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <div className="cart-summary-row">
            <span>Delivery</span>
            <span>Confirmed at checkout</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <p className="cart-summary-note">
            Delivery charges, if applicable, will be confirmed before the order
            is placed.
          </p>

          <button
            type="button"
            className="cart-checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <Link to="/men" className="cart-continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}