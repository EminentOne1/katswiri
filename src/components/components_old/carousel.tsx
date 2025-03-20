import React, { useState } from 'react';


interface CarouselProps {
  title: string;
  seeMoreText: string;
}

const Carousel: React.FC<CarouselProps> = ({ title, seeMoreText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://placehold.co/600x400/000000/FFFFFF/png",
    "https://placehold.co/600x400/000000/FFFFFF/png",
    "https://placehold.co/600x400/000000/FFFFFF/png"

  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      
      <div className="carousel">
        <button className="arrow left-arrow" onClick={goToPrevious}>
          &larr;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
           
        />
        <button className="arrow right-arrow" onClick={goToNext}>
          &rarr;
        </button>
      </div>
    
    </div>
  );
};

export default Carousel;