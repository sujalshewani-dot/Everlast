import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend testing only; connect a backend to send messages.
    console.log("Contact form submitted:", formData);
    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      comment: "",
    });
  };

  return (
    <main className="contact-container">
      <h1 className="contact-title">Contact</h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row full-width">
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row full-width">
          <div className="input-group">
            <textarea
              name="comment"
              placeholder="Comment"
              rows={6}
              value={formData.comment}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Send
        </button>
      </form>
    </main>
  );
}