import React, { useEffect, useRef, useState } from 'react'
import { TriangleProvider, useTriangleContext } from './ContextTriangle/ContextTriangle.jsx'
import Setting from './Setting/Setting.jsx'
import TriangleMaping from './AllTriangles/TriangleMaping.jsx'

const TrianleMain = ({ prop, handleDataTrack = () => { }, StudentData }) => {
  return (
    <TriangleProvider StudentData={StudentData}>
      <MainContent prop={prop} handleDataTrack={handleDataTrack} />
    </TriangleProvider>
  )
}


const MainContent = ({ prop, handleDataTrack }) => {
  const { state, setState, setIsMaximized, isLiveClass, setIsLiveClass,
    role_name, setRoleName, descriptionData, isActiveButton, trianglelist } = useTriangleContext();
  const settingRef = useRef(null);
  useEffect(() => {
    const { isLiveClass, role_name } = prop ?? {}
    if (isLiveClass) {
      setIsLiveClass(isLiveClass)
      setRoleName(role_name)
    }

  }, [prop, setIsLiveClass, setRoleName])


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
        // Fullscreen exited (ESC pressed or user exited manually)
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

  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      const data = {
        descriptionData: descriptionData,
        isActiveButton: isActiveButton,
        trianglelist: trianglelist
      }
      handleDataTrack(data)
    }

  }, [descriptionData, isActiveButton, isLiveClass, role_name, trianglelist])

  const isAccess = isLiveClass ? isLiveClass && role_name === "tutor" : true;

  return (
    <div
      id="enable-full-screen"
      style={{
        minHeight: "100%",
        width: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        padding: isLiveClass ? "" : '20px 0px 20px 0px',
        justifyContent: 'center',
        borderRadius: "16px",
        alignItems: 'center',
        backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        marginTop: isLiveClass ? "" : "10px"
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
      {isAccess && (<div
        onClick={openSettingHandler}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          zIndex: isLiveClass ? 1 : 10,
          // bottom:'20px',
          left: "2rem",
          top: "1rem",
          cursor: "pointer",
        }}
      >
        {/* <img
          src="./setting.png"
          alt="setting"
          style={{
            width: window.innerWidth >= 768 ? '50px' : '30px',
            height: window.innerWidth >= 768 ? '50px' : '30px',
          }}
        /> */}
        {/* <IoSettingsOutline className="text-3xl md:text-xl xl:text-4xl " /> */}
        <img src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/setting.png' alt='setting'
          style={{
            width: "65px",
            height: "65px",
          }}
        />
        {/* setting */}
      </div>)}
      <div
        style={{
          // position: 'relative',
          // overflow: 'hidden',
          marginTop: "20px",
          height: '100%',
          width: '100%',
        }}
      >
        <TriangleMaping />
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








export default TrianleMain