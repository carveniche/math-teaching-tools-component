import React, { useEffect, useState } from "react";
import NumberLineFractionMain from "./NumberLineFractionMain";
import { calculateDivisors } from "./JS/numberLineFraction";
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import ShowingFractionDivisor from "./ShowingFractionDivisor";

function NumberLineFraction({ props, handleDataTrack }) {
  const { isLiveClass, role_name, Data } = props ?? {};
  const [getIntegerStart, setgetIntegerStart] = useState("0");
  const [getIntegerEnd, setgetIntegerEnd] = useState("7");
  const [getDiviser, setgegetDiviser] = useState([]);
  const [Error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [openSetting, setopenSetting] = useState(false);
  const [denominator, setdenominator] = useState("8");
  const [isMaximize, setISMaximize] = useState(false)
  const [activeBtn, setactiveBtn] = useState(false)
  const [isActiveButton, setIsActiveButton] = useState({
    isFraction: false,
    isMixed: false,
  })
  const shakeStyle = {
    animation: "slowShake 10s ease-in-out infinite",
    zIndex: "55",
  };

  useEffect(() => {
    calculateDivisors(getIntegerStart, getIntegerEnd, denominator, setgegetDiviser, setShowError, setError);
    // console.log("hell",denominator)
  }, [getIntegerStart, getIntegerEnd, denominator]);




  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      handleDataTrack({
        isFrom: "numberLineFractionValue",
        data: {
          getIntegerStart,
          getIntegerEnd,
          denominator,
        }
      })
    }
  }, [isLiveClass, role_name, getIntegerStart, getIntegerEnd, denominator])


  useEffect(() => {

    if (isLiveClass && role_name !== "tutor" && Data?.numberLineFractionValue) {
      const { getIntegerStart, getIntegerEnd, denominator } = Data?.numberLineFractionValue || {};
      setgetIntegerStart(getIntegerStart || "0");
      setgetIntegerEnd(getIntegerEnd || "7");
      setdenominator(denominator || "8");
    }

  }, [Data?.numberLineFractionValue])



  // console.log(getDiviser);
  const [show, hide] = useState(false)

  const handleOpenSetting = () => {
    setopenSetting(!openSetting);
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

  const isTeacher = isLiveClass ? role_name === "tutor" : true;

  return (


    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        // background: "linear-gradient(to bottom, #fef3c7, #fed7aa)",
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
        background: "skyblue",
        // height: "100%",
          height: isLiveClass ? '100%' : 'calc(100vh - 200px)',
        borderRadius: "0.25rem"
      }}
      id="enable-full-screen"
    >
      {/*  */}

      {/*  */}
      {/* <button onClick={enableDiv}>Show</button> */}

      <div
        style={{
          width: "100%",
          display: "flex",
          // height:"100%",
          marginTop: "10px",
          marginLeft: "2px"

        }}
      >
        {isTeacher &&
          (<div
            style={{
              width: "4rem",
              marginRight: "1rem",
              zIndex: isLiveClass ? 0 : 50,
              cursor: "pointer",
              // marginTop: "-2rem",
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
                  width: "5rem",
                  // top: "1rem",
                  paddingLeft: "20px",
                  animation: "slowShake 10s ease-in-out infinite",
                }}
              />
            )}
          </div>)
        }
        {showError &&
          <div
            style={{
              width: "100%",

              // textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // marginBottom: "10px"
            }}
          ><span style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "16px", textAlign: "center", }} className="text_body" >{Error}</span>
          </div>}
      </div>


      {!isLiveClass && <div
        style={{
          position: "absolute",
          right: "10px",
          // background:"red",
          borderRadius: "16px",
          zIndex: 20,
          top: "10px",
          cursor: "pointer",
        }}
      >
        <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" onClick={toggleFullscreen} />

      </div>}


      <style>
        {`
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
        <NumberLineFractionMain getDivisor={getDiviser}
          getIntegerEnd={getIntegerEnd} isMaximize={isMaximize}
          props={props}
          handleDataTrack={handleDataTrack}
        />
      </div>

      {openSetting && (
        <>
          <div
            onClick={handleOpenSetting}
            style={{
              position: "absolute",
              top: "0rem",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.73)",
              zIndex: 0,
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              left: 0,
              width: "40%",
              maxWidth: "80%",
              zIndex: 10,
              height: "100%",
              backgroundColor: "white",
              top: 0,
              // paddingBottom: "2rem",
              overflowY: "auto",
              transform: openSetting ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0rem" }}>
              <div
                style={{
                  width: "100%",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "1.25rem",
                  paddingLeft: "10px",
                  borderRadius: "0.25rem",
                  backgroundColor: "rgb(49, 49, 83)",
                }}
              >
                <p style={{ color: "#93c5fd", textAlign: "center" }} className="h2-large">Settings</p>
              </div>

              <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: "3%",
                    backgroundColor: "white",
                    borderRadius: "0.25rem",
                    height: "12rem",
                  }}
                >
                  <div style={{ width: "100%", borderRadius: "0.25rem" }}>
                    <div style={{ textAlign: "center", borderRadius: "0.25rem" }}>
                      <p className="h3-large">Fractions</p>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "2.5rem",
                          borderBottom: "1px solid #9ca3af",
                          padding: "0 2rem",
                          gap: "1rem"
                        }}
                      >
                        <p style={{ color: "#9ca3af", }} className="h4-large">Start Number </p>
                        <input
                          type="text"
                          value={getIntegerStart}
                          inputMode="numeric"
                          // readOnly
                          maxLength={2}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setgetIntegerStart(val);
                          }}
                          style={{
                            textAlign: "center",
                            // width: "20%",
                            height: "35px",
                            backgroundColor: "#8B4513",
                            border: "none",
                            outline: "none",
                            borderRadius: "0.5rem",
                            color: "white",
                            padding: "0 0.2rem",
                            // cursor:"not-allowed"
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "2.5rem",
                          borderBottom: "1px solid #9ca3af",
                          padding: "0 2rem",
                          gap: "1rem"
                        }}
                      >
                        <p style={{ color: "#9ca3af", }} className="h4-large">End Number </p>
                        <input
                          type="text"
                          value={getIntegerEnd}
                          inputMode="numeric"
                          maxLength={2}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setgetIntegerEnd(val);
                          }}
                          style={{
                            backgroundColor: "#8B4513",
                            // width: "20%",
                            textAlign: "center",
                            border: "none",
                            outline: "none",
                            height: "35px",
                            borderRadius: "0.5rem",
                            color: "white",
                            padding: "0 0.2rem",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "2.5rem",
                          borderBottom: "1px solid #9ca3af",
                          padding: "0 2rem",
                          gap: "1rem"
                        }}
                      >
                        <p style={{ color: "#9ca3af", }} className="h4-large">Divisions</p>
                        <input
                          type="text"
                          value={denominator}
                          inputMode="numeric"
                          maxLength={1}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setdenominator(val);
                          }}
                          style={{
                            backgroundColor: "#8B4513",
                            // width: "20%",
                            textAlign: "center",
                            border: "none",
                            outline: "none",
                            height: "35px",
                            borderRadius: "0.5rem",
                            color: "white",
                            padding: "0 0.2rem",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>


  );
}

export default NumberLineFraction;