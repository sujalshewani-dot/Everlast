import { Link, useLocation, Navigate } from "react-router-dom";
import "./OrderConfirmation.css";

const formatPrice = (price) =>
  `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

export default function OrderConfirmation() {
  const location = useLocation();

  let savedOrder = null;

  try {
    const saved = sessionStorage.getItem("everlast-last-order");
    savedOrder = saved ? JSON.parse(saved) : null;
  } catch {
    savedOrder = null;
  }

  const order = location.state?.order || savedOrder;

  if (!order) {
    return <Navigate to="/men" replace />;
  }

  return (
    <main className="order-confirmation-page">
      <div className="order-confirmation-card">
        <div className="order-confirmation-check" aria-hidden="true">
          ✓
        </div>

        <p className="order-confirmation-eyebrow">EVERLAST FRAGRANCES</p>
        <h1>Thank you for your order!</h1>
        <p className="order-confirmation-message">
          Your order reference is ready. Complete the bank transfer, then send
          your order ID and payment receipt using the WhatsApp link below.
        </p>

        <div className="order-confirmation-number">
          <span>Order reference</span>
          <strong>{order.orderNumber}</strong>
        </div>

        <section className="confirmation-section">
          <h2>Delivery Details</h2>
          <p><strong>{order.customer.fullName}</strong></p>
          {order.customer.email && <p>{order.customer.email}</p>}
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.city}</p>
          <p>Payment: {order.paymentMethod}</p>
          <p>Status: {order.status}</p>
        </section>

        <section className="confirmation-section confirmation-payment">
          <h2>Bank Deposit Details</h2>
          <p>Meezan Digital Bank</p>
          <p>Account title: Sujal</p>
          <p>Account Number: 99330115093503</p>
          <p>IBAN: MEZN99330115093503</p>
          <p>
            After completing payment, send a screenshot of your order ID and
            payment receipt on WhatsApp.
          </p>
          <a
            href={`https://wa.me/923103808186?text=${encodeURIComponent(
              `Order ID: ${order.orderNumber}. Total: PKR ${Number(order.total).toLocaleString("en-PK")}. I am sending my payment receipt.`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp: +92 310 3808186
          </a>
          <p>All orders will be delivered within 5 to 7 working days!</p>
          <p>No Cash on Delivery — Advanced Payments Only.</p>
        </section>

        <section className="confirmation-section">
          <h2>Order Summary</h2>

          {order.items.map((item) => (
            <div className="confirmation-item" key={item.cartKey}>
              <img
                src={item.image}
                alt={item.name}
                onError={(event) => {
                  event.currentTarget.src =
                    "/images/products/office-for-men.png";
                }}
              />
              <div>
                <p>{item.name}</p>
                <span>
                  {item.selectedSize ? `${item.selectedSize} · ` : ""}
                  Quantity: {item.quantity}
                </span>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}

          <div className="confirmation-total">
            <span>Total</span>
            <strong>{formatPrice(order.total)}</strong>
          </div>
        </section>

        <p className="order-confirmation-disclaimer">
          This is a demo checkout. The order has not been sent to a store
          server, and no payment or delivery has been processed.
        </p>

        <Link to="/" className="confirmation-continue-button">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}