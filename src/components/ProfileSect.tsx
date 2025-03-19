import { useRef, useState, useEffect } from "react";

interface profilesect {
  isloggedin?: boolean;
}

const ProfileSect: React.FC<profilesect> = ({ isloggedin }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef<HTMLImageElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

 
  const toggleDropdown = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5, 
        left: rect.left + window.scrollX - 50,
      });
      setShowDropdown(!showDropdown);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="profile-sect">
        {isloggedin ? (
          <div className="loggedout">
            <img src="/images/cart.svg" alt="cart" width={20} />
            <img src="/images/light.svg" alt="light" width={25} />
            <img src="/images/notification.svg" alt="notification" width={18} />

            {/* Profile Icon with Ref */}
            <img
              src="/images/user.svg"
              alt="user"
              width={20}
              ref={profileRef}
              onClick={toggleDropdown}
              className="profile-icon"
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <div className="loggedout">
            <img src="/images/light.svg" alt="light" />
            <button className="button-signin">Sign in</button>
            <button className="button-login">Login</button>
          </div>
        )}
      </div>

      {/* Dropdown Popup */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="profile-dropdown"
          style={{ top: position.top, left: position.left }}
        >
          <ul>
            <li className="dropdown-item">Profile</li>
            <li className="dropdown-item">Settings</li>
            <li className="dropdown-item">Logout</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileSect;
