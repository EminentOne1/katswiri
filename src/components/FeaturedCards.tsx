import React from 'react';

interface FeaturedCard {
  image: string;
  title: string;
  artist: string;
}

const FeaturedCards: React.FC = () => {
  const featuredCards: FeaturedCard[] = [
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f45dc4de5c2e9eb63f90bea0df9b5dc5432387c7", title: "No campaign", artist: "Dali the rapper" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/347c3a5f146457668e8812a3e5988b0955d7561e", title: "Card 3", artist: "This is the description for Card 3" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b7a322a29bdcddc7fbf67f675ccd522e361ea347", title: "New Track", artist: "Another Artist" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd4cd95d477226b6c9b345cf98a66186c195ec32", title: "New Song", artist: "Morale the rapper" }
  ];

  return (
    <section className="featured-cards">
      {featuredCards.map((card, index) => (
        <div key={index} className="featured-card">
          <img src={card.image} alt={card.title} className="featured-image" />
          <div className="featured-info">
            <h3 className="featured-title">{card.title}</h3>
            <p className="featured-artist">{card.artist}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedCards;