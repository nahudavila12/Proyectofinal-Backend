"use client";


// import { SearchBar } from '@/components/SearchBar';
import Image from 'next/image'
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function LandingPage() {    
  const [activeIndex, setActiveIndex] = useState(0);

    const images = [
      "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670522/RoyalSolaris_flrphe.jpg",
      "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670627/TheWestinResort_gd9rb5.jpg",
      "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670713/GrandSirenis_moligx.jpg",
      "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670787/HyattZilaraCancun_vnx4km.jpg",
      "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670878/ClaridgeHotel_qet4cq.jpg"
    ];

    const nextSlide = useCallback(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const prevSlide = () => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
      const intervalId = setInterval(nextSlide, 3000); // Cambia cada 3 segundos
      return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [nextSlide]);
  return (
    <div className="relative w-full overflow-hidden">
      {/* Contenedor de la primera imagen y el texto */}
      <div className="relative w-full h-[80vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://res.cloudinary.com/dhrys2lqz/video/upload/v1726528309/80_23_08_19_1_ferdc8.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-first-color">
            <div className='bg-second-color/70 rounded-xl'>
            <h1 className="self-center text-6xl playfair-display-bold">
              InstaStay
            </h1>
            <span className="text-2xl text-white text-left w-full playfair-display-regular">
             Tu estadía, al instante.
            </span>
            <div className='mt-4'>
            {/* <SearchBar /> */}
            </div>
            </div>
        </div>
      </div>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">

      <div className="flex flex-col items-center justify-center p-10 text-center text-black">
        <div>
          <h1 className="self-center text-6xl font-bold">
            Alojamientos alrededor del mundo
          </h1>
          <span className="text-2xl text-black text-left w-full font-normal">
           &quot;Explora ofertas de alojamientos disponibles.&quot;
          </span>
        </div>
        
      </div>
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
              data-carousel-item
            >
              <Image
                src={src}
                alt={`Carousel ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="absolute inset-0 m-auto"
              />
            </div>
          ))}
        </div>
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-fourth-color/70" : "bg-gray-500/50"}`}
              onClick={() => setActiveIndex(index)}
              aria-current={index === activeIndex}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-second-color group-hover:bg-third-color group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-second-color group-hover:bg-third-color group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
      <div className="relative w-full h-[35vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://res.cloudinary.com/dhrys2lqz/video/upload/v1726195353/vecteezy_aerial-view-of-pink-beach-in-komodo_30468522_kqrsuk.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-first-color">
            <div>
            <h1 className="self-center text-6xl playfair-display-bold">
              InstaStay
            </h1>
            <span className="text-2xl text-white text-left w-full playfair-display-regular">
              &quot;Encuentra tu alojamiento perfecto al mejor precio.&quot;
            </span>
            </div>
            <Link href="/home">
            <button className="text-white bg-second-color hover:bg-third-color focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Reserva ahora!
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center p-10">
      <div className="block max-w-sm p-6 bg-second-color border-b border-third-color rounded-lg shadow">
        <p className="font-normal text-white">
        &quot;<i>La vida es un viaje, disfrútalo en el mejor destino.</i>&quot;
        </p>
        <footer className="mt-4 text-white text-sm">
        — Anónimo
        </footer>
      </div>
      </div>

      <div className="flex flex-col items-center justify-center p-10 text-center text-black">
        <div>
          <h1 className="self-center text-6xl font-bold">
            Los mejores alojamientos
          </h1>
          <span className="text-2xl text-black text-left w-full font-normal">
            Mira todo nuestro catálogo de alojamientos
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-[800px] mx-auto h-[150px] mb-4"> {/* Ajusta el valor de max-w aquí */}
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539003/Habitacion_multiple_njuy53.jpg"
          fill
          alt="Habitación Multiple"
        />
      </div>
      <div className="relative w-full max-w-[800px] mx-auto h-[150px] mb-4"> {/* Ajusta el valor de max-w aquí */}
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539002/Habitacion_estandar_t4dvhm.jpg"
          fill
          alt="Habitacion Estándar"
        />
      </div>
      <div className="relative w-full max-w-[800px] mx-auto h-[150px] mb-4"> {/* Ajusta el valor de max-w aquí */}
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539005/Habitacion_suite_uji2sn.jpg"
          fill
          alt="Habitación Suite"
        />
      </div>
      
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>

      
      <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm md:mb-12 md:grid-cols-2 bg-second-color">
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-second-color border-b border-third-color rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
            <blockquote className="max-w-2xl mx-auto mb-4 text-white lg:mb-8">
                <h3 className="text-lg font-semibold text-white">No lo esperaba!</h3>
                <p className="my-4">Excelente atención en los restaurantes, la playa privada, las actividades y los diferentes espacios</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
                <Image
                  className="rounded-full w-9 h-9" 
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" 
                  alt="profile picture"
                  width={70} 
                  height={70}
                />
                <div className="space-y-0.5 font-medium text-white text-left rtl:text-right ms-3">
                    <div>Bonnie Green</div>
                    <div className="text-sm text-white">Cliente</div>
                </div>
            </figcaption>   
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              </div> 
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-second-color border-b border-third-color md:rounded-se-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 text-white">
                <h3 className="text-lg font-semibold text-white">Muy atentos</h3>
                <p className="my-4">El servicio muy amable, la comida muy buena, las instalaciones increíbles.</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
                  <Image
                  className="rounded-full w-9 h-9" 
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" 
                  alt="profile picture"
                  width={70} 
                  height={70}
                  />
                <div className="space-y-0.5 font-medium text-white text-left rtl:text-right ms-3">
                    <div>Roberta Casas</div>
                    <div className="text-sm text-white">Cliente</div>
                </div>
            </figcaption>   
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              </div> 
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-second-color border-b border-third-color md:rounded-es-lg md:border-b-0 md:border-e">
            <blockquote className="max-w-2xl mx-auto text-white mb-4 lg:mb-8">
                <h3 className="text-lg font-semibold text-white">Muy limpio todo</h3>
                <p className="my-4">Las piscinas, la habitación amplia y cómoda. El buffet variado y las comidas bien preparadas.</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
                  <Image
                  className="rounded-full w-9 h-9" 
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" 
                  alt="profile picture"
                  width={70} 
                  height={70}
                  />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>Jese Leos</div>
                    <div className="text-sm text-white">Cliente</div>
                </div>
            </figcaption>  
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-yellow-300/50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              </div>  
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-second-color border-b border-third-color rounded-b-lg md:rounded-se-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-white">
                <h3 className="text-lg font-semibold text-white">Volvería de nuevo!</h3>
                <p className="my-4">Lo que más me gusto fue la ubicación, la tranquilidad y la belleza del entorno. Muy buena playas, muy buenas piletas, muy buenas habitaciones</p>
            </blockquote>
            <figcaption className="flex items-center justify-center ">
                  <Image
                  className="rounded-full w-9 h-9" 
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" 
                  alt="profile picture"
                  width={70} 
                  height={70}
                  />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>Joseph McFall</div>
                    <div className="text-sm text-white">Cliente</div>
                </div>
            </figcaption>
              <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              </div>
          </figure>
        </div>
      </div>
    </div>

  )
}
