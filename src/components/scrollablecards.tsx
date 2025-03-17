import React from 'react';


interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface ScrollableCardsProps {
  cards: Card[];
}

const ScrollableCards: React.FC<ScrollableCardsProps> = ({ cards }) => {
  return (
    <div className="scrollable-cards-container">
      <div className="cards-wrapper">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;