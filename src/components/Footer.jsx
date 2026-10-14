import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
return (
<> <footer className="everlast-footer"> <div className="footer-description"> <p className="footer-brand-text"> <strong>At Everlast Fragrances,</strong> we believe every
moment deserves a signature scent. Discover fragrances
crafted to inspire confidence, express individuality,
and leave a lasting impression. </p>

      <p className="footer-support-text">
        <strong>For any queries or support,</strong> please feel
        free to get in touch with us. We're always happy to help.
      </p>

      <p className="footer-contact">
        Email:{" "}
        <a href="mailto:everlastfragrances@gmail.com">
          everlastfragrances@gmail.com
        </a>
      </p>

      <p className="footer-contact">
        Contact us at whatsapp no:{" "}
        <a
          href="https://wa.me/923283383607"
          target="_blank"
          rel="noreferrer"
        >
          03283383607
        </a>
      </p>

      <div className="footer-newsletter">
        <h3>Sign Up To Receive Exclusive Offers</h3>

        <form
          className="footer-email-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email"
            aria-label="Email address"
            required
          />

          <button type="submit" aria-label="Subscribe">
            →
          </button>
        </form>
      </div>
    </div>

    <nav className="footer-links" aria-label="Footer links">
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/about">About us</Link>
      <Link to="/why-everlast">Why Everlast Fragrances?</Link>
      <Link to="/shipping">Shipping Policy</Link>
      <Link to="/terms">Terms of Service</Link>
      <Link to="/refund-policy">Refund Policy</Link>
      <Link to="/community">Join Everlast Community</Link>
    </nav>



    <div className="footer-social footer-social-bottom">
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <span className="facebook-icon">f</span>
      </a>

      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="instagram-icon"
      >
        ◎
      </a>
    </div>
  </footer>

  <a
    className="whatsapp-chat"
    href="https://wa.me/923283383607"
    target="_blank"
    rel="noreferrer"
  >
    <span className="whatsapp-symbol">◉</span>
    <span>Chat with us</span>
  </a>
</>

);
}

export default Footer;
