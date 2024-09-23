'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const [country, setCountry] = useState(searchTerm)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const router = useRouter()

  useEffect(() => {
    setCountry(searchTerm)
  }, [searchTerm])

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      country,
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString()
    })
    setSearchTerm(country) // Actualiza el término de búsqueda en el componente padre
    router.push(`/home?${searchParams.toString()}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6">Buscar Alojamientos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            País o ciudad
          </label>
          <input
            type="text"
            id="country"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="¿A dónde vas?"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              // setSearchTerm(e.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de ingreso
          </label>
          <input
            type="date"
            id="checkIn"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de salida
          </label>
          <input
            type="date"
            id="checkOut"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adultos</label>
          <div className="flex items-center">
            <button
              className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-200"
              onClick={() => setAdults(Math.max(1, adults - 1))}
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b border-gray-300">{adults}</span>
            <button
              className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-200"
              onClick={() => setAdults(adults + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niños</label>
          <div className="flex items-center">
            <button
              className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-200"
              onClick={() => setChildren(Math.max(0, children - 1))}
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b border-gray-300">{children}</span>
            <button
              className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-200"
              onClick={() => setChildren(children + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
          <div className="flex items-center">
            <button
              className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-200"
              onClick={() => setRooms(Math.max(1, rooms - 1))}
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b border-gray-300">{rooms}</span>
            <button
              className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-200"
              onClick={() => setRooms(rooms + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  )
}