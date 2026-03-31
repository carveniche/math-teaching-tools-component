import React, { useState, useEffect } from "react";
import NumberLineDecimalMain from "./NumberLineDecimalMain";
import { useNumberLineDecimalLogic } from "./JS/numberLineDecimal";
import ShowingDecimalDivisor from "./ShowingDecimalDivisor";

function NumberLineDecimal({ props, handleDataTrack }) {
  const { isLiveClass, role_name, Data } = props ?? {};
  const {
    getIntegerStart,
    setgetIntegerStart,
    getIntegerEnd,
    setgetIntegerEnd,
    getDiviser,
    Error,
    showError,
    sendStartData,
    sendEndData,
    // gettingHopsValue,
    openSetting,
    inputDivisor,
    setInputDivisior,
    handleOpenSetting,
  } = useNumberLineDecimalLogic();
  const [isMaximize, setISMaximize] = useState(false)
  const [show, hide] = useState(false)
  const shakeStyle = {
    animation: "slowShake 10s ease-in-out infinite",
    zIndex: "55",
  };
  const toggleFullscreen = () => {
    const fullScreenElem = document.getElementById('enable-full-screen');
    if (!document.fullscreenElement) {
      fullScreenElem?.requestFullscreen?.();
      (fullScreenElem)?.webkitRequestFullscreen?.();
      (fullScreenElem)?.msRequestFullscreen?.();
      setISMaximize(true)
    } else {
      document.exitFullscreen?.();
      (document).webkitExitFullscreen?.();
      (document).msExitFullscreen?.();
      setISMaximize(false)
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setISMaximize(false);
      } else {
        setISMaximize(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari
    document.addEventListener("msfullscreenchange", handleFullscreenChange); // IE/Edge

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const enableDiv = (() => {
    hide(!show)
  })

  // Live class data tracking

  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      handleDataTrack({
        isFrom: "numberLineDecimalSettings",
        data: {
          getIntegerStart,
          getIntegerEnd,
          inputDivisor,
        }
      })
    }
  }, [getIntegerStart, getIntegerEnd, inputDivisor, isLiveClass, role_name, handleDataTrack])


  useEffect(() => {
    if (isLiveClass && role_name !== "tutor") {

      const settings = Data?.numberLineDecimalSettings;
      if (!settings) return;

      const { getIntegerStart, getIntegerEnd, inputDivisor } = settings;

      if ([getIntegerStart, getIntegerEnd, inputDivisor].some(v => v == null)) return;

      setgetIntegerStart(getIntegerStart);
      setgetIntegerEnd(getIntegerEnd);
      setInputDivisior(inputDivisor);
    }

  }, [Data?.numberLineDecimalSettings, isLiveClass, role_name]);

  const isTeacher = isLiveClass ? role_name === "tutor" : true;
  return (
    <>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          background: "skyblue",
          height: "100%",
          backgroundSize: "20rem",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "0.25rem",
        }}
        id="enable-full-screen"
      >
        {show && (
          <div
            style={{
              position: "absolute",
              background: "black",
              width: "100%",
              height: "100%",
              zIndex: "1000",
              opacity: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={enableDiv}
          >

          </div>
        )}



        <div
          style={{
            width: "100%",
            display: "flex",
            // height:"100%"
            marginTop: "10px",
            marginLeft: "15px"

          }}
        >
          {isTeacher && (<div
            style={{
              width: '4rem',
              marginRight: "1rem",
              zIndex: isLiveClass ? 0 : 50,
              cursor: "pointer",
            }}
            onClick={handleOpenSetting}
          >
            {openSetting ? (
              <></>
            ) : (
              <img
                src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/setting.png"
                alt="setting"
                style={{
                  width: "100%",
                  position: "relative",
                  zIndex: 50,
                  // top: "1rem",
                  left: "20px",
                  animation: "slowShake 10s ease-in-out infinite",
                }}
              />
            )}
          </div>)}
          {showError &&
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ><span style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "16px", textAlign: "center", }} className="text_body" >{Error}</span>
            </div>}
        </div>


        {!isLiveClass && (<div
          style={{
            position: "absolute",
            right: "10px",
            borderRadius: "16px",
            zIndex: 20,
            top: "10px",
            cursor: "pointer",
          }}
        >
          <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" style={{ width: "2rem" }} onClick={toggleFullscreen} />


        </div>)}

        <style>
          {`
      @media (min-width: 1280px){ 
        @keyframes slowShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(4px); }
          40% { transform: translateX(-4px); }
          60% { transform: translateX(3px); }
          80% { transform: translateX(-3px); }
        }
      `}
        </style>
        <div style={{ width: "90%", height: "100%", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <NumberLineDecimalMain
            getStartData={sendStartData}
            getEndData={sendEndData}
            getDivisor={getDiviser}
            isMaximize={isMaximize}
            enableDiv={enableDiv}
            props={props}
            handleDataTrack={handleDataTrack}
          />
        </div>
        <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: "-1rem" }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '2.5rem',
            }}
          >

          </div>
        </div>

        {openSetting && (
          <>
            <div
              onClick={handleOpenSetting}
              style={{
                position: "absolute",
                inset: 0,
                top: "0rem",
                backgroundColor: "#000000ba",
                opacity: 0.5,
                zIndex: 0,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: "0",
                width: "40%",
                maxWidth: "80%",
                zIndex: 10,
                height: "100%",
                backgroundColor: "white",
                top: "0",
                transition: "transform 0.5s ease-in-out",
                transform: openSetting ? "translateX(0)" : "translateX(100%)",
                borderRadius: "0.25rem",
                // overflowY: "auto",
              }}
            >
              <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "100%",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    borderRadius: "0.25rem",
                    backgroundColor: "rgb(49, 49, 83)",
                  }}
                >
                  <p style={{ color: "#fef3c7", textAlign: "center" }} className="h2-large">Settings</p>
                </div>

                <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      gap: "5%",
                      backgroundColor: "white",
                      borderRadius: "0.25rem",
                      height: "12rem",
                    }}
                  >
                    <div style={{ width: "100%", borderRadius: "0.25rem" }}>
                      <div style={{ textAlign: "center", paddingBottom: "2rem" }}>
                        <p style={{ fontSize: "1rem" }} className="h3-large">Decimals</p>

                        {["Start", "End", "Divisions"].map((label, index) => (
                          <div
                            key={label}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10%",
                              justifyContent: "space-between",
                              padding: "0 2rem",
                              alignItems: "center",
                              height: "3.5rem",
                              borderBottom: "1px solid #d1d5db",
                            }}
                          >
                            <p style={{ color: "#9ca3af", width: "" }} className="h4-large">{label == "Start" ? 'Start Number ' : label == "End" ? 'End Number ' : "Divisions"}</p>
                            <input
                              type="text"
                              value={
                                label === "Start"
                                  ? getIntegerStart
                                  : label === "End"
                                    ? getIntegerEnd
                                    : inputDivisor
                              }
                              inputMode="numeric"
                              maxLength={label === "Divisions" ? 2 : 3}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (label === "Divisions") {
                                  // Allow empty input
                                  if (value === "") {
                                    setInputDivisior("");
                                    return;
                                  }

                                  // Allow only numbers
                                  if (!/^\d+$/.test(value)) return;

                                  // Allow only 1–20
                                  if (Number(value) > 20) return;

                                  setInputDivisior(value);
                                  return;
                                }
                                if (label === "Start") setgetIntegerStart(value);
                                else if (label === "End") setgetIntegerEnd(value);
                                else setInputDivisior(value);
                              }}
                              style={{
                                backgroundColor: "#8B4513",
                                width: "20%",
                                textAlign: "center",
                                border: "none",
                                outline: "none",
                                height: "35px",
                                borderRadius: "0.5rem",
                                color: "white",
                                padding: "0.2rem",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </>
  );
}

export default NumberLineDecimal;