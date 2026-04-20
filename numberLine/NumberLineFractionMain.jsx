import React, { useState, useMemo, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonButton from "../Triangles/AllTriangles/CommonComponent/CommonButton";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const CLICK_SOUND_URL =
  "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/clickbtN.wav";

const ARROW_RIGHT_URL =
  "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/rightArrow.png";

const ARROW_LEFT_URL =
  "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/leftArrow.png";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const playClickSound = () => {
  const clickSound = new Audio(CLICK_SOUND_URL);
  clickSound.play();
};

const convertToMixedFractions = (arr = []) => {
  return arr
    .map((f) => {
      const trimmed = String(f).trim();

      if (!trimmed.includes("/")) return trimmed;

      const [numerator, denominator] = trimmed.split("/").map(Number);

      if (numerator >= denominator) {
        const whole = Math.floor(numerator / denominator);
        const remainder = numerator % denominator;
        return remainder === 0
          ? `${whole}`
          : `${whole} ${remainder}/${denominator}`;
      }

      return `${numerator}/${denominator}`;
    })
    .map((val) => (val.startsWith("0 ") ? val.replace("0 ", "") : val));
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Renders a single tick marker on the number line */
const TickMarker = () => (
  <div
    style={{
      width: "3px",
      height: "5px",
      borderRadius: "0.375rem",
      display: "flex",
      justifyContent: "center",
      marginTop: "-5px",
      backgroundColor: "rgb(220, 38, 38)",
      // transform: "scale(1.1)",
    }}
  >
    ⬇
  </div>
);

/** Renders a proper fraction (numerator / denominator) stacked vertically */
const StackedFraction = ({ numerator, denominator, lineColor = "#8B4513" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      lineHeight: "1.1",
    }}
  >
    <span>{numerator}</span>
    <div
      style={{
        height: "1px",
        width: "1rem",
        backgroundColor: lineColor,
        margin: "0.125rem 0",
      }}
    />
    <span>{denominator}</span>
  </div>
);

/** Renders a single point label — either a whole number or a fraction */
const FractionPoint = ({ num, showLabel, isFirst, isLast }) => {
  const isFraction = String(num).includes("/");
  const [numerator, denominator] = isFraction ? String(num).split("/") : [];

  const isVisible = isFirst || isLast || showLabel;
  const minWidth = window.innerWidth >= 640 ? "20px" : "16px";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        minWidth,
      }}
    >
      <TickMarker />

      <div
        className="tab-text"
        style={{
          fontSize: "1rem",
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {isFraction ? (
          <StackedFraction numerator={numerator} denominator={denominator} />
        ) : (
          num
        )}
      </div>
    </div>
  );
};

/** Renders a single mixed fraction point on the number line */
const MixedFractionPoint = ({ item }) => {
  let whole = "",
    numerator = "",
    denominator = "";

  if (item.includes(" ")) {
    const [w, frac] = item.split(" ");
    whole = w;
    [numerator, denominator] = frac.split("/");
  } else if (item.includes("/")) {
    [numerator, denominator] = item.split("/");
  } else {
    whole = item;
  }

  const minWidth = window.innerWidth >= 640 ? "20px" : "16px";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.7rem",
        minWidth,
      }}
    >
      <TickMarker />

      <div style={{ display: "flex", alignItems: "center" }}>
        {whole && <span className="tab-text">{whole}</span>}

        {numerator && denominator && (
          <StackedFraction
            numerator={numerator}
            denominator={denominator}
            lineColor="black"
          />
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Exported Sub-component
// ─────────────────────────────────────────────

/** Renders all mixed fraction labels across the number line */
export function ShowingFractionDivisor({ data }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {data.map((item, index) => (
        <MixedFractionPoint key={index} item={item} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

function NumberLineFractionMain({ getDivisor, isMaximize, getIntegerEnd, props, handleDataTrack }) {
  const { isLiveClass, role_name, Data } = props ?? {};
  const [showLabel, setShowLabel] = useState(true);
  const [showMixedFraction, setShowMixedFraction] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState({
    isFraction: false,
    isMixed: false,
  });

  useEffect(() => {
    if (isLiveClass && role_name === "tutor") {
      handleDataTrack(
        {
          isFrom: "isActiveButton",
          data: isActiveButton,
        }
      )
    }
  }, [isLiveClass, role_name, isActiveButton])


  useEffect(() => {
    if (isLiveClass && role_name !== "tutor") {
      const v = Data?.isActiveButton?.isMixed || false;
      setShowMixedFraction((prev) => !prev);
      setIsActiveButton((prev) => ({ ...prev, isMixed: v }));
    }


  }, [Data?.isActiveButton?.isMixed, isLiveClass, role_name,])

  const theme = useTheme();
  const isTab = useMediaQuery(theme.breakpoints.down("md"));

  const mixedFractions = useMemo(
    () => convertToMixedFractions(getDivisor),
    [getDivisor]
  );

  const handleToggleMixedFraction = () => {
    playClickSound();
    setShowMixedFraction((prev) => !prev);
    setIsActiveButton((prev) => ({ ...prev, isMixed: !prev.isMixed }));
  };

  return (
    <div
      style={{
        width: "100%",
        // height: "100%",
        // marginTop: "5%",
        padding: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "3rem",
        background: "white",
        borderRadius: "10px",
        paddingRight: "0.5rem",
        paddingLeft: "0.5rem",

      }}
    >
      {/* Number Line */}
      <div
        style={{
          position: "relative",
          width: "100%",
          backdropFilter: "blur(4px)",
          borderRadius: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Direction Arrows */}
          <img
            src={ARROW_RIGHT_URL}
            alt=""
            style={{ position: "absolute", right: 0, top: "0.1rem" }}
          />
          <img
            src={ARROW_LEFT_URL}
            alt=""
            style={{ position: "absolute", left: 0, top: "0.1rem" }}
          />

          {/* Horizontal Line */}
          <div
            style={{
              width: "100%",
              borderBottom: "6px solid rgb(220, 38, 38)",
              height: "1rem",
              position: "relative",
            }}
          />

          {/* Tick Points */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "95%",
            }}
          >
            {showMixedFraction ? (
              <ShowingFractionDivisor data={mixedFractions} />
            ) : (
              getDivisor.map((num, index) => (
                <FractionPoint
                  key={index}
                  num={num}
                  showLabel={showLabel}
                  isFirst={index === 0}
                  isLast={index === getDivisor.length - 1}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ width: "90%", paddingTop: "10px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "-1.5rem",
          }}
        >
          <CommonButton
            value="Show Mixed Fractions"
            isActiveButton={isActiveButton.isMixed}
            onClick={handleToggleMixedFraction}
            data={{
              isLiveClass: isLiveClass,
              role_name: role_name
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NumberLineFractionMain;