"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Property } from '../PropertyForm';

interface PropertyListProps {
  properties: Property[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}





export function PropertyList({
  properties: externalProperties, // Renombramos la prop para diferenciarlas
  currentPage,
  totalPages,
  setCurrentPage,
}: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    // Combinamos las propiedades del localStorage con las que vienen de props
    setProperties([...storedProperties, ...externalProperties]);
  }, [externalProperties]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Alojamientos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
           {Array.isArray(property.propertyImages) && property.propertyImages.length > 0 ? (
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
              {/* <p className="text-gray-600 mb-2">Características: {property.features}</p> */}
              {/* <p className="text-gray-600 mb-2">Servicios: {property.services}</p> */}
              {/* <p className="font-semibold">
                Desde ${Math.min(...property.roomTypes.map(room => room.price))} / noche
              </p> */}
              <p className="font-semibold">
                Desde ${
                  Array.isArray(property.rooms) && property.rooms.length > 0
                    ? Math.min(...property.rooms.map(room => room.price_per_day))
                    : 'N/A'
                } / noche
              </p>
              {/* <p className="text-sm mt-2">
                {property.roomTypes.length} habitación{property.roomTypes.length > 1 ? 'es' : ''} disponible{property.roomTypes.length > 1 ? 's' : ''}
              </p> */}
              <p className="text-sm mt-2">
              {Array.isArray(property.rooms) ? (
                <>
                  {property.rooms.length} habitación{property.rooms.length > 1 ? 'es' : ''} disponible{property.rooms.length > 1 ? 's' : ''}
                </>
              ) : (
                'Sin habitaciones disponibles'
              )}
            </p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}


// import { useEffect, useState } from 'react';
// import { Property } from '../PropertyForm';
// import { PropertyFilters } from "@/app/home/page";

// interface PropertyListProps {
//   properties: Property[];
//   filters: PropertyFilters;
//   currentPage: number;
//   totalPages: number;
//   setCurrentPage: (page: number) => void;
// }

// export function PropertyList({
//   filters,
//   properties: externalProperties,
//   currentPage,
//   totalPages,
//   setCurrentPage,
// }: PropertyListProps) {
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

//   useEffect(() => {
//     const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
//     const combinedProperties = [...storedProperties, ...externalProperties];

//     const filtered = combinedProperties.filter((property) => {
//       const matchesFilters = (
//         (!filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
//          (!filters.type || property.type === filters.type) // &&
//         // (!filters.minPrice || property.rooms.some(room => room.price_per_day >= filters.minPrice!)) &&
//         // (!filters.maxPrice || property.rooms.some(room => room.price_per_day <= filters.maxPrice!))
//       );
//       return matchesFilters;
//     });

//     setFilteredProperties(filtered);
//   }, [externalProperties, filters]);

//   // Paginación
//   const itemsPerPage = 3;
//   const paginatedProperties = filteredProperties.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Lista de Alojamientos</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedProperties.map((property) => (
//           <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//             {/* Aquí va tu código para mostrar la propiedad */}
//           </div>
//         ))}
//       </div>
//       {/* Paginación */}
//       <div className="flex justify-center mt-8 space-x-2">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
//         >
//           Anterior
//         </button>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
//         >
//           Siguiente
//         </button>
//       </div>
//     </div>
//   );
// }