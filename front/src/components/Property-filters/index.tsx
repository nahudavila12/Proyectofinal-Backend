// 'use client'

// import { useState } from 'react'
// import { PropertyFilters as FilterType } from "@/app/home/page"

// interface PropertyFiltersProps {
//   filters: FilterType
//   setFilters: (filters: FilterType) => void
// }

// export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
//   const [localFilters, setLocalFilters] = useState<FilterType>(filters)

//   const handleSearch = () => {
//     setFilters(localFilters)
//   }

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Filtros</h2>
//       <div>
//         <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
//         <input
//           id="location"
//           type="text"
//           value={localFilters.location || ''}
//           onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
//           placeholder="Ingrese ubicación"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Propiedad</label>
//         <select
//           id="propertyType"
//           value={localFilters.type || ''}
//           onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as FilterType['type'] })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Seleccionar tipo</option>
//           <option value="HOTEL">Hotel</option>
//           <option value="CABANA">Cabaña</option>
//           <option value="DEPARTAMENTO">Departamento</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio Mínimo</label>
//         <input
//           id="minPrice"
//           type="number"
//           value={localFilters.minPrice || ''}
//           onChange={(e) => setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) })}
//           placeholder="Ingrese precio mínimo"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio Máximo</label>
//         <input
//           id="maxPrice"
//           type="number"
//           value={localFilters.maxPrice || ''}
//           onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) })}
//           placeholder="Ingrese precio máximo"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button
//         onClick={handleSearch}
//         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Buscar
//       </button>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { PropertyFilters as FilterType } from "@/app/home/page"

interface PropertyFiltersProps {
  filters: FilterType
  setFilters: (filters: FilterType) => void
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterType>(filters)
  const [error, setError] = useState('')

  const validateInputs = () => {
    if (!localFilters.location) {
      return "La ubicación no puede estar vacía.";
    }
  
    const minPrice = localFilters.minPrice ?? 0; // Valor predeterminado
    const maxPrice = localFilters.maxPrice ?? Infinity; // Valor predeterminado
  
    if (minPrice > maxPrice) {
      return "El precio mínimo no puede ser mayor que el precio máximo.";
    }
  
    if (minPrice < 0 || maxPrice < 0) {
      return "Los precios no pueden ser negativos.";
    }
  
    return "";
  };

  const handleSearch = () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setFilters(localFilters);
    setError(''); // Limpia errores si la validación es exitosa
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
        <input
          id="location"
          type="text"
          value={localFilters.location || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
          placeholder="Ingrese ubicación"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Propiedad</label>
        <select
          id="propertyType"
          value={localFilters.type || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as FilterType['type'] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar tipo</option>
          <option value="HOTEL">Hotel</option>
          <option value="CABANA">Cabaña</option>
          <option value="DEPARTAMENTO">Departamento</option>
        </select>
      </div>
      <div>
        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio Mínimo</label>
        <input
          id="minPrice"
          type="number"
          value={localFilters.minPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) })}
          placeholder="Ingrese precio mínimo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Precio Máximo</label>
        <input
          id="maxPrice"
          type="number"
          value={localFilters.maxPrice || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) })}
          placeholder="Ingrese precio máximo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Buscar
      </button>
    </div>
  )
}