interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  // credential?: ICredential; 
  // role: Role;
  orders?: IOrderResponse[];
}

interface IOrderResponse {
  id: number;
  status: string;
  date: string;
  user: IUser;
  products: IProduct[];

}

interface IUserContextType {
  user: Partial<IUserResponse> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserResponse> | null>>,
  isLogged: boolean,
  setIsLogged: (isLogged: boolean) => void,
  signIn: (credentials: ILogin) => Promise<boolean>,
  signUp: (user: Omit<IUser, "id">) => Promise<boolean>,
  // getOrders: () => void,
  // orders: IOrderResponse[] | [],
  logOut: () => void,
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  quantity: number;
}


interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
}

interface ILogin {
  email: string,
  password: string

}

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

interface INavbarContextType {
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
  }

  interface ICartContextType {
    cartItems: IProduct[],
    addToCart: (product: number) => void,
    removeFromCart: (product: number) => void,
    searchProducts: (query: string) => IProduct[];
    total: number,
    proceedToCheckout: () => void;
    orderTotals: number[],
    products: IProduct[];
}

interface IProductCardProps{
  product: IProduct;
  remove?: () => void;
}

interface IProductsGridProps {
  products: IProduct[];
}

interface IRoomType {
  id?: string
  name: string
  price: number
}

interface IHotelData {
  id?: number
  name: string
  features: string
  services: string
  images: File[]
  roomTypes: IRoomType[]
}

interface IHotelFormProps {
  initialData?: IHotelData
}

export type {
    ILogin,
    IRegisterUser,
    IUserResponse,
    IOrderResponse,
    IProduct,
    IUser,
    IUserContextType,
    INavbarContextType,
    ICartContextType,
    IProductCardProps,
    IProductsGridProps,
    IHotelFormProps,
    IHotelData,
    IRoomType
}