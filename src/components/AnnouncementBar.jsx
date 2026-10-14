import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AnnouncementBar.css";

const messages = [
  "ADVANCED PAYMENTS ONLY",
  "DELIVERY WITHIN 5 TO 7 DAYS",
];

function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rotateMessages = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % messages.length);
    }, 3500);

    return () => clearInterval(rotateMessages);
  }, []);

  return (
    <>
      <div className="announcement-container">
        <div className="announcement-bar">
          <div className="announcement-slider">
            {messages.map((message, index) => (
              <div
                key={message}
                className={`announcement-message ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                {message}
              </div>
            ))}
          </div>
        </div>

        <div className="ticker-placeholder">
          <div className="restock-bar">
            <div className="restock-track">
              {Array.from({ length: 8 }, (_, index) => (
                <span className="ticker-item" key={index}>
                  OFFICE FOR MEN IS RESTOCKED
                </span>
              ))}
            </div>

            <Link to="/men#office-for-men" className="shop-now-button">
              Shop now!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncementBar;