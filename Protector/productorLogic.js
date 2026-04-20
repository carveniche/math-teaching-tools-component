import { useState, useEffect } from "react";

export const useProtractorLogic = (productorRef, trackAngle) => {
  const [angle, setAngle] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [lastAngle, setLastAngle] = useState(0);
  const store_class = document.getElementsByClassName('all-scroll')

  //   console.log(lastAngle)
  useEffect(() => {
    if (trackAngle !== angle) {
      setAngle(trackAngle);
      setInputValue(trackAngle.toString());
    }
  }, [trackAngle]);
  const handleMove = (e, clientX, clientY) => {
    if (!productorRef.current) return;
    // console.log(clientX, clientY,'move')
    const rect = productorRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom;
    // console.log(centerX, centerY,'centerY')
    const dx = clientX - centerX;
    const dy = centerY - clientY;

    // let angleRad = Math.atan2(dx, dy);
    let angleRad = Math.atan2(dx, dy);
    let angleDeg = angleRad * (180 / Math.PI);
    // console.log(angleRad, angleDeg,'angleDeg')
    // Restrict to 0–180 range
    angleDeg = Math.max(0, Math.min(180, -angleDeg + 90));

    setAngle(Math.round(angleDeg));
    setInputValue(Math.round(angleDeg).toString());
    setLastAngle(angleDeg); // Update lastAngle
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e, e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e, e.touches[0].clientX, e.touches[0].clientY);
  };

  const startDrag = () => {
    setIsDragging(true)
    if (store_class.length > 0) {
      store_class[0].style.cursor = "grabbing";
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
    if (store_class.length > 0) {
      store_class[0].style.cursor = "grab";
    }
    setLastAngle(angle); // Update lastAngle
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchend", stopDrag);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setError("");

    if (value === "") {
      setInputValue("");
      setAngle(0);
      setLastAngle(0);
      return;
    }

    if (!/^\d+$/.test(value)) {
      setError("Only numbers are allowed");
      return;
    }

    if (value.length > 3) {
      setError("Maximum digits 3");
      return;
    }

    const numValue = parseInt(value);
    if (numValue > 180) {
      setError("Maximum value is 180");
      return;
    }

    setInputValue(value);
    setAngle(numValue);
    setLastAngle(numValue);
  };

  const toggleFullscreen = () => {
    const geting_full_screen = document.getElementById("enable-full-screen");

    if (!document.fullscreenElement) {
      if (geting_full_screen) {
        if (geting_full_screen.requestFullscreen) {
          geting_full_screen.requestFullscreen();
        } else if (geting_full_screen.webkitRequestFullscreen) {
          geting_full_screen.webkitRequestFullscreen();
        } else if (geting_full_screen.msRequestFullscreen) {
          geting_full_screen.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return {
    angle,
    inputValue,
    isDragging,
    error,
    handleInputChange,
    startDrag,
    toggleFullscreen,
  };
};