import React, { useState } from "react";
import { SignInForm } from "../../components/signinform";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add login logic here
    console.log("Logging in with", email, password);
  };

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
