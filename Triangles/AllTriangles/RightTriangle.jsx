import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonButton from './CommonComponent/CommonButton';
import CommonInfo from './CommonComponent/CommonInfo';
import { useTriangleContext } from '../ContextTriangle/ContextTriangle';
import { playClickSound } from '../../utils/playSound';


const Triangle = ({ label, ismobile, points, isActiveButton, }) => {
    const { isLiveClass } = useTriangleContext();
    const [p1, p2, p3] = points.split(' ').map(p => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
    });

    // Angle arc paths (small arcs at each corner)
    const angleArcs = (
        <>
            <polyline
                points={`
              ${p1.x + 15},${p1.y}
              ${p1.x + 15},${p1.y - 15}
              ${p1.x},${p1.y - 15}
            `}
                fill="none"
                stroke="red"
                strokeWidth="3"
            />
        </>
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                width: isLiveClass ? "30%" : ismobile ? "100%" : "400px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "30px",
                height: isLiveClass ? "100%" : "350px",
            }}
        >
            {/* SVG scales automatically */}
            <svg
                viewBox="0 0 360 320"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />
                {(isActiveButton.isInfo || isActiveButton.isAngle) && (
                    <>
                        {angleArcs}
                    </>
                )}

            </svg>

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

const RightTriangle = () => {

    const { isLiveClass, descriptionData, setDescriptionData, ismaximized, isActiveButton, setIsActiveButton } = useTriangleContext();


    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        if (isActiveButton.isAngle === false) {
            setDescriptionData("");
        }
        if (isActiveButton.isInfo === false) {
            setDescriptionData("");
        }


    }, [isActiveButton.isAngle, isActiveButton.isInfo])
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            }}
        >
            {/* ---------- SVG AREA (Flexible) ---------- */}
            <div
                style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                {/* <Triangle label="Right-Angled" points="50,150 150,150 50,50"
                isActiveButton={isActiveButton}
                ismobile={ismobile}
            /> */}
                <Triangle
                    label="Right Triangle"
                    points="80,280 280,280 80,80"
                    isActiveButton={isActiveButton}
                    ismobile={ismobile}
                />
                {descriptionData.length > 0 &&
                    (<div
                        style={{
                            width: "auto",
                            position: "absolute",
                            right: isLiveClass ? "2%": ismaximized ? "7%" : "3%",   // 👉 Move 1px from the RIGHT side
                            // top: "30%",
                            // transform: "translateY(-50%)",
                            textAlign: "center",
                            fontSize: "18px",
                            color: "#444",
                            backgroundColor: "#f9f9f9",
                            padding: "10px",
                            borderRadius: "10px",
                            zIndex: isLiveClass ? 0 : 9999,
                            width: ismaximized ? "300px" : "250px"
                        }}
                    >
                        <Description />
                    </div>)
                }
            </div>

            <div
                style={{
                    flexShrink: 0,
                    padding: "15px",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >

                <CommonButton value="Mark Angles"
                    isActiveButton={isActiveButton.isAngle}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData(`One angle is a right angle <br/> (Angle equal to 90°).`)
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
                        setDescriptionData(`● A classification by angles.<br/>
                                                ● One angle is equal to 90°.<br/>
                                                ● The triangle has exactly one right angle.`)
                        setIsActiveButton((prev) => ({
                            // ...prev,
                            isInfo: !prev.isInfo
                        }))
                    }}
                />
            </div>


        </div >
    )
}


export default RightTriangle