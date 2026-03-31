import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'

function ShowingFractionDivisor({getDivisor}) {
    const [gettingTotalMixed, setgettingTotalMixed] = useState([]);

  const theme = useTheme();
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
      useEffect(() => {
        const convertToMixedFractions = () => {
          return getDivisor
            .map((f) => {
              const trimmed = f.trim();
              if (!trimmed.includes("/")) {
                return trimmed;
              }
    
              const [numerator, denominator] = trimmed.split("/").map(Number);
    
              if (numerator >= denominator) {
                const whole = Math.floor(numerator / denominator);
                const remainder = numerator % denominator;
    
                return remainder === 0
                  ? `${whole}`
                  : `${whole} ${remainder}/${denominator}`;
              } else {
                return `${numerator}/${denominator}`;
              }
            })
            .map((val) => {
              return val.startsWith("0 ") ? val.replace("0 ", "") : val;
            });
        };
    
        const mixedFractionArray = convertToMixedFractions();
        // console.log(mixedFractionArray, "mixedFractionArray");
        setgettingTotalMixed(mixedFractionArray);
      }, [getDivisor]);
  return (
 <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            // marginLeft: isTab ? "12rem":"8rem",
            // marginRight: "auto",
            width:isTab ? "60%":"80%",
            // height:isTab ? "6rem":"8rem",
            
            // marginTop:isTab ?  "-3rem": isMaximize ? "4rem" :"-4rem",
            justifyContent: "center",
            // alignItems: "center",
            overflow: "auto",
            
           
          }}
        >
          {gettingTotalMixed.map((item, index) => {
            let whole = "";
            let numerator = "";
            let denominator = "";

            if (item.includes(" ")) {
              const [wholePart, fractionPart] = item.split(" ");
              whole = wholePart;
              [numerator, denominator] = fractionPart.split("/");
            } else if (item.includes("/")) {
              [numerator, denominator] = item.split("/");
            } else {
              whole = item;
            }

            return (
              <span
                key={index}
                //   key={index}
              style={{
                border: '1px solid #d1d5db',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                // color: 'white',
                // backgroundColor: 'white',
                // background:"linear-gradient(rgb(24, 227, 28), rgb(68, 65, 94))",
                background:"white",
               fontSize: "0.75rem",display:"flex",justifyContent:"center",alignItems:"center" ,
               fontSize: '1.5rem',
                // color: 'white',
                // backgroundColor: 'white',
                     width:"20%",
            height:"50px",
               
              }}
              className='tab-text'
            >
                {whole && <span style={{ fontSize: "1rem",display:"flex",justifyContent:"center",alignItems:"center" }} className='tab-text'>{whole}</span>}
                {numerator && denominator && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      lineHeight: "1.1",
                    }}
                  >
                    <span style={{ fontSize: "1rem",display:"flex",justifyContent:"center",alignItems:"center" }} className='tab-text'>{numerator}</span>
                    <div
                      style={{
                        height: "1px",
                        width: "0.75rem",
                        backgroundColor: "black",
                        marginTop: "0.125rem",
                        marginBottom: "0.125rem",
                        color:"black"
                      }}
                    ></div>
                    <span style={{ fontSize: "1rem",display:"flex",justifyContent:"center",alignItems:"center" }} className='tab-text'>{denominator}</span>
                  </div>
                )}
              </span>
            );
          })}
        </div>
  )
}

export default ShowingFractionDivisor

