
import React, { useState, useEffect } from "react";
// import "../css/numberLine.css";
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CommonButton from "../Triangles/AllTriangles/CommonComponent/CommonButton";

const useNumberLineLogic = () => {
  const [getIntegerStart, setgetIntegerStart] = useState("0");
  const [getIntegerEnd, setgetIntegerEnd] = useState("10");
  const [getDiviser, setgetDiviser] = useState([]);
  const [Error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [sendStartData, setsendStartData] = useState(0);
  const [sendEndData, setsendEndData] = useState(10);
  const [openSetting, setopenSetting] = useState(false);
  const [getEndDivisor, setgetEndDivisor] = useState("10");
  const [getEndDivisor_arry, setgetEndDivisor_arry] = useState([]);



  useEffect(() => {
    const change_getInteger = () => {
      let totalDivisor = [];
      let render_totalDivisor = [];
      let start = parseInt(getIntegerStart);
      let end = parseInt(getIntegerEnd);
      let range = end - start;
      let getEndDivisor_data = parseInt(getEndDivisor);
      let step = range / getEndDivisor_data;
      // console.log(getIntegerEnd,"getIntegerEnd",getDiviser,"getDiviser",getIntegerStart,"getIntegerStart")

      if (!isNaN(start) && !isNaN(end) && start < end && range <= 25) {
        setsendStartData(start);
        setsendEndData(end);
        setShowError(false);

        for (let i = start; i <= end; i += step) {
          render_totalDivisor.push(Number(i.toFixed(2)));
        }
        setgetEndDivisor_arry(render_totalDivisor);

        for (let i = 1; i <= range; i++) {
          if (range % i === 0) {
            totalDivisor.push(i);
          }
        }
        setgetDiviser(totalDivisor);
      } else {
        setShowError(true);
        if (isNaN(start)) {
          setError("Please Enter Valid Start Value");
        } else if (isNaN(end)) {
          setError("Please Enter Valid End Value");
        } else if (start >= end) {
          setError("Start Value Should Be Less Than End Value");
        } else if (range > 50) {
          setError("Range Between Start and End Should Be 25 or Less");
        }
      }
    };
    change_getInteger();
  }, [getIntegerStart, getIntegerEnd, getEndDivisor]);

  const handleOpenSetting = () => {
    setopenSetting(!openSetting);

  };

  return {
    getIntegerStart,
    setgetIntegerStart,
    getIntegerEnd,
    setgetIntegerEnd,
    getDiviser,
    Error,
    showError,
    sendStartData,
    sendEndData,
    openSetting,
    getEndDivisor,
    setgetEndDivisor,
    getEndDivisor_arry,
    handleOpenSetting,
  };
};



const useNumberLineMainLogic = ({ getStartData, getEndData, numberHops, hopsData }) => {
  const [gettingTotalNumber, setgettingTotalNumber] = useState([]);
  const [showLable, setshowLable] = useState(false);
  const [showDiviser, setDiviser] = useState(false);
  const [getHops, setHops] = useState(0);

  useEffect(() => {
    let totalNumber = [];
    for (let i = getStartData; i <= getEndData; i++) {
      totalNumber.push(i);
    }
    setgettingTotalNumber(totalNumber);
  }, [getStartData, getEndData]);

  useEffect(() => {
    if (hopsData !== undefined) {
      setHops(hopsData);
    }
  }, [hopsData]);

  const handleshowLable = () => {
    setshowLable(!showLable);
    const clickSound = new Audio("https://d3g74fig38xwgn.cloudfront.net/teaching-tool/clickbtN.wav");
    clickSound.play();
  };

  const handleshowDiviser = () => {
    setDiviser(!showDiviser);
  };

  return {
    gettingTotalNumber,
    showLable,
    showDiviser,
    getHops,
    handleshowLable,
    setshowLable,
    handleshowDiviser,
  };
};


const NumberLineMain = ({ props, handleDataTrack, getStartData, getEndData, numberHops, getDivisor, hopsData, show_divisior, isMaximize, enableDiv }) => {
  const { isLiveClass, role_name, Data } = props ?? {};
  const { gettingTotalNumber, showLable, showDiviser, getHops, setshowLable, handleshowLable, handleshowDiviser } = useNumberLineMainLogic({
    getStartData,
    getEndData,
    numberHops,
    hopsData,
  });

  const theme = useTheme();
  const [isActiveButton, setIsActiveButton] = useState({
    isAngle: false
  })

  const numberLineHandler = () => {
    handleshowLable()
    setIsActiveButton((prev) => ({
      ...prev,
      isAngle: !prev.isAngle
    }));

  }

  // Live class data tracking

  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      handleDataTrack(
        {
          isFrom: "showLableNumberLine",
          data: showLable,
        }
      )
    }
  }, [showLable, isLiveClass, role_name, handleDataTrack])

  useEffect(() => {
    if (isLiveClass && role_name !== "tutor") {
      setshowLable(Data?.showLableNumberLine || false);
      setIsActiveButton((prev) => ({
        ...prev,
        isAngle: Data?.showLableNumberLine || false
      }))
    }
  }, [Data?.showLableNumberLine, isLiveClass, role_name,])



  // const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  return (

    <div style={{ width: '100%', background: "white", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: '1rem', borderRadius: "10px", padding: "1rem" }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backdropFilter: 'blur(4px)',
          borderRadius: '1.5rem',

        }}
      >
        <div
          style={{
            position: 'relative',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/rightArrow.png" alt="" style={{ position: "absolute", right: "1%", top: "0.1rem", color: "#dc2626", fontSize: "1rem", fontWeight: "bolder", display: "flex", justifyContent: "center", alignItems: "center" }} />
          <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/leftArrow.png" alt="" style={{ position: "absolute", left: "1%", top: "0.1rem", color: "#dc2626", fontSize: "1rem", fontWeight: "bolder", display: "flex", justifyContent: "center", alignItems: "center" }} />
          <div
            style={{
              width: '95%',
              borderBottom: '6px solid #dc2626',
              height: '1rem',
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '95%',
            }}
          >
            {gettingTotalNumber.map((num, index) => {
              const isFirst = index === 0;
              const isLast = index === gettingTotalNumber.length - 1;
              const isDivisor = getDivisor.includes(Number(num.toFixed(2)));

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    minWidth: '16px',
                    ...(window.innerWidth >= 640 ? { minWidth: '20px' } : {}),
                    marginTop: '0rem',
                  }}
                >
                  {isDivisor && (
                    <div
                      style={{
                        width: '3px',
                        height: '5px',
                        borderRadius: '0.375rem',
                        transition: 'all 0.3s',
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "-5px",
                        backgroundColor: isDivisor ? "rgb(220, 38, 38)" : "black",
                      }}
                    >
                      ⬇
                    </div>
                  )}
                  <p
                    style={{
                      paddingTop: "15px",
                      color: '#201811ff',
                      fontWeight: 'bold',
                      opacity: (isDivisor && showLable) || isFirst || isLast ? 1 : 0,
                      visibility: (isDivisor && showLable) || isFirst || isLast ? 'visible' : 'hidden',
                    }}
                    className="h4"
                  >
                    {num}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: "center",
            margin: "auto",
          }}
        >
          <div>
            <CommonButton value="Show Integers"
              isActiveButton={isActiveButton.isAngle}
              onClick={numberLineHandler}
              data={{
                isLiveClass: isLiveClass,
                role_name: role_name
              }}
            />
          </div>
        </div>
      </div>
    </div>


  );
};

const NumberLine = ({ props, handleDataTrack }) => {
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
    openSetting,
    getEndDivisor,
    setgetEndDivisor,
    getEndDivisor_arry,
    handleOpenSetting,
  } = useNumberLineLogic();
  const [isMaximize, setISMaximize] = useState(false)
  const shakeStyle = {
    animation: "slowShake 10s ease-in-out infinite",
    zIndex: "55",
  };
  const [show, hide] = useState(false)
  const enableDiv = (() => {
    hide(!show)
  })
  const [openDivisionDropdown, setOpenDivisionDropdown] = useState(false);

  const toggleFullscreen = () => {
    // console.log("sdfsdfsdfsdfdsdfsdf")
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
  const theme = useTheme();
  // const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));


  // Live class data track

  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      handleDataTrack(
        {
          isFrom: "getIntegerStartNumberLine",
          data: {
            getIntegerStart,
            getIntegerEnd,
            getEndDivisor
          }

        }
      )
    }

  }, [getIntegerStart, getIntegerEnd, getEndDivisor])


  useEffect(() => {
    if (isLiveClass && role_name !== "tutor") {
        const settings = Data?.getIntegerStartNumberLine;
      if (!settings) return;

      const { getIntegerStart, getIntegerEnd, getEndDivisor } = settings;
      console.log(Data,"jssjssjshsjshsj");
      setgetIntegerStart(getIntegerStart);
      setgetIntegerEnd(getIntegerEnd );
      setgetEndDivisor(getEndDivisor );
    }
  }, [Data?.getIntegerStartNumberLine])



  const isTeacher = isLiveClass ? role_name === "tutor" : true;

  return (
    <>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          background: "skyblue",
          borderRadius: "0.25rem"
        }}
        id="enable-full-screen"
      >
        {/*  */}
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
            <div
              style={{
                background: "url(https://d3g74fig38xwgn.cloudfront.net/sound_wall/images/wordBg.jpg)",
                width: "60%", // add your desired size
                height: "60%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexDirection: "row",
                flexWrap: "wrap",
                backgroundColor: "white",
              }}
            >
              {getDiviser.map((item, index) => (
                <span
                  key={index}
                  style={{
                    border: '1px solid #d1d5db',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '1.5rem',
                    color: 'black',
                    background: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    height: "20%"

                  }}
                  className='tab-text'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        {/*  */}
        <div
          style={{
            width: "100%",
            display: "flex",
            display: "flex",
            alignItems: "center",
            // height: "100%",
            marginLeft: "10px"

          }}
        >
          {isTeacher && (<div
            style={{
              width: "3.125rem",
              marginRight: "1rem",
              zIndex: isLiveClass ? 0 : 50,
              cursor: "pointer",
            }}
            onClick={handleOpenSetting}
          >
            {openSetting ? (
              <>
              </>
            ) : (
              <img
                src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/setting.png"
                alt="setting"
                style={{
                  width: "100%",
                  position: "relative",
                  zIndex: isLiveClass ? 0 : 50,
                  width: '4rem',
                  animation: "slowShake 10s ease-in-out infinite",
                }}
                className="shakeStyle"
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
          <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" onClick={toggleFullscreen} />

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
      }
    `}
        </style>
        <div style={{ width: "90%", height: "100%", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <NumberLineMain
            getStartData={sendStartData}
            getEndData={sendEndData}
            hopsData={2}
            numberHops={3}
            getDivisor={getEndDivisor_arry}
            show_divisior={getDiviser}
            isMaximize={isMaximize}
            enableDiv={enableDiv}
            props={props}
            handleDataTrack={handleDataTrack}
          />
        </div>
        {openSetting && (
          <>
            <div
              onClick={() => {
                handleOpenSetting()
                setOpenDivisionDropdown(false);
              }}
              style={{
                position: "absolute",
                inset: 0,
                top: "0rem",
                backgroundColor: "#000000ba",
                opacity: 0.5,
                zIndex: 0
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                left: 0,
                width: "35%",
                maxWidth: "80%",
                zIndex: 10,
                height: "100%",
                backgroundColor: "white",
                top: 0,
                transition: "transform 0.5s ease-in-out",
                borderRadius: "0.5rem",
                overflowY: "auto",
                transform: openSetting ? "translateX(0)" : "translateX(100%)"
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  paddingBottom: "2rem"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    color: "white",
                    fontWeight: "800",
                    fontSize: "1.25rem",

                    borderRadius: "0.25rem",
                    backgroundColor: "rgb(49, 49, 83)"
                  }}
                >
                  <p style={{ fontSize: "1.25rem", fontWeight: "bold", textAlign: "center", color: "white" }} className="h2-large">Settings</p>
                </div>

                <div style={{ width: "100%", display: "flex", flexDirection: "row", paddingBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      gap: "3%",
                      backgroundColor: "white",
                      borderRadius: "0.25rem",
                      height: "12rem"
                    }}
                  >
                    <div style={{ width: "100%", borderRadius: "0.25rem" }}>
                      <div style={{ textAlign: "center", paddingBottom: "2rem", borderRadius: "0.25rem" }}>
                        <p style={{ fontSize: "1rem" }} className="h3-large">Integers</p>

                        {/* Start */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10%",
                            justifyContent: "space-between",
                            padding: "0 2rem",
                            alignItems: "center",
                            height: "2.5rem",
                            borderBottom: "1px solid #9ca3af"
                          }}
                        >
                          <p style={{ color: "#9ca3af", }} className="h4-large">Start Number </p>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            value={getIntegerStart}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^-?\d*$/.test(value)) {
                                setgetIntegerStart(value);
                              }
                            }}
                            style={{
                              textAlign: "center",
                              width: "30%",
                              height: "35px",
                              backgroundColor: "#8B4513",
                              border: "none",
                              outline: "none",
                              borderRadius: "0.5rem",
                              color: "white",
                              padding: "0 0.2rem"
                            }}
                          />
                        </div>

                        {/* End */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10%",
                            justifyContent: "space-between",
                            padding: "0 2rem",
                            alignItems: "center",
                            height: "2.5rem",
                            borderBottom: "1px solid #9ca3af"
                          }}
                        >
                          <p style={{ color: "#9ca3af", }} className="h4-large">End Number
                          </p>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            value={getIntegerEnd}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^-?\d*$/.test(value)) {
                                setgetIntegerEnd(value);
                              }
                            }}
                            style={{
                              backgroundColor: "#8B4513",
                              width: "30%",
                              textAlign: "center",
                              border: "none",
                              outline: "none",
                              height: "35px",
                              borderRadius: "0.5rem",
                              color: "white",
                              padding: "0 0.2rem"
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10%",
                            justifyContent: "space-between",
                            padding: "0 2rem",
                            alignItems: "center",
                            height: "2.5rem",
                            borderBottom: "1px solid #9ca3af"
                          }}
                        >
                          {/* LEFT TITLE */}
                          <p style={{ color: "#9ca3af" }} className="h4-large">
                            Divisions
                          </p>

                          {/* RIGHT CUSTOM DROPDOWN */}
                          <div
                            style={{
                              width: "30%",
                              height: "35px",
                              backgroundColor: "#f2ede9ff",
                              borderRadius: "0.5rem",
                              color: "black",
                              padding: "0 0.2rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              position: "relative",
                              border: "0.5px solid #8B4513",
                              gap: "10px"

                            }}
                            onClick={() => setOpenDivisionDropdown(prev => !prev)}
                          >
                            {getDiviser.includes(Number(getEndDivisor))
                              ? getEndDivisor
                              : <span className="h6-large " style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>Select </span>}
                            <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/dropDownIcon.svg" />
                            {openDivisionDropdown && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "40px",
                                  left: 0,
                                  width: "100%",
                                  backgroundColor: "white",
                                  borderRadius: "0.5rem",
                                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                  zIndex: 99
                                }}
                              >
                                {getDiviser
                                  .slice()
                                  .reverse()
                                  .map((element, id) => (
                                    <div
                                      key={id}
                                      onClick={() => {
                                        setgetEndDivisor(element);
                                        // setOpenDivisionDropdown(false);
                                      }}
                                      style={{
                                        padding: "8px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        // color: "#9ca3af",
                                        borderBottom: "0.2px solid #9ca3af"
                                      }}
                                    >
                                      <span style={{ padding: "0.5rem", borderRadius: "10px" }} >{element}</span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
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

    </>

  );
};

export default NumberLine;