import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonButton from './CommonComponent/CommonButton';
import CommonInfo from './CommonComponent/CommonInfo';
import { useTriangleContext } from '../ContextTriangle/ContextTriangle';
import { playClickSound } from '../../utils/playSound';




const Triangle = ({ label, ismobile, points, isActiveButton, }) => {
    const [p1, p2, p3] = points.split(' ').map(p => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
    });

    const midPoint = (a, b) => ({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    });

    const drawTick = (start, angle) => {
        const length = 20;
        const dx = length * Math.cos(angle);
        const dy = length * Math.sin(angle);
        return (
            <line
                x1={start.x - dx / 2}
                y1={start.y - dy / 2}
                x2={start.x + dx / 2}
                y2={start.y + dy / 2}
                stroke="blue"
                strokeWidth="4"
            />
        );
    };

    // Angle arc paths (small arcs at each corner)
    const angleArcs = (
        <>
            {/* Angle at p1 */}
            <path
                d={`M ${p1.x + 9},${p1.y + 17}
          A 10,10 0 0,1 ${p1.x - 8},${p1.y + 15}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
            {/* <path
                d={`M ${p1.x + 7},${p1.y + 14}
          A 7,7 0 0,1 ${p1.x - 6},${p1.y + 12}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            /> */}

            {/* Angle at p2 */}
            <path
                d={`M ${p2.x - 15},${p2.y - 1}
          A 10,10 0 0,1 ${p2.x - 8},${p2.y - 15}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
            {/* <path
                d={`M ${p2.x - 14},${p2.y }
          A 7,7 0 0,1 ${p2.x -10},${p2.y - 16}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            /> */}

            {/* Angle at p3 */}
            <path
                d={`M ${p3.x + 8},${p3.y - 15}
          A 10,10 0 0,1 ${p3.x + 15},${p3.y - 1}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
            {/* <path
                d={`M ${p3.x + 6},${p3.y - 12}
          A 7,7 0 0,1 ${p3.x + 10},${p3.y + 0}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            /> */}
        </>

    );

    // Side tick marks
    const ticks = (
        <>
            {/* {drawTick(midPoint(p1, p2), Math.atan2(p2.y - p1.y, p2.x - p1.x))} */}
            {/* {drawTick(midPoint(p2, p3), Math.atan2(p3.y - p2.y, p3.x - p2.x))} */}
            {/* {drawTick(midPoint(p3, p1), Math.atan2(p1.y - p3.y, p1.x - p3.x))}  */}
            {/* {drawTick(midPoint(p2, p3), 0)} */}
            {drawTick(midPoint(p1, p2), 0)}
            {drawTick(midPoint(p2, p3), Math.PI / 2)}

            {drawTick(midPoint(p3, p1), 0)}
        </>
    );


    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                margin: '10px',
                backgroundColor: "white",
                width: ismobile ? "100%" : "400px",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                borderRadius: "30px",
                cursor: label === "Equilateral" ? 'pointer' : 'default'

            }}>
            <svg width="360" height="320" style={{}}>
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />
                {(isActiveButton.isInfo || isActiveButton.isAngle) && (
                    <>
                        {angleArcs}
                    </>
                )}
                {(isActiveButton.isInfo || isActiveButton.isSide) && (
                    <>
                        {ticks}

                    </>
                )}
            </svg>
            {/* {isActiveButton.isInfo && (
                <div style={{ 
                    textAlign: "center",fontSize: "25px",
                    fontWeight: "bold", marginTop: "10px",
                    color: "white", backgroundColor:"lightcoral",
                    padding: "2px 15px 2px", borderRadius:"20px",
                }}>{label}</div>
            )} */}

            {isActiveButton.isInfo && (<CommonInfo isVisible={isActiveButton.isInfo} label={label} />)}


        </div>
    );
};

const Description = () => {
    const { descriptionData, } = useTriangleContext();
    return (
        <div
            style={{ fontSize: "18px", lineHeight: "2", fontFamily: "sans-serif", color: "#333", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: descriptionData }}
        />
    )
}

const EquilateralTriangle = () => {
    // const [isActiveButton, setIsActiveButton] = useState({
    //     isAngle: false,
    //     isSide: false,
    //     isInfo: false
    // })
    const { descriptionData, setDescriptionData, ismaximized ,isActiveButton, setIsActiveButton} = useTriangleContext();
    useEffect(() => {
        if (isActiveButton.isAngle === false) {
            setDescriptionData("");
        }
        if (isActiveButton.isInfo === false) {
            setDescriptionData("");
        }
        if (isActiveButton.isSide === false) {
            setDescriptionData("");
        }

    }, [isActiveButton.isAngle, isActiveButton.isInfo, isActiveButton.isSide])

    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
            height: "100%",
        }}>

            <Triangle
                label="Equilateral Triangle"
                points="175,20 325,279.9 25,279.9"
                isActiveButton={isActiveButton}
                ismobile={ismobile}
            />

            {descriptionData.length > 0 &&
                (<div
                    style={{
                        width: "auto",
                        position: "absolute",
                        right: ismaximized ? "7%" : "2%",   // 👉 Move 1px from the RIGHT side
                        top: "30%",
                        transform: "translateY(-50%)",
                        textAlign: "center",
                        fontSize: "18px",
                        color: "#444",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "10px",
                        zIndex: 9999,
                        width: ismaximized ? "300px" : "250px"
                    }}
                >
                    <Description />
                </div>)
            }

            <div style={{ display: "flex", bottom: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "20px", width: "full", height: "100px", borderRadius: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "full", gap: "20px" }}>

                    <CommonButton value="Mark Congruent Sides"
                        isActiveButton={isActiveButton.isSide}
                        onClick={() => {
                            playClickSound();
                            setDescriptionData(`This triangle has 3 equal sides.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isSide: !prev.isSide
                            }))
                        }} />
                    <CommonButton value="Mark Congruent Angles"
                        isActiveButton={isActiveButton.isAngle}
                        onClick={() => {
                            playClickSound();
                            setDescriptionData(`This triangle has 3 equal angles, each measuring 60°.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isAngle: !prev.isAngle
                            }))
                        }}
                    />
                    <CommonButton value="Show Info"
                        isActiveButton={isActiveButton.isInfo}
                        onClick={() => {
                            playClickSound();
                            setDescriptionData(`● A classification by sides.<br/>
                                                ● All three sides are equal.<br/>
                                                ● All three angles are equal (each 60°).
                                                `)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isInfo: !prev.isInfo
                            }))
                        }}
                    />
                </div>
            </div>

        </div>
    )
}

export default EquilateralTriangle