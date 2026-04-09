import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';


// Create the context
const TriangleContext = createContext(undefined);

// Provider component
export const TriangleProvider = ({ children }) => {
  const [trianglelist, setTriangleList] = useState("Cube");
  const [descriptionData, setDescriptionData] = useState("");

  const [state, setState] = useState({ toggleSetting: false });
  const [ismaximized, setIsMaximized] = useState(false);

  const [isLiveClass, setIsLiveClass] = useState(true);
  const [roleName, setRoleName] = useState("tutor");


  const value = {
    trianglelist,
    setTriangleList,
    state,
    setState,
    descriptionData,
    setDescriptionData,
    ismaximized,
    setIsMaximized,
    isLiveClass,
    roleName,
    
  };

  return (
    <TriangleContext.Provider value={value}>
      {children}
    </TriangleContext.Provider>
  );
};

// Custom hook for accessing the context
export const useTriangleContext = () => {
  const context = useContext(TriangleContext);
  if (!context) throw new Error("useTriangleContext must be used within a TriangleProvider");
  return context;
};
