import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const formatPrice = (price) =>
  `Rs. ${Number(price || 0).toLocaleString("en-PK")}.00`;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    postalCode: "",
    address: "",
    saveInfo: false,
    emailOffers: false,
    billingAddress: "same",
    billingFullName: "",
    billingAddressLine: "",
    billingCity: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: event.target.type === "checkbox" ? event.target.checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty. Please add a product first.");
      return;
    }

    if (
      !form.email.trim() ||
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.phone.trim() ||
      !form.city.trim() ||
      !form.address.trim()
    ) {
      setError("Please complete all delivery fields.");
      return;
    }

    const contact = form.email.trim();
    const contactLooksLikePhone = /^\+?[\d\s()-]{10,}$/.test(contact);
    const contactLooksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    if (!contactLooksLikeEmail && !contactLooksLikePhone) {
      setError("Enter a valid email address or mobile phone number.");
      return;
    }

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setError("Please enter a valid phone number.");
      return;
    }

    const order = {
      orderNumber: `EV-${Date.now().toString().slice(-8)}`,
      customer: {
        email: form.email.trim(),
        fullName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        postalCode: form.postalCode.trim(),
      },
      paymentMethod: "Bank Deposit",
      billingAddress: form.billingAddress,
      billingDetails:
        form.billingAddress === "different"
          ? {
              fullName: form.billingFullName.trim(),
              address: form.billingAddressLine.trim(),
              city: form.billingCity.trim(),
            }
          : null,
      items: items.map((item) => ({
        cartKey: item.cartKey,
        name: item.name,
        image: item.image,
        price: Number(item.price),
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      })),
      subtotal: cartTotal,
      total: cartTotal,
      createdAt: new Date().toISOString(),
      status: "Awaiting payment confirmation",
    };

    try {
      sessionStorage.setItem("everlast-last-order", JSON.stringify(order));
    } catch {
      setError("Unable to save your order summary in this browser. Please try again.");
      return;
    }

    clearCart();
    navigate("/order-confirmation", { state: { order } });
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <header className="checkout-brand-header">
          <Link to="/" className="checkout-brand">EVERLAST FRAGRANCES</Link>
        </header>
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add a fragrance before proceeding to checkout.</p>
          <Link to="/men">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <header className="checkout-brand-header">
        <Link to="/" className="checkout-brand">EVERLAST FRAGRANCES</Link>
      </header>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-form-panel">
          <div className="checkout-section-heading">
            <h1>Contact</h1>
            <span>Already have an account? <Link to="/login">Sign in</Link></span>
          </div>
          <label className="checkout-sr-only" htmlFor="email">Email or mobile phone number</label>
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="Email or mobile phone number"
            required
          />

          <label className="checkout-checkbox">
            <input
              name="emailOffers"
              type="checkbox"
              checked={form.emailOffers}
              onChange={handleChange}
            />
            <span>Email me with news and offers</span>
          </label>

          <h2 className="checkout-section-title">Delivery</h2>
          <label className="checkout-sr-only" htmlFor="country">Country/Region</label>
          <select id="country" name="country" defaultValue="Pakistan">
            <option>Pakistan</option>
          </select>

          <div className="checkout-input-row">
            <label className="checkout-sr-only" htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              placeholder="First name"
              required
            />
            <label className="checkout-sr-only" htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              placeholder="Last name"
              required
            />
          </div>

          <label className="checkout-sr-only" htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            autoComplete="street-address"
            placeholder="Address"
            required
          />

          <div className="checkout-input-row">
            <label className="checkout-sr-only" htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              autoComplete="address-level2"
              placeholder="City"
              required
            />
            <label className="checkout-sr-only" htmlFor="postalCode">Postal code (optional)</label>
            <input
              id="postalCode"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              autoComplete="postal-code"
              placeholder="Postal code (optional)"
            />
          </div>

          <label className="checkout-sr-only" htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder="Phone"
            required
          />

          <label className="checkout-checkbox">
            <input
              type="checkbox"
              name="saveInfo"
              checked={form.saveInfo}
              onChange={handleChange}
            />
            <span>Save this information for next time</span>
          </label>

          <h2 className="checkout-section-title">Shipping method</h2>
          <div className="checkout-shipping-option">
            <span>Standard</span>
            <strong>FREE</strong>
          </div>

          <h2 className="checkout-section-title checkout-payment-title">Payment</h2>
          <p className="checkout-secure-note">All transactions are secure and encrypted.</p>
          <div className="checkout-bank-option">
            <strong>Bank Deposit</strong>
            <div className="checkout-bank-details">
              <p>Meezan Digital Bank</p>
              <p>Account title: Sujal</p>
              <p>Account Number: 99330115093503</p>
              <p>IBAN: MEZN99330115093503</p>
              <p className="checkout-bank-disclaimer">
                After completing payment, send a screenshot of your order ID
                and payment receipt on WhatsApp:
                {" "}
                <a
                  href="https://wa.me/923103808186"
                  target="_blank"
                  rel="noreferrer"
                >
                  +92 310 3808186
                </a>
              </p>
              <p>ALL ORDERS WILL BE DELIVERED WITHIN 5 TO 7 WORKING DAYS!</p>
              <p className="checkout-no-cod">🚫 No Cash on Delivery — Advanced Payments Only.</p>
            </div>
          </div>

          <h2 className="checkout-section-title checkout-billing-title">Billing address</h2>
          <fieldset className="checkout-billing-options">
            <label>
              <input
                type="radio"
                name="billingAddress"
                value="same"
                checked={form.billingAddress === "same"}
                onChange={handleChange}
              />
              <span>Same as shipping address</span>
            </label>
            <label>
              <input
                type="radio"
                name="billingAddress"
                value="different"
                checked={form.billingAddress === "different"}
                onChange={handleChange}
              />
              <span>Use a different billing address</span>
            </label>
          </fieldset>

          {form.billingAddress === "different" && (
            <div className="checkout-different-billing">
              <input
                name="billingFullName"
                value={form.billingFullName}
                onChange={handleChange}
                placeholder="Full name"
                required
              />
              <input
                name="billingAddressLine"
                value={form.billingAddressLine}
                onChange={handleChange}
                placeholder="Billing address"
                required
              />
              <input
                name="billingCity"
                value={form.billingCity}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
          )}

          {error && <p className="checkout-error">{error}</p>}

          <button className="checkout-place-order" type="submit">
            Complete order
          </button>

          <Link to="/cart" className="checkout-back-link">
            Return to cart
          </Link>
        </section>

        <aside className="checkout-order-summary">
          {items.map((item) => (
            <div className="checkout-product" key={item.cartKey}>
              <div className="checkout-product-image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/images/products/office-for-men.png";
                  }}
                />
                <span>{item.quantity}</span>
              </div>
              <div className="checkout-product-info">
                <p>{item.name}</p>
                <span>{item.selectedSize || "55 ML"}</span>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="checkout-total-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="checkout-grand-total">
            <span>Total</span>
            <span><small>PKR</small> {formatPrice(cartTotal)}</span>
          </div>
        </aside>
      </form>
    </main>
  );
}