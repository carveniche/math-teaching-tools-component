import React, { useState } from "react";
import ggbAddition from "./GggbAddition.module.css";
import GggbTableSectorContainer from "./GggbTableSectorContainer";
function GggBAdditionDoubleDigit() {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState("0");
  const [addSlider, setAddSlider] = useState(0);
  const [regroupSlider, setRegroupSlider] = useState(0);
  const [hundredSlider, setHundredSlider] = useState(0);

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

  return (
    <div className={ggbAddition.mainParentContainerForMeasurement}>
      <div className={ggbAddition.subMainContentContainerForMeasurement}>
        <div className={ggbAddition.mainToolContainerForSplit}>
          {/* left table box */}
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

          {/* right setting box */}
          <div className={ggbAddition.rightSideTableContainer}>
            {/* input container */}
            <div className={ggbAddition.inputSectionContainer}>
              <div className={ggbAddition.firstInputBoxContainer}>
                <label>Enter Two Digit Numbers</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={firstNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                    if (value.length <= 2) {
                      setFirstNumber(value);
                    }
                  }}
                />
              </div>
              <div className={ggbAddition.secondInputBoxContainer}>
                <label>Enter Two Digit Numbers</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={secondNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 2) {
                      setSecondNumber(value);
                    }
                  }}
                />
              </div>
            </div>
            {/* reset button */}
  <div className={ggbAddition.resetWrapper}>
  <button
    className={ggbAddition.resetButton}
    onClick={() => {
      setFirstNumber("0");
      setSecondNumber("0");
      setAddSlider(0);
      setRegroupSlider(0);
      setHundredSlider(0);
    }}
  >
     Reset
  </button>
</div>

            {/* slider */}
            {/* SLIDERS */}
            {showSliders && (
              <div className={ggbAddition.inputSectionContainerForCheckBoxes}>
                {/* Slide to Add */}
                <div className={ggbAddition.firstInputBoxContainerForCheckBox}>
                  <label className={ggbAddition.toggleLabel}><span>Add Numbers</span>
                  <input
                    type="checkbox"
                    checked={addSlider === 1}
                    onChange={(e) => setAddSlider(e.target.checked ? 1 : 0)}
                  />
                  <span className={ggbAddition.slider}></span>
                  </label>
                </div>

                {/* ✅ CASE 1: Show Regroup Ones ONLY if ones >= 10 */}
             <div
  className={ggbAddition.secondInputBoxContainerForCheckBox}
  style={{
    visibility:
      addSlider > 0 && addedOnes >= 10 ? "visible" : "hidden",
    display:
      addSlider > 0 && addedOnes >= 10 ? "block" : "none",
  }}
>
  <label className={ggbAddition.toggleLabel}>
    <span>Regroup Ones</span>
    <input
      type="checkbox"
      checked={regroupSlider === 1}
      onChange={(e) => setRegroupSlider(e.target.checked ? 1 : 0)}
    />
    <span className={ggbAddition.slider}></span>
  </label>
</div>


                {/* ✅ CASE 2A: After regroup ones → check tens >= 10 */}
             <div
  className={ggbAddition.secondInputBoxContainerForCheckBox}
  style={{
    visibility:
      addSlider > 0 &&
      ((addedOnes >= 10 &&
        regroupSlider > 0 &&
        regroupedTens >= 10) ||
        (addedOnes < 10 && addedTens >= 10))
        ? "visible"
        : "hidden",
    display:
      addSlider > 0 &&
      ((addedOnes >= 10 &&
        regroupSlider > 0 &&
        regroupedTens >= 10) ||
        (addedOnes < 10 && addedTens >= 10))
        ? "block"
        : "none",
  }}
>
  <label className={ggbAddition.toggleLabel}>
    <span>Regroup Tens</span>
    <input
      type="checkbox"
      checked={hundredSlider === 1}
      onChange={(e) => setHundredSlider(e.target.checked ? 1 : 0)}
    />
    <span className={ggbAddition.slider}></span>
  </label>
</div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GggBAdditionDoubleDigit;
