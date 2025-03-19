import React, { useState } from 'react';


interface CarouselProps {
  title: string;
  seeMoreText: string;
}

const Carousel: React.FC<CarouselProps> = ({ title, seeMoreText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/480383234_1167836138033091_2006026388316223725_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGTnT4g0sBcowAJKOOGUq5OkEa6yOQ6nb2QRrrI5DqdvWOjFRbw8l4Q1W4RbnsWaG36YgXdSEGp7nHaS65PR63B&_nc_ohc=gOggyBeiVqMQ7kNvgEsF8iC&_nc_oc=AdhhZGzKYb2IwnxauHUPCOvG0gHycnqH2ohlyQxk5ChspPY9myMeI-v1YBMJx63FHN8&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=SDwoGzVAh3PgUPy8JjPbgA&oh=00_AYHfg2oWuP2WQtSB6ZBlvR9Bsrc7BWjnXadkArpKBiOnVw&oe=67DEFD7A',
    'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/480383234_1167836138033091_2006026388316223725_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGTnT4g0sBcowAJKOOGUq5OkEa6yOQ6nb2QRrrI5DqdvWOjFRbw8l4Q1W4RbnsWaG36YgXdSEGp7nHaS65PR63B&_nc_ohc=gOggyBeiVqMQ7kNvgEsF8iC&_nc_oc=AdhhZGzKYb2IwnxauHUPCOvG0gHycnqH2ohlyQxk5ChspPY9myMeI-v1YBMJx63FHN8&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=SDwoGzVAh3PgUPy8JjPbgA&oh=00_AYHfg2oWuP2WQtSB6ZBlvR9Bsrc7BWjnXadkArpKBiOnVw&oe=67DEFD7A',
    'https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/480383234_1167836138033091_2006026388316223725_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGTnT4g0sBcowAJKOOGUq5OkEa6yOQ6nb2QRrrI5DqdvWOjFRbw8l4Q1W4RbnsWaG36YgXdSEGp7nHaS65PR63B&_nc_ohc=gOggyBeiVqMQ7kNvgEsF8iC&_nc_oc=AdhhZGzKYb2IwnxauHUPCOvG0gHycnqH2ohlyQxk5ChspPY9myMeI-v1YBMJx63FHN8&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=SDwoGzVAh3PgUPy8JjPbgA&oh=00_AYHfg2oWuP2WQtSB6ZBlvR9Bsrc7BWjnXadkArpKBiOnVw&oe=67DEFD7A',
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