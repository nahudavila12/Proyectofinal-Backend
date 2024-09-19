"use client"



import { NavbarContext } from '@/context/navbar';
import { UserContext } from '@/context/user';
import Image from 'next/image';
import Link from 'next/link'
import React, { useContext, useEffect} from 'react'
import { useState } from 'react';

export default function NavbarComponent() {
  const { isDropdownOpen, toggleDropdown, closeDropdown } = useContext(NavbarContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const { isLogged, logOut } = useContext(UserContext);
  
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogOut = () => {
      logOut();
      closeDropdown();
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientY } = event;

      // Show the navbar if mouse is within 100px of the top
      if (clientY < 300) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on unmount
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
 
  
  return (
    <nav className={`fixed top-0 left-0 w-full bg-second-color/90 transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'} z-50`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <Link href="/" className="flex flex-col items-center space-y-2 rtl:space-y-reverse playfair-display-regular" onClick={closeDropdown}>
            <h1 className="self-center text-white text-4xl">
              InstaStay
            </h1>
          </Link>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
         {/* Mobile menu button */}
         <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-third-color focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-whit">
            <li>
              <Link
                href="/"
                className="nav-link block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-third-color"
                aria-current="page"
                onClick={closeDropdown}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/rental-lists"
                className="nav-link block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-third-color"
                aria-current="page"
                onClick={closeDropdown}
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/form-rent"
                className="nav-link block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-third-color"
                aria-current="page"
                onClick={closeDropdown}
              >
                Agregar Alojamientos
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="nav-link block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-third-color"
                aria-current="page"
                onClick={closeDropdown}
              >
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="nav-link block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-third-color"
                aria-current="page"
                onClick={closeDropdown}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">

        
        <button
            type="button"
            className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              className="w-8 h-8 rounded-full"
              src="https://res.cloudinary.com/dhrys2lqz/image/upload/v1724433384/usuario_flvwps.png"
              alt="user photo"
              width={70}
              height={70}
            />
          </button>
          <div
            className={`absolute right-0 top-8 z-50 my-4 text-base list-none bg-second-color divide-y divide-gray-100 rounded-lg shadow ${
              isDropdownOpen ? 'block' : 'hidden'
            }`}
            id="user-dropdown"
          >
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  href="/auth-signup"
                  className="block px-4 py-2 text-sm text-white hover:bg-third-color"
                  onClick={closeDropdown} // Cierra el menú al hacer clic
                >
                  Registro
                </Link>
              </li>
              <li>
                <Link
                  href="/auth-signin"
                  className="block px-4 py-2 text-sm text-white hover:bg-third-color"
                  onClick={closeDropdown} // Cierra el menú al hacer clic
                >
                  Iniciar Sesión
                </Link>
              </li>
              {isLogged && (
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-white hover:bg-third-color"
                  onClick={handleLogOut} 
                >
                  Salir
                </Link>
              </li>
              )}
              
            </ul>
          </div>
          {/* Mobile menu button */}
         <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
         </div>
        {/* Mobile menu items */}
        <div
          className={`top-16 left-0 w-full bg-second-color md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="mobile-menu"
        >
          <ul className="flex flex-col font-medium p-4 rounded-lg bg-second-color">
            <li>
              <Link
                href="/home"
                className="block py-2 px-3 text-white rounded hover:bg-third-color"
                onClick={toggleMenu} // Cierra el menú al hacer clic
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="block py-2 px-3 text-white rounded hover:bg-third-color"
                onClick={toggleMenu} // Cierra el menú al hacer clic
              >
                Habitaciones
              </Link>
            </li>
            <li>
              <Link
                href="/user-dashboard"
                className="block py-2 px-3 text-white rounded hover:bg-third-color"
                onClick={toggleMenu} // Cierra el menú al hacer clic
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 text-white rounded hover:bg-third-color"
                onClick={toggleMenu} // Cierra el menú al hacer clic
              >
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 text-white rounded hover:bg-third-color"
                onClick={toggleMenu} // Cierra el menú al hacer clic
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
