import React from "react";

const LegalLinks: React.FC = () => {
  const links = [
    { icon: "images/privacy.svg", label: "Privacy Policy" },
    { icon: "images/terms.svg", label: "Terms of Service" },
    { icon: "images/cookies.svg", label: "Cookie Usage" },
    { icon: "images/distribution.svg", label: "Distribution Policy" },
  ];

  return (
    <div className="legal-links">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={`#${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="legal-link"
            >
              <img src={link.icon} alt={link.label} />
             
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegalLinks;
