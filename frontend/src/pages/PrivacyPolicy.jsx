import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Title Section */}
      <div className="title ">
        <h1>
          <span className="ab">Privacy and </span>
          <span className="privacy">Policy</span>
        </h1>
      </div>

      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">1. Information We</span>
                  <span className="privacy1"> Collect</span>
                </h4>
                <p>We collect the following types of information:</p>

                <h3>1.1 Personal Information</h3>
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Contact number</li>
                  <li>National Identification Number (NIC) or driver’s license</li>
                  <li>Profile photograph</li>
                  <li>Vehicle registration number and vehicle photos</li>
                  <li>Payment card information</li>
                </ul>

                <h3>1.2 Usage Data</h3>
                <ul>
                  <li>Pages visited</li>
                  <li>Time and date of visits</li>
                  <li>Click activity</li>
                  <li>Referring/exit pages</li>
                  <li>Device type and browser used</li>
                </ul>

                <h3>1.3 Booking & Trip Information</h3>
                <ul>
                  <li>Pickup and drop-off locations</li>
                  <li>Scheduled dates and times</li>
                  <li>Driver assignment and trip history</li>
                  <li>QR codes generated for each trip</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">2. How We Use</span>
                  <span className="privacy1"> Your Information</span>
                </h4>
                <p>We use your data for the following purposes:</p>
                <ul>
                  <li>
                    Account Creation & Verification: To register customers,
                    drivers and admins securely.
                  </li>
                  <li>
                    Trip Booking & Management: To schedule rides, assign
                    drivers, and track bookings.
                  </li>
                  <li>
                    Driver-Customer Matching: To recommend suitable drivers based
                    on availability, proximity, and ratings.
                  </li>
                  <li>
                    QR Code Identity Checks: To ensure the identity of the
                    customer before starting a ride.
                  </li>
                  <li>
                    Payment Processing: To facilitate secure, cashless
                    transactions through third-party payment gateways.
                  </li>
                  <li>
                    Notifications & Communication: To send booking updates,
                    driver statuses, or alerts related to system activity.
                  </li>
                  <li>
                    Support Services: To provide assistance via admin-to-driver
                    messaging features.
                  </li>
                  <li>
                    Security & Compliance: To detect suspicious activity, prevent
                    fraud, and comply with applicable legal obligations.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">3. How We Share </span>
                  <span className="privacy1"> Your Information</span>
                </h4>
                <p>
                  We do <b>not sell</b> your personal information. We may share
                  your information with:
                </p>
                <ul>
                  <li>
                    Verified Drivers: Only your name, location, and vehicle data
                    related to your booking.
                  </li>
                  <li>
                    Payment Processors: To complete secure transactions. We do
                    not store card details ourselves.
                  </li>
                  <li>
                    University Supervisors: For academic or project evaluation
                    purposes.
                  </li>
                  <li>
                    Legal Authorities: If required by law or to protect platform
                    users and integrity.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">4. Use of</span>
                  <span className="privacy1"> Cookies</span>
                </h4>
                <p>We use cookies for:</p>
                <ul>
                  <li>Maintaining user sessions</li>
                  <li>Remembering preferences</li>
                  <li>Enhancing performance</li>
                </ul>
                <p>You can disable cookies in your browser settings.</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">5. Data </span>
                  <span className="privacy1"> Security</span>
                </h4>

                <p>
                  We implement strong security measures to protect your data:
                </p>

                <ul>
                  <li>HTTPS secure connections</li>
                  <li>Password hashing and encryption</li>
                  <li>Role-based access control (admin, driver, customer)</li>
                  <li>
                    Protection from SQL injection and cross-site scripting (XSS)
                  </li>
                  <li>Enforced session expiration and token validation</li>
                  <li>Regular security audits and server maintenance</li>
                </ul>

                <p>
                  Despite our efforts, no digital platform can be 100% secure.
                  Users are responsible for keeping their passwords and login
                  details confidential.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">6. Your</span>
                  <span className="privacy1"> Rights</span>
                </h4>

                <p>As a user, you have the right to:</p>

                <ul>
                  <li>Access: Request a copy of your data.</li>
                  <li>
                    Rectify: Request corrections to inaccurate or outdated
                    information.
                  </li>
                  <li>Delete: Request deletion of your account and personal data.</li>
                  <li>
                    Withdraw consent: Stop us from processing your information
                    (where applicable).
                  </li>
                  <li>
                    Object: Challenge certain data uses if based on our
                    legitimate interest.
                  </li>
                  <li>
                    Portability: Request a machine-readable copy of your data.
                  </li>
                </ul>

                <p>
                  All requests will be honored within *30 working days* unless
                  legal exceptions apply.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">7. Changes to </span>
                  <span className="privacy1"> This Policy</span>
                </h4>
                <p>
                  We may update this Privacy Policy periodically to reflect
                  changes in laws, features, or user feedback. Significant
                  updates will be notified via email or displayed prominently on
                  the platform.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="card">
              <Card.Body className="card-privacy">
                <h4>
                  <span className="ab-privacy">8. Contact</span>
                  <span className="privacy1"> Us</span>
                </h4>
                <p>
                  If you have any questions or concerns regarding this policy,
                  please contact us:
                  <br />
                  <br />
                  <strong>Email:</strong> support@safedrive.com
                  <br />
                  <strong>Phone:</strong> +94 71 958 0948
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
