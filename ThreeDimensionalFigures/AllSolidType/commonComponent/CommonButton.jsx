import React from 'react'

const CommonButton = ({ value, onClick, isActiveButton }) => {
    // console.log(isActiveButton,"isActiveButton")
    return (
        <div onClick={onClick} style={{ userSelect: "none", display: "flex", backgroundColor: "skyblue", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer", padding: "10px", borderRadius: "20px" }} >

            <div style={{
                width: "28px",
                height: "28px",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                borderRadius: "50%",
                fontSize: "24px"
            }}>{isActiveButton ? "🔵" : ""}</div>
            <div style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"

            }}>

                {value}
            </div>
        </div>
    );
}

export default CommonButton