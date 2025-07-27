import React from "react";
import "../styles/RefundPolicy.css";

const RefundPolicy = () => {
  return (
    <section className="refund-policy">
      <div className="container">
        <h1>Refund Policy</h1>

        <p>
          At <strong>Safe Drive</strong>, we strive to provide reliable and professional
          services that ensure the safety and satisfaction of all our users.
          However, we understand that there may be situations where refunds are
          appropriate. This Refund Policy outlines the conditions under which a
          user may request a refund, as well as our procedures for handling such
          requests.
        </p>

        <h2>1. Eligibility for Refunds</h2>
        <ul>
          <li>Driver No-Show without alternative arrangement.</li>
          <li>Service cancellation by Safe Drive due to operational issues.</li>
          <li>Accidental double booking or overcharging.</li>
          <li>Technical errors resulting in a failed service but charged.</li>
        </ul>

        <h2>2. Non-Refundable Cases</h2>
        <ul>
          <li>Cancellation made less than 2 hours before scheduled time.</li>
          <li>Customer unavailability at pickup time.</li>
          <li>Incorrect booking details submitted by the user.</li>
          <li>Misuse, fraud, or violation of terms and conditions.</li>
        </ul>

        <h2>3. Refund Request Procedure</h2>
        <p>
          To request a refund, email us at <strong>support@safedrive.lk</strong> or use
          the in-app Help Center within <strong>48 hours</strong> of the incident. Include:
        </p>
        <ul>
          <li>Full name and registered email address</li>
          <li>Date and time of the booking</li>
          <li>Reason for the refund request</li>
          <li>Any supporting evidence (e.g., payment confirmation)</li>
        </ul>

        <p>
          Our team will review your request within 3–5 business days and notify
          you of the outcome.
        </p>

        <h2>4. Processing Time</h2>
        <p>
          Approved refunds will be processed back to the original payment method
          within 7–10 business days. Delays may occur depending on your bank or
          card provider.
        </p>

        <h2>5. Policy Changes</h2>
        <p>
          Safe Drive reserves the right to update or modify this Refund Policy at
          any time without prior notice. Any changes will be posted on this page
          with an updated revision date.
        </p>

        <p className="last-updated">Last updated: July 15, 2025</p>
      </div>
    </section>
  );
};

export default RefundPolicy;
