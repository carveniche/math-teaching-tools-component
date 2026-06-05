import React from 'react'
import GgbSubtractTwoDigitNumber from './GgbSubtractTwoDigitNumber'

const DoubleDigitSubstraction = () => {
    return (

        <div
            style={{
                height: "calc(100vh - 50px)",      /* 60px = your footer height */
                minHeight: "calc(100vh - 50px)",
                overflowY: "auto",
                width: "100%",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                backgroundImage:
                    "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <GgbSubtractTwoDigitNumber
                props={{
                    isLiveClass: false,
                    role_name: "tutor",
                }}
            />

        </div >
    )
}

export default DoubleDigitSubstraction