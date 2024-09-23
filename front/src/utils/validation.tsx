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