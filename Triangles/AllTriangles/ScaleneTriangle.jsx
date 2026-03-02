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
    const angleArc = (center, pA, pB, radius, color = "red") => {
        const a1 = Math.atan2(pA.y - center.y, pA.x - center.x);
        const a2 = Math.atan2(pB.y - center.y, pB.x - center.x);

        // Normalize angles
        let diff = Math.abs(a2 - a1);
        if (diff > Math.PI) diff = 2 * Math.PI - diff;

        const largeArcFlag = diff > Math.PI / 2 ? 1 : 0;  // > 90° = obtuse

        return (
            <path
                d={`
                    M ${center.x + radius * Math.cos(a1)}, 
                      ${center.y + radius * Math.sin(a1)}
                    A ${radius},${radius} 
                      0 ${largeArcFlag} 1 
                      ${center.x + radius * Math.cos(a2)}, 
                      ${center.y + radius * Math.sin(a2)}
                `}
                stroke={color}
                strokeWidth="2"
                fill="none"
            />
        );
    };

    const sideTicks = (pA, pB, count = 1, reverse = false) => {
        const length = 14;       // length of each tick mark
        const gap = 6;           // gap between ticks

        const midX = (pA.x + pB.x) / 2;
        const midY = (pA.y + pB.y) / 2;

        const angle = Math.atan2(pB.y - pA.y, pB.x - pA.x);

        // perpendicular direction
        const perp = angle + (reverse ? -Math.PI / 2 : Math.PI / 2);

        // parallel direction (along the line)
        const parallel = angle;

        // Generate multiple ticks
        const ticks = [];

        // If 1 tick → center
        // If 2 ticks → one left, one right
        // If 3 ticks → left, center, right
        for (let i = 0; i < count; i++) {
            let offset = (i - (count - 1) / 2) * gap;

            const baseX = midX + offset * Math.cos(parallel);
            const baseY = midY + offset * Math.sin(parallel);

            const dx = length * Math.cos(perp);
            const dy = length * Math.sin(perp);

            ticks.push(
                <line
                    key={i}
                    x1={baseX - dx / 2}
                    y1={baseY - dy / 2}
                    x2={baseX + dx / 2}
                    y2={baseY + dy / 2}
                    stroke="blue"
                    strokeWidth="2"
                />
            );
        }

        return ticks;
    };





    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                margin: '10px',
                backgroundColor: "white",
                width: isLiveClass ? "30%" : ismobile ? "100%" : "400px",
                justifyContent: "center",
                alignItems: "center",
                height: "320px",
                borderRadius: "30px",
                cursor: 'pointer'

            }}>
            <svg width="360" height="250" style={{}}>
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />

                {(isActiveButton.isInfo || isActiveButton.isAngle) && (<>
                    {angleArc(p1, p3, p2, 15)}
                    {angleArc(p1, p3, p2, 20)}

                    {angleArc(p2, p1, p3, 15)}
                    {angleArc(p2, p1, p3, 20)}
                    {angleArc(p2, p1, p3, 25)}

                    {/* {angleArc(p3, p2, p1, 15)}  */}
                    {angleArc(p3, p2, p1, 20)}
                </>)}

                {(isActiveButton.isInfo || isActiveButton.isSide) && (<>
                    {sideTicks(p1, p2, 1)}
                    {sideTicks(p2, p3, 2)}
                    {sideTicks(p3, p1, 3)}
                </>)}

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

const ScaleneTriangle = () => {

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
        if (isActiveButton.isSide === false) {
            setDescriptionData("");
        }

    }, [isActiveButton.isAngle, isActiveButton.isInfo, isActiveButton.isSide])

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

                {/* <Triangle label="Scalene" points="40,180 160,150 100,40"
                isActiveButton={isActiveButton}
                ismobile={ismobile}
            /> */}
                <Triangle label="Scalene Triangle" points="100,180 260,150 180,40"
                    isActiveButton={isActiveButton}
                    ismobile={ismobile}
                />
                {descriptionData.length > 0 &&
                    (<div
                        style={{
                            // width: "auto",
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
                <CommonButton value="Mark Sides"
                    isActiveButton={isActiveButton.isSide}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData(`This triangle has 3 unequal sides.`)
                        setIsActiveButton((prev) => ({
                            // ...prev,
                            isSide: !prev.isSide
                        }))
                    }} />
                <CommonButton value="Mark Angles"
                    isActiveButton={isActiveButton.isAngle}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData(`This triangle has 3 unequal angles.`)
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
                                                ● All three sides are unequal.<br/>
                                                ● All three angles are unequal
                                                .`)
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

export default ScaleneTriangle