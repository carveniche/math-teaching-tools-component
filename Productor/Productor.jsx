import React, { useEffect, useRef, useState } from "react";
import "./productor.css";
import { useProtractorLogic } from "./productorLogic";
import ToogleButton from "../../CommonComponent/ToogleButton";

function Productor({role_name,accessType,trackAngle,handleDataTrack,isLiveClass}) {
  const productorRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const { angle, inputValue, error, handleInputChange, startDrag, toggleFullscreen } = useProtractorLogic(productorRef,trackAngle);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(()=>{
    if(isLiveClass){

      handleDataTrack(angle)
    }
  },[angle,isLiveClass])

  const isAccess = (role_name === "tutor" && accessType === "teacher") || (role_name !== "tutor" && accessType === "student");

  return (
    <div className="main-parent bg-white">
      <div className="content-root">
       {role_name === "tutor" && ( <div className="logo-div">
          <ToogleButton />
        </div>)}
        <div className="set-content">
          <div className="productor-div">
            <div className="card" id="enable-full-screen">

              <div className="protractor-container" >
                <img
                  // src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/Protractor.svg"
                  src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/protracterimage.png"
                  className="protractor-image"
                  alt="Protractor"
                />
                <div className={`productor xl:mt-[-74px] lg:mt-[-72px] md:mt-[-65px]`} ref={productorRef} >
                  <div
                    className="needle all-scroll"
                    style={{
                      transform: `translateX(-50%) rotate(${-angle + 90}deg)`,
                      //  transform: `rotate(${angle}deg)`,
                      // transform: `translateX(-50%) rotate(${-angle}deg)`,
                      transformOrigin: "bottom center",
                      // cursor:"default"
                      pointerEvents: isAccess ? "auto" : "none",
                    }}
                    onMouseDown={isAccess ? startDrag : undefined}
                    onTouchStart={isAccess ? startDrag : undefined}
                  >
                    {/* <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/rightArrow.png" alt="arrow" style={{position:"absolute"}}/> */}
                    <span style={{ width: "1rem", height: "1rem", background: "linear-gradient(180deg, #ffff 0%, blue 100%)", position: "absolute", borderRadius: "50%", top: "1.5rem", left: "-7px" }}></span>
                  </div>
                  {visible && <p className="drag-me-two"><img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/drag.png" alt="Drag indicator" /></p>}
                  <div className="center-point" />
                  <div
                    className="needle-two"
                    style={{
                      // transform: `translateX(-50%) rotate(${angle +90}deg)`,
                      // transformOrigin: "bottom center",
                      // cursor:"default"
                    }}
                  />
                </div>
              </div>

              <div className="input-card" style={{ padding: "0.5rem", flexDirection: "row" }}>
                <p style={{ margin: '0', padding: "10px" }} className="h4-large">Enter Angle</p>
                <div className="input-container" style={{ background: "rgb(249, 157, 188)", width: "100%", borderRadius: "1rem", }}>
                  <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: "start", background: "rgb(249, 157, 188)", width: "100%", padding: "1rem", borderRadius: "1rem" }}>
                    <input
                      type="number"
                      className={`time-input ${error ? "input-error" : ""}`}
                      style={{ width: `${inputValue.length + 1}ch`, padding: "0" }}
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      max="180"
                      maxLength={3}
                      onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                      disabled={!isAccess}
                    />
                    {/* degree-symbol */}
                    <span className="" style={{ display: 'flex', justifyContent: 'center', alignItems: "center", color: "white", marginLeft: "-3px", fontSize: "1.4rem", marginTop: "-4px" }}>°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productor;