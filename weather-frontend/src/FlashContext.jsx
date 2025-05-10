// FlashContext.js
import { createContext, useContext, useState } from 'react';

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [currUser, setCurrUser] = useState(null);

  return (
    <FlashContext.Provider value={{ success, setSuccess, error, setError, currUser, setCurrUser }}>
      
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => useContext(FlashContext);
