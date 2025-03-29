import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added import
import { Button } from './button';
import { InputField } from './InputField';

interface SignInFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Added navigation hook

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg('');

    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Failed to sign in');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/admin'); // Navigate to the dashboard after successful login
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="sign-in-title">Sign in to continue</h1>
      <p className="sign-in-description">
        Enter your email address to sign in
      </p>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <InputField
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errorMsg}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errorMsg}
        />
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>} {/* Display error */}
        <Button type="submit" loading={loading}>
          {loading ? 'Signing in...' : 'Continue with SSO'}
        </Button>
      </form>
    </div>
  );
};
