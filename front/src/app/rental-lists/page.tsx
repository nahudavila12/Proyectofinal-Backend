'use client';

import HotelList from "@/components/HotelList";

export default function RentalLists() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Alojamiento</h1>
        <HotelList />
      </div>
    )
  }