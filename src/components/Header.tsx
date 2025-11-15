import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import CartSheet from "./CartSheet";

const navItem = [
  { title: "New Arrivals", path: "/new-arrivals" },
  { title: "Men", path: "/men",
     dropdown: [
        { title: "Casual Socks", path: "/men/casual" },
        { title: "Formal Socks", path: "/men/formal" },
        { title: "Athletic Socks", path: "/men/athletic" },
      ], },
  { title: "Women", path: "/women",
     dropdown: [
        { title: "Cozy Collection", path: "/women/cozy" },
        { title: "Workwear", path: "/women/workwear" },
        { title: "Winter Socks", path: "/women/winter" },
      ],
   },
  { title: "Kids", path: "/kids",
     dropdown: [
        { title: "Cute Prints", path: "/kids/prints" },
        { title: "School Socks", path: "/kids/school" },
      ],
    
   },
  { title: "Collections", path: "/collections" },
  // { title: "Best Selling", path: "/best-selling" },
  { title: "Contact", path: "/contact" },
];


const Header = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState<Array<any>>([]);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

  const handleAddToCart = (product:any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchBarVisible, setSearchBarVisible] = React.useState<boolean>(false);
  const onSeacrh = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <nav className="hidden md:flex flex-1 text-md justify-start ms-20 relative">
            <ul className="flex items-center space-x-6">
              {navItem.map((item, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors cursor-pointer">
                    <Link to={item.path}>{item.title}</Link>
                    {item.dropdown && (
                      <ChevronDownIcon
                        className={`w-3 h-3 transition-all duration-700 font-medium ${
                          activeDropdown === index ? "rotate-180 text-purple-600" : ""
                        }`}
                      />
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === index && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
                className="pl-9 pr-3 w-40 focus:w-64 border border-gray-300 rounded-md py-1 
                      focus:outline-none focus:ring-1 focus:ring-gray-500 
                      transition-all duration-[0.5s] ease-in-out text-gray-500"
              />
              </div>
              <button className="relative" onClick={() => {navigate("/login")}}>
                <UserIcon className="h-6 w-6 text-gray-700 hover:text-purple-600 transition-colors" />
              </button>
              <button className="relative" onClick={() => setIsCartOpen(true)}>
                  <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-purple-600 transition-colors" />
                  
                  {/* Badge */}
                  <span className="absolute -top-1 -right-3 bg-black text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      0
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
      {
    <CartSheet
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      items={cartItems}
      onRemoveItem={(id) =>
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
      }
      onUpdateQuantity={(id, quantity) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      }}
      // onAddToCart={handleAddToCart}

    />
    }
  </>
  );
};

export default Header;
