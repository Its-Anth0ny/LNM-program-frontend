import { createContext, useContext, useState } from 'react';


const UserContext = createContext();


export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = (username) => {
    setUser({ username });
  };


  const logout = () => {
    setUser(null);
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => useContext(UserContext);



