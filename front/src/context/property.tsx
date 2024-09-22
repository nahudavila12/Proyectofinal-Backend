'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Property } from '@/app/home/page'

interface PropertyContextType {
  publishedProperties: Property[]
  publishProperty: (property: Property) => void
  unpublishProperty: (propertyId: string) => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [publishedProperties, setPublishedProperties] = useState<Property[]>([])

  const publishProperty = (property: Property) => {
    setPublishedProperties(prev => [...prev, { ...property, isPublished: true }])
  }

  const unpublishProperty = (propertyId: string) => {
    setPublishedProperties(prev => prev.filter(p => p.owner.uuid !== propertyId))
  }

  return (
    <PropertyContext.Provider value={{ publishedProperties, publishProperty, unpublishProperty }}>
      {children}
    </PropertyContext.Provider>
  )
}

export const usePropertyContext = () => {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider')
  }
  return context
}