'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Hotel {
  id: number
  name: string
  image: string
  rating: number
  price: number
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    // Aquí normalmente haríamos una llamada a una API con los parámetros de búsqueda
    
    const mockHotels: Hotel[] = [
      { id: 1, name: "Hotel Sunshine", image: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670713/GrandSirenis_moligx.jpg", rating: 4.5, price: 100 },
      { id: 2, name: "Beachside Resort", image: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670878/ClaridgeHotel_qet4cq.jpg", rating: 4.2, price: 150 },
      { id: 3, name: "Mountain View Lodge", image: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670627/TheWestinResort_gd9rb5.jpg", rating: 4.8, price: 200 },
      { id: 4, name: "City Center Hotel", image: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670522/RoyalSolaris_flrphe.jpg", rating: 4.0, price: 80 },
    ]
    setHotels(mockHotels)
  }, [searchParams])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Resultados de búsqueda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image src={hotel.image} alt={hotel.name} width={300} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-600">{hotel.rating}</span>
                </div>
                <span className="text-lg font-bold">${hotel.price}/noche</span>
              </div>
              <button className="mt-4 w-full bg-second-color text-white py-2 px-4 rounded-md hover:bg-third-color focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Reservar ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}