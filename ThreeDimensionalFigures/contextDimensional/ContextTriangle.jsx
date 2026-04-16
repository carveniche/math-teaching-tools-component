import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';


// Create the context
const TriangleContext = createContext(undefined);

// Provider component
export const TriangleProvider = ({ children, prop, handleDataTrack }) => {
  const [trianglelist, setTriangleList] = useState("Cube");
  const [descriptionData, setDescriptionData] = useState("");

  const [state, setState] = useState({ toggleSetting: false });
  const [ismaximized, setIsMaximized] = useState(false);

  const [isLiveClass, setIsLiveClass] = useState(false);
  const [roleName, setRoleName] = useState("tutor");
  const [isActiveButton, setIsActiveButton] = useState({
    isAngle: false,
    isInfo: false
  });

  const { isLive_class = false, role_name, Data } = prop;

  const isTeacher = isLiveClass && roleName === "tutor";
  const isStudent = isLiveClass && roleName !== "tutor";
  const isButtonAccess = isLiveClass ? roleName === "tutor" : true

  const sendDataTrack = (isFrom, data) => {
    if (!isLiveClass || !isTeacher) return;
    handleDataTrack?.({ isFrom, data });
  };

  useEffect(() => {
    setDescriptionData("")
    setIsActiveButton((prev) => ({
      isAngle: false
    }))
  }, [trianglelist])


  useEffect(() => {
    if (isTeacher) {
      sendDataTrack("trianglelist", trianglelist)
    }

  }, [isLiveClass, trianglelist])

  useEffect(() => {
    if (isTeacher) {
      sendDataTrack("descriptionData", descriptionData)
    }
  }, [descriptionData])

  useEffect(() => {
    if (isStudent && Data?.trianglelist) {
      console.log(Data, "DataData")
      setTriangleList(Data?.trianglelist)

    }

  }, [isLiveClass, Data?.trianglelist])

  useEffect(() => {
    if (isStudent && Data?.descriptionData) {
      console.log(Data?.descriptionData, "descriptionData")
      setDescriptionData(Data?.descriptionData)
      setIsActiveButton((prev) => ({
        isAngle: true
      }))
    } else if (isStudent && Data?.descriptionData === "") {
      setDescriptionData("")
      setIsActiveButton((prev) => ({
        isAngle: false
      }))
    }

  }, [isLiveClass, Data?.descriptionData])

  useEffect(() => {
    if (isLive_class) {
      setIsLiveClass(isLive_class);
      setRoleName(role_name)
    }
  }, [isLive_class, role_name])

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
    isActiveButton,
    setIsActiveButton,
    isButtonAccess,

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
