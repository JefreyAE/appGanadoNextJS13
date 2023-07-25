import React, { createContext, useEffect, useState } from "react";
import User from "../models/user";
import UserService from "../services/userService";
import { validateJWT } from "../helpers/JWTTools";

interface UserContextType {
  userContext: User;
  updateUser: (newUser: User) => void;
}

export const UserContext = createContext<UserContextType>({
  userContext: new User(null,"","","",null,null,null,null,null,null),
  updateUser: () => {},
});

export default function UserProvider({children}: {children: React.ReactNode}) {
  const [userContext, setUser] = useState(new User(null,"","","",null,null,null,null,null,null));
  const _userService = new UserService()
  
  useEffect(()=>{
    validateJWT() && _userService.myProfile().
            then((data) => {
                setUser(data.user)
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
