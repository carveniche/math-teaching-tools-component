import React, { useState, useRef, useEffect } from "react";
import ggbAddition from "./GggbAddition.module.css";
import GggbTableSectorContainer from "./GggbTableSectorContainer";

function GggBAdditionDoubleDigit({ handleDataTrack = () => { }, props, clearDatafromRedux = () => { } }) {
  const { isLiveClass, role_name, Data } = props ?? {};

  const isLiveClassStudent = role_name !== "tutor" ? true : false;
  const resetCurrentValue = useRef(0)
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [addSlider, setAddSlider] = useState(0);
  const [regroupSlider, setRegroupSlider] = useState(0);
  const [hundredSlider, setHundredSlider] = useState(0);
  const [restNum, setRestNum] = useState(0)

  // ── refs for dynamic height ──
  const innerRowRef = useRef(null);
  const rightPanelRef = useRef(null);

  // keeps right panel height = inner row height on every resize
  useEffect(() => {
    const updateHeight = () => {
      if (innerRowRef.current && rightPanelRef.current) {
        rightPanelRef.current.style.height =
          (innerRowRef.current.clientHeight - 0) + "px";
      }
    };
    updateHeight();                          // run once on mount
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const firstDigitNumber = parseInt(firstNumber) || 0;
  const tens = Math.floor(firstDigitNumber / 10);
  const ones = firstDigitNumber % 10;
  const secondDigitNumber = parseInt(secondNumber) || 0;
  const secondTens = Math.floor(secondDigitNumber / 10);
  const secondOnes = secondDigitNumber % 10;
  const addedTens = tens + secondTens;
  const addedOnes = ones + secondOnes;
  const regroupedTens = addedTens + Math.floor(addedOnes / 10);
  const regroupedOnes = addedOnes % 10;
  const regroupedHundreds = Math.floor(regroupedTens / 10);
  const finalTens = regroupedTens % 10;
  const finalOnes = regroupedOnes;
  const showSliders = firstDigitNumber > 0 && secondDigitNumber > 0;


  const handleReset = () => {
    setFirstNumber("0");
    setSecondNumber("0");
    setAddSlider(0);
    setRegroupSlider(0);
    setHundredSlider(0);
  }


  const dataTrackFunction = (value, isFrom) => {
    if (!isLiveClass) return;
    if (role_name !== "tutor") return;

    let updatedValue = value;

    if (isFrom === "reset") {
      updatedValue = restNum + 1;
      setRestNum(updatedValue);
    }

    handleDataTrack({
      isFrom,
      data: {
        value: updatedValue,
      },
    });
  };

  useEffect(() => {
    if (Data === undefined) return;
    if (!isLiveClassStudent) return;
    if (Data?.secondNumber?.value !== undefined) {
      const value = Data?.secondNumber?.value
      setSecondNumber(value)
    }
    if (Data?.firstNumber?.value !== undefined) {
      const value = Data?.firstNumber?.value
      setFirstNumber(value)
    }
    if (Data?.hundredSlider?.value !== undefined) {
      const value = Data?.hundredSlider?.value
      setHundredSlider(value)
    }

    if (Data?.regroupSlider?.value !== undefined) {
      const value = Data?.regroupSlider?.value
      setRegroupSlider(value)
    }

    if (Data?.addSlider?.value !== undefined) {
      const value = Data?.addSlider?.value
      setAddSlider(value)
    }
    if (
      Data?.reset?.value !== undefined &&
      resetCurrentValue.current !== Data?.reset?.value
    ) {
      resetCurrentValue.current = Data?.reset?.value;

      handleReset();
      clearDatafromRedux();
    }

  }, [Data])



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        // height: "100%",
        height: "calc(100vh - 180px)",      /* 60px = your footer height */
        minHeight: "calc(100vh - 180px)",
        padding: "0.75rem",
        gap: "1rem",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundImage:
          "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        // minWidth: "52rem",
      }}
    >
      {/* WHITE CARD */}
      <div
        style={{
          width: "95%",
          height: "100%",
          background: "white",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "stretch",
          padding: "0.75rem",
          borderRadius: "10px",
          gap: "0.75rem",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* INNER ROW — attach ref here to measure available height */}
        <div
          ref={innerRowRef}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: "0.75rem",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* LEFT — table area */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <GggbTableSectorContainer
              tens={tens}
              ones={ones}
              secondTens={secondTens}
              secondOnes={secondOnes}
              showAdded={addSlider > 0}
              showRegrouped={regroupSlider > 0}
              showHundredRegrouped={hundredSlider > 0}
              addedTens={addedTens}
              addedOnes={addedOnes}
              regroupedTens={regroupedTens}
              regroupedOnes={regroupedOnes}
              finalHundreds={regroupedHundreds}
              finalTens={finalTens}
              finalOnes={finalOnes}
            />
          </div>

          {/* RIGHT — settings panel, height set dynamically via ref */}
          <div
            ref={rightPanelRef}
            style={{
              width: "clamp(150px, 20vw, 230px)",
              /* height is set by useEffect dynamically */
              flexShrink: 0,
              overflowY: "auto",
              overflowX: "hidden",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0.5rem",
              borderRadius: "10px",
              background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
            }}
          >
            {/* Number inputs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                padding: "0.5rem",
                borderRadius: "10px",
                flexShrink: 0,
              }}
            >
              {/* First number */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0 }}>
                <label style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)", color: "white", fontWeight: 600, lineHeight: 1.2 }}>
                  Enter Two Digit Numbers
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={firstNumber}
                  disabled={isLiveClass ? isLiveClassStudent : false}
                  style={{
                    width: "clamp(48px, 5vw, 70px)",
                    height: "clamp(36px, 5vh, 54px)",
                    fontSize: "clamp(1rem, 2vw, 1.8rem)",
                    border: "2px solid #9ca3af",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background: "white",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 2) {
                      if (isLiveClass) {
                        dataTrackFunction(value, "firstNumber");
                      }
                      setFirstNumber(value)
                    };
                  }}
                />
              </div>

              {/* Second number */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flexShrink: 0 }}>
                <label style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)", color: "white", fontWeight: 600, lineHeight: 1.2 }}>
                  Enter Two Digit Numbers
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={secondNumber}
                  disabled={isLiveClass ? isLiveClassStudent : false}
                  style={{
                    width: "clamp(48px, 5vw, 70px)",
                    height: "clamp(36px, 5vh, 54px)",
                    fontSize: "clamp(1rem, 2vw, 1.8rem)",
                    border: "2px solid #9ca3af",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background: "white",
                    boxSizing: "border-box",
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 2) {
                      if (isLiveClass) {
                        dataTrackFunction(value, "secondNumber");
                      }
                      setSecondNumber(value)
                    };
                  }}
                />
              </div>
            </div>

            {/* Reset button */}
            <div style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem", flexShrink: 0 }}>
              <button
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "25px",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                  padding: "clamp(0.35rem, 1vh, 0.6rem) clamp(0.5rem, 1vw, 1rem)",
                  fontSize: "clamp(0.65rem, 1.1vw, 0.9rem)",
                  transition: "all 0.3s ease",
                }}
                disabled={isLiveClass ? isLiveClassStudent : false}
                onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onClick={() => {
                  if (isLiveClass) {
                    dataTrackFunction(0, "reset");
                  }
                  handleReset()

                }}
              >
                Reset
              </button>
            </div>

            {/* Sliders */}
            {showSliders && (
              <div
                style={{
                  backgroundColor: "azure",
                  borderRadius: "10px",
                  padding: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  flexShrink: 0,
                }}
              >
                {/* Add Numbers */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0.25rem" }}>
                  <label className={ggbAddition.toggleLabel}>
                    <span style={{ fontSize: "clamp(0.62rem, 1.1vw, 0.85rem)" }}>Add Numbers</span>
                    <input
                      type="checkbox"
                      checked={addSlider === 1}
                      disabled={isLiveClass ? isLiveClassStudent : false}
                      onChange={(e) => {
                        if (isLiveClass) {
                          const value = e.target.checked ? 1 : 0
                          dataTrackFunction(value, "addSlider");
                        }
                        setAddSlider(e.target.checked ? 1 : 0)
                      }}
                    />
                    <span className={ggbAddition.slider}></span>
                  </label>
                </div>

                {/* Regroup Ones */}
                {addSlider > 0 && addedOnes >= 10 && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0.25rem" }}>
                    <label className={ggbAddition.toggleLabel}>
                      <span style={{ fontSize: "clamp(0.62rem, 1.1vw, 0.85rem)" }}>Regroup Ones</span>
                      <input
                        type="checkbox"
                        checked={regroupSlider === 1}
                        disabled={isLiveClass ? isLiveClassStudent : false}
                        onChange={(e) => {
                          if (isLiveClass) {
                            const value = e.target.checked ? 1 : 0
                            dataTrackFunction(value, "regroupSlider");
                          }
                          setRegroupSlider(e.target.checked ? 1 : 0)
                        }}
                      />
                      <span className={ggbAddition.slider}></span>
                    </label>
                  </div>
                )}

                {/* Regroup Tens */}
                {addSlider > 0 &&
                  ((addedOnes >= 10 && regroupSlider > 0 && regroupedTens >= 10) ||
                    (addedOnes < 10 && addedTens >= 10)) && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0.25rem" }}>
                      <label className={ggbAddition.toggleLabel}>
                        <span style={{ fontSize: "clamp(0.62rem, 1.1vw, 0.85rem)" }}>Regroup Tens</span>
                        <input
                          type="checkbox"
                          checked={hundredSlider === 1}
                          disabled={isLiveClass ? isLiveClassStudent : false}
                          onChange={(e) => {
                            if (isLiveClass) {
                              const value = e.target.checked ? 1 : 0
                              dataTrackFunction(value, "hundredSlider");
                            }
                            setHundredSlider(e.target.checked ? 1 : 0)
                          }}
                        />
                        <span className={ggbAddition.slider}></span>
                      </label>
                    </div>
                  )}
              </div>
            )}
          </div>
          {/* END RIGHT PANEL */}

        </div>
      </div>
    </div>
  );
}

export default GggBAdditionDoubleDigit;