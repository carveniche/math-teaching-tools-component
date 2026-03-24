import React, { useRef } from 'react';
import SettingButton from './Setting/SettingButton';
import { PlotProvider, usePlotContext } from './context/PlotContext';
import LinePlotUi from './UI/LinePlotUi';
import PictureGraph from './UI/PictureGraph';
import BarGraph from './UI/BarGraph';
import BarGraphError from './Error/BarGraphError';
import LinePlotError from './Error/LinePlotError';

// Main wrapper with context
const Plot = ({ graph, props, handleDataTrack = () => { } }) => {
  return (
    <PlotProvider props={props} graph={graph} handleDataTrack={handleDataTrack}>
      <LineMain graph={graph} />
    </PlotProvider>
  );
};

const LineMain = ({ graph }) => {
  const { state, setState, isAcessTeacher, role_Name, isLiveClass } = usePlotContext();
  const settingRef = useRef(null);

  const toggleFullscreen = () => {
    const el = document.getElementById('enable-full-screen');
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.() || el?.webkitRequestFullscreen?.() || el?.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
    }
  };

  const openSettingHandler = () => {
    setState(prev => ({ ...prev, toggleSetting: true }));
  };

  const isAcess = isLiveClass ? role_Name === "tutor" : true

  return (
    <div
      id="enable-full-screen"
      style={{
        height: isLiveClass ?'100%' : "100vh",
        width: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '16px',
        backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
        boxSizing: 'border-box',
        // removed marginTop:10px — it was eating into height
      }}
    >
      {/* Settings icon — top left */}
      {isAcess && <div
        onClick={openSettingHandler}
        style={{
          position: 'absolute',
          left: '1rem',
          top: '0.5rem',
          zIndex: isLiveClass ? 1 : 10,
          cursor: 'pointer',
        }}
      >
        <img
          src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/setting.png'
          alt='setting'
          style={{ height: '50px', width: '50px' }}
        />
      </div>}

      {/* Fullscreen icon — top right */}
      {!isLiveClass && <div
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          zIndex: 20,
          cursor: 'pointer',
        }}
      >
        <img
          src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png"
          alt="full-screen"
          onClick={toggleFullscreen}
        />
      </div>}

      {/* Graph content area — fills all space, lets children be responsive */}
      <div
        style={{
          position: 'relative',
          // Take full height, subtract space for the setting/fullscreen icons at top
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          // Add top padding so content doesn't slide under the icon buttons
          // paddingTop: '56px',
          boxSizing: 'border-box',
        }}
      >
        <BarGraphError />
        <LinePlotError />

        {graph === 'Picture Graph' ? <PictureGraph /> :
          graph === 'Bar Graph' ? <BarGraph /> :
            <LinePlotUi />}
      </div>

      {/* Settings panel — slides up from bottom */}
      <div
        ref={settingRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          transition: 'transform 0.5s ease-in-out',
          transform: state.toggleSetting ? 'translateY(0)' : 'translateY(100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SettingButton graph={graph} />
      </div>
    </div>
  );
};

export default Plot;