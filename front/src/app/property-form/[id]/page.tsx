'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PropertyForm, { Property } from '@/components/PropertyForm'


export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProperty = () => {
      const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]')
      const foundProperty = storedProperties.find((p: Property) => p.id === Number(params.id))
      
      if (foundProperty) {
        setProperty(foundProperty)
      } else {
        router.push('/property-own-list')
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id, router])

  const handleUpdate = (updatedProperty: Property) => {
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]')
    const updatedProperties = storedProperties.map((p: Property) =>
      p.id === updatedProperty.id ? updatedProperty : p
    )
    localStorage.setItem('properties', JSON.stringify(updatedProperties))
    router.push('/property-own-list')
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Alojamiento</h1>
      <PropertyForm initialData={property} onSubmit={handleUpdate} />
    </div>
  )
}