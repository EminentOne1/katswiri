import React from 'react';

interface ProfilePictureProps {
  src: string;
  alt: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="profile-picture" />
  );
};

export default ProfilePicture;