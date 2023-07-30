'use client'
import React, { createContext, useEffect, useState } from "react";
import User from "../models/user";
import UserService from "../services/userService";
import { validateJWT } from "../helpers/JWTTools";
import { useRouter } from "next/navigation";
import { UserContextType } from "../types/types";

export const UserContext = createContext<UserContextType>({
  userContext: new User(null,"","","",null,null,null,null,null,null),
  updateUser: () => {},
});

export default function UserProvider({children}: {children: React.ReactNode}) {
  const [userContext, setUser] = useState(new User(null,"","","",null,null,null,null,null,null));
  const _userService = new UserService()
  const router = useRouter()
  
  useEffect(()=>{
    validateJWT() && _userService.myProfile()
            .then((data) => {
                setUser(data.user)
            })
            .catch((e:any)=>{
              router.push('/')
            })
  },[])

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{userContext, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
