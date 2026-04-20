import React, { useEffect, useState } from "react";
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CommonButton from "../Triangles/AllTriangles/CommonComponent/CommonButton";

function NumberLineDecimalMain({
  getDivisor, isMaximize, enableDiv, props, handleDataTrack
}) {
  const { isLiveClass, role_name, Data } = props ?? {};
  const [showLable, setshowLable] = useState(false);

  const [showDiviser, setDiviser] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState({
    isAngle: false,
  })
  const theme = useTheme();
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  const handleshowLable = () => {
    const clickSound = new Audio("https://d3g74fig38xwgn.cloudfront.net/teaching-tool/clickbtN.wav");
    clickSound.play();
    setshowLable(!showLable);
  };


  const decimalButtonHandler = () => {
    handleshowLable();
    setIsActiveButton((prev) => ({
      ...prev,
      isAngle: !prev.isAngle
    }))
  };

  // Live class data tracking
  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      handleDataTrack({
        isFrom: "showLableDecimal",
        data: showLable,
      })
    }
  }, [showLable, isLiveClass, role_name, handleDataTrack])

  useEffect(() => {
    if (isLiveClass && role_name !== "tutor") {
      setshowLable(Data?.showLableDecimal || false);
      setIsActiveButton((prev) => ({
        ...prev,
        isAngle: Data?.showLableDecimal || false,
      }))

    }
  }, [Data?.showLableDecimal, isLiveClass, role_name])

  const isTeacher = isLiveClass ? role_name === "tutor" : true;


  return (
    <div style={{
      width: "100%",
      padding: "5%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "3rem",
      background: "white",
      borderRadius: "10px",
      paddingRight: "0.5rem",
      paddingLeft: "0.5rem",
    }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          borderRadius: '1.5rem',
          display: "flex", justifyContent: 'space-around', alignItems: "center", flexDirection: "column", gap: '2rem'
        }}
      >
        <div
          style={{
            width: "96%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

          }}
        >
          <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/rightArrow.png" alt="" style={{ position: "absolute", right: "1%", top: "1.1rem", color: "#dc2626", fontSize: "1rem", fontWeight: "bolder", display: "flex", justifyContent: "center", alignItems: "center" }} />
          <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/leftArrow.png" alt="" style={{ position: "absolute", left: "1%", top: "1.1rem", color: "#dc2626", fontSize: "1rem", fontWeight: "bolder", display: "flex", justifyContent: "center", alignItems: "center" }} />
          <div
            style={{
              width: '100%',
              borderBottom: "4px solid black",
              height: '2rem',
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: "60px 60px 0px 0px"
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '95%',
              marginTop: '0rem',
            }}
          >
            {getDivisor.map((num, index) => {
              const isFirst = index === 0;
              const isLast = index === getDivisor.length - 1;

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.1rem',
                    minWidth: '20px',
                    marginTop: '0rem',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '5px',
                      borderRadius: '0.375rem',
                      transition: 'all 0.3s',
                      // backgroundColor: 'black',
                      fontSize: '18px',
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "-6px"
                    }}
                  >
                    ⬇
                  </div>
                  <p
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      // textShadow: '0 0 8px #FFD580',
                      transition: 'all 0.3s',
                      paddingTop: '15px',
                      opacity: isFirst || isLast || showLable ? 1 : 0,
                      visibility: isFirst || isLast || showLable ? 'visible' : 'hidden',
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

      {/* divisoe */}

      <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '2rem',
            // marginTop: '2.5rem',
          }}
        >
          <div>
            <CommonButton value="Show Decimals"
              isActiveButton={isActiveButton.isAngle}
              onClick={() => {

                decimalButtonHandler()
              }}
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
}

export default NumberLineDecimalMain;