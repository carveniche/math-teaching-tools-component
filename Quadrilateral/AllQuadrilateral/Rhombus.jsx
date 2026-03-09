import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonInfo from '../../Triangles/AllTriangles/CommonComponent/CommonInfo';
import CommonButton from '../../Triangles/AllTriangles/CommonComponent/CommonButton';
import "../../Triangles/AllTriangles/CommonComponent/InfoLabel.css";
import Description from '../Setting/Description';
import { playClickSound } from '../../utils/playSound';
import { useQuadrilateralContext } from '../ContextQuardrilateral/Context';

const Quadrilateral = ({ label, points, isActiveButton }) => {
    const parsedPoints = points.split(" ").map(p => {
        const [x, y] = p.split(",").map(Number);
        return { x, y };
    });

    const [p1, p2, p3, p4] = parsedPoints;

    // Midpoint helper
    const mid = (a, b) => ({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    });
    const midPoint = (a, b) => ({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    });
    // Angle arc generator
    const angleArc = (center, a, b, radius = 18) => {
        const angle = (p, q) =>
            Math.atan2(q.y - p.y, q.x - p.x);

        const startA = angle(center, a);
        const endA = angle(center, b);

        const start = {
            x: center.x + radius * Math.cos(startA),
            y: center.y + radius * Math.sin(startA)
        };

        const end = {
            x: center.x + radius * Math.cos(endA),
            y: center.y + radius * Math.sin(endA)
        };

        return (
            <path
                d={`M ${start.x},${start.y} A ${radius} ${radius} 0 0 1 ${end.x},${end.y}`}
                stroke="red"
                strokeWidth={3}
                fill="none"
            />
        );
    };

    // Tick mark generator
    // const drawTick = (p, size = 12) => (
    //     <line
    //         x1={p.x - size}
    //         y1={p.y}
    //         x2={p.x + size}
    //         y2={p.y}
    //         stroke="blue"
    //         strokeWidth={4}
    //     />
    // );

    // Two ticks (for opposite congruent sides)
    // Helper to compare two points
    const isSamePair = (a, b, c, d) =>
        (a.x === c.x && a.y === c.y && b.x === d.x && b.y === d.y) ||
        (a.x === d.x && a.y === d.y && b.x === c.x && b.y === c.y);

    const getTickAngle = (a, b) => {

        // ⭐ TOP side (p1 ↔ p2)
        if (isSamePair(a, b, p1, p2)) {
            return Math.PI / 1.3;   // your desired angle
        }

        // ⭐ RIGHT side (p2 ↔ p3)  <-- You were missing THIS
        if (isSamePair(a, b, p2, p3)) {
            return Math.PI / 5;   // change angle as you want
        }
        // ⭐ BOTTOM side (p3 ↔ p4)
        if (isSamePair(a, b, p3, p4)) {
            return Math.PI / 1.4;   // same angle
        }

        // ⭐ TOP-LEFT side (p1 ↔ p4)
        if (isSamePair(a, b, p1, p4)) {
            return Math.PI / 5;   // same angle or change if needed
        }

        // Default logic
        if (a.y === b.y) return Math.PI / 2;
        if (a.x === b.x) return 0;

        return 0;
    };


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
    const ticks = (
        <>
            {/* --- TOP SIDE (2 ticks) --- */}
            {drawTick({ x: midPoint(p1, p2).x + 7, y: midPoint(p1, p2).y + 6 }, getTickAngle(p1, p2))}

            {/* --- RIGHT SIDE (1 tick) --- */}
            {drawTick(
                { x: midPoint(p2, p3).x + 3, y: midPoint(p2, p3).y - 5 }, getTickAngle(p3, p2))
            }

            {/* --- BOTTOM SIDE (2 ticks) --- */}
            {drawTick({ x: midPoint(p4, p3).x + 2, y: midPoint(p3, p4).y + 3 }, getTickAngle(p3, p4))}

            {/* --- LEFT SIDE (1 tick) --- */}
            {drawTick(
                { x: midPoint(p4, p1).x + 3, y: midPoint(p4, p1).y - 5 }, getTickAngle(p4, p1))
            }
        </>
    );


    // ArrowAngle component
    const ArrowAngle = ({ x, y, direction = "left", size = 12 }) => {
        let rotateDeg = 0;
        if (direction === "left") rotateDeg = 220;
        if (direction === "up") rotateDeg = 140;


        return (
            <g transform={`translate(${x},${y}) rotate(${rotateDeg})`}>
                <line x1={0} y1={0} x2={size} y2={size / 2} stroke="purple" strokeWidth={3} />
                <line x1={0} y1={0} x2={size} y2={-size / 2} stroke="purple" strokeWidth={3} />
            </g>
        );
    };

    // Arrows on sides
    const arrows = (
        <>
            {/* Top side: 1 arrow pointing left */}
            <ArrowAngle x={midPoint(p1, p2).x} y={midPoint(p1, p2).y} direction="left" />
            {/* Bottom side: 1 arrow pointing left */}
            <ArrowAngle x={midPoint(p3, p4).x} y={midPoint(p3, p4).y} direction="left" />
            {/* Left side: 2 arrows pointing up */}
            <ArrowAngle x={midPoint(p4, p1).x} y={midPoint(p4, p1).y - 0} direction="up" />
            <ArrowAngle x={midPoint(p4, p1).x - 15} y={midPoint(p4, p1).y + 15} direction="up" />
            {/* Right side: 2 arrows pointing up */}
            <ArrowAngle x={midPoint(p2, p3).x} y={midPoint(p2, p3).y - 0} direction="up" />
            <ArrowAngle x={midPoint(p2, p3).x - 15} y={midPoint(p2, p3).y + 15} direction="up" />
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
                overflow: "hidden"
            }}
        >
            <svg width="300" height="300">
                {/* Main Shape */}
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />


                {/* ====== ANGLES ====== */}
                {(isActiveButton.isInfo || isActiveButton.isConAngle) && (
                    <>
                        {/* TOP vertex (p1) → 2 arcs */}
                        {angleArc(p1, p2, p4, 18)}
                        {angleArc(p1, p2, p4, 28)}  {/* bigger radius */}

                        {/* RIGHT vertex (p2) → 1 arc */}
                        {angleArc(p2, p3, p1, 18)}

                        {/* BOTTOM vertex (p3) → 2 arcs */}
                        {angleArc(p3, p4, p2, 18)}
                        {angleArc(p3, p4, p2, 28)}

                        {/* LEFT vertex (p4) → 1 arc */}
                        {angleArc(p4, p1, p3, 18)}
                    </>
                )}


                {/* ====== SIDES (Congruent Marks) ====== */}
                {(isActiveButton.isInfo || isActiveButton.isConSide) && (
                    ticks
                )}
                {(isActiveButton.isInfo || isActiveButton.isPallSide) && (arrows)}




            </svg>

            {(isActiveButton.isInfo) && (
                <CommonInfo isVisible={isActiveButton.isInfo} label={label} />
            )}
        </div>
    );
};



const Rhombus = () => {
    const { isMax,role_name, isActiveButton, setIsActiveButton, data, setData, isLiveClass } = useQuadrilateralContext();

    // const [isActiveButton, setIsActiveButton] = useState({
    //     isPallSide: false,
    //     isInfo: false,
    //     isConSide: false,
    //     isConAngle: false
    // })

    // const [data, setData] = useState("");

    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        if (!isActiveButton.isPallSide && !isActiveButton.isConAngle && !isActiveButton.isConSide && !isActiveButton.isInfo) {
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

            <Quadrilateral
                label="Rhombus"
                points="150,30 270,150 150,270 30,150"
                isActiveButton={isActiveButton}
                ismobile={ismobile}
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


                    <CommonButton value="Mark Parallel Sides"
                        isActiveButton={isActiveButton.isPallSide}
                        onClick={() => {
                            playClickSound()
                            setData(`Opposite sides are parallel to each other.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isPallSide: !prev.isPallSide
                            }))
                        }}
                        data={{
                            isLiveClass: isLiveClass,
                            role_name: role_name
                        }}
                    />
                    <CommonButton value="Mark Congruent Angles"
                        isActiveButton={isActiveButton.isConAngle}
                        onClick={() => {
                            playClickSound()
                            setData(`Opposite angles are equal.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isConAngle: !prev.isConAngle
                            }))
                        }}
                        data={{
                            isLiveClass: isLiveClass,
                            role_name: role_name
                        }}
                    />
                    <CommonButton value="Mark Congruent Sides"
                        isActiveButton={isActiveButton.isConSide}
                        onClick={() => {
                            playClickSound()
                            setData(`All the sides are equal.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isConSide: !prev.isConSide
                            }))
                        }}
                        data={{
                            isLiveClass: isLiveClass,
                            role_name: role_name
                        }}
                    />
                    <CommonButton value="Show Info"
                        isActiveButton={isActiveButton.isInfo}
                        onClick={() => {
                            playClickSound()
                            setData(`● All four sides are equal in length.<br/>
                                    ● Opposite sides are parallel to each other.<br/>
                                     ● Opposite angles are equal.
                                    `)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isInfo: !prev.isInfo
                            }))
                        }}
                        data={{
                            isLiveClass: isLiveClass,
                            role_name: role_name
                        }}
                    />
                </div>
            </div>

        </div>
    )
}




export default Rhombus