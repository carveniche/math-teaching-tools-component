import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonButton from './commonComponent/CommonButton';
import { playClickSound } from '../../utils/playSound';
import CommonInfo from './commonComponent/CommonInfo';
import { useTriangleContext } from '../contextDimensional/ContextTriangle';
import style from "./style.module.css"

import '../style/mainComponent.css'
import Cube3D from './commonComponent/CavasElement/ThreeDCube';
import RectangularPrism3D from './commonComponent/CavasElement/ThreeDRectangularPrism';


const Description = () => {
    const { descriptionData, } = useTriangleContext();
    return (
        <div
            style={{ fontSize: "18px", lineHeight: "2", fontFamily: "sans-serif", color: "#333", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: descriptionData }}
        />
    )
}

const Cube = () => {


    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { descriptionData, setDescriptionData, ismaximized,isLiveClass,isActiveButton, setIsActiveButton,isButtonAccess } = useTriangleContext();
    useEffect(() => {
        if (isActiveButton.isAngle === false) {
            setDescriptionData("");
        }
        if (isActiveButton.isInfo === false) {
            setDescriptionData("");
        }

    }, [isActiveButton.isAngle, isActiveButton.isInfo])



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
            {/* <Cube3D />
             */} {/* 🔷 3D AREA */}
            < div
                 className={style.solidShape}
            >
                <RectangularPrism3D />
            </div>
            {descriptionData.length > 0 &&
                (<div
                    style={{
                        position: "absolute",
                        right: ismaximized ? "7%" : "2%",   // 👉 Move 1px from the RIGHT side
                        top: ismaximized ? "38%" : "30%",
                        transform: "translateY(-50%)",
                        textAlign: "center",
                        fontSize: "18px",
                        color: "#444",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "10px",
                        zIndex: isLiveClass ? 0 : 9999,
                        width: window.screen.width >= 1440 ? "300px" : ismaximized ? "300px" : "250px"
                    }}
                >
                    <Description />
                </div>)
            }


            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    padding: "10px",
                    flexWrap: "wrap",
                    minHeight: "70px",  // flexible instead of fixed 100px

                }}>

                <CommonButton value="Show Shape Info"
                    isActiveButton={isActiveButton.isAngle}
                    onClick={() => {
                         if (!isButtonAccess) return;
                        playClickSound();
                        setDescriptionData(`<b  style="color:#ef4444;">Rectangular Prism</b> <br/>
                                Number of Edges = 12</br>
                                Number of Faces = 6 </br>
                                Number of Vertices = 8`)
                        setIsActiveButton((prev) => ({
                            isAngle: !prev.isAngle
                        }))
                    }}
                />

            </div>

        </div>
    )
}



export default Cube