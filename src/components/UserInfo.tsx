import React from 'react';

const UserInfo: React.FC = () => {
  return (
    <div className="user-info">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1279544042229a59bcc7ae2f20b91a0efd25d281" alt="User" className="user-avatar" />
      <div className="user-details">
        <h2 className="user-greeting">Please Login</h2>
        <p className="user-message">For a more personalized experience</p>
      </div>
    </div>
  );
};

export default UserInfo;