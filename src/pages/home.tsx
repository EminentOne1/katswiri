import React from "react";
import {Helmet  } from "react-helmet-async";
import SEO from "../utils/seo";
import Logo from "../components/logo";

const Home = () => {
  return (

    <>
     <SEO
      title="Home | katswiri"
      description="Learn more about My Awesome App!"
      image="images/logo.png"
    />
 

    </>
  );
};


export default Home;
