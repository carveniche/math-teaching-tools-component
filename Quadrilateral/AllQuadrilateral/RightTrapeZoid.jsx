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

    // For example: p1 = top-left, p2 = top-right, p3 = bottom-right, p4 = bottom-left
    const [p1, p2, p3, p4] = parsedPoints;
    const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

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

    const ArrowAngle = ({ x, y, direction = "left", size = 12, color = "purple" }) => {
        let rotateDeg = 0;
        if (direction === "left") rotateDeg = 90;
        if (direction === "right") rotateDeg = 75;
        if (direction === "up") rotateDeg = -180;
        if (direction === "down") rotateDeg = -180;

        return (
            <g transform={`translate(${x},${y}) rotate(${rotateDeg})`}>
                <line x1={0} y1={-size / 2} x2={size} y2={0} stroke={color} strokeWidth={3} />
                <line x1={0} y1={size / 2} x2={size} y2={0} stroke={color} strokeWidth={3} />
            </g>
        );
    };
    const drawSideArrows = (start, end, count = 1, direction = "left") => {
        const arrows = [];

        for (let i = 0; i < count; i++) {
            // Evenly distribute along the line
            const t = (i + 1) / (count + 1); // t = 0.5 if count=1 (center)
            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;

            arrows.push(<ArrowAngle key={i} x={x} y={y} direction={direction} />);
        }

        return arrows;
    };
    const getTickAngle = (a, b) => {
        if (a.y === b.y) return Math.PI / 2; // horizontal side → vertical tick
        if (a.x === b.x) return 0;           // vertical side → horizontal tick
        return 0; // fallback
    };
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
            {drawTick({ x: mid(p2, p3).x + 0, y: mid(p2, p3).y + 0 }, getTickAngle(p3, p2))}
            {drawTick({ x: mid(p2, p3).x + 0, y: mid(p2, p3).y + 5 }, getTickAngle(p3, p2))}
            {/* --- BOTTOM SIDE (2 ticks) --- */}

            {drawTick({ x: mid(p4, p3).x - 15, y: mid(p3, p4).y + 1 }, 90)}
            {drawTick({ x: mid(p4, p3).x -10, y: mid(p3, p4).y + 1 }, 90)}
            {drawTick({ x: mid(p4, p3).x -5, y: mid(p3, p4).y + 1 }, 90)}


            {/* --- LEFT SIDE (1 tick) --- */}
            {/* {drawTick({ x: mid(p4, p1).x + 3, y: mid(p4, p1).y + 12 }, getTickAngle(p4, p1))} */}
            {drawTick({ x: mid(p4, p1).x, y: mid(p4, p1).y - 5 }, getTickAngle(p4, p1))}
            {drawTick({ x: mid(p4, p1).x, y: mid(p4, p1).y + 0 }, getTickAngle(p4, p1))}
            {drawTick({ x: mid(p4, p1).x, y: mid(p4, p1).y + 5 }, getTickAngle(p4, p1))}
            {drawTick({ x: mid(p4, p1).x, y: mid(p4, p1).y + 10 }, getTickAngle(p4, p1))}
        </>
    );


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            margin: '10px',
            backgroundColor: "white",
            width: "400px",
            justifyContent: "center",
            alignItems: "center",
            height: "350px",
            borderRadius: "30px",
            cursor: label === "Equilateral" ? 'pointer' : 'default',
            overflow: "hidden"
        }}>
            <svg
                width="300"
                height="300"


            >
                <polygon points={points} fill="white" stroke="black" strokeWidth={2} />
                {isActiveButton.isAngle && angleArcs}
                {(isActiveButton.isInfo || isActiveButton.isConAngle) && (
                    <>
                        {/* Top-left corner p1 → 90° */}
                        <polyline
                            points={`
                            ${p1.x + 15},${p1.y} 
                            ${p1.x + 15},${p1.y + 15} 
                            ${p1.x + 1},${p1.y + 15}
                        `}
                            fill="none"
                            stroke="red"
                            strokeWidth={2}
                        />

                        {/* Bottom-left corner p4 → 90° */}
                        <polyline points={`
                        ${p4.x + 15},${p4.y} 
                        ${p4.x + 15},${p4.y - 15} 
                        ${p4.x + 1},${p4.y - 15}
                       `}
                            fill="none"
                            stroke="red"
                            strokeWidth={2}
                        />
                    </>
                )}

                {(isActiveButton.isInfo || isActiveButton.isParAngle) && (
                    <>
                        {/* Top side: 1 arrow, centered */}
                        {drawSideArrows(p1, p2, 1, "up")}

                        {/* Right side: 1 arrow, centered */}
                        {/* {drawSideArrows(p2, p3, 1, "right")} */}

                        {/* Bottom side: 1 arrow, shifted slightly left */}
                        {drawSideArrows(p3, p4, 1, "down").map((arrow, index) =>
                            React.cloneElement(arrow, {
                                key: index,
                                x: arrow.props.x - 20 // shift 10px left
                            })
                        )}

                        {/* Left side: 1 arrow, centered */}
                        {/* {drawSideArrows(p4, p1, 1, "left")} */}
                    </>
                )}
                {(isActiveButton.isInfo || isActiveButton.isConSide) && (
                    ticks
                )}
            </svg>


            {isActiveButton.isInfo && (
                <CommonInfo isVisible={isActiveButton.isInfo} label={label} />
            )}
        </div>
    );
};


const RightTrapezoid = () => {
    const { isMax,isActiveButton, setIsActiveButton,data, setData,isLiveClass } = useQuadrilateralContext();
    
    // const [isActiveButton, setIsActiveButton] = useState({
    //     isConAngle: false,
    //     isParAngle: false,
    //     isConSide: false,
    //     isInfo: false
    // })


    // const [data, setData] = useState("")
    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (!isActiveButton.isConAngle && !isActiveButton.isParAngle && !isActiveButton.isConSide && !isActiveButton.isInfo) {
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
                label="Right Trapezoid"
                points="50,50 200,50 250,250 50,250"
                isActiveButton={isActiveButton}
                ismobile={ismobile}
            />
            {data.length > 0 &&
                (<div
                    style={{
                        width: "auto",
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
                        isActiveButton={isActiveButton.isParAngle}
                        onClick={() => {
                            playClickSound()
                            setData(`Only one pair of opposite sides are parallel to each other.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isParAngle: !prev.isParAngle
                            }))
                        }}
                    />
                    <CommonButton value="Mark Congruent Angles"
                        isActiveButton={isActiveButton.isConAngle}
                        onClick={() => {
                            playClickSound()
                            setData(`Two right angles measuring 90° are adjacent along one leg.`)
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
                            setData(`The sides are not equal.`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isConSide: !prev.isConSide
                            }))
                        }}
                    />
                    <CommonButton value="Show Info"
                        isActiveButton={isActiveButton.isInfo}
                        onClick={() => {
                            playClickSound()
                            setData(`
                                ● The sides are not equal.<br/>
                                ● One pair of opposite sides are parallel to each other.<br/>
                                ● Two right angles each measuring 90° are adjacent along one leg.
                                    `)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isInfo: !prev.isInfo
                            }))
                        }} />
                </div>
            </div>

        </div>
    )
}




export default RightTrapezoid