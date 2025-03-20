import React from "react";

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
            <h3 style={{ fontSize: "13px" }} className="card-title">
              {card.title}
            </h3>
            <p style={{ fontSize: "10px" }} className="card-description">
              {card.id === 1 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#000",
                      borderRadius: "4px",
                      padding: "3px",
                      width: "20px",
                      color: "white",
                    }}
                  >
                    <b>K</b>
                  </span>
                  {card.description}
                </div>
              ) : (
                card.description
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default ScrollableCards;
