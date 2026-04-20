import { useEffect, useState } from "react";
import "./InfoLabel.css";

function CommonInfo({ isVisible, label }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Delay class assignment to next paint to avoid jump
      requestAnimationFrame(() => {
        setAnimationClass("slide-up");
      });
    } else {
      setAnimationClass("slide-down");
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setAnimationClass("");
      }, 300); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`info-label ${animationClass}`}>
      {label}
    </div>
  );
}

export default CommonInfo;
