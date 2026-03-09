import React, { useState, useEffect, useRef } from "react";
import "./clock.css";
import { timeToWords } from "./Clock";



const CX = 100; // viewBox centre X
const CY = 100; // viewBox centre Y
const R = 90;  // clock face radius (10-unit margin on each side of 200px viewBox)

const HomeClock = ({ handleDataTrack = () => { }, prop }) => {
    const { isLiveClass = false, role_name, StudentClockData } = prop ?? {};
    const isAccess = isLiveClass ? (role_name === "tutor" ? false : true) : false;

    const [time, setTime] = useState({ hours: 12, minutes: 0 });
    const [hourInput, setHourInput] = useState("12");
    const [minuteInput, setMinuteInput] = useState("00");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(true);
    const [timeInWords, setTimeInWords] = useState("");
    const [clockSize, setClockSize] = useState(260);

    const wrapperRef = useRef(null);
    const svgRef = useRef(null);
    const isDragging = useRef(false);

    // ── Responsive size ─────────────────────────────────────────────
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const compute = () => {
            const { width, height } = el.getBoundingClientRect();
            const byH = height - 158;
            const byW = width - 48;
            setClockSize(Math.max(100, Math.min(byH, byW)));
        };
        compute();
        const ro = new ResizeObserver(compute);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // ── Sync tutor → student ────────────────────────────────────────
    useEffect(() => {
        if (role_name === "tutor" && isLiveClass)
            handleDataTrack({ minute: minuteInput, hour: hourInput });
    }, [minuteInput, hourInput, role_name, isLiveClass]);

    useEffect(() => {
        if (role_name !== "tutor" && StudentClockData && isLiveClass) {
            const { minute, hour } = StudentClockData;
            setMinuteInput(minute);
            setHourInput(hour);
            setTime({ hours: parseInt(hour), minutes: parseInt(minute) });
        }
    }, [StudentClockData, role_name, isLiveClass]);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        setTimeInWords(timeToWords(time.hours, time.minutes));
    }, [time.hours, time.minutes]);

    // ── Input handlers ──────────────────────────────────────────────
    const handleHourChange = (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
        setHourInput(v);
        if (v.length > 0) {
            const h = parseInt(v);
            if (h >= 1 && h <= 12) { setTime(p => ({ ...p, hours: h })); setError(""); }
            else setError("Hours must be 01–12");
        }
    };

    const handleMinuteChange = (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
        setMinuteInput(v);
        if (v.length > 0) {
            const m = parseInt(v);
            if (m >= 0 && m <= 59) { setTime(p => ({ ...p, minutes: m })); setError(""); }
            else setError("Minutes must be 00–59");
        }
    };

    // ── Drag (minute hand) ──────────────────────────────────────────
    const startDrag = (e) => {
        if (isAccess) return;
        e.preventDefault();
        isDragging.current = true;
        document.body.style.cursor = "grabbing";
    };

    const onDrag = (e) => {
        if (!isDragging.current || !svgRef.current) return;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const rect = svgRef.current.getBoundingClientRect();
        let angle = Math.atan2(
            clientX - (rect.left + rect.width / 2),
            (rect.top + rect.height / 2) - clientY
        ) * 180 / Math.PI;
        if (angle < 0) angle += 360;
        const newMin = Math.round(angle / 6) % 60;
        let newHrs = time.hours;
        if (time.minutes > 45 && newMin < 15) newHrs = (newHrs + 1) % 12 || 12;
        else if (time.minutes < 15 && newMin > 45) newHrs = (newHrs - 1 + 12) % 12 || 12;
        setTime({ hours: newHrs, minutes: newMin });
        setHourInput(String(newHrs).padStart(2, "0"));
        setMinuteInput(String(newMin).padStart(2, "0"));
    };

    const stopDrag = () => {
        isDragging.current = false;
        document.body.style.cursor = "";
    };

    useEffect(() => {
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("touchmove", onDrag, { passive: false });
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
        return () => {
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("touchmove", onDrag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchend", stopDrag);
        };
    }, [time]);

    const toggleFullscreen = () => {
        const el = document.getElementById("enable-full-screen");
        if (!document.fullscreenElement) el?.requestFullscreen?.();
        else document.exitFullscreen?.();
    };

    // ── Angles ─────────────────────────────────────────────────────
    const hourDeg = (time.hours % 12) * 30 + (time.minutes / 60) * 30;
    const minuteDeg = time.minutes * 6;

    // ── Clock geometry (all in viewBox units, 0–200) ────────────────
    // Numbers: 82% of radius from centre
    const numR = R * 0.76;
    const clockNumbers = Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const angle = (n * 30 - 90) * (Math.PI / 180);
        return { n, x: CX + numR * Math.cos(angle), y: CY + numR * Math.sin(angle) };
    });

    // Ticks
    const ticks = Array.from({ length: 60 }, (_, i) => {
        const isHour = i % 5 === 0;
        const outer = R * 0.97;
        const inner = outer - (isHour ? R * 0.10 : R * 0.05);
        const a = (i * 6 - 90) * (Math.PI / 180);
        return {
            x1: CX + outer * Math.cos(a), y1: CY + outer * Math.sin(a),
            x2: CX + inner * Math.cos(a), y2: CY + inner * Math.sin(a),
            isHour,
        };
    });

    const hourTip = CY - R * 0.55;  // hour hand tip y (unrotated = pointing up)
    const hourTail = CY + R * 0.15;  // hour hand tail y
    const minTip = CY - R * 0.80;  // minute hand tip y
    const minTail = CY + R * 0.18;  // minute hand tail y

   
    const minTipAngle = (minuteDeg - 90) * (Math.PI / 180);
    const minTipX = CX + R * 0.80 * Math.cos(minTipAngle);
    const minTipY = CY + R * 0.80 * Math.sin(minTipAngle);

    // Proportional UI sizes
    const labelFs = Math.max(13, Math.min(22, clockSize * 0.07));
    const labelPy = Math.max(5, Math.min(12, clockSize * 0.03));
    const inputW = Math.max(44, Math.min(72, clockSize * 0.19));
    const inputFs = Math.max(13, Math.min(20, clockSize * 0.06));

    return (
        <div
            ref={wrapperRef}
            id="enable-full-screen"
            style={{
                 height:isLiveClass? "100%":"90vh",
                width: "100%",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "space-between",
                background: "#fce7f3",
                overflow: "hidden",
                padding: "12px 24px",
                boxSizing: "border-box",
                position: "relative",
                gap: 8,
            }}
        >
            {/* Fullscreen */}
            {!isLiveClass && (
                <div style={{ position: "absolute", top: 10, right: 12, zIndex: 10 }}>
                    <img
                        src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png"
                        alt="full-screen" onClick={toggleFullscreen}
                        style={{ width: 28, height: 28, cursor: "pointer" }}
                    />
                </div>
            )}

            {/* ── Label ──────────────────────────────────────────────── */}
            <div style={{
                width: "100%", maxWidth: 440, flexShrink: 0,
                background: error ? "#facaca" : "#fff",
                border: `1px solid ${error ? "red" : "#e5e7eb"}`,
                borderRadius: 8, textAlign: "center", fontWeight: 600,
                color: error ? "#f75e5e" : "#1c1917",
                fontSize: labelFs, padding: `${labelPy}px 12px`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                lineHeight: 1.3, minHeight: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                {error || timeInWords}
            </div>

            {/* ── Clock SVG ──────────────────────────────────────────── */}
            <div style={{
                flex: "1 1 0", minHeight: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%",
            }}>
                <svg
                    ref={svgRef}
                    viewBox="0 0 200 200"
                    width={clockSize}
                    height={clockSize}
                    style={{
                        flexShrink: 0,
                        display: "block",
                        overflow: "visible",          // ring stroke never clipped
                        cursor: isAccess ? "default" : "grab",
                        touchAction: "none",
                        userSelect: "none",
                    }}
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
                >
                    {/* Face */}
                    <circle cx={CX} cy={CY} r={R} fill="#fff9f9" />

                    
                    <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f9a8d4" strokeWidth={6} />

                    {/* Ticks */}
                    {ticks.map((t, i) => (
                        <line key={i}
                            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                            stroke={t.isHour ? "#9ca3af" : "#d1d5db"}
                            strokeWidth={t.isHour ? 1.5 : 0.8}
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Numbers */}
                    {clockNumbers.map(({ n, x, y }) => (
                        <text key={n} x={x} y={y}
                            textAnchor="middle" dominantBaseline="central"
                            fontSize={13}               // viewBox units (200×200), looks right
                            fontWeight="500" fill="#6b7280"
                            fontFamily="DM Sans, sans-serif"
                        >
                            {n}
                        </text>
                    ))}

                    {/* ── HOUR HAND ──────────────────────────────────────── */}
                 
                    <line
                        x1={CX} y1={hourTail}
                        x2={CX} y2={hourTip}
                        stroke="#374151"
                        strokeWidth={5}
                        strokeLinecap="round"
                        transform={`rotate(${hourDeg}, ${CX}, ${CY})`}
                    />

                    {/* ── MINUTE HAND ────────────────────────────────────── */}
                    <line
                        x1={CX} y1={minTail}
                        x2={CX} y2={minTip}
                        stroke="#111827"
                        strokeWidth={3}
                        strokeLinecap="round"
                        transform={`rotate(${minuteDeg}, ${CX}, ${CY})`}
                    />

                    {/* Centre cap — single orange dot, on top of both hands */}
                    <circle cx={CX} cy={CY} r={5} fill="#f97316" />
                    <circle cx={CX} cy={CY} r={2.2} fill="#fff" />

                    {/* Drag hint: animated dot at minute hand tip */}
                    {visible && !isAccess && (
                        <circle cx={minTipX} cy={minTipY} r={4} fill="#f97316" opacity={0.75}>
                            <animate attributeName="r" values="4;6;4" dur="1.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.75;0.3;0.75" dur="1.2s" repeatCount="indefinite" />
                        </circle>
                    )}
                </svg>
            </div>

            {/* ── Inputs ─────────────────────────────────────────────── */}
            <div style={{ flexShrink: 0, display: "flex", justifyContent: "center", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                        type="text" value={hourInput} onChange={handleHourChange}
                        maxLength={2} inputMode="numeric" readOnly={isAccess}
                        style={inp(inputW, inputFs)}
                    />
                    <span style={{ fontSize: inputFs + 4, fontWeight: 700, lineHeight: 1 }}>:</span>
                    <input
                        type="text" value={minuteInput} onChange={handleMinuteChange}
                        maxLength={2} inputMode="numeric" readOnly={isAccess}
                        style={inp(inputW, inputFs)}
                    />
                </div>
            </div>
        </div>
    );
};

const inp = (w, fs) => ({
    width: w, fontSize: fs, fontWeight: 600,
    textAlign: "center", border: "1px solid #d1d5db",
    borderRadius: 6, padding: "6px 4px",
    background: "#fff", outline: "none", boxSizing: "border-box",
});

export default HomeClock;