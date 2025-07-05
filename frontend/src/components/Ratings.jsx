import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Ratings.css';

export const ratingsData = [
  {
    name: 'Rahul Perera',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    testimonial: '"Safe Drive has been a game-changer for me. I can enjoy nights out with friends without worrying about how I\'ll get home. Their drivers are professional and courteous."',
  },
  {
    name: 'Amali Fernando',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    testimonial: '"As a woman, safety is my top priority when traveling at night. Safe Drive gives me peace of mind knowing I\'ll get home safely in my own car. Highly recommend!"',
  },
  {
    name: 'Dinesh Jayawardena',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    testimonial: '"I use Safe Drive for business dinners when I know I\'ll be having drinks. The app is easy to use, drivers arrive promptly, and the service is worth every rupee."',
  },
  {
    name: 'Saman Kumara',
    avatar: 'https://i.pravatar.cc/150?img=4',
    rating: 5,
    testimonial: '"The best driver service in town! Always on time and very reliable. I use it for all my airport transfers."',
  },
  {
    name: 'Fathima Rizwan',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    testimonial: '"A great service for families. We used Safe Drive for a family trip, and the driver was very accommodating with our kids."',
  },
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=6',
    rating: 4,
    testimonial: '"I was impressed with the professionalism of the drivers. The cars are clean and comfortable. Highly recommended for corporate travel."',
  }
];

const Star = (props) => {
  const { filled } = props;
  return <span className={filled ? 'star filled' : 'star'}>&#9733;</span>
};

const Ratings = (props) => {
  const { ratings } = props;
  const chunkedRatings = [];
  const dataToUse = ratings || ratingsData;
  for (let i = 0; i < dataToUse.length; i += 3) {
    chunkedRatings.push(dataToUse.slice(i, i + 3));
  }

  return (
    <div className="ratings-container">
      <h2 className="ratings-title">What Our Users Say</h2>
      <p className="ratings-subtitle">
        Don't just take our word for it. Here's what people who've used Safe Drive have to say.
      </p>
      <Carousel 
        nextIcon={<i className="bi bi-caret-right-fill"></i>}
        prevIcon={<i className="bi bi-caret-left-fill"></i>}
      >
        {chunkedRatings.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {chunk.map((rating, i) => (
                <div className="rating-card shadow mx-2" key={i}>
                  <div className="rating-card-header">
                    <img src={rating.avatar} alt={rating.name} className="rating-avatar" />
                    <div>
                      <p className="rating-name">{rating.name}</p>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star key={starIndex} filled={starIndex < rating.rating} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="rating-testimonial">{rating.testimonial || rating.feedback}</p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Ratings; 