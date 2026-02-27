import React, { useEffect, useRef, useState } from 'react'

import Setting from './Setting/Setting'
// import EquilateralTriangle from './AllTriangles/EquilateralTriangle'

import QuadrilateralMaping from './AllQuadrilateral/QuadrilateralMaping'
import { QuadrilateralProvider, useQuadrilateralContext } from './ContextQuardrilateral/Context'

const QuadrilateralMain = ({ prop, handleDataTrack = () => { }, StudentData }) => {
  return (
    <QuadrilateralProvider StudentData={StudentData}>
      <MainContent  prop={prop} handleDataTrack={handleDataTrack} />
    </QuadrilateralProvider>

  )
}


const MainContent = ({ prop, handleDataTrack }) => {
  const { isMax, setIsMax,setIsLiveClass, setRoleName,data, isActiveButton, finalSelected , setFinalSelected ,isLiveClass,role_name} = useQuadrilateralContext();
  // const [finalSelected, setFinalSelected] = useState("Square")
  const [state, setState] = useState(false)
  const settingRef = useRef(null);
 useEffect(() => {
    const { isLiveClass, role_name } = prop ?? {}
    if (isLiveClass) {
      setIsLiveClass(isLiveClass)
      setRoleName(role_name)
    }

  }, [prop, setIsLiveClass, setRoleName])

 useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      const trackdata = {
        data: data,
        isActiveButton: isActiveButton,
        finalSelected: finalSelected
      }
      console.log(trackdata,"trackdatatrackdata")
      handleDataTrack(trackdata)
    }

  }, [ isActiveButton,data, isLiveClass, role_name, finalSelected])
  const toggleFullscreen = () => {
    const fullScreenElem = document.getElementById('enable-full-screen');
    if (!document.fullscreenElement) {
      fullScreenElem?.requestFullscreen?.();
      (fullScreenElem)?.webkitRequestFullscreen?.();
      (fullScreenElem)?.msRequestFullscreen?.();
      setIsMax(true);
    } else {
      document.exitFullscreen?.();
      (document).webkitExitFullscreen?.();
      (document).msExitFullscreen?.();
      setIsMax(false);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Fullscreen exited (ESC pressed or user exited manually)
        setIsMax(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);


  const openSettingHandler = () => {
    setState(prev => ({ ...prev, toggleSetting: true }));
  };

  const closeSettingHandler = () => {
    setState(prev => ({ ...prev, toggleSetting: false }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        state.toggleSetting &&
        settingRef.current &&
        !(settingRef.current).contains(event.target)
      ) {
        closeSettingHandler();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.toggleSetting]);

  const isAccess = isLiveClass ? role_name === "tutor" : true

  return (
    <div
      id="enable-full-screen"
      style={{
        minHeight: "100%",
        width: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        borderRadius: isLiveClass ? "" : "16px",
        // alignItems: 'center',
        backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        marginTop: isLiveClass ? "" :"10px"
      }}
    >
     {!isLiveClass && <div
        style={{
          position: "absolute",
          right: "10px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" onClick={toggleFullscreen} />

      </div>}
      <div
        style={{
          // position: 'relative',
          // overflow: 'hidden',
          marginTop: isLiveClass ? "" : "20px",
          height: '100%',
          width: '100%',
        }}
      >
        <QuadrilateralMaping finalSelected={finalSelected} />
      </div>

      { isAccess && <div
        onClick={openSettingHandler}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          zIndex: isLiveClass ? "" : 10,
          // bottom:'20px',


          left: "2rem",
          top: "1rem",
          cursor: "pointer",
        }}
      >
        <img src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/setting.png' alt='setting'
          style={{
            width: '65px',
            height: '65px',
          }}
        />
      </div>}

      <div
        ref={settingRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: isLiveClass ? "" : 999,
          transform: state.toggleSetting ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <Setting setFinalSelected={setFinalSelected} setState={setState} />
      </div>
    </div>


  );
}










export default QuadrilateralMain