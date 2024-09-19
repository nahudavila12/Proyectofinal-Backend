"use client";

import React, { useContext } from 'react'

import Link from 'next/link'
import { NavbarContext } from '@/context/navbar';





export default function Footer() {
  const { closeDropdown } = useContext(NavbarContext);

  return (
  <footer className="relative bottom-0 left-0 w-full transition-transform duration-300 ease-in-out bg-second-color rounded-lg shadow-md p-4">
  <div className="w-full max-w-screen-xl mx-auto p-2 md:py-4">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="mb-0 md:mb-0 pb-6 md:pb-0">
      
          <Link href="/" className="flex flex-col items-center space-y-2 rtl:space-y-reverse playfair-display-regular" onClick={closeDropdown}>
            <h1 className="self-center text-white text-4xl">
              InstaStay
            </h1>
          </Link>
      </div>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
        <li><Link href="/about" className="nav-link me-4 md:me-6" onClick={closeDropdown}>Sobre Nosotros</Link></li>
        <li><Link href="/contact" className="nav-link me-4 md:me-6" onClick={closeDropdown}>Términos y condiciones</Link></li>
        <li><Link href="/privacy-policy" className="nav-link me-4 md:me-6" onClick={closeDropdown}>Políticas de privacidad</Link></li>
        <li><Link href="/contact" className="nav-link" onClick={closeDropdown}>Contacto</Link></li>
      </ul>
    </div>

    <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="text-sm text-gray-300 sm:text-center">© 2024 InstaStay™. Todos los derechos reservados.</span>
      <div className="flex mt-4 sm:justify-center sm:mt-0">
        <Link href="#" className="text-gray-300 hover:text-white ms-5">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
            <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Facebook page</span>
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white ms-5">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.293 0H3.707A2.707 2.707 0 0 0 1 2.707v8.586A2.707 2.707 0 0 0 3.707 14h8.586A2.707 2.707 0 0 0 15 11.293V2.707A2.707 2.707 0 0 0 12.293 0ZM8 11.5A3.5 3.5 0 1 1 11.5 8 3.5 3.5 0 0 1 8 11.5Zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.5-1a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5Z" />
          </svg>
          <span className="sr-only">Instagram page</span>
        </Link>
      </div>
    </div>
  </div>
</footer>
  )
}
