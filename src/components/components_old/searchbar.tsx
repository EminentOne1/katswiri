import { useRef, useState } from "react";
import Divider from "./divider";

const Searchbar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // Track input value
  const searchRef = useRef<HTMLInputElement>(null);


  const clearSearch = () => {
    setSearchValue("");
   
  };

  return (
    <div className={`search-bar ${isFocused ? "expanded" : ""}`}>
      <div className="search-icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#1D1B20"/>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="search"
        ref={searchRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {}
      {searchValue && (
        <img src="/images/close.svg" alt="close" width={18} onClick={clearSearch}/>
      )}

      <Divider />

      <div className="filter">
        <svg width="20" height="20" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.2209 1C18.5599 1 18.8353 1.3344 18.8353 1.746C18.8353 2.1576 18.5599 2.492 18.2209 2.492L7.61435 2.50766C7.27539 2.50766 7 2.1729 7 1.7613C7 1.35006 7.27539 1.0153 7.61435 1.0153L18.2209 1ZM14.7115 12.0114C14.4797 11.7286 14.4812 11.2704 14.7138 10.989C14.9464 10.7076 15.3241 10.7094 15.5558 10.9919L17.6499 13.5355L17.6593 6.18466C17.6593 5.78622 17.9256 5.46249 18.2538 5.46249C18.5819 5.46249 18.8485 5.78622 18.8485 6.18466L18.8391 13.5273L20.9813 10.9261C21.2139 10.6436 21.5927 10.6436 21.8253 10.9261C22.0582 11.2089 22.0582 11.6689 21.8253 11.9513L18.6642 15.7898C18.4292 16.0712 18.0519 16.0698 17.8202 15.787L14.7115 12.0114ZM12.0279 13.0637C12.3669 13.0637 12.6423 13.3982 12.6423 13.8097C12.6423 14.2213 12.3669 14.5558 12.0279 14.5558L7.61435 14.5614C7.27539 14.5614 7 14.227 7 13.8154C7 13.4042 7.27539 13.0694 7.61435 13.0694L12.0279 13.0637ZM13.2387 6.99114C13.5777 6.99114 13.8531 7.32554 13.8531 7.73714C13.8531 8.14874 13.5777 8.48315 13.2387 8.48315L7.61435 8.49133C7.27539 8.49133 7 8.15657 7 7.74497C7 7.33373 7.27539 6.99897 7.61435 6.99897L13.2387 6.99114Z" fill="black"/>
        </svg>
      </div>
    </div>
  );
};

export default Searchbar;
