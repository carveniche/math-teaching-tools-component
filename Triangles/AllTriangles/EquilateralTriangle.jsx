import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import CommonButton from "./CommonComponent/CommonButton";
import CommonInfo from "./CommonComponent/CommonInfo";
import { useTriangleContext } from "../ContextTriangle/ContextTriangle";
import { playClickSound } from "../../utils/playSound";

/* ---------------- TRIANGLE SVG COMPONENT ---------------- */

const Triangle = ({ label, ismobile, points, isActiveButton }) => {
    const [p1, p2, p3] = points.split(" ").map((p) => {
        const [x, y] = p.split(",").map(Number);
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

    const angleArcs = (
        <>
            <path
                d={`M ${p1.x + 9},${p1.y + 17}
           A 10,10 0 0,1 ${p1.x - 8},${p1.y + 15}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
            <path
                d={`M ${p2.x - 15},${p2.y - 1}
           A 10,10 0 0,1 ${p2.x - 8},${p2.y - 15}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
            <path
                d={`M ${p3.x + 8},${p3.y - 15}
           A 10,10 0 0,1 ${p3.x + 15},${p3.y - 1}`}
                fill="none"
                stroke="red"
                strokeWidth="2"
            />
        </>
    );

    const ticks = (
        <>
            {drawTick(midPoint(p1, p2), 0)}
            {drawTick(midPoint(p2, p3), Math.PI / 2)}
            {drawTick(midPoint(p3, p1), 0)}
        </>
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                width: ismobile ? "100%" : "28%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "30px",
                height: "100%",
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
                <polygon
                    points={points}
                    fill="white"
                    stroke="black"
                    strokeWidth={2}
                />

                {(isActiveButton.isInfo || isActiveButton.isAngle) && angleArcs}
                {(isActiveButton.isInfo || isActiveButton.isSide) && ticks}
            </svg>

            {isActiveButton.isInfo && (
                <CommonInfo isVisible={true} label={label} />
            )}
        </div>
    );
};

/* ---------------- DESCRIPTION ---------------- */

const Description = () => {
    const { descriptionData } = useTriangleContext();

    return (
        <div
            style={{
                fontSize: "18px",
                lineHeight: "1.8",
                fontFamily: "sans-serif",
                color: "#333",
                textAlign: "center",
            }}
            dangerouslySetInnerHTML={{ __html: descriptionData }}
        />
    );
};

/* ---------------- MAIN COMPONENT ---------------- */

const EquilateralTriangle = () => {
    const {
        descriptionData,
        setDescriptionData,
        ismaximized,
        isActiveButton,
        setIsActiveButton,
        isLiveClass,
    } = useTriangleContext();

    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (
            !isActiveButton.isAngle &&
            !isActiveButton.isInfo &&
            !isActiveButton.isSide
        ) {
            setDescriptionData("");
        }
    }, [isActiveButton]);

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
                <Triangle
                    label="Equilateral Triangle"
                    points="175,20 325,279.9 25,279.9"
                    isActiveButton={isActiveButton}
                    ismobile={ismobile}
                />

                {descriptionData.length > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            right: ismaximized ? "7%" : "2%",
                            top: "30%",
                            transform: "translateY(-50%)",
                            backgroundColor: "#f9f9f9",
                            padding: "10px",
                            borderRadius: "10px",
                            width: ismaximized ? "300px" : "250px",
                            zIndex: isLiveClass ? 0 : 9999,
                        }}
                    >
                        <Description />
                    </div>
                )}
            </div>

            {/* ---------- BUTTON AREA (Fixed Height Auto) ---------- */}
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
                <CommonButton
                    value="Mark Congruent Sides"
                    isActiveButton={isActiveButton.isSide}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData("This triangle has 3 equal sides.");
                        setIsActiveButton((prev) => ({
                            ...prev,
                            isSide: !prev.isSide,
                        }));
                    }}
                />

                <CommonButton
                    value="Mark Congruent Angles"
                    isActiveButton={isActiveButton.isAngle}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData(
                            "This triangle has 3 equal angles, each measuring 60°."
                        );
                        setIsActiveButton((prev) => ({
                            ...prev,
                            isAngle: !prev.isAngle,
                        }));
                    }}
                />

                <CommonButton
                    value="Show Info"
                    isActiveButton={isActiveButton.isInfo}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData(`
              ● A classification by sides.<br/>
              ● All three sides are equal.<br/>
              ● All three angles are equal (each 60°).
            `);
                        setIsActiveButton((prev) => ({
                            ...prev,
                            isInfo: !prev.isInfo,
                        }));
                    }}
                />
            </div>
        </div>
    );
};

export default EquilateralTriangle;