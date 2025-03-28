import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  loading: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type, loading, children }) => {
  return (
    <button
      type={type}
      className={`sign-in-button ${loading ? 'loading' : ''}`}
      disabled={loading}
    >
      <span>{children}</span>
      {loading && (
        <svg className="spinner" viewBox="0 0 24 24">
          <circle
            className="spinner-track"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="spinner-head"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </button>
  );
};
