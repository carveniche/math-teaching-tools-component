import React, { useEffect, useRef, useState } from "react";
import { useProtractorLogic } from "./productorLogic";
import ToogleButton from "../../CommonComponent/ToogleButton";
import Style1 from "./portalProtector.module.css"
import Style2 from "./liveClassProtector.module.css"


function Protector({ prop, trackAngle, handleDataTrack }) {
  const { isLiveClass, role_name,accessType } = prop ?? {isLiveClass:false}
  const styles =isLiveClass ? Style2 : Style1;
  const productorRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const { angle, inputValue, error, handleInputChange, startDrag, toggleFullscreen } = useProtractorLogic(productorRef, trackAngle);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if(isLiveClass) {

      handleDataTrack(angle)
    }
  }, [angle, isLiveClass])

  const isAccess = (role_name === "tutor" && accessType === "teacher") || (role_name !== "tutor" && accessType === "student");

  return (
    <div className={`${styles.mainParent} bg-white`}>
      <div className={`${styles.contentRoot}`}>
        {(role_name === "tutor" && isLiveClass) && (<div className={`${styles.logoDiv}`}>
          <ToogleButton />
        </div>)}
        <div className={`${styles.setContent}`}>
          <div className={`${styles.productorDiv}`}>
            <div className={`${styles.card}`} id="enable-full-screen">
            {!isLiveClass && <div className="full-btn">
                <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" onClick={toggleFullscreen} />
              </div>}
              <div className={`${styles.protractorContainer}`} >
                <img
                  // src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/Protractor.svg"
                  src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/protracterimage.png"
                  className={`${styles.protractorImage}`}
                  alt="Protractor"
                />
                <div className={`${styles.productor} xl:mt-[-74px] lg:mt-[-72px] md:mt-[-65px]`} ref={productorRef} >
                  <div
                    className={`${styles.needle} ${styles.allScroll}`}
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
                  {true && <p className={`${styles.dragMeTwo}`}><img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/drag.png" alt="Drag indicator" /></p>}
                  <div className={`${styles.centerPoint}`} />
                  <div
                    className={`${styles.needleTwo}`}
                    style={{
                      // transform: `translateX(-50%) rotate(${angle +90}deg)`,
                      // transformOrigin: "bottom center",
                      // cursor:"default"
                    }}
                  />
                </div>
              </div>

              <div className={`${styles.inputCard}`} style={{ padding: "0.5rem", flexDirection: "row" }}>
                <p style={{ margin: '0', padding: "10px" }} className={`${styles.h4Large}`}>Enter Angle</p>
                <div className={`${styles.inputContainer}`} style={{ background: "rgb(249, 157, 188)", width: "100%", borderRadius: "1rem", }}>
                  <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: "start", background: "rgb(249, 157, 188)", width: "100%", padding: "1rem", borderRadius: "1rem" }}>
                    <input
                      type="number"
                      className={`${styles.timeInput} ${error ? `${styles.inputError}` : ""}`}
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

export default Protector;