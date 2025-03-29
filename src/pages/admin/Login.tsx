import React, { useState } from "react";
import { SignInForm } from "../../components/signinform";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = () => {
   
    console.log("Logging in with", email, password);
  };
 React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]); 
  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <SignInForm onSubmit={function (email: string): void {
        throw new Error("Function not implemented.");
      } }/>
    </div>
  );
};

export default Login;
