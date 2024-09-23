'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '../PropertyForm';


export default function PropertyOwnList() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    setProperties(storedProperties);
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este alojamiento?')) {
      const updatedProperties = properties.filter(property => property.id !== id);
      setProperties(updatedProperties);
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
    }
  };

  const togglePublish = (id: number) => {
    const updatedProperties = properties.map(property => 
      property.id === id ? { ...property, isPublished: !property.isPublished } : property
    );
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Alojamientos</h1>
      <Link href="/property-form" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Agregar Nuevo Alojamiento
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {property.propertyImages[0] ? (
              <Image
              src={typeof property.propertyImages[0] === 'string'
                ? (property.propertyImages[0].startsWith('http') ? property.propertyImages[0] : `/${property.propertyImages[0]}`)
                : URL.createObjectURL(property.propertyImages[0] as File)}
              alt={property.name}
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
              <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
              <p className="text-gray-600 mb-2">Tipo: {property.type}</p>
              <p className="text-gray-600 mb-2">Ubicación: {property.location}</p>
              <p className="text-gray-600 mb-2">Habitaciones: {property.rooms.length}</p>
              <div className="flex justify-between">
                <Link href={`/proper/${property.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
              <button
                onClick={() => togglePublish(property.id)}
                className={`mt-4 py-2 px-4 rounded text-white font-bold ${property.isPublished ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
              >
                {property.isPublished ? 'Despublicar' : 'Publicar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}