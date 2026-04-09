import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonButton from './commonComponent/CommonButton';
import { playClickSound } from '../../utils/playSound';
import { useTriangleContext } from '../contextDimensional/ContextTriangle';
import Cube3D from './commonComponent/CavasElement/ThreeDCube';

const Description = () => {
    const { descriptionData } = useTriangleContext();

    return (
        <div
            style={{
                fontSize: "clamp(14px,1.5vw,18px)",
                lineHeight: "1.6",
                fontFamily: "sans-serif",
                color: "#333",
            }}
            dangerouslySetInnerHTML={{ __html: descriptionData }}
        />
    );
};

const Cube = () => {
    const [isActiveButton, setIsActiveButton] = useState({
        isAngle: false,
        isInfo: false
    });

    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { descriptionData, setDescriptionData, ismaximized ,isLiveClass} = useTriangleContext();

    useEffect(() => {
        if (!isActiveButton.isAngle && !isActiveButton.isInfo) {
            setDescriptionData("");
        }
    }, [isActiveButton]);

    return (
        <div className='md:pb-[100px]  lg:pb-[80px] xl:pb-[10px]'
            style={{
                display: "flex",
                flexDirection: "column",   // 🔥 IMPORTANT
                width: "100%",
                // height: "100%",            // parent controls
                position: "relative",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",

            }}
        >
            {/* 🔷 3D AREA */}
            < div
                style={{
                    flex: 1,               // 🔥 TAKES AVAILABLE HEIGHT
                    width: "40%",
                }}
            >
                <Cube3D />


            </div >
            {/* 🔷 Description Panel */}
            {
                descriptionData.length > 0 && (
                    <div
                        style={{
                              position: "absolute",
                            right: isLiveClass ? "2%" : ismaximized ? "7%" : "3%", // 👉 Move 1px from the RIGHT side
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
                    </div>
                )
            }

            {/* 🔷 BUTTON AREA */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    padding: "10px",
                    flexWrap: "wrap",
                    minHeight: "70px",  // flexible instead of fixed 100px

                }}
            >
                <CommonButton
                    value="Show Shape Info"
                    isActiveButton={isActiveButton.isAngle}
                    onClick={() => {
                        playClickSound();

                        setDescriptionData(`
                            <b style="color:#ef4444;">Cube</b><br/>
                            Number of Edges = 12<br/>
                            Number of Faces = 6<br/>
                            Number of Vertices = 8
                        `);

                        setIsActiveButton(prev => ({
                            ...prev,               // 🔥 FIXED BUG
                            isAngle: !prev.isAngle
                        }));
                    }}
                />
            </div>

        </div >
    );
};

export default Cube;