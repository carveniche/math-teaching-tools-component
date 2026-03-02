import React, { useState, useEffect, useRef } from "react";
import "./clock.css";
import { createClockNumbers, timeToWords } from "./Clock";
import styles1 from "./liveClass.module.css";
import styles2 from "./portalClock.module.css";

const Clock = ({ handleDataTrack, prop }) => {

    const {
        isLiveClass = false,
        role_name,
        StudentClockData
    } = prop ?? {};
    const style = isLiveClass ? styles1 : styles2;
    const [time, setTime] = useState({ hours: 12, minutes: 0, seconds: 0 });
    const [hourInput, setHourInput] = useState("12");
    const [minuteInput, setMinuteInput] = useState("00");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(true);

    const clockFaceRef = useRef(null);
    const hourHandRef = useRef(null);
    const minuteHandRef = useRef(null);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        if (clockFaceRef.current) {
            createClockNumbers(clockFaceRef.current);
        }
    }, []);

    useEffect(() => {
        if (role_name === "tutor" && isLiveClass) {
            handleDataTrack({ minute: minuteInput, hour: hourInput })
        }
    }, [minuteInput, hourInput, role_name, isLiveClass]);

    useEffect(() => {
        if (role_name !== "tutor" && StudentClockData, isLiveClass) {
            const { minute, hour } = StudentClockData;
            setMinuteInput(minute);
            setHourInput(hour);
            setTime({ hours: parseInt(hour), minutes: parseInt(minute), seconds: 0 });
        }
    }, [StudentClockData, role_name, isLiveClass]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const hourDegrees =
            (time.hours % 12) * 30 + (time.minutes / 60) * 30;
        const minuteDegrees = time.minutes * 6;

        if (hourHandRef.current) {
            hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`;
        }
        if (minuteHandRef.current) {
            minuteHandRef.current.style.transform = `rotate(${minuteDegrees}deg)`;
        }
    }, [time]);

    const handleHourChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 2);
        setHourInput(value);
        if (value.length > 0) {
            const hours = parseInt(value);
            if (hours >= 1 && hours <= 12) {
                setTime((prev) => ({ ...prev, hours }));
                setError("");
            } else {
                setError("Hours must be 01-12");
            }
        }
    };

    const handleMinuteChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 2);
        setMinuteInput(value);
        if (value.length > 0) {
            const minutes = parseInt(value);
            if (minutes >= 0 && minutes <= 59) {
                setTime((prev) => ({ ...prev, minutes }));
                setError("");
            } else {
                setError("Minutes must be 00-59");
            }
        }
    };

    const startDrag = (e) => {
        e.preventDefault();
        isDraggingRef.current = true;
        document.body.style.cursor = "grabbing";
    };

    const handleDrag = (e) => {
        if (!isDraggingRef.current || !clockFaceRef.current) return;

        const clientX =
            "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY =
            "touches" in e ? e.touches[0].clientY : e.clientY;

        const clockRect =
            clockFaceRef.current.getBoundingClientRect();

        const centerX = clockRect.left + clockRect.width / 2;
        const centerY = clockRect.top + clockRect.height / 2;

        let angle =
            (Math.atan2(clientX - centerX, centerY - clientY) *
                180) /
            Math.PI;

        if (angle < 0) angle += 360;

        const newMinutes = Math.round(angle / 6) % 60;
        let newHours = time.hours;

        if (time.minutes > 45 && newMinutes < 15) {
            newHours = (newHours + 1) % 12 || 12;
        } else if (time.minutes < 15 && newMinutes > 45) {
            newHours = (newHours - 1 + 12) % 12 || 12;
        }

        setTime((prev) => ({
            ...prev,
            hours: newHours,
            minutes: newMinutes,
        }));

        setHourInput(String(newHours).padStart(2, "0"));
        setMinuteInput(String(newMinutes).padStart(2, "0"));
    };

    const stopDrag = () => {
        isDraggingRef.current = false;
        document.body.style.cursor = "";
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("touchmove", handleDrag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);

        return () => {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("touchmove", handleDrag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchend", stopDrag);
        };
    }, [time]);

    const [timeInWords, setTimeInWords] = useState("");

    useEffect(() => {
        setTimeInWords(timeToWords(time.hours, time.minutes));
    }, [time.hours, time.minutes]);



    return (
        <div className=" bg-pink-200 h-[100%] flex flex-col items-center justify-center overflow-hidden">

            <div
                className="w-full max-w-md h-full flex flex-col items-center justify-between px-4 py-4"
                id="enable-full-screen"
            >
                <h2
                    className="text-center bg-white p-[10px] rounded-md shadow-2xl font-semibold text-lg sm:text-xl md:text-2xl mb-3"
                    style={
                        error
                            ? {
                                border: "1px solid red",
                                background: "#facaca",
                                color: "#f75e5e",
                            }
                            : undefined
                    }
                >
                    {error ? error : timeInWords}
                </h2>

                {/* Clock Section */}
                <div className="w-full flex-1 flex items-center justify-center min-h-0">

                    <div
                        ref={clockFaceRef}
                        className="relative w-full max-w-[350px] aspect-square max-h-[55vh] sm:max-h-[60vh] md:max-h-[65vh]"
                    >
                        <div className="clock-face w-full h-full relative rounded-full">

                            <div className="center-circle"></div>

                            {/* Hour Hand */}
                            <div className="hand hour-hand " ref={hourHandRef}>
                                <img
                                    src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/Hour.svg"
                                    alt="Hour Hand"
                                    className="hand-image "
                                    style={{
                                        transform: 'scaleY(-1)',
                                        top: 167,
                                        left: -8,
                                        // zIndex:"1000"
                                    }}
                                />
                            </div>

                            {/* Minute Hand */}
                            <div
                                className={`hand minute-hand ${visible ? "hovering" : ""
                                    }`}
                                ref={minuteHandRef}
                                onMouseDown={startDrag}
                                onTouchStart={startDrag}
                            >
                                <img
                                    src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/Minute.svg"
                                    alt="Minute Hand"
                                    className="hand-image"
                                />
                            </div>
                            {visible && (
                                <p className="drag-me"><img src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/drag.png" alt="Drag indicator" /></p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Input Section */}
                <div className="w-full mt-4 shrink-0">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="border px-3 py-2 rounded text-center w-16"
                                value={hourInput}
                                onChange={handleHourChange}
                                maxLength={2}
                                inputMode="numeric"
                            />
                            <span className="text-xl font-semibold">:</span>
                            <input
                                type="text"
                                className="border px-3 py-2 rounded text-center w-16"
                                value={minuteInput}
                                onChange={handleMinuteChange}
                                maxLength={2}
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Clock;
