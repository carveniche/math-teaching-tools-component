import React, { useEffect, useRef, useState } from 'react';

const TenFrame = ({ prop, filledIndices, studentData, randomEmoji, handleDataTrack }) => {
    const { isLiveClass = false, role_name } = prop;

    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState(null);
    const [containerW, setContainerW] = useState(500);

    // ── Container width ───────────────────────────────────────────
    const containerRef = useRef(null);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
        ro.observe(el);
        setContainerW(el.clientWidth);
        return () => ro.disconnect();
    }, []);

    const isMobile = containerW < 420;
    const isTutor = isLiveClass ? role_name === 'tutor' : true;

    
    const userInputRef = useRef(userInput);
    const filledIndicesRef = useRef(filledIndices);

    useEffect(() => { userInputRef.current = userInput; }, [userInput]);
    useEffect(() => { filledIndicesRef.current = filledIndices; }, [filledIndices]);

    const handleCheck = () => {
        if (isLiveClass && role_name === 'tutor') {
            handleDataTrack({ isFrom: 'clicked', isClicked: true });
        }
        const answer = parseInt(userInputRef.current, 10);
        const correct = filledIndicesRef.current.length;
       
        setResult(!isNaN(answer) ? answer === correct : false);
    };

    useEffect(()=>{
         if(!userInput && isLiveClass && role_name !== 'tutor'){
            setResult(null)
         }
    },[userInput])

    useEffect(() => {
        if (isLiveClass && role_name === 'tutor') {
            handleDataTrack({ isFrom: 'userInput', Value: userInput });
        }
    }, [userInput]);

    useEffect(() => {
        if (isLiveClass && role_name !== 'tutor' && studentData?.Value !== undefined) {
            setUserInput(String(studentData.Value));
        }
    }, [studentData?.Value]);

    const isClickedRef = useRef(false);
    useEffect(() => {
        if (!isLiveClass || role_name === 'tutor') return;
        if (studentData?.isClicked !== true) return;
        if (isClickedRef.current) return;

        isClickedRef.current = true;
        queueMicrotask(() => {
            handleCheck();

            setTimeout(() => { isClickedRef.current = false; }, 200);
        });
    }, [studentData?.isClicked]);

    // ── Actions ───────────────────────────────────────────────────
    const handlePlayAgain = () => {
        handleDataTrack({ isFrom: 'PlayAgain' });
        setUserInput('');
        setResult(null);
    };

    const toggleFullscreen = () => {
        const el = document.getElementById('enable-full-screen');
        if (!document.fullscreenElement) {
            el?.requestFullscreen?.() || el?.webkitRequestFullscreen?.() || el?.msRequestFullscreen?.();
        } else {
            document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.msExitFullscreen?.();
        }
    };

    // ── Sizing ────────────────────────────────────────────────────
    const cellSize = isMobile ? 50 : 60;
    const emojiFs = isMobile ? '1.8rem' : '2.25rem';
    const cardW = isMobile ? Math.min(containerW - 24, 320) : Math.min(containerW - 48, 440);

    return (
        <div
            ref={containerRef}
            id="enable-full-screen"
            style={{
                height: isLiveClass ? '100%' : "73vh",
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
                boxSizing: 'border-box',
                padding: isLiveClass ? '8px' : '20px 8px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Fullscreen button */}
            {!isLiveClass && (
                <div style={{ position: 'absolute', top: 10, right: 12, cursor: 'pointer', zIndex: 10 }}>
                    <img
                        src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png"
                        alt="full-screen"
                        onClick={toggleFullscreen}
                        style={{ width: 28, height: 28 }}
                    />
                </div>
            )}

            {/* Card */}
            <div
                style={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    width: cardW,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.25rem',
                    border: '2px solid #93c5fd',
                    boxSizing: 'border-box',
                }}
            >
                {/* Ten-frame grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                    {Array.from({ length: 10 }, (_, index) => (
                        <div
                            key={index}
                            style={{
                                width: cellSize,
                                height: cellSize,
                                border: '2px solid #6b7280',
                                borderRadius: '0.375rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f9fafb',
                            }}
                        >
                            {filledIndices.includes(index) && (
                                <span style={{ fontSize: emojiFs, textAlign: 'center' }}>
                                    {randomEmoji}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Input row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600, color: '#374151' }} className="text_body">
                        How many?
                    </label>

                    <input
                        type="text"
                        value={userInput}
                        onChange={e => {
                            const v = e.target.value;
                            if (v === '' || /^\d+$/.test(v)) setUserInput(v);
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
                        readOnly={!isTutor}
                        style={{
                            width: '4rem',
                            height: '2rem',
                            border: '1px solid #9ca3af',
                            borderRadius: '0.375rem',
                            textAlign: 'center',
                            fontSize: '1.125rem',
                            fontWeight: 500,
                            outline: 'none',
                            boxSizing: 'border-box',
                        }}
                    />

                    {isTutor && (
                        <button
                            onClick={handleCheck}
                            className="text_body"
                            style={btnStyle('#3b82f6', '#2563eb')}
                            onMouseOver={e => applyHover(e, '#2563eb', '#1d4ed8')}
                            onMouseOut={e => applyHover(e, '#3b82f6', '#2563eb')}
                        >
                            Check
                        </button>
                    )}
                </div>

                {/* Result */}
                {result !== null && (
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: result ? '#16a34a' : '#dc2626' }}>
                        {result ? '✅ Your answer is correct!' : '❌ Try again!'}
                    </div>
                )}

                {/* Reset */}
                {isTutor && (
                    <button
                        onClick={handlePlayAgain}
                        className="text_body"
                        style={btnStyle('#8b5cf6', '#8b5cf6')}
                        onMouseOver={e => applyHover(e, '#6F46D2', '#6F46D2')}
                        onMouseOut={e => applyHover(e, '#8b5cf6', '#8b5cf6')}
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

const btnStyle = (from, to) => ({
    background: `linear-gradient(90deg, ${from}, ${to})`,
    color: 'white',
    padding: '0.5rem 1.4rem',
    borderRadius: '9999px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    border: 'none',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
});

const applyHover = (e, from, to) => {
    e.currentTarget.style.background = `linear-gradient(90deg, ${from}, ${to})`;
    e.currentTarget.style.transform = e.type === 'mouseover' ? 'scale(1.05)' : 'scale(1)';
    e.currentTarget.style.boxShadow = e.type === 'mouseover'
        ? '0 6px 18px rgba(0,0,0,0.25)'
        : '0 4px 14px rgba(0,0,0,0.15)';
};

export default TenFrame;