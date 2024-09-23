'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export interface Property {
  id: number;
  name: string;
  location: string;
  owner: { uuid: string };
  type: 'HOTEL' | 'CABANA' | 'DEPARTAMENTO';
  propertyImages: (File | string)[];
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

interface PropertyFormProps {
  initialData?: Property;
  onSubmit?: (data: Property) => void;
}

export default function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const [formData, setFormData] = useState<Property>({
    id: 0,
    name: '',
    location: '',
    owner: { uuid: '' }, // You might want to get this from the user's session
    type: 'HOTEL',
    propertyImages: [],
    rooms: [],
    isPublished: false
  })
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
        if (initialData) {
          setFormData(initialData);
      
          // Previsualizar imágenes: Diferenciar entre archivos y URLs
          const previews = initialData.propertyImages.map((image) => {
            if (typeof image === 'string') {
              return image; // Es una URL
            } else if (image instanceof File) {
              return URL.createObjectURL(image); // Es un archivo
            }
            return ''; // Manejar casos inesperados (por ejemplo, valores nulos)
          });
          setPreviewImages(previews);
        }
      }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newPreviewImages = filesArray.map(file => URL.createObjectURL(file))
      setFormData(prev => ({ ...prev, propertyImages: [...prev.propertyImages, ...newPreviewImages] }))
      setPreviewImages(prev => [...prev, ...newPreviewImages])
    }
  }

  const handleRoomChange = (index: number, field: keyof Property['rooms'][0], value: string | number | string[]) => {
    const updatedRooms = formData.rooms.map((room, i) => {
      if (i === index) {
        return { ...room, [field]: value }
      }
      return room
    })
    setFormData(prev => ({ ...prev, rooms: updatedRooms }))
  }

  const addRoom = () => {
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, {
        room_number: prev.rooms.length + 1,
        capacity: 1,
        price_per_day: 0,
        disponibility: 'avaiable',
        roomImages: [],
        services: [],
        category: 'STANDARD'
      }]
    }))
  }

  const removeRoom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (onSubmit) {
      onSubmit(formData);
    } else {
      const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      const newProperty = {
        ...formData,
        id: formData.id === 0 ? storedProperties.length + 1 : formData.id,
      };
      localStorage.setItem('properties', JSON.stringify([...storedProperties, newProperty]));
      router.push('/property-own-list');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        {initialData ? 'Editar Alojamiento' : 'Agregar Nuevo Alojamiento'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Alojamiento
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Alojamiento
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="HOTEL">Hotel</option>
            <option value="CABANA">Cabaña</option>
            <option value="DEPARTAMENTO">Departamento</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Ubicación
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">
            Fotos del Alojamiento
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {previewImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {previewImages.map((preview, index) => (
                <Image 
                   key={index} 
                   src={preview} 
                   alt={`Preview ${index + 1}`} 
                   width={300}
                   height={200}
                   className="w-24 h-24 object-cover rounded" 
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Habitaciones
          </label>
          {formData.rooms.map((room, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex items-center space-x-2 mb-2">
                <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                 M° Habitación
                </label>
                <input
                  type="number"
                  value={room.room_number}
                  onChange={(e) => handleRoomChange(index, 'room_number', parseInt(e.target.value))}
                  placeholder="Número de habitación"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
                  />
                </div>
                <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                 Capacidad
                </label>
                <input
                  type="number"
                  value={room.capacity}
                  onChange={(e) => handleRoomChange(index, 'capacity', parseInt(e.target.value))}
                  placeholder="Capacidad"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-24"
                  />
                </div>
                <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                 Precio/día
                </label>
                <input
                  type="number"
                  value={room.price_per_day}
                  onChange={(e) => handleRoomChange(index, 'price_per_day', parseFloat(e.target.value))}
                  placeholder="Precio por día"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
                  />
                </div>
                <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                 Tipo
                </label>
                <select
                  value={room.category}
                  onChange={(e) => handleRoomChange(index, 'category', e.target.value as 'STANDARD' | 'DELUXE' | 'SUITE')}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                  <option value="STANDARD">Standard</option>
                  <option value="DELUXE">Deluxe</option>
                  <option value="SUITE">Suite</option>
                </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeRoom(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  -
                </button>
              </div>
              {/* Add fields for roomImages and services if needed */}
            </div>
          ))}
          <button
            type="button"
            onClick={addRoom}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            + Agregar Habitación
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {initialData ? 'Actualizar Alojamiento' : 'Guardar Nuevo Alojamiento'}
          </button>
        </div>
      </form>
    </div>
  )
}

