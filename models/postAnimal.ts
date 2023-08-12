import User from "./user";
import { Image } from "../types/types";
interface PostAnimal {
  id: number | null
  user_id: number | null
  animal_id: number | null
  description: string | null
  price: number | null
  isPublic: boolean | number | null
  isOnSale: boolean | number | null
  isOpen: boolean | number | null
  expiration_date: string | null
  user?:User | null
  images?: Image[] 
  created_at?: string | null
}

export default PostAnimal;
