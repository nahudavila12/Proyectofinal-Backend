"use client";
import { useState, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { IHotelData, IHotelFormProps, IRoomType } from '@/interfaces/Interfaces';



export default function HotelForm({ initialData }: IHotelFormProps) {
  const [formData, setFormData] = useState<IHotelData>({
    name: '',
    features: '',
    services: '',
    images: [],
    roomTypes: [{ name: '', price: 0 }]
  })
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setPreviewImages(initialData.images.map(image => URL.createObjectURL(image)))
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }))
      
      const newPreviewImages = filesArray.map(file => URL.createObjectURL(file))
      setPreviewImages(prev => [...prev, ...newPreviewImages])
    }
  }

  const handleRoomTypeChange = (index: number, field: keyof IRoomType, value: string) => {
    const updatedRoomTypes = formData.roomTypes.map((roomType, i) => {
      if (i === index) {
        return { ...roomType, [field]: field === 'price' ? parseFloat(value) : value }
      }
      return roomType
    })
    setFormData(prev => ({ ...prev, roomTypes: updatedRoomTypes }))
  }

  const addRoomType = () => {
    setFormData(prev => ({
      ...prev,
      roomTypes: [...prev.roomTypes, { name: '', price: 0 }]
    }))
  }

  const removeRoomType = (index: number) => {
    setFormData(prev => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Guardar los datos del hotel en localStorage
    const storedHotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    const newHotel = {
      id: storedHotels.length + 1, // Genera un id único
      ...formData,
      imageUrls: previewImages, // Guardar las URLs de las imágenes
    };
    localStorage.setItem('hotels', JSON.stringify([...storedHotels, newHotel]));
    
   
    router.push('/rental-lists')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="w-full flex justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">
          {initialData ? 'Editar Alojamiento' : 'Agregar Nuevo Alojamiento'}
        </h2>
        </div>
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
            placeholder="Ingrese el nombre del alojamiento"
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
          <label htmlFor="features" className="block text-gray-700 text-sm font-bold mb-2">
            Características del Alojamiento
          </label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Describa las características principales del hotel"
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="services" className="block text-gray-700 text-sm font-bold mb-2">
            Servicios Ofrecidos
          </label>
          <textarea
            id="services"
            name="services"
            value={formData.services}
            onChange={handleChange}
            placeholder="Liste los servicios que ofrece el hotel"
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tipos de Habitación y Precios
          </label>
          {formData.roomTypes.map((roomType, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={roomType.name}
                onChange={(e) => handleRoomTypeChange(index, 'name', e.target.value)}
                placeholder="Tipo de habitación"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
              />
              <input
                type="number"
                value={roomType.price}
                onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                placeholder="Precio"
                min="0"
                step="0.01"
                className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => removeRoomType(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoomType}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            + Agregar Tipo de Habitación
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {initialData ? 'Actualizar Hotel' : 'Guardar Nuevo Hotel'}
          </button>
        </div>
      </form>
    </div>
  )
}