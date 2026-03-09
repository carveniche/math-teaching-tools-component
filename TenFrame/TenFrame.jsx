import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";

const TenFrame = ({ prop, filledIndices, randomEmoji, handlePlayAgainParent }) => {
    const { isLiveClass = false,
        role_name, } = prop
    const value = 10;
    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState(null);


    const handleCheck = () => {
        const userAnswer = parseInt(userInput);
        if (!isNaN(userAnswer)) {
            setResult(userAnswer === filledIndices.length);
        } else {
            setResult(false);
        }
    };

    const handlePlayAgain = () => {
        handlePlayAgainParent()
        setUserInput('');
        setResult(null);
    };


    const toggleFullscreen = () => {
        const fullScreenElem = document.getElementById('enable-full-screen');
        if (!document.fullscreenElement) {
            fullScreenElem?.requestFullscreen?.();
            (fullScreenElem)?.webkitRequestFullscreen?.();
            (fullScreenElem)?.msRequestFullscreen?.();
        } else {
            document.exitFullscreen?.();
            (document).webkitExitFullscreen?.();
            (document).msExitFullscreen?.();
        }
    };

    const isTutor = isLiveClass ? role_name === "tutor" ? true : false : true

    return (
        <div
            style={{
                minHeight: "100%",
                marginTop: isLiveClass ? "" : '20px',
                padding: isLiveClass ? "" : '20px 0px 20px 0px',
                width: '100%',
                display: 'flex',
                borderRadius: "16px",
                height: isLiveClass ? "100%" : "100vh",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
            }}
            id='enable-full-screen'
        >

            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                height: "90%"
            }} >
                <div
                    style={{
                        backgroundColor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderRadius: '0.5rem',
                        padding: '1.5rem',
                        width: ismobile ? "305px" : '407px',
                        display: 'flex',
                        flexDirection: 'column',
                        // height: '100%',
                        // marginTop: '20px',
                        alignItems: 'center',
                        gap: '1.5rem',
                        border: '2px solid #93c5fd',
                    }}
                >
                    {/* <h2
                        style={{
                            fontSize: '1.875rem',
                            fontWeight: '700',
                            color: '#1d4ed8'
                        }}
                    >
                        Ten Frames
                    </h2> */}

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '0.5rem',
                        }}
                    >
                        {Array.from({ length: value }, (_, index) => (
                            <div
                                key={index}
                                style={{
                                    width: ismobile ? '50px' : "60px",
                                    height: ismobile ? '50px' : "60px",
                                    border: '2px solid #6b7280',
                                    borderRadius: '0.375rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9fafb',
                                }}
                            >
                                {filledIndices.includes(index) && (
                                    <div
                                        style={{
                                            fontSize: '2.25rem',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {randomEmoji}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '0.5rem',
                        }}
                    >
                        <label
                            style={{
                                // fontSize: '1.125rem',
                                fontWeight: '600',
                                color: '#374151', // Tailwind's gray-700
                            }}
                            className='text_body'
                        >
                            How many?
                        </label>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d+$/.test(value)) {
                                    setUserInput(value);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCheck();
                                }
                            }}
                            style={{
                                width: '4rem',
                                height: '2rem',
                                border: '1px solid #9ca3af', // Tailwind's gray-400
                                borderRadius: '0.375rem',
                                textAlign: 'center',
                                fontSize: '1.125rem',
                                fontWeight: '500',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                outline: 'none',
                            }}
                        />
                        {isTutor && <button
                            onClick={handleCheck}
                            style={{
                                background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                                color: "white",
                                padding: "0.5rem 1.4rem",
                                borderRadius: "9999px",
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                                border: "none",
                                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.25)";
                                e.target.style.background = "linear-gradient(90deg, #2563eb, #1d4ed8)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.15)";
                                e.target.style.background = "linear-gradient(90deg, #3b82f6, #2563eb)";
                            }}
                            className="text_body"
                        >
                            Check
                        </button>}

                    </div>

                    {result !== null && (
                        <div
                            style={{
                                fontSize: '1.125rem',
                                fontWeight: 'bold',
                                marginTop: '0.5rem',
                                color: result ? '#16a34a' : '#dc2626', // green-600 or red-600
                            }}
                        >
                            {result ? '✅ Your answer is correct!' : '❌ Try again!'}
                        </div>
                    )}

                    {isTutor && <button
                        onClick={handlePlayAgain}
                        style={{
                            background: "#8b5cf6",
                            color: "white",
                            padding: "0.5rem 1.4rem",
                            borderRadius: "9999px",
                            fontWeight: "600",
                            letterSpacing: "0.5px",
                            border: "none",
                            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.25)";
                            e.target.style.background = "#6F46D2";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.15)";
                            e.target.style.background = "#8b5cf6";
                        }}
                        className="text_body"
                    >
                        Reset
                    </button>}
                </div>
            </div>



            {!isLiveClass &&
                <div
                    style={{
                        paddingRight: "10px",
                        cursor: "pointer",
                    }}
                >
                    <img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png" alt="full-screen" onClick={toggleFullscreen} />
                </div>}
        </div>

    );
};

export default TenFrame;
