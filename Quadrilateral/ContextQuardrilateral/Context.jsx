import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

// Define the shape of the context


// Create the context
const QuadrilateralContext = createContext(undefined);

// Provider component
export const QuadrilateralProvider = ({ children, StudentData }) => {

  const [finalSelected, setFinalSelected] = useState("Square")
  const [isMax, setIsMax] = useState(false);
  const [isLiveClass, setIsLiveClass] = useState(false);
  const [role_name, setRoleName] = useState("tutor");
  const [data, setData] = useState("")
  const [isActiveButton, setIsActiveButton] = useState({
    isAngle: false,
    isCSide: false,
    isSide: false,
    isInfo: false
  })
  const defaultActiveButton = {
    isAngle: false,
    isSide: false,
    isInfo: false,
  };
  const isAccess = isLiveClass;
  useEffect(() => {
    setIsActiveButton(defaultActiveButton);
    setData("");
  }, [finalSelected]);

  useEffect(() => {
    if (StudentData && isAccess) {
      const { data, isActiveButton, finalSelected } = StudentData ?? {}
      console.log(data, isActiveButton, finalSelected ,"finalSelected")
      setData(data);
      setIsActiveButton(isActiveButton);
      setFinalSelected(finalSelected)
    }
  }, [StudentData, isAccess])

  const value = {
    isActiveButton, setIsActiveButton,
    isMax, setIsMax,
    finalSelected, setFinalSelected,
    isLiveClass, setIsLiveClass,
    role_name, setRoleName,
    data, setData,
  }

  return (
    <QuadrilateralContext.Provider value={value}>
      {children}
    </QuadrilateralContext.Provider>
  );
};

// Custom hook for accessing the context
export const useQuadrilateralContext = () => {
  const context = useContext(QuadrilateralContext);
  if (!context) throw new Error("useTriangleContext must be used within a TriangleProvider");
  return context;
};
