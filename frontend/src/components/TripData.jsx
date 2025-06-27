import React from 'react';
import AddRating from './AddRating';

// Hold the trip details passed by TripBooking component (Not yet created)

const defaultTripDetails = {
  startTime: "8:00 AM",
  endTime: "8:45 AM",
  location: "Uptown to Midtown",
  budget: "$35.00",
  driverName: "Maria",
  driverAvatar: "https://i.pravatar.cc/150?img=49",
  customerName: "John Doe",
};

function TripData({ tripDetails = defaultTripDetails, onNewRating }) {
  // This component is now dynamic and receives trip data and handlers via props.
  // It passes them down to the AddRating component.
  const handleRatingSubmission = (submittedRating) => {
    console.log("New rating submitted:", submittedRating);
    // If a function is passed as onNewRating, it gets called here.
    if (onNewRating) {
      onNewRating(submittedRating);
    }
  };

  return (
    <div className="trip-page-container">
      <AddRating tripDetails={tripDetails} onNewRating={handleRatingSubmission} />
    </div>
  );
}

export default TripData; 