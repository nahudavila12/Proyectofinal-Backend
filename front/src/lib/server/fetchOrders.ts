import { IProduct } from "@/interfaces/Interfaces";


export const postOrders = async (cartItems: IProduct[]) => {
    const products = cartItems.map((item) => item.id);
    const token = localStorage.getItem("token");
    const response = await fetch ("http://localhost:5000/orders", {
        method: "POST",  
        headers: {
            Authorization: `${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({products}),
    })
    const data = await response.json();
    return data;
  }

export const getUsersOrders = async (token: string) => {
    const response = await fetch("http://localhost:5000/users/orders", {
        method: "GET",
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
    const data = await response.json();
    return data;
};
