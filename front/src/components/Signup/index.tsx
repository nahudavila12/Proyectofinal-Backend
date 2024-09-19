"use client"



import { UserContext } from '@/context/user';
import { validateSignupField } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'




export default function SignupForm() {

  const router = useRouter()

  const {signUp} = useContext(UserContext)

  const [signupValues, setSignupValues] = useState ({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birtdate: "",
    phone: "",
    address: ""
  })

  const [errors, setErrors] = useState({} as {[key: string]: string});
  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {name, value} = e.target;

  //   setSignupValues({...signupValues,[name]:value});

  //   setErrors(validateSignup({...signupValues,[name]:value}));
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualiza los valores del formulario
    setSignupValues({ ...signupValues, [name]: value });

    // Valida solo el campo que está siendo modificado
    const fieldError = validateSignupField(name, value);

    // Actualiza los errores para el campo específico
    setErrors({ ...errors, [name]: fieldError });
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: signupValues.email,
      password: signupValues.password,
      name: `${signupValues.first_name} ${signupValues.last_name}`,
      birthdate: signupValues.birtdate,
      phone: signupValues.phone,
      address: signupValues.address,
    }
    
    const success = await signUp(user);
    
    if (success) router.push("/auth-signin");
    if (!success) alert("Invalid user")
      
  };

  
  return (
    <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
      <div className='relative z-0 w-full mb-5 group'>
         <input 
            type='email'
            name='email'
            id='email' 
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
            focus:border-third-color peer'
            placeholder=' '
            onChange={handleChange}
            required
            />
         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                Correo Electrónico
         </label>
         {errors.email && (
           <span className='text-red-500 text-xs italic flex justify-end'>{errors.email}</span>
          )}
        
      </div>


      <div className='relative z-0 w-full mb-5 group'>
         <input 
            type='password'
            name='password'
            id='password' 
            className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                       border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                       focus:border-third-color peer'
            placeholder=' '
            onChange={handleChange}
            required
          />
           <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                Contraseña
         </label>
         {errors.password && (
            <span className='text-red-500 text-xs flex justify-end'>{errors.password}</span>
         )}
      </div>
          
         <div className='grid md:grid-cols-2 md:gap-6'>
              <div className='relative z-0 w-full mb-5 group'>
              <input 
                  type='text'
                  name='first_name'
                  id='first_name' 
                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                  focus:border-third-color peer'
                  placeholder=' '
                  onChange={handleChange}
                  required
                  />
              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                      Primer nombre
              </label>
              {errors.first_name && (
                <span className='text-red-500 text-xs flex justify-end'>{errors.first_name}</span>
                )}     
              </div>

              <div className='relative z-0 w-full mb-5 group'>
              <input 
                  type='text'
                  name='last_name'
                  id='last_name' 
                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                  focus:border-third-color peer'
                  placeholder=' '
                  onChange={handleChange}
                  required
                  />
              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                      Apellido
              </label>
              {errors.last_name && (
                <span className='text-red-500 text-xs flex justify-end'>{errors.last_name}</span>
                )}     
              </div>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
         <input 
            type='date'
            name='birthdate'
            id='birthdate' 
            className='block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0
            border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
            focus:border-third-color peer'
            placeholder=' '
            onChange={handleChange}
            required
            />
         <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                           duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                           origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                           rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                Fecha de nacimiento
         </label>
         {errors.birthdate && (
           <span className='text-red-500 text-xs italic flex justify-end'>{errors.birthdate}</span>
          )}
        
      </div>
          <div className='grid md:grid-cols-2 md:gap-6'>
              <div className='relative z-0 w-full mb-5 group'>
              <input 
                  type='tel'
                  name='phone'
                  id='phone' 
                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                  focus:border-third-color peer'
                  placeholder=' '
                  onChange={handleChange}
                  required
                  />
              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                      Número de celular
              </label>
              {errors.phone && (
                <span className='text-red-500 text-xs flex justify-end'>{errors.phone}</span>
                )}     
              </div>

              <div className='relative z-0 w-full mb-5 group'>
              <input 
                  type='text'
                  name='address'
                  id='address' 
                  className='block py-2.5 px-0 w-full tex-sm text-gray-900 bg-transparent border-0
                  border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                  focus:border-third-color peer'
                  placeholder=' '
                  onChange={handleChange}
                  required
                  />
              <label className='peer-focus:font-medium absolute text-sm text-gray-500 
                                duration-300 transform -translate-y-6 scale-75 top-5 -z-10
                                origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
                                rtl:peer-focus:left-auto peer-focus:text-third-color peer-placeholder-shown:scale-100
                                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6'>
                      Dirección
              </label>
              {errors.address && (
                <span className='text-red-500 text-xs flex justify-end'>{errors.address}</span>
                )}     
              </div>
          </div>
          <button 
             type='submit'
            //  disabled={Object.keys(errors).length > 0}
            disabled={Object.keys(errors).some((key) => errors[key])}
             className='"text-white bg-third-color hover:bg-fourth-color focus:ring-4 focus:ring-first-color font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          >
            Registrarse
          </button>
    </form>
  )
}

