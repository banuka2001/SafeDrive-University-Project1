import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/About.css";
const team = [
  {
    name: "P. A. D. B. Dilshan",
    role: "Frontend Developer",
    
  },
  {
    name: "R. P. Nanayakkara",
    role: "UI/UX Designer",
   
    
  },
  {
    name: "K. N. O. Nethsara",
    role: "Backend Developer",
    
  },
  {
    name: "A. A. J. M. H. E. Aluvihare",
    role: "Project Manager",
    
  }
];

const About = () => {
  return (
    <div className="about-us-container">
      <div className="about-banner">
        <div className="main-title">
          <h1>
            <span className="ab">About </span>
            <span className="safe">Safe Drive</span>
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-about">
        <h4 className="hero-h4">
          We're a team of undergraduates from Uwa Wellassa University on a
          mission to make roads safer by preventing
          <br />
          drunk driving incidents through our project.
        </h4>
      </div>

      {/* What is Safe Drive? */}
      <div className="common">
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Card className="about-card">
              <Card.Body>
                <h3 className="section-title">
                  <span className="ab1">What is </span>
                  <span className="safe1">Safe Drive?</span>
                </h3>
                <p>
                  Safe Drive is a web-based application that allows users to
                  schedule professional drivers to take them and their vehicles
                  home safely after parties or social events.
                  <br />
                  It bridges the gap where users cannot drive due to alcohol
                  consumption, offering a secure and convenient alternative.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Why We Built This */}
      <div className="common">
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className="about-card">
              <Card.Body>
                <h3 className="section-title">
                  <span className="ab1">Why We </span>
                  <span className="safe1">Built This?</span>
                </h3>
                <p>
                  We observed that many individuals drive their own vehicles to
                  parties and are left with no safe option after drinking.
                  <br />
                  Unlike regular ride apps, Safe Drive ensures both the person
                  and their vehicle get home safely.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Aim Section */}
      <div className="common">
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className="about-card">
              <Card.Body>
                <h3 className="section-title">
                  <span className="ab1">Our </span>
                  <span className="safe1">Aim</span>
                </h3>
                <p>
                  To build a secure and user-friendly platform for booking
                  responsible drivers who can ensure users and their vehicles
                  reach home safely, particularly when they are unfit to drive
                  themselves.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Goal Section */}
      <div className="common">
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Card className="about-card">
              <Card.Body>
                <h3 className="section-title">
                  <span className="ab1">Our </span>
                  <span className="safe1">Goal</span>
                </h3>
                <p>
                  To reduce the number of drunk driving incidents in Sri Lanka,
                  saving lives and protecting communities.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <br />

      {/* Team Section */}
      <Container className="team-members">
        <h2 className="text-center mb-4 section-title">
          <span className="ab1">Our </span>
          <span className="safe1">Team</span>
        </h2>
        <Row>
          {team.map((member, idx) => (
            <Col md={3} sm={6} xs={12} key={idx} className="mb-4">
              <Card className="h-100 text-center shadow team-card">
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text>{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Technologies Section */}
      <div className="tech-strip text-center py-4"></div>
    </div>
  );
};

export default About;
