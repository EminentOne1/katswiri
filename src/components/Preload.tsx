import React, { useState, useEffect } from "react";

const Preload: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulate a 3-second loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", position: "relative" }}>
        <div
          style={{
            width: "120px",
            height: "120px",
            border: "5px solid rgba(0, 0, 0, 0.1)",
            borderTop: "5px solid #000",
            borderRadius: "50%",
            animation: "spin 2s linear infinite",
            position: "absolute",
          }}
        ></div>
        <img
          src="/images/home.png" // Replace with the path to your logo
          alt="Loading..."
          
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return <>{children}</>;
};

export default Preload;
