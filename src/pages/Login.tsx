import React from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    // Logic for Google login
    console.log("Google login clicked");
  };

  const handleSSOLogin = () => {
 
    console.log("SSO login clicked");
  };

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <p>Please log in to access your account</p>
      <div className="login-buttons">
        <button className="google-login" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <button className="sso-login" onClick={handleSSOLogin}>
          Login with SSO
        </button>
      </div>
      <div className="additional-login-methods">
        <p>Other login methods coming soon...</p>
      </div>
    </div>
  );
};

export default Login;
