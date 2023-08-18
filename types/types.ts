import User from "../models/user";

export interface ButtonsObject {
    description: string
    url: string
}

export interface ValidationObject {
    type: string
    name: string;
    value: any
}

export interface Image {
    animal_id: number,
    title: string,
    description: string,
    image_name: string,
    user_id: number
}

export interface UserContextType {
    userContext: User;
    updateUser: (newUser: User) => void;
}

export interface OptionObject {
    value: any
    description: string
}

export interface ListElements {
    description: string
    url: string | null
    icon: string | null
}