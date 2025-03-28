"use client";
import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <div className="profile">
        <img
          src="/images/home.png"
          alt="Admin profile"
          className="profile-image"
        />

      </div>

      <div className="nav-links">
        <a href="/dashboard" className="nav-item active" aria-current="page">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.25 3.75H3.75C2.92157 3.75 2.25 4.42157 2.25 5.25V18.75C2.25 19.5784 2.92157 20.25 3.75 20.25H20.25C21.0784 20.25 21.75 19.5784 21.75 18.75V5.25C21.75 4.42157 21.0784 3.75 20.25 3.75ZM3.75 5.25H20.25V9H3.75V5.25ZM20.25 18.75H10.5V10.5H20.25V18.75Z"
              fill="white"
            />
          </svg>
          <span>Dashboard</span>
        </a>

        <a href="#" className="nav-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.7156 5.28188L12.2156 3.03187C11.9886 2.96372 11.7427 3.00692 11.5524 3.14839C11.3622 3.28986 11.2501 3.51294 11.25 3.75V13.8994C9.66713 12.4836 7.30995 12.3672 5.59523 13.62C3.88052 14.8728 3.27507 17.1539 4.14279 19.0922C5.01051 21.0305 7.11519 22.0983 9.1918 21.6538C11.2684 21.2094 12.7516 19.3736 12.75 17.25V9.25781L19.2844 11.2181C19.5114 11.2863 19.7573 11.2431 19.9476 11.1016C20.1378 10.9601 20.2499 10.7371 20.25 10.5V6C20.2499 5.66892 20.0327 5.37706 19.7156 5.28188ZM8.25 20.25C6.59315 20.25 5.25 18.9069 5.25 17.25C5.25 15.5931 6.59315 14.25 8.25 14.25C9.90685 14.25 11.25 15.5931 11.25 17.25C11.25 18.9069 9.90685 20.25 8.25 20.25ZM18.75 9.49219L12.75 7.69219V4.75781L18.75 6.5625V9.49219Z"
              fill="white"
            />
          </svg>
          <span>Music Tracks</span>
        </a>

        <a href="#" className="nav-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.7443 6.61758 17.3824 2.25568 12 2.25ZM15.675 11.25C15.5784 10.7814 15.3925 10.3358 15.1275 9.9375L18.3366 6.7275C19.4078 8.01016 20.062 9.58929 20.2116 11.2537L15.675 11.25ZM14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12Z"
              fill="white"
            />
          </svg>
          <span>Albums</span>
        </a>

        <a href="#" className="nav-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.75 1.5C12.0236 1.50362 9.00362 4.52358 9 8.25C9.00069 8.54534 9.02042 8.84033 9.05906 9.13313L2.5425 18.0206C2.1016 18.6169 2.16507 19.4465 2.69156 19.9688L4.03125 21.3084C4.55354 21.8349 5.38306 21.8984 5.97937 21.4575L14.8678 14.9391C15.1603 14.9783 15.4549 14.9987 15.75 15C19.4779 15 22.5 11.9779 22.5 8.25C22.5 4.52208 19.4779 1.5 15.75 1.5Z"
              fill="white"
            />
          </svg>
          <span>Artists</span>
        </a>

        <a href="#" className="nav-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9922 14.805C13.0561 13.431 13.9769 10.8677 13.2592 8.49441C12.5414 6.12114 10.3544 4.49772 7.875 4.49772C5.39558 4.49772 3.20857 6.12114 2.49084 8.49441C1.7731 10.8677 2.69393 13.431 4.75781 14.805C2.93952 15.4752 1.38666 16.7153 0.330938 18.3403C0.179932 18.5647 0.161484 18.8531 0.28266 19.095C0.403836 19.3368 0.645857 19.4947 0.916031 19.5081C1.18621 19.5215 1.44266 19.3884 1.58719 19.1597C2.97076 17.0317 5.33677 15.7479 7.875 15.7479C10.4132 15.7479 12.7792 17.0317 14.1628 19.1597C14.3917 19.4999 14.8514 19.5932 15.1948 19.3692C15.5382 19.1452 15.6381 18.6869 15.4191 18.3403C14.3633 16.7153 12.8105 15.4752 10.9922 14.805Z"
              fill="white"
            />
          </svg>
          <span>Users</span>
        </a>

      </div>
     
        <button id="log-out" className="nav-item" onClick={()=>{

          localStorage.removeItem("token");
          window.location.href="/admin/login"
        }}>Log out </button>
   
    </nav>
  );
};
