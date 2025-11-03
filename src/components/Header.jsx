import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const navItem = [
  { title: "New Arrivals", path: "/new-arrivals" },
  { title: "Men", path: "/men" },
  { title: "Women", path: "/women" },
  { title: "Children", path: "/children" },
  { title: "Best Selling", path: "/collections" },
  { title: "Contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const onSeacrh = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    console.log("Searching for:", searchValue);
  }
  const showSearchBar = () => {
    setSearchBarVisible(true);
  }
  return (
    <> 
      <header className="header sticky top-0 bg-white shadow-md px-6 py-2 z-20">
        <div className="flex items-center justify-between px-6 py-3 md:px-8">
          {/* Centered Logo on mobile */}
          <div className="flex justify-center md:justify-start">
            <Link to="/">
              <img src="logo192.png" alt="logo" className="w-10" />
            </Link>
          </div>
        <nav className="hidden md:flex flex-1 nav text-md  justify-start ms-20">
          <ul className="flex items-center space-x-6">
            {navItem.map((item, index) => (
              <li
                key={index}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <button className="md:hidden block">
              <MagnifyingGlassIcon onClick={showSearchBar} className="h-6 w-6 text-gray-700" />
            </button>
              <div className="hidden md:flex items-center relative">
                <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-gray-500" />
              <input 
                type="search"
                value={searchValue}
                onChange={onSeacrh}
                placeholder="Search..."
                class="pl-9 pr-3 w-40 focus:w-64 border border-gray-300 rounded-md py-1 
                      focus:outline-none focus:ring-1 focus:ring-gray-500 
                      transition-all duration-[0.5s] ease-in-out text-gray-500"
              />
              </div>
              <button>
                <UserIcon className="h-6 w-6 text-gray-700 hover:text-green-500" />
              </button>
              <button className="relative">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-green-500" />
                  
                  {/* Badge */}
                  <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      3
                  </span>
              </button>
                {/* Mobile Menu Button */}
              <button
                className="md:hidden z-50 relative"
                onClick={() => setMenuOpen(true)}
              >
                <Bars3BottomLeftIcon className="h-7 w-7 text-gray-700" />
              </button>
          </div>
        </div>
      </header>
      {searchBarVisible && (
      <div className="md:hidden">
        {/* Mobile Search Bar */}
        <div className={`fixed top-0 right-0 bg-white shadow-md w-full px-4 py-5 z-40  transform ${
          searchBarVisible ? "translate-y-0" : "translate-y-full"
        } transition-all duration-[0.5s] ease-in-out`}>
          <div className="flex items-center relative">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-700 absolute left-3" />
            <input
              type="search"
              value={searchValue}
              onChange={onSeacrh}
              placeholder="Search..."
              className="pl-12 pr-3 w-[100%] border border-gray-300 text-gray-500 rounded-md py-2 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-[0.5s] ease-in-out"
            />
            <XMarkIcon
              className="h-6 w-6 text-gray-500 cursor-pointer ms-2"
              onClick={() => setSearchBarVisible(false)}
            />
          </div>
        </div>
      </div>
      )}
      {/* Sidebar (Mobile / Tablet) */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg z-30 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <img src="logo192.png" alt="logo" className="w-8" />
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col mt-4 space-y-3 px-6">
          {navItem.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="block py-2 text-gray-700 hover:text-green-500"
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay (when sidebar is open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

    </>
  );
};

export default Header;
