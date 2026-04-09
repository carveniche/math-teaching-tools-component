import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import CommonButton from './commonComponent/CommonButton';
import { playClickSound } from '../../utils/playSound';
import CommonInfo from './commonComponent/CommonInfo';
import { useTriangleContext } from '../contextDimensional/ContextTriangle';
// import CommonButton from './CommonComponent/CommonButton';
// import CommonInfo from './CommonComponent/CommonInfo';
// import { useTriangleContext } from '../ContextTriangle/ContextTriangle';
// import { playClickSound } from '../../utils/playSound';

import '../style/mainComponent.css'
import Cube3D from './commonComponent/CavasElement/ThreeDCube';
import Cylinder3D from './commonComponent/CavasElement/ThreeDCylinder';


const Description = () => {
    const { descriptionData, } = useTriangleContext();
    return (
        <div
            style={{ fontSize: "18px", lineHeight: "2", fontFamily: "sans-serif", color: "#333", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: descriptionData }}
        />
    )
}

const Cylinder = () => {
    const [isActiveButton, setIsActiveButton] = useState({
        isAngle: false,
        isInfo: false
    })


    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { descriptionData, setDescriptionData, ismaximized } = useTriangleContext();
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
            {/* 🔷 3D AREA */}
            < div
                style={{
                    flex: 1,               // 🔥 TAKES AVAILABLE HEIGHT
                    width: "40%",
                }}
            >
                <Cylinder3D />
            </div>
            {descriptionData.length > 0 &&
                (<div
                    style={{
                        width: "auto",
                        position: "absolute",
                        right: ismaximized ? "7%" : "2%",   // 👉 Move 1px from the RIGHT side
                        top: "30%",
                        transform: "translateY(-50%)",
                        textAlign: "left",
                        fontSize: "18px",
                        color: "#444",
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                        width: ismaximized ? "300px" : "250px"
                    }}
                >
                    <Description />
                </div>)
            }

            <div style={{ display: "flex", bottom: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "20px", width: "full", height: "100px", borderRadius: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "full", gap: "20px" }}>


                    <CommonButton value="Show Shape Info"
                        isActiveButton={isActiveButton.isAngle}
                        onClick={() => {
                            playClickSound();
                            setDescriptionData(`<b  style="color:#ef4444;">Cylinder</b> <br/>
                                Number of Edges = 2</br>
                                Number of Faces = 3 </br>
                                Number of Vertices = 0`)
                            setIsActiveButton((prev) => ({
                                // ...prev,
                                isAngle: !prev.isAngle
                            }))
                        }}
                    />
                </div>
            </div>

        </div>
    )
}



export default Cylinder 