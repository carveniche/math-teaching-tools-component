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

    function getArcPath(center, from, to, radius) {
        const angleBetween = (p1, p2) =>
            Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        const startAngle = angleBetween(center, from);
        const endAngle = angleBetween(center, to);
        let angle = endAngle - startAngle;
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

    // Returns the angle at vertex B formed by points A-B-C in degrees
    const computeAngle = (A, B, C) => {
        const AB = { x: A.x - B.x, y: A.y - B.y };
        const CB = { x: C.x - B.x, y: C.y - B.y };
        const dot = AB.x * CB.x + AB.y * CB.y;
        const magAB = Math.sqrt(AB.x ** 2 + AB.y ** 2);
        const magCB = Math.sqrt(CB.x ** 2 + CB.y ** 2);
        const angleRad = Math.acos(dot / (magAB * magCB));
        return (angleRad * 180) / Math.PI; // in degrees
    };

    const drawAngleArc = (vertex, point1, point2, radius = 20, color = "red") => {
        const angle1 = Math.atan2(point1.y - vertex.y, point1.x - vertex.x);
        const angle2 = Math.atan2(point2.y - vertex.y, point2.x - vertex.x);

        const start = {
            x: vertex.x + radius * Math.cos(angle1),
            y: vertex.y + radius * Math.sin(angle1),
        };
        const end = {
            x: vertex.x + radius * Math.cos(angle2),
            y: vertex.y + radius * Math.sin(angle2),
        };

        // Determine sweep-flag based on cross product (interior angle)
        const cross = (point1.x - vertex.x) * (point2.y - vertex.y) - (point1.y - vertex.y) * (point2.x - vertex.x);
        const sweepFlag = cross < 0 ? 0 : 1; // 1 for clockwise, 0 for counter-clockwise

        return (
            <path
                d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweepFlag} ${end.x} ${end.y}`}
                stroke={color}
                strokeWidth={3}
                fill="none"
            />
        );
    };



    // Tick mark generator
    // Midpoint helper
    const mid = (a, b) => ({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    });

    // Vertical tick mark generator
    // Replace your drawVerticalTick with this
    const drawPerpTick = (midPoint, start, end, double = false, size = 14, offset = 6, strokeWidth = 3, color = "blue") => {
        // Direction vector from start -> end (tangent)
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const len = Math.hypot(dx, dy) || 1;

        // Unit tangent and unit normal (perpendicular)
        const tx = dx / len;
        const ty = dy / len;
        // normal pointing "outwards" is (-ty, tx) or (ty, -tx) depending how you want it.
        // We'll use nx = -ty, ny = tx
        const nx = -ty;
        const ny = tx;

        // offset along tangent (moves tick along the side). Positive offset moves toward 'end'.
        const ox = tx * offset;
        const oy = ty * offset;

        // single tick endpoints (centered at midpoint, length = size)
        const half = size / 2;
        const x1 = midPoint.x + ox + nx * half;
        const y1 = midPoint.y + oy + ny * half;
        const x2 = midPoint.x + ox - nx * half;
        const y2 = midPoint.y + oy - ny * half;

        if (!double) {
            return (
                <line
                    x1={x1} y1={y1}
                    x2={x2} y2={y2}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            );
        }

        // For double ticks, draw two parallel ticks offset slightly along the tangent
        const sep = Math.max(6, size * 1); // separation between the two ticks
        const x1a = x1 - tx * (sep / 2);
        const y1a = y1 - ty * (sep / 2);
        const x2a = x2 - tx * (sep / 2);
        const y2a = y2 - ty * (sep / 2);

        const x1b = x1 + tx * (sep / 2);
        const y1b = y1 + ty * (sep / 2);
        const x2b = x2 + tx * (sep / 2);
        const y2b = y2 + ty * (sep / 2);

        return (
            <>
                <line x1={x1a} y1={y1a} x2={x2a} y2={y2a} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
                <line x1={x1b} y1={y1b} x2={x2b} y2={y2b} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
            </>
        );
    };




    const ArrowAngle = ({ x, y, direction = "left", size = 12, color = "purple" }) => {
        let rotateDeg = 0;
        if (direction === "left") rotateDeg = 115;
        if (direction === "right") rotateDeg = 60;
        if (direction === "up") rotateDeg = -180;
        if (direction === "down") rotateDeg = -180;

        return (
            <g transform={`translate(${x},${y}) rotate(${rotateDeg})`}>
                <line x1={0} y1={-size / 2} x2={size} y2={0} stroke={color} strokeWidth={3} />
                <line x1={0} y1={size / 2} x2={size} y2={0} stroke={color} strokeWidth={3} />
            </g>
        );
    };
    const drawSideArrows = (start, end, count = 1, direction = "left", spacingFactor = 0) => {
        const arrows = [];
        const step = 1 / (count + 1 || 1); // base step if count > 1
        const offset = (1 - spacingFactor) / 2; // to center compressed arrows

        for (let i = 0; i < count; i++) {
            let t = i * step;           // 0, step, 2*step, ...
            t = t * spacingFactor + offset; // compress & center
            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;
            arrows.push(<ArrowAngle key={i} x={x} y={y} direction={direction} />);
        }
        return arrows;
    };






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
                {(isActiveButton.isInfo || isActiveButton.isConAngle) && (
                    <>
                        {/* Top-left corner p1 */}
                        {drawAngleArc(p1, p2, p4, 12)}
                        {/* Top-right corner p2 */}
                        {drawAngleArc(p2, p1, p3, 12)}
                        {drawAngleArc(p2, p1, p3, 18)}
                        {/* Bottom-right corner p3 */}
                        {drawAngleArc(p3, p4, p2, 12)}
                        {drawAngleArc(p3, p4, p2, 18)}
                        {drawAngleArc(p3, p4, p2, 24)}

                        {/* Bottom-left corner p4 */}
                        {drawAngleArc(p4, p1, p3, 12)}
                        {drawAngleArc(p4, p1, p3, 18)}
                        {drawAngleArc(p4, p1, p3, 24)}
                        {drawAngleArc(p4, p1, p3, 30)}
                    </>
                )}
                {(isActiveButton.isInfo || isActiveButton.isConSide) && (
                    <>
                        {/* Top side (p1 -> p2) */}
                        {drawPerpTick(mid(p1, p2), p1, p2, false, 14, 10)}


                        {drawPerpTick(mid(p4, p3), p4, p3, false, 14, 10)}
                        {drawPerpTick(mid(p4, p3), p4, p3, false, 14, 15)}
                        {drawPerpTick(mid(p4, p3), p4, p3, false, 14, 5)}

                        {/* Right side (p2 -> p3) */}
                        {drawPerpTick(mid(p2, p3), p2, p3, false, 14, -5)}
                        {drawPerpTick(mid(p2, p3), p2, p3, false, 14, 0)}

                        {/* Left side (p1 -> p4) — negative offset to push tick outward if needed */}
                        {drawPerpTick(mid(p1, p4), p1, p4, false, 14, -5)}
                        {drawPerpTick(mid(p1, p4), p1, p4, false, 14, -10)}
                        {drawPerpTick(mid(p1, p4), p1, p4, false, 14, -15)}
                        {drawPerpTick(mid(p1, p4), p1, p4, false, 14, 1)}



                    </>
                )}
                {(isActiveButton.isInfo || isActiveButton.isParAngle) && (
                    <>
                        {/* Side 1 → 1 arrow */}
                        {drawSideArrows(p1, p2, 1, "up")}
                        {/* Side 2 → 2 arrows */}
                        {/* {drawSideArrows(p2, p3, 2, "right")} */}
                        {/* Side 3 → 3 arrows */}
                        {drawSideArrows(p3, p4, 1, "down")}
                        {/* Side 4 → 4 arrows */}
                        {/* {drawSideArrows(p4, p1, 4, "left")} */}
                    </>
                )}

            </svg>


            {isActiveButton.isInfo && (
                <CommonInfo isVisible={isActiveButton.isInfo} label={label} />
            )}
        </div>
    );
};


const Trapezoid = () => {
        const { isMax,isActiveButton, setIsActiveButton,data, setData,isLiveClass } = useQuadrilateralContext();
    
    // const [isActiveButton, setIsActiveButton] = useState({
    //     isConAngle: false,
    //     isParAngle: false,
    //     isConSide: false,
    //     isInfo: false
    // })

//  const { isMax } = useQuadrilateralContext();
    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    // const [data, setData] = useState("")
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
                label="Trapezoid"
                points="100,50 200,50 300,250 0,250"
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
                        width: window.screen.width >= 1440 ? "300px": isMax ? "300px":"250px"
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
                            setData(`Angles are not equal.`)
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
                                    ● All sides are not equal in length.<br/>
                                    ● One pair of opposite sides are parallel to each other.<br/>
                                    ● Angles are not equal.

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




export default Trapezoid