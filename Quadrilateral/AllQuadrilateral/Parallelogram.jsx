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
    const parsedPoints = points.split(' ').map(p => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
    });

    const [p1, p2, p3, p4] = parsedPoints; // top-left, top-right, bottom-right, bottom-left

    const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

    // ===== Angle markers =====
    const angleArc = (center, a, b, radius = 15) => {
        const angle = (p, q) => Math.atan2(q.y - p.y, q.x - p.x);
        const startA = angle(center, a);
        const endA = angle(center, b);

        const start = { x: center.x + radius * Math.cos(startA), y: center.y + radius * Math.sin(startA) };
        const end = { x: center.x + radius * Math.cos(endA), y: center.y + radius * Math.sin(endA) };

        return <path d={`M ${start.x},${start.y} A ${radius} ${radius} 0 0 1 ${end.x},${end.y}`} stroke="red" strokeWidth={2} fill="none" />;
    };

    const getTickAngle = (a, b) => {
        if (a.y === b.y) return Math.PI / 2; // horizontal side → vertical tick
        if (a.x === b.x) return 0;           // vertical side → horizontal tick
        return 0; // fallback
    };
    // ===== Side markers (ticks) =====
    // Helper to draw a tick at a specific point with rotation
    const drawTick = (pos, angle = 0, double = false) => {
        const size = 12;
        const rad = (Math.PI / 180) * angle;

        // Function to rotate a point around origin
        const rotatePoint = (x, y) => ({
            x: x * Math.cos(rad) - y * Math.sin(rad),
            y: x * Math.sin(rad) + y * Math.cos(rad),
        });

        if (double) {
            const p1 = rotatePoint(-size, -4);
            const p2 = rotatePoint(size, -4);
            const p3 = rotatePoint(-size, 4);
            const p4 = rotatePoint(size, 4);
            return (
                <>
                    <line
                        x1={pos.x + p1.x} y1={pos.y + p1.y}
                        x2={pos.x + p2.x} y2={pos.y + p2.y}
                        stroke="blue" strokeWidth={3}
                    />
                    <line
                        x1={pos.x + p3.x} y1={pos.y + p3.y}
                        x2={pos.x + p4.x} y2={pos.y + p4.y}
                        stroke="blue" strokeWidth={3}
                    />
                </>
            );
        }

        const pStart = rotatePoint(-size, 0);
        const pEnd = rotatePoint(size, 0);

        return (
            <line
                x1={pos.x + pStart.x} y1={pos.y + pStart.y}
                x2={pos.x + pEnd.x} y2={pos.y + pEnd.y}
                stroke="blue" strokeWidth={3}
            />
        );
    };
    const ticks = (
        <>
            {/* --- TOP SIDE (2 ticks) --- */}
            {drawTick({ x: mid(p2, p1).x + 3, y: mid(p1, p2).y + 1 }, 90)}

            {/* --- RIGHT SIDE (1 tick) --- */}
            {drawTick({ x: mid(p2, p3).x + 3, y: mid(p2, p3).y + 12 }, getTickAngle(p3, p2))}
            {drawTick({ x: mid(p2, p3).x + 3, y: mid(p2, p3).y + 19 }, getTickAngle(p3, p2))}
            {/* --- BOTTOM SIDE (2 ticks) --- */}
            {drawTick({ x: mid(p4, p3).x + 3, y: mid(p3, p4).y + 1 }, 90)}

            {/* --- LEFT SIDE (1 tick) --- */}
            {drawTick({ x: mid(p4, p1).x + 3, y: mid(p4, p1).y + 12 }, getTickAngle(p4, p1))}
            {drawTick({ x: mid(p4, p1).x + 3, y: mid(p4, p1).y + 19 }, getTickAngle(p4, p1))}
        </>
    );



    // ===== Parallel side arrows =====
    const ArrowAngle = ({ x, y, direction = 'left', size = 12 }) => {
        let rotateDeg = 0;
        if (direction === 'left') rotateDeg = 180;
        if (direction === 'up') rotateDeg = -90;

        return (
            <g transform={`translate(${x},${y}) rotate(${rotateDeg})`}>
                <line x1={0} y1={0} x2={size} y2={size / 2} stroke="purple" strokeWidth={3} />
                <line x1={0} y1={0} x2={size} y2={-size / 2} stroke="purple" strokeWidth={3} />
            </g>
        );
    };

    const parallelArrows = (
        <>
            {/* Top and Bottom sides → 1 arrow each, pointing left */}
            <ArrowAngle x={mid(p1, p2).x} y={mid(p1, p2).y} direction="left" />
            <ArrowAngle x={mid(p4, p3).x} y={mid(p4, p3).y} direction="left" />
            {/* Left and Right sides → 2 arrows each, pointing up */}
            <ArrowAngle x={mid(p1, p4).x - 2} y={mid(p1, p4).y - 10} direction="up" />
            <ArrowAngle x={mid(p1, p4).x} y={mid(p1, p4).y + 10} direction="up" />
            <ArrowAngle x={mid(p2, p3).x - 2} y={mid(p2, p3).y - 10} direction="up" />
            <ArrowAngle x={mid(p2, p3).x} y={mid(p2, p3).y + 10} direction="up" />
        </>
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", margin: '10px', backgroundColor: "white", width: "400px", justifyContent: "center", alignItems: "center", height: "350px", borderRadius: "30px", overflow: "hidden" }}>
            <svg width="300" height="300">
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />
                {(isActiveButton.isInfo || isActiveButton.isConAngle) && (
                    <>
                        {/* TOP-LEFT corner (p1) → 2 arcs */}
                        {angleArc(p1, p2, p4, 15)}
                        {angleArc(p1, p2, p4, 25)}

                        {/* TOP-RIGHT corner (p2) → 2 arcs */}
                        {angleArc(p2, p3, p1, 15)}
                        {/* {angleArc(p2, p3, p1, 25)} */}

                        {/* BOTTOM-RIGHT corner (p3) → 2 arcs */}
                        {angleArc(p3, p4, p2, 15)}
                        {angleArc(p3, p4, p2, 25)}

                        {/* BOTTOM-LEFT corner (p4) → 2 arcs */}
                        {angleArc(p4, p1, p3, 15)}
                        {/* {angleArc(p4, p1, p3, 25)} */}
                    </>
                )}

                {(isActiveButton.isInfo || isActiveButton.isConSide) && (
                    ticks
                )}
                {(isActiveButton.isInfo || isActiveButton.isParSide) && parallelArrows}
            </svg>
            {isActiveButton.isInfo && <CommonInfo isVisible={isActiveButton.isInfo} label={label} />}
        </div>
    );
};

const Parallelogram = () => {
    const { isMax,isActiveButton, setIsActiveButton,data, setData } = useQuadrilateralContext();
    
    // const [isActiveButton, setIsActiveButton] = useState({
    //     isParSide: false,
    //     isInfo: false,
    //     isConSide: false,
    //     isConAngle: false
    // })

    // const [data, setData] = useState("");

    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        if (!isActiveButton.isParSide && !isActiveButton.isConAngle && !isActiveButton.isConSide && !isActiveButton.isInfo) {
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
                label="Parallelogram"
                points="70,50 230,50 250,250 90,250"
                isActiveButton={isActiveButton}
                ismobile={ismobile}
            />


            {data.length > 0 &&
                (<div
                    style={{
                        width: "auto",
                        position: "absolute",
                        right: isMax ? "7%" : "2%",   // 👉 Move 1px from the RIGHT side
                        top: isMax ? "38%" : "30%",
                        transform: "translateY(-50%)",
                        textAlign: "center",
                        fontSize: "18px",
                        color: "#444",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "10px",
                        zIndex: 9999,
                        width: window.screen.width >= 1440 ? "300px": isMax ? "300px":"250px"
                    }}
                >
                    <Description data={data} />

                </div>)
            }
            <div style={{ display: "flex", bottom: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "20px", width: "full", height: "100px", borderRadius: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "full", gap: "20px" }}>


                    <CommonButton value="Mark Parallel Sides"
                        isActiveButton={isActiveButton.isParSide}
                        onClick={() => {
                            playClickSound()
                            setData(`Opposite sides are parallel to each other.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,

                                isParSide: !prev.isParSide
                            }))
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
                    />
                    <CommonButton value="Mark Congruent Sides"
                        isActiveButton={isActiveButton.isConSide}
                        onClick={() => {
                            playClickSound()
                            setData(`Opposite sides are equal in length.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                // isAngle: false,
                                isConSide: !prev.isConSide
                            }))
                        }}
                    />
                    <CommonButton value="Show Info"
                        isActiveButton={isActiveButton.isInfo}
                        onClick={() => {
                            playClickSound()
                            setData(`
                                    ● Opposite sides are equal in length.<br/>
                                    ● Opposite sides are parallel to each other.<br/>
                                    ● Opposite angles are equal.
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




export default Parallelogram