"use client";

import { ILogin, IUser, IUserContextType, IUserResponse } from "@/interfaces/Interfaces";
// import { getUsersOrders } from "@/lib/server/fetchOrders";
import { postSignin, postSignup } from "@/lib/server/fetchUsers";

import { createContext, useEffect, useState } from "react";


export const UserContext = createContext<IUserContextType> ({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
    // getOrders: async () => {},
    // orders: [],
    logOut: () => {},
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<Partial <IUserResponse> | null>(null);
    const [isLogged, setIsLogged] = useState(false);
    // const [orders, setOrders] = useState<IOrderResponse[]>([]);

    const signIn = async (credentials: ILogin) => {
        try {
            const data = await postSignin(credentials);
    
            if (!data.token) {
                throw new Error("Invalid credentials");
            }
    
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
            setIsLogged(true);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const signUp = async (user: Omit<IUser, "id">) => {
        try {
            const data = await postSignup(user);
            
            if (data.id) {
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    



    // const getOrders = useCallback(async () => {
        
    //     try {
    //         const token = localStorage.getItem("token") || "";
            
    //         const data = await getUsersOrders(token);
            
    //         setOrders(data);
    //     } catch (error) {
    //         console.error("Error en getOrders:", error);
    //     }
    // }, []);

    const logOut = () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("orderTotals");
            setUser(null);
            setIsLogged(false);
    };

     useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [user]);

    // Efecto para obtener el usuario desde el almacenamiento local
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        } else {
            setUser(null);
        }
    }, []); // Solo se ejecuta al montar el componente
    
    return(<UserContext.Provider 
                value={{
                    user,
                    setUser,
                    isLogged,
                    setIsLogged,
                    signIn,
                    signUp,
                    // getOrders,
                    // orders,
                    logOut,
                }}
            >
        {children}

      </UserContext.Provider>
    );
};