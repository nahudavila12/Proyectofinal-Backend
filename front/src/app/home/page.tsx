'use client'

import { useState } from 'react'
import { mockData } from '../../../public/alojamientos/mock-data'
import { SearchBar } from '@/components/SearchBar'
import { PropertyFilters } from '@/components/Property-filters'
import { PropertyList } from '@/components/Property-list'






export interface Property {
  id:number
  name: string;
  location: string;
  owner: { uuid: string };
  type: 'HOTEL' | 'CABANA' | 'DEPARTAMENTO';
  propertyImages: string[];
  rooms: {
    room_number: number;
    capacity: number;
    price_per_day: number;
    disponibility: 'avaiable' | 'reserved';
    roomImages: string[];
    services: string[];
    category: 'STANDARD' | 'DELUXE' | 'SUITE';
  }[];
  isPublished?: boolean;
}

export interface PropertyFilters {
  location?: string
  type?: 'HOTEL' | 'CABANA' | 'DEPARTAMENTO'
  minPrice?: number
  maxPrice?: number
}



export default function Home() {
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const filteredProperties = mockData.filter((property) => {
    // const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                       property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilters = (
      (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.type || property.type === filters.type) &&
      (!filters.minPrice || property.rooms.some(room => room.price_per_day >= filters.minPrice!)) &&
      (!filters.maxPrice || property.rooms.some(room => room.price_per_day <= filters.maxPrice!))
    )
    return  matchesFilters
  })

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reserva de Alojamientos</h1>
      <SearchBar filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        <div className="md:col-span-1">
          <PropertyFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="md:col-span-3">
          <PropertyList
            properties={paginatedProperties} 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

