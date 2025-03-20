import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const nav = useNavigate();
  return (
    <div className="logo">
      <img src="/images/home.png" alt="Logo" width={80} onClick={()=>{nav('/')}} />
    </div>
  );
};

export default Logo;
