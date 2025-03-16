// src/SEO.js
import React, { useEffect } from "react";



const SEO: React.FC<{ title: string; description: string; image: string }> = ({ title, description, image }) => {//+
  useEffect(() => {
    document.title = title;

    document.querySelector('meta[name="description"]')?.setAttribute("content", description);//+
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);//+
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);//+
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", image);//+
  }, [title, description, image]);

  return null;
};



export default SEO;
