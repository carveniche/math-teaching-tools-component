import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

const TriangleContext = createContext({
  trianglelist: "Equilateral Triangle",
  setTriangleList: () => { },
  descriptionData: "",
  setDescriptionData: () => { },
  state: { toggleSetting: false },
  setState: () => { },
  ismaximized: false,
  setIsMaximized: () => { },
  isLiveClass: false,
  setIsLiveClass: () => { },
});


export const TriangleProvider = ({ children, StudentData }) => {
  const [trianglelist, setTriangleList] = useState("Equilateral Triangle");
  const [descriptionData, setDescriptionData] = useState("");

  const [state, setState] = useState({ toggleSetting: false });
  const [ismaximized, setIsMaximized] = useState(false);
  const [isLiveClass, setIsLiveClass] = useState(false);
  const [role_name, setRoleName] = useState("tutor");
  const [isActiveButton, setIsActiveButton] = useState({
    isAngle: false,
    isSide: false,
    isInfo: false
  })
  const defaultActiveButton = {
    isAngle: false,
    isSide: false,
    isInfo: false,
  };

  const value = {
    trianglelist,
    setTriangleList,
    state, setState,
    descriptionData, setDescriptionData,
    ismaximized, setIsMaximized,
    isLiveClass, setIsLiveClass,
    role_name, setRoleName,
    isActiveButton, setIsActiveButton
  }

  const isAccess = isLiveClass

  useEffect(() => {
    // if (isAccess) {
      setIsActiveButton(defaultActiveButton);
      setDescriptionData("");
    // }

  }, [trianglelist,]);


  useEffect(() => {
    if (StudentData && isAccess) {
      const { descriptionData, isActiveButton, trianglelist } = StudentData ?? {}
      setDescriptionData(descriptionData);
      setIsActiveButton(isActiveButton);
      setTriangleList(trianglelist)
    }
  }, [StudentData, isAccess])


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
