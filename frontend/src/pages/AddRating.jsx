import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../styles/AddRating.css';

const TripInfoCard = (props) => (
    <Card className="mb-4 shadow">
        <Card.Body>
            <div className="d-flex align-items-center">
                <img
                    src={props.driver_avatar}
                    alt={props.driver_name}
                    className="rounded-circle"
                    style={{ width: '80px', height: '80px', marginRight: '20px' }}
                />
                <div>
                    <h4 className="fw-bold mb-2">{props.driver_name}</h4>
                    <div className="text-muted">
                        <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-calendar-event me-2"></i>
                            <span>{new Date().toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}</span>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-clock me-2"></i>
                            <span>{props.start_time} - {props.end_time}</span>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-geo-alt me-2"></i>
                            <span>{props.location}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-cash me-2"></i>
                            <span>{props.budget}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Body>
    </Card>
);

const RatingStars = (props) => (
    <Card className="mb-4 shadow">
        <Card.Body className="text-center">
            <h5 className="card-title fw-bold">How was your ride?</h5>
            <p className="card-text text-muted">Tap a star to rate your experience</p>
            <div className="my-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <i
                        key={star}
                        className={`bi bi-star-fill fs-1 mx-1`}
                        style={{
                            cursor: 'pointer',
                            color: star <= (props.hoverRating || props.rating) ? '#ffc107' : '#e4e5e9',
                            transition: 'color 0.2s'
                        }}
                        onClick={() => props.setRating(star)}
                        onMouseEnter={() => props.setHoverRating(star)}
                        onMouseLeave={() => props.setHoverRating(0)}
                    ></i>
                ))}
            </div>
            <p className="text-muted">Select a rating</p>
        </Card.Body>
    </Card>
);

const FeedbackForm = (props) => (
    <Card className="mb-4 shadow">
        <Card.Body>
            <h5 className="card-title fw-bold">Share your experience</h5>
            <p className="card-text text-muted">Tell us about your trip. Your feedback helps us maintain high service standards.</p>
            <Form.Group>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder={`How was your experience with ${props.driver_name}? Was the car clean? Did you feel safe? Any suggestions for improvement?`}
                    value={props.feedback}
                    onChange={props.handleFeedbackChange}
                    required
                    style={{ resize: 'none' }}
                />
                <Form.Text className="text-muted d-block text-end mt-1">
                    {props.feedback.length}/500 characters
                </Form.Text>
            </Form.Group>
        </Card.Body>
    </Card>
);

const AddRating = (props) => {
    const { onNewRating, tripDetails } = props;
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleFeedbackChange = (event) => {
        if (event.target.value.length <= 500) {
            setFeedback(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (rating > 0 && feedback) {
            const transformedRating = {
                name: tripDetails.customerName,
                avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
                rating: rating,
                testimonial: `"${feedback}"`,
            };
            onNewRating(transformedRating);
            navigate('/');
        } else {
            alert('Please select a rating and provide feedback before submitting.');
        }
    };

    return (
        <div className="add-rating-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8} xl={6}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Rate Your Trip</h2>
                            <p className="text-muted">Help us improve by rating your recent experience</p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <TripInfoCard
                                driver_name={tripDetails.driverName}
                                driver_avatar={tripDetails.driverAvatar}
                                start_time={tripDetails.startTime}
                                end_time={tripDetails.endTime}
                                location={tripDetails.location}
                                budget={tripDetails.budget}
                            />

                            <RatingStars
                                rating={rating}
                                hoverRating={hoverRating}
                                setRating={setRating}
                                setHoverRating={setHoverRating}
                            />

                            <FeedbackForm
                                driver_name={tripDetails.driverName}
                                feedback={feedback}
                                handleFeedbackChange={handleFeedbackChange}
                            />

                            <div className="d-grid">
                                <Button type="submit" variant="primary" size="lg" style={{ backgroundColor: '#5D9CEC', borderColor: '#5D9CEC' }}>
                                    <i className="bi bi-send me-2"></i>
                                    Submit Rating & Feedback
                                </Button>
                            </div>
                        </Form>
                        <p className="text-center text-muted mt-3 small">
                            Your feedback will be displayed on Home Page and helps improve our service quality
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddRating; 