import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonInfo from '../../Triangles/AllTriangles/CommonComponent/CommonInfo';
import CommonButton from '../../Triangles/AllTriangles/CommonComponent/CommonButton';
import "../../Triangles/AllTriangles/CommonComponent/InfoLabel.css";
import Description from '../Setting/Description';
import { playClickSound } from '../../utils/playSound';
import { useQuadrilateralContext } from '../ContextQuardrilateral/Context';

const RectanglesSVG = ({ label, points, isActiveButton }) => {

    // Convert "x,y x,y x,y x,y" → [{x,y}, ...]
    const parsedPoints = points.split(" ").map(p => {
        const [x, y] = p.split(",").map(Number);
        return { x, y };
    });

    // p1 = TL, p2 = TR, p3 = BR, p4 = BL
    const [p1, p2, p3, p4] = parsedPoints;

    // ANGLE ARC DRAWING (already correct)
    const angleArcs = (
        <>
            {/* Top-left corner (p1) */}
            <polyline
                points={`
                    ${p1.x + 15},${p1.y}
                    ${p1.x + 15},${p1.y + 15}
                    ${p1.x},${p1.y + 15}
                `}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />

            {/* Top-right corner (p2) */}
            <polyline
                points={`
                    ${p2.x - 15},${p2.y}
                    ${p2.x - 15},${p2.y + 15}
                    ${p2.x},${p2.y + 15}
                `}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />

            {/* Bottom-right corner (p3) */}
            <polyline
                points={`
                    ${p3.x - 15},${p3.y}
                    ${p3.x - 15},${p3.y - 15}
                    ${p3.x},${p3.y - 15}
                `}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />

            {/* Bottom-left corner (p4) */}
            <polyline
                points={`
                    ${p4.x + 15},${p4.y}
                    ${p4.x + 15},${p4.y - 15}
                    ${p4.x},${p4.y - 15}
                `}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
        </>
    );

    // MIDPOINT CALCULATOR
    const midPoint = (a, b) => ({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    });

    // DETECT AUTOMATIC TICK ORIENTATION
    const getTickAngle = (a, b) => {
        if (a.y === b.y) return Math.PI / 2; // horizontal side → vertical tick
        if (a.x === b.x) return 0;           // vertical side → horizontal tick
        return 0; // fallback
    };

    // DRAW TICK MARK
    const drawTick = (start, angle) => {
        const length = 18;
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

    // TICKS FOR ALL 4 SIDES
    const ticks = (
        <>
            {/* --- TOP SIDE (2 ticks) --- */}
            {drawTick(midPoint(p1, p2), getTickAngle(p1, p2))}
            {drawTick(
                { x: midPoint(p1, p2).x + -10, y: midPoint(p1, p2).y }, // shift second tick
                getTickAngle(p1, p2)
            )}

            {/* --- RIGHT SIDE (1 tick) --- */}
            {drawTick(
                { x: midPoint(p2, p3).x, y: midPoint(p2, p3).y - 15 }, getTickAngle(p3, p2))}

            {/* --- BOTTOM SIDE (2 ticks) --- */}
            {drawTick(midPoint(p3, p4), getTickAngle(p3, p4))}
            {drawTick(
                { x: midPoint(p3, p4).x + -10, y: midPoint(p3, p4).y }, // shift second tick
                getTickAngle(p3, p4)
            )}

            {/* --- LEFT SIDE (1 tick) --- */}
            {drawTick(
                { x: midPoint(p4, p1).x, y: midPoint(p4, p1).y - 15 }, getTickAngle(p4, p1))}
        </>
    );
    const ArrowAngle = ({ x, y, direction }) => {
        const size = 12;

        if (direction === "left") {
            // Arrow pointing LEFT (◄)
            return (
                <g stroke="blue" strokeWidth="3" strokeLinecap="round">
                    <line x1={x} y1={y} x2={x + size} y2={y - size / 2} />
                    <line x1={x} y1={y} x2={x + size} y2={y + size / 2} />
                </g>
            );
        }

        if (direction === "up") {
            // Arrow pointing UP (▲)
            return (
                <g stroke="blue" strokeWidth="3" strokeLinecap="round">
                    <line x1={x} y1={y} x2={x - size / 2} y2={y + size} />
                    <line x1={x} y1={y} x2={x + size / 2} y2={y + size} />
                </g>
            );
        }

        return null;
    };
    const tickssss = (
        <>

            {/* --- TOP SIDE (1 LEFT arrow) --- */}
            <ArrowAngle
                x={midPoint(p1, p2).x}
                y={midPoint(p1, p2).y}
                direction="left"
            />

            {/* --- BOTTOM SIDE (1 LEFT arrow) --- */}
            <ArrowAngle
                x={midPoint(p3, p4).x}
                y={midPoint(p3, p4).y}
                direction="left"
            />

            {/* --- LEFT SIDE (2 UP arrows) --- */}
            <ArrowAngle
                x={midPoint(p4, p1).x}
                y={midPoint(p4, p1).y - 10}
                direction="up"
            />
            <ArrowAngle
                x={midPoint(p4, p1).x}
                y={midPoint(p4, p1).y + 10}
                direction="up"
            />

            {/* --- RIGHT SIDE (2 UP arrows) --- */}
            <ArrowAngle
                x={midPoint(p2, p3).x}
                y={midPoint(p2, p3).y - 10}
                direction="up"
            />
            <ArrowAngle
                x={midPoint(p2, p3).x}
                y={midPoint(p2, p3).y + 10}
                direction="up"
            />

        </>
    );




    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
                backgroundColor: "white",
                width: "400px",
                justifyContent: "center",
                alignItems: "center",
                height: "350px",
                borderRadius: "30px",
                cursor: label === "Equilateral" ? "pointer" : "default",
                overflow: "hidden",
            }}
        >
            <svg width="300" height="300">
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />

                {/* ANGLES */}
                {(isActiveButton.isInfo || isActiveButton.isAngle) && angleArcs}

                {/* SIDE MARKS */}
                {(isActiveButton.isInfo || isActiveButton.isCSide) && ticks}
                {(isActiveButton.isInfo || isActiveButton.isSide) && tickssss}

            </svg>

            {isActiveButton.isInfo && (
                <CommonInfo isVisible={isActiveButton.isInfo} label={label} />
            )}
        </div>
    );
};


const Rectangle = () => {
    const { isMax,isActiveButton, setIsActiveButton,data, setData, isLiveClass } = useQuadrilateralContext();

    // const [isActiveButton, setIsActiveButton] = useState({
    //     isAngle: false,
    //     isSide: false,
    //     isInfo: false,
    //     isCSide: false,
    // })


    // const [data, setData] = useState("");
    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        if (!isActiveButton.isAngle && !isActiveButton.isSide && !isActiveButton.isInfo && !isActiveButton.isCSide) {
            setData("");
        }
    }, [isActiveButton]);
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


            <RectanglesSVG
                label="Rectangle"
                points="50,50 290,50 290,230 50,230"
                isActiveButton={isActiveButton}
            />
            {data.length > 0 &&
                (<div
                    style={{
                        // width: "auto",
                        position: "absolute",
                        right: isMax ? "7%" : "2%",   // 👉 Move 1px from the RIGHT side
                        top: isMax ? "35%" : "30%",
                        transform: "translateY(-50%)",
                        textAlign: "center",
                        fontSize: "18px",
                        color: "#444",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "10px",
                        zIndex: isLiveClass ? 0 : 9999,
                        width: window.screen.width >= 1440 ? "300px" : isMax ? "300px" : "250px"
                    }}
                >
                    <Description data={data} />

                </div>)
            }

            <div style={{ display: "flex", bottom: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "20px", width: "full", height: "100px", borderRadius: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "full", gap: "20px" }}>


                    <CommonButton value="Mark Congruent Angles"
                        isActiveButton={isActiveButton.isAngle}
                        onClick={() => {
                            playClickSound()
                            setData(`All the angles are equal and are right angles, each measuring 90°.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isAngle: !prev.isAngle
                            }))
                        }}
                    />
                    <CommonButton value="Mark Congruent Sides"
                        isActiveButton={isActiveButton.isCSide}
                        onClick={() => {
                            playClickSound()
                            setData(`Opposite sides are equal.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isCSide: !prev.isCSide
                            }))
                        }}
                    />
                    <CommonButton value="Mark Parallel Sides"
                        isActiveButton={isActiveButton.isSide}
                        onClick={() => {
                            playClickSound()
                            setData(`Opposite sides are parallel to each other.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isSide: !prev.isSide
                            }))
                        }}
                    />
                    <CommonButton value="Show Info"
                        isActiveButton={isActiveButton.isInfo}
                        onClick={() => {
                            playClickSound()
                            setData(`● Opposite sides are equal in length.<br/>
                                    ● Opposite sides are parallel to each other.<br/>
                                     ● All four angles are right angles each measuring 90°.
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




export default Rectangle