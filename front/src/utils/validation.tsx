export const validateSignupField = (name: string, value: string) => {
    let error = "";

    if (name === 'email') {
        if (!value) {
            error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = "Email is invalid";
        }
    }

    if (name === 'password') {
        if (!value) {
            error = "Password is required";
        } else if (value.length < 6) {
            error = "Password must be at least 6 characters";
        } else if (!/[a-z]/.test(value)) {
            error = "Password must contain at least one lowercase letter";
        } else if (!/[A-Z]/.test(value)) {
            error = "Password must contain at least one uppercase letter";
        } else if (!/\d/.test(value)) {
            error = "Password must contain at least one number";
        }
    }

    if (name === 'birthdate') {
        if (!value) {
            error = "Birthdate is required";
        } else {
            const birthDate = new Date(value);
            const currentDate = new Date();

            if (birthDate > currentDate) {
                error = "Birthdate must be before the current date";
            } else {
                const ageDifMs = currentDate.getTime() - birthDate.getTime();
                const ageDate = new Date(ageDifMs);
                const age = Math.abs(ageDate.getUTCFullYear() - 1970); 

                if (age < 18) {
                    error = "You must be at least 18 years old";
                }
            }
        }
    }

    if (name === 'first_name' && !value) {
        error = "First name is required";
    }

    if (name === 'last_name' && !value) {
        error = "Last name is required";
    }

    if (name === 'phone') {
        if (!value) {
            error = "Phone is required";
        } else if (!/^\d+$/.test(value)) {
            error = "Phone number must contain only numbers";
        }
    }

    if (name === 'address' && !value) {
        error = "Address is required";
    }

    return error;
};



export const validateSigninField = (name: string, value: string) => {
    let error = "";

    if (name === 'email') {
        if (!value) {
            error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = "Email is invalid";
        }
    }

    if (name === 'password') {
        if (!value) {
            error = "Password is required";
        } else if (value.length < 6) {
            error = "Password must be at least 6 characters";
        } else if (!/[a-z]/.test(value)) {
            error = "Password must contain at least one lowercase letter";
        } else if (!/[A-Z]/.test(value)) {
            error = "Password must contain at least one uppercase letter";
        } else if (!/\d/.test(value)) {
            error = "Password must contain at least one number";
        }
    }

    return error;
};

interface SearchParams {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
  }
  
  export const validateSearchBar = (params: SearchParams) => {
    const errors: string[] = [];
    const today = new Date();
    const checkIn = new Date(params.checkInDate);
    const checkOut = new Date(params.checkOutDate);
  
    // Validar la ubicación
    if (!params.location || params.location.trim().length === 0) {
      errors.push("Please enter a valid location.");
    }
  
    // Validar fechas
    if (isNaN(checkIn.getTime()) || checkIn < today) {
      errors.push("Check-in date must be later than today's date.");
    }
  
    if (isNaN(checkOut.getTime()) || checkOut <= checkIn) {
      errors.push("Check-out date must be after the check-in date.");
    }
  
    // Validar número de personas
    if (params.numberOfGuests < 1 || params.numberOfGuests > 50) {
      errors.push("Number of guests must be between 1 and 50.");
    }
  
    return errors;
  };