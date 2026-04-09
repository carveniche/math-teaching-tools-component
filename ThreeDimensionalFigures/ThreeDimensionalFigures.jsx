import React, { useEffect, useRef, useState } from 'react'
import { TriangleProvider, useTriangleContext } from './contextDimensional/ContextTriangle.jsx'
import Setting from './Setting/Setting.jsx'
import DimensionalMaping from './AllSolidType/DimensionalMaping.jsx'

const ThreeDimensionalFigures = () => {
  return (

    <TriangleProvider>
      <MainContent />
    </TriangleProvider>
  )
}


const MainContent = () => {
  const { state, setState, setIsMaximized, isLiveClass, roleName, } = useTriangleContext();
  const settingRef = useRef(null);



  const toggleFullscreen = () => {
    const fullScreenElem = document.getElementById('enable-full-screen');
    if (!document.fullscreenElement) {
      fullScreenElem?.requestFullscreen?.();
      (fullScreenElem)?.webkitRequestFullscreen?.();
      (fullScreenElem)?.msRequestFullscreen?.();
      setIsMaximized(true)
    } else {
      document.exitFullscreen?.();
      (document).webkitExitFullscreen?.();
      (document).msExitFullscreen?.();
      setIsMaximized(false)
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsMaximized(false)
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

  return (
    <div
      id="enable-full-screen"
      style={{
      //  height: 'calc(100vh - 200px)',
      height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: "column",  // 🔥 IMPORTANT
        position: 'relative',
        overflow: 'hidden',
        padding: '20px 0px 20px 0px',
        justifyContent: 'center',
        borderRadius: "16px",
        backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        marginTop:isLiveClass ? "0px" : "10px"
      }}
    >
      {!isLiveClass && (<div
        style={{
          position: "absolute",
          right: "10px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >

        <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" onClick={toggleFullscreen} />

      </div>)}
      {roleName === "tutor" && (<div
        onClick={openSettingHandler}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          zIndex: isLiveClass ? 1 : 10,
          left: "2rem",
          top: "1rem",
          cursor: "pointer",
        }}
      >
        <img src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/setting.png' alt='setting'
          style={{
            width: "65px",
            height: "65px",
          }}
        />
      </div>)}

      <div
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <DimensionalMaping />
      </div>

      <div
        ref={settingRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          transform: state.toggleSetting ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        <Setting />
      </div>
    </div>


  );
}








export default ThreeDimensionalFigures