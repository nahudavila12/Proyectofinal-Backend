"use client";
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface RoomType {
  id: string
  name: string
  price: number
}

interface Hotel {
  id: number
  name: string
  features: string
  services: string
  imageUrls: string[]
  roomTypes: RoomType[]
}

export default function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([
    // {
    //   id: 1,
    //   name: "Hotel Ejemplo",
    //   features: "Vista al mar, Piscina",
    //   services: "Wi-Fi, Desayuno incluido",
    //   imageUrls: ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670713/GrandSirenis_moligx.jpg"],
    //   roomTypes: [
    //     { id: "1", name: "Estándar", price: 100 },
    //     { id: "2", name: "Suite", price: 200 }
    //   ]
    // },
  ])
   // Cargar los hoteles desde localStorage
   useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    setHotels(storedHotels);
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este hotel?')) {
      setHotels(hotels.filter(hotel => hotel.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Alojamientos</h1>
      <Link href="/form-rent" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Agregar Nuevo Alojamiento
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <div key={hotel.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {hotel.imageUrls[0] ? (
              <Image 
                src={hotel.imageUrls[0]} 
                alt={hotel.name} 
                width={400}
                height={300} 
                className="w-full h-48 object-cover" 
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span>Sin imagen</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <p className="text-gray-600 mb-2">Características: {hotel.features}</p>
              <p className="text-gray-600 mb-2">Servicios: {hotel.services}</p>
              <div className="mb-4">
                <h3 className="font-semibold">Tipos de Habitación:</h3>
                <ul>
                  {hotel.roomTypes.map(roomType => (
                    <li key={roomType.id} className="flex justify-between">
                      <span>{roomType.name}</span>
                      <span>${roomType.price}/noche</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between">
                <Link href={`/form-rent/${hotel.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(hotel.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}