import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-xl font-bold mb-4">
          404 | Página no encontrada
        </p>
        <Link href="/">
          <button className="text-white bg-third-color hover:bg-first-color focus:ring-4 focus:ring-first-color font-medium rounded-lg text-sm px-5 py-2.5">
            Inicio
          </button>
        </Link>
      </div>
    </div>
    </>
  );
}






      

