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


    const angleArcs = (
        <>
            <path d={getArcPath(p3, p2, p1, 20)} stroke="red" fill="none" strokeWidth="2" />
        </>
    );



    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                margin: '10px',
                backgroundColor: "white",
                width: isLiveClass ? "30%": ismobile ? "100%" : "400px",
                justifyContent: "flex-start",
                alignItems: "center",
                height: isLiveClass ? "100%" : "350px",
                borderRadius: "30px",
                cursor: 'pointer'
            }}>

            <svg
                viewBox="50 100 400 300"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >


                {/* <svg width="360" height="250" viewBox="30 150 400 200"  > */}
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


const ObtuseTriangle = () => {

    const { isLiveClass, role_name, descriptionData, setDescriptionData, ismaximized, isActiveButton, setIsActiveButton } = useTriangleContext();


    useEffect(() => {
        if (isActiveButton.isAngle === false) {
            setDescriptionData("");
        }
        if (isActiveButton.isInfo === false) {
            setDescriptionData("");
        }

    }, [isActiveButton.isAngle, isActiveButton.isInfo])



    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
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
                    label="Obtuse Triangle"
                    points="75,325 425,325 250,225"

                    isActiveButton={isActiveButton}
                    ismobile={ismobile}
                />
                {descriptionData.length > 0 &&
                    (<div
                        style={{
                            // width: "auto",
                            position: "absolute",
                            right: isLiveClass ? "2%" : ismaximized ? "7%" : "3%",  // 👉 Move 1px from the RIGHT side
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

                <CommonButton value="Show Angles"
                    isActiveButton={isActiveButton.isAngle}
                    onClick={() => {
                        playClickSound();
                        setDescriptionData(` One angle is an obtuse angle <br />
        (Angle greater than 90°).`)
                        setIsActiveButton((prev) => ({
                            // ...prev,
                            isAngle: !prev.isAngle
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
                        playClickSound();
                        setDescriptionData(`● A classification by angles.<br/>
                                                ● One angle is greater than 90°.<br/>
                                                ● The triangle has exactly one obtuse angle.
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


        </div >
    )
}



export default ObtuseTriangle