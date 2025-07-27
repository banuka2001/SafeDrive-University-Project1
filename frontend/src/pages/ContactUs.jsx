import React from "react";
import "../styles/ContactUs.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="contact-us">
      <div className="container">
        <h1>Contact Us</h1>

        <p>
          At <strong>Safe Drive</strong>, your feedback, questions, and concerns are very
          important to us. Whether you need support with a booking, want to report
          an issue, or simply have a suggestion—our team is here to help you.
        </p>

        <h2>General Inquiries</h2>
        <p>
          <strong>Email:</strong> info@safedrive.lk<br />
          <strong>Phone:</strong> +94 76 123 4567<br />
          <strong>Hours:</strong> Monday to Friday – 9:00 AM to 6:00 PM
        </p>

        <h2>Customer Support</h2>
        <p>
          <strong>Email:</strong> support@safedrive.lk<br />
          <strong>Live Chat:</strong> Available via app & website, 8:00 AM to 10:00 PM daily
        </p>

        <h2>Payment or Refund Issues</h2>
        <p>
          <strong>Email:</strong> payments@safedrive.lk<br />
          <strong>Note:</strong> Include Booking ID, payment method, and a brief description of the issue.
        </p>

        <h2>Office Address</h2>
        <p>
          Safe Drive (Pvt) Ltd<br />
          Faculty of Applied Sciences,<br />
          Uva Wellassa University,<br />
          Badulla, Sri Lanka
        </p>

        <h2>Follow Us</h2>
        <ul>
          <li>
            <a href="https://facebook.com/safedrive.lk" target="_blank" rel="noopener noreferrer">
              <FaFacebook style={{ verticalAlign: "middle", marginRight: 8 }} /> Facebook
            </a>
          </li>
          <li>
            <a href="https://instagram.com/safedrive.lk" target="_blank" rel="noopener noreferrer">
              <FaInstagram style={{ verticalAlign: "middle", marginRight: 8 }} /> Instagram
            </a>
          </li>
          <li>
            <a href="https://twitter.com/safedrive_lk" target="_blank" rel="noopener noreferrer">
              <FaTwitter style={{ verticalAlign: "middle", marginRight: 8 }} /> Twitter
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactUs;
