'use client';


import { useEffect, useState } from 'react'
import HotelForm from '../../../components/HotelForm'
import { IHotelData } from '@/interfaces/Interfaces'
import { useParams } from 'next/navigation';



export default function EditHotelPage() {
  const [hotel, setHotel] = useState<IHotelData | null>(null)
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      
      setHotel({
        id: Number(id), 
        name: 'Hotel Ejemplo',
        features: 'Vista al mar, Piscina',
        services: 'Wi-Fi gratuito, Desayuno incluido',
        images: [],
        roomTypes: [
          { name: 'Estándar', price: 100 },
          { name: 'Suite', price: 200 }
        ]
      });
    }
  }, [id])

  if (!hotel) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Alojamiento</h1>
      <HotelForm initialData={hotel} />
    </div>
  )
}