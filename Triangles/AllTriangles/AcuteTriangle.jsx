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

    function getArcPath(center, from, to, radius) {
        const angleBetween = (p1, p2) =>
            Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        const startAngle = angleBetween(center, from);
        const endAngle = angleBetween(center, to);
        let angle = endAngle - startAngle;

        // Normalize angle to [0, 360)
        if (angle < 0) angle += 360;

        const largeArcFlag = angle > 180 ? 1 : 0;

        const start = {
            x: center.x + radius * Math.cos((startAngle * Math.PI) / 180),
            y: center.y + radius * Math.sin((startAngle * Math.PI) / 180),
        };
        const end = {
            x: center.x + radius * Math.cos((endAngle * Math.PI) / 180),
            y: center.y + radius * Math.sin((endAngle * Math.PI) / 180),
        };

        return `
          M ${start.x} ${start.y}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
        `;
    }

    // Angle arc paths (small arcs at each corner)
    const angleArcs = (
        <>
          // Angle at p1 (between p2 → p1 → p3)
            <path
                d={getArcPath(p1, p2, p3, 40)}
                stroke="red"
                fill="none"
                strokeWidth="2"
            />
            <path
                d={getArcPath(p1, p2, p3, 20)}
                stroke="red"
                fill="none"
                strokeWidth="2"
            />
            <path
                d={getArcPath(p1, p2, p3, 30)}
                stroke="red"
                fill="none"
                strokeWidth="2"
            />

            // Angle at p2 (between p3 → p2 → p1)
            <path
                d={getArcPath(p2, p3, p1, 20)}
                stroke="red"
                fill="none"
                strokeWidth="2"
            />
            <path
                d={getArcPath(p2, p3, p1, 30)}
                stroke="red"
                fill="none"
                strokeWidth="2"
            />

           // Angle at p3 (between p1 → p3 → p2)
            <path
                d={getArcPath(p3, p1, p2, 30)}
                stroke="red"
                fill="none"
                strokeWidth="2"
            />
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
                height: "320px",
                borderRadius: "30px",
                cursor: 'pointer'

            }}>
            <svg width="360" height="250" viewBox="0 0 300 360">
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

const AcuteTriangle = () => {

    const { descriptionData, setDescriptionData, ismaximized, isActiveButton, setIsActiveButton } = useTriangleContext();


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

            <Triangle label="Acute Triangle" points="150,60 260,280 40,280"
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


                    <CommonButton value="Mark Angles"
                        isActiveButton={isActiveButton.isAngle}
                        onClick={() => {
                            playClickSound();
                            setDescriptionData(`All angles are acute angles <br/>
                                (Angles less than 90°).`)
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
                                                ● All three angles are less than 90°.<br/>
                                                ● All angles are acute.`)
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



export default AcuteTriangle