import React, { useEffect, useRef, useState } from "react";
import "./ggbSubtractTwoDigit.css";
function GgbSubtractTwoDigitNumber({ handleDataTrack, props, clearDatafromRedux }) {
  const { isLiveClass, role_name, Data } = props ?? {};
  const isLiveClassTeacher = isLiveClass && role_name === "tutor"
  const isLiveClassStudent = isLiveClass && role_name !== "tutor"
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [number, setNumber] = useState("");
  const [sliderValue, setSliderValue] = useState(0); // main slider
  const [transferValue, setTransferValue] = useState(0); // borrowing slider
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const resetCurrentValue = useRef(0)

  const handleChange1 = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (/^\d{0,2}$/.test(value)) {
      setInputValue1(value);
      if (isLiveClassTeacher) {
        handleDataTrack({
          isFrom: "InputValue1",
          data: {
            value
          }
        })
      }

    }
  };
  useEffect(() => {
    if (inputValue1 !== "" && inputValue2 !== "") {
      const num1 = parseInt(inputValue1, 10);
      const num2 = parseInt(inputValue2, 10);
      setResult(num1 - num2);
    } else {
      setResult("");
    }
  }, [inputValue1, inputValue2]);
  const handleReset = () => {
    setInputValue1("");
    setInputValue2("");
    setNumber("");
    setSliderValue(0);
    setTransferValue(0);
    setAnswer(null);
  };

  useEffect(() => {
    const num1 = parseInt(inputValue1 || "0", 10);
    const num2 = parseInt(inputValue2 || "0", 10);

    if (inputValue1 && inputValue2) {
      if (num2 > num1) {
        setError("Subtraction number cannot be greater than the first number.");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  }, [inputValue1, inputValue2]);

  const handleChange2 = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {

      setInputValue2(value);
      if (isLiveClassTeacher) {
        handleDataTrack({
          isFrom: "InputValue2",
          data: {
            value
          }
        })
      }
    }
  };



  useEffect(() => {
    const isLiveClassStudent = isLiveClass && role_name !== "tutor";
    if (!isLiveClassStudent) return;

    if (Data?.InputValue1?.value !== undefined) {
      setInputValue1(Data.InputValue1.value);
    }

    if (Data?.InputValue2?.value !== undefined) {
      setInputValue2(Data.InputValue2.value);
    }

    if (Data?.transferValue?.value !== undefined) {
      setTransferValue(Data?.transferValue?.value);
    }

    if (Data?.SliderValue?.value !== undefined) {
      setSliderValue(Data?.SliderValue?.value);
    }




  }, [Data, isLiveClass, role_name]);

  useEffect(() => {
    const isLiveClassStudent = isLiveClass && role_name !== "tutor";
    if (!isLiveClassStudent) return;
    if (
      Data?.restButton?.value !== undefined &&
      resetCurrentValue.current !== Data?.restButton?.value
    ) {
      resetCurrentValue.current = Data?.restButton?.value;

      handleReset();
      clearDatafromRedux();
    }
  }, [Data, isLiveClass, role_name, Data?.restButton?.value])




  const cellStyle = {
    border: "0.2rem solid #ff8c42", // rope brown color
    textAlign: "center",
    width: "30px",
    // padding: "2px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: "0.3s ease",
  };


  const highlightedStyle = {
    ...cellStyle,
    background: `
    radial-gradient(circle at 75% 25%, transparent 25%),
    radial-gradient(circle at 30% 80%,  transparent 20%),
    linear-gradient(145deg, #008cff, blue 60%, blue)
  `,

    color: "#fff",

    transition: "all 0.3s ease"
  };
  const highlightedStyle2 = {
    ...cellStyle,


    background: `
    radial-gradient(circle at 75% 25%, transparent 25%),
    radial-gradient(circle at 30% 80%,  transparent 20%),
    linear-gradient(145deg, #ffd000, yellow 60%, yellow)
  `,
    color: "#fff",

    transition: "all 0.3s ease"
  };
  const num1 = parseInt(inputValue1 || "0");
  const num2 = parseInt(inputValue2 || "0");

  const tens1 = Math.floor(num1 / 10);
  const tens2 = Math.floor(num2 / 10);

  const ones1 = num1 % 10;
  const ones2 = num2 % 10;

  const needsBorrowing = ones2 > ones1;
  const onesResult = needsBorrowing ? ones1 + 10 - ones2 : ones1 - ones2;
  const tensResult = needsBorrowing ? tens1 - 1 - tens2 : tens1 - tens2;
  const dynamicTensRemaining =
    sliderValue === 0
      ? tens1 - (transferValue === 1 && needsBorrowing ? 1 : 0)
      : Math.max(
        tensResult + (transferValue === 1 && needsBorrowing ? 0 : 0),
        0,
      );
  // 🔢 COUNT BASED ON COLOR LOGIC

  let tensColoredCount = 0;
  let onesColoredCount = 0;
  let borrowedCount = 0;

  if (needsBorrowing && transferValue === 1 && sliderValue === 0) {
    borrowedCount = 10;
  }

  // ----- Count Tens -----
  [...Array(10)].forEach((_, idx) => {
    let highlight = false;

    const duplicateTensFilled = Math.round(tens2 * (sliderValue / 10));
    const answerTens = tensResult;

    if (!needsBorrowing && sliderValue === 10) {
      let start = duplicateTensFilled;
      highlight = idx >= start && idx < start + answerTens;
    } else {
      highlight = idx < dynamicTensRemaining;
    }

    if (highlight) tensColoredCount++;
  });

  // ----- Count Ones -----
  [...Array(10)].forEach((_, idx) => {
    let highlight = false;
    let borrowedCount = 0;
    const duplicateFilled = Math.round(ones2 * (sliderValue / 10));

    if (needsBorrowing && transferValue === 1 && sliderValue === 10) {
      highlight = idx >= 10 - onesResult;
    } else if (needsBorrowing && transferValue === 1 && sliderValue === 0) {
      if (needsBorrowing && transferValue === 1 && sliderValue === 0) {
        borrowedCount = 10; // because all 10 are yellow
      }
      highlight = idx >= 10 - ones1;
    } else if (needsBorrowing && transferValue === 1) {
      const remaining = ones1 + 10 - duplicateFilled;
      const visibleRemaining = Math.min(remaining, 10);
      highlight = idx >= 10 - visibleRemaining;
    } else {
      if (!needsBorrowing && sliderValue === 10) {
        const startFromBottom = duplicateFilled;
        const endFromBottom = startFromBottom + onesResult;

        highlight = idx <= 9 - startFromBottom && idx > 9 - endFromBottom;
      } else {
        highlight = idx >= 10 - (ones1 - duplicateFilled);
      }
    }

    if (highlight) onesColoredCount++;
  });
  // 🔵 DUPLICATE TABLE COUNTS
  let duplicateTensCount = 0;
  let duplicateOnesCount = 0;

  // Duplicate Tens
  [...Array(10)].forEach((_, idx) => {
    const highlight = idx < Math.round(tens2 * (sliderValue / 10));

    if (highlight) duplicateTensCount++;
  });

  // Duplicate Ones
  [...Array(10)].forEach((_, idx) => {
    let highlight = false;

    if (needsBorrowing && transferValue === 1 && sliderValue === 10) {
      const visualNumber = 10 - idx;
      let start = onesResult + 1;
      if (start === 11) start = 1;

      let distance = visualNumber - start;
      if (distance < 0) distance += 10;

      highlight = distance < ones2;
    } else {
      highlight = idx >= 10 - Math.round(ones2 * (sliderValue / 10));
    }

    if (highlight) duplicateOnesCount++;
  });
  const answerTens = tensResult;

  const remainingTens =
    sliderValue === 10
      ? tensResult
      : tens1 - (needsBorrowing && transferValue === 1 ? 1 : 0)
      - Math.round(tens2 * (sliderValue / 10));
  const duplicateTens = Math.round(tens2 * (sliderValue / 10));
  const remainingOnes =
    sliderValue === 10
      ? onesResult
      : ones1 - Math.round(ones2 * (sliderValue / 10));
  const duplicateOnes =
    Math.round(ones2 * (sliderValue / 10));

  const dataTrackSlider = (value) => {
    if (!isLiveClassTeacher) return;

    if (isLiveClassTeacher) {
      handleDataTrack({
        isFrom: "SliderValue",
        data: {
          value
        }
      })
    }

  }

  const dataTrackTransferValue = () => {
    if (!isLiveClassTeacher) return;

    if (isLiveClassTeacher) {
      handleDataTrack({
        isFrom: "transferValue",
        data: {
          value: 1
        }
      })
    }
  }
  const [resetnumer, setRestNumber] = useState(0)
  const dataTrackReset = () => {
    if (!isLiveClassTeacher) return;

    if (isLiveClassTeacher) {
      handleDataTrack({
        isFrom: "restButton",
        data: {
          value: (resetnumer + 1)
        }
      })
      setRestNumber(resetnumer + 1)
      console.log(resetnumer, "resetnumerresetnumer")
    }
  }



  const isLiveClassButtonRes = isLiveClass ? role_name === "tutor" : false


  return (



    <div
      className="w-full bg-white flex flex-row-reverse justify-between items-start p-4 pt-4 rounded-[10px] gap-8 h-[100%] relative"
    >
      {result && (

        <div
          className=" hidden lg:flex  m-2 px-3 py-2 rounded-lg font-semibold text-white  gap-2 justify-center items-center absolute top-2 left-1/2 w-fit z-20 -translate-x-1/2 transition-all duration-500 ease-in-out border-b-2 hover:-translate-y-px hover:border-b-4 active:border-b active:translate-y-0"
          style={{
            background: "linear-gradient(#1f5afe, #0f4cf5)",
            boxShadow: "inset 0pt 4pt 3pt -2pt #386fff, 0pt 4pt 5pt -3pt #0009",
            borderBottomColor: "#083acd",
          }}
        >
          {/* .btn-txt */}
          <span>Result : </span>

          <span
            className="mx-1 px-2 py-0.5 rounded"
            style={{
              backgroundColor: "#3e6eff",
              boxShadow:
                "inset 0pt -3pt 3pt -2pt #1f54f0, inset 0pt 3pt 3pt -2pt #658dff, 0pt 2pt 2pt -2pt #0005, 0pt 0pt 0pt 2pt #0d47f0",
            }}
          >
            {result}
          </span>
        </div>
      )}

      {error && (

        <div
          className="mt-2.5 px-[15px] py-2.5 bg-[#ffe6e6] text-[#d8000c] border border-[#ff4d4f] rounded-md font-semibold text-sm shadow-[0_2px_6px_rgba(0,0,0,0.1)] animate-[fadeIn_0.3s_ease-in-out] absolute z-20 left-[42%]"
        >
          ⚠ {error}
        </div>
      )}


      <div className="w-[257px] lg:w-[33%] overflow-y-scroll overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-full relative bg-[#FFC107] rounded-[10px] p-5">
        <div className="flex flex-col gap-5 justify-start items-start h-full">

          {result && (<div
            className=" flex lg:hidden  m-2 px-3 py-2 rounded-lg font-semibold text-white  gap-2 justify-center items-center  w-fit  transition-all duration-500 ease-in-out border-b-2 hover:-translate-y-px hover:border-b-4 active:border-b active:translate-y-0"
            style={{
              background: "linear-gradient(#1f5afe, #0f4cf5)",
              boxShadow: "inset 0pt 4pt 3pt -2pt #386fff, 0pt 4pt 5pt -3pt #0009",
              borderBottomColor: "#083acd",
            }}
          >
            Result:   {result}
          </div>)}


          <div className="flex  justify-center  w-full items-center gap-[10px]">

            <div
              className="inline-flex justify-center items-center font-bold text-white px-[18px] py-2 rounded-[5px] text-center"
              style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
            >
              Enter 2-digit number
            </div>

            <input
              type="text"
              value={inputValue1}
              disabled={isLiveClass ? isLiveClassStudent : false}
              onChange={handleChange1}
              placeholder="0"
              maxLength={2}
              inputMode="numeric"
              className="p-[5px] w-[70px] h-[60px] text-[30px] text-center font-bold border-[3px] border-[#ff8c42] rounded-xl outline-none shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out"
              style={{ background: "linear-gradient(135deg, #fff6d6, #ffe8a3)" }}
            />
          </div>

          {inputValue1.length > 0 && (
            <div className="flex  justify-center items-center w-full gap-[10px]">

              <div
                className="inline-flex justify-center items-center font-bold text-white px-[18px] py-2 rounded-[5px] text-center"
                style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
              >
                Enter number to subtract
              </div>

              <input
                type="text"
                value={inputValue2}
                disabled={isLiveClass ? isLiveClassStudent : false}
                onChange={handleChange2}
                placeholder="0"
                className="p-[5px] w-[70px] h-[60px] text-[30px] text-center font-bold border-[3px] border-[#ff8c42] rounded-xl outline-none shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out"
                style={{ background: "linear-gradient(135deg, #fff6d6, #ffe8a3)" }}
              />
            </div>
          )}

          <div></div>
          {isLiveClassButtonRes && (<div className="flex flex-row gap-4">

            <button
              onClick={() => {

                handleReset()
                if (isLiveClass) {
                  dataTrackReset()
                }

              }}
              className="px-5 py-2.5 text-base cursor-pointer bg-green-600 border-none rounded-[5px] text-white font-semibold relative -mt-8 transition-all duration-200 ease-in-out hover:bg-[#083acd] hover:text-white hover:-translate-y-px"
            >
              Reset
            </button>
          </div>)}


          {needsBorrowing && (
            <div className="mb-5 w-[300px] lg:w-full">

              <div className={`flex gap-[25px] `}>

                <label className="flex items-center gap-2 cursor-pointer text-base font-bold text-white">

                  <input
                    type="radio"
                    name="borrow"
                    value="1"
                    checked={transferValue === 1}
                    disabled={isLiveClass ? isLiveClassStudent : false}
                    onChange={() => {
                      if (isLiveClassStudent) {
                        return;
                      }

                      if (isLiveClassTeacher) {
                        dataTrackTransferValue()
                      }
                      setTransferValue(1)
                    }}
                    className="hidden"
                  />

                  <span
                    className="w-[22px] h-[22px] rounded-full border-[3px] border-[#4d96ff] relative transition-all duration-300 ease-in-out group-hover:scale-110
                      [input:checked+&]:after:content-[''] [input:checked+&]:after:w-3 [input:checked+&]:after:h-3 [input:checked+&]:after:bg-white [input:checked+&]:after:rounded-full [input:checked+&]:after:absolute [input:checked+&]:after:top-1/2 [input:checked+&]:after:left-1/2 [input:checked+&]:after:-translate-x-1/2 [input:checked+&]:after:-translate-y-1/2"
                  ></span>
                  Split 1 ten to 10 ones
                </label>
              </div>
            </div>
          )}

          {inputValue2 && (!needsBorrowing || transferValue === 1) && (

            < div className="mb-5 w-[300px] relative bottom-0 flex gap-2 justify-center items-center">

              <label
                className="inline-block text-base font-bold text-white px-[18px] py-2 rounded-[5px] mb-2.5 absolute top-0 left-2"
                style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
              >
                Subtract :
              </label>

              <input
                type="range"
                min="0"
                max="10"
                value={sliderValue}
                disabled={isLiveClass ? isLiveClassStudent : false}
                onChange={(e) => {
                  if (isLiveClassStudent) {
                    return;
                  }

                  if (isLiveClassTeacher) {
                    dataTrackSlider(parseInt(e.target.value))
                  }
                  setSliderValue(parseInt(e.target.value))
                }}
                className="appearance-none w-[25px] h-[130px] rounded-[20px] outline-none cursor-pointer transition-all duration-300
                    [writing-mode:vertical-lr] [direction:ltr]
                    [&::-webkit-slider-runnable-track]:w-[18px] [&::-webkit-slider-runnable-track]:rounded-[20px]
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[35px] [&::-webkit-slider-thumb]:w-[35px]
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#6bdaff]
                    [&::-webkit-slider-thumb]:shadow-[0_4px_10px_rgba(0,0,0,0.2)] [&::-webkit-slider-thumb]:-ml-2
                    [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300
                    [&::-webkit-slider-thumb:hover]:scale-[1.2] [&::-webkit-slider-thumb:hover]:rotate-[10deg] [&::-webkit-slider-thumb:hover]:bg-[#fff8dc]
                    [&::-moz-range-thumb]:h-[35px] [&::-moz-range-thumb]:w-[35px] [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[#ff6b6b]
                    [&::-moz-range-thumb]:shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                style={{ background: "linear-gradient(135deg, #fff6d6, #ffe8a3)" }}
              />
            </div>
          )}
        </div>

        {answer !== null && (
          <div className="text-lg font-bold">Answer: {answer}</div>
        )}
      </div>


      <div
        className="flex gap-5 relative h-[25vh] bg-white/80 rounded-[10px] top-8"
      >

        <div
          className="absolute -top-[45px] left-0 flex font-bold text-base"
          style={{ gap: "80px" }}
        >
          <span
            className="inline-block text-base font-bold text-white px-[18px] py-2 rounded-[5px] mb-2.5"
            style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
          >
            {tensColoredCount}
          </span>
        </div>

        {/* Original Tens table */}
        <table className="border-collapse">
          <tbody>
            <tr>
              {[...Array(10)].map((_, idx) => {
                let highlight = idx < remainingTens;
                return (
                  <td key={idx} style={highlight ? highlightedStyle : cellStyle}></td>
                );
              })}
            </tr>
          </tbody>
        </table>


        <div
          className="absolute -top-[45px] -right-[0.2rem] flex font-bold text-base"
          style={{ gap: "80px" }}
        >
          <span
            className="inline-block text-base font-bold text-white px-[18px] py-2 rounded-[5px] mb-2.5"
            style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
          >
            {onesColoredCount}
          </span>
        </div>

        {/* Original Ones table */}
        <table className="border-collapse">
          <tbody>
            {[...Array(10)].map((_, idx) => {
              const highlight = idx >= 10 - remainingOnes;
              return (
                <tr key={idx}>
                  <td style={highlight ? { ...highlightedStyle, position: "relative" } : cellStyle}></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Borrowed Ones Box */}
        {needsBorrowing && transferValue === 1 && sliderValue === 0 && (
          <>

            <div
              className="absolute -top-[45px] -right-20 flex font-bold text-base"
              style={{ gap: "80px" }}
            >
              <span
                className="inline-block text-base font-bold text-white px-[18px] py-2 rounded-[5px] mb-2.5"
                style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
              >
                {10}
              </span>
            </div>

            <table className="border-collapse ml-5 absolute h-full -right-[4.5rem]">
              <tbody>
                {[...Array(10)].map((_, idx) => {
                  const isBorrowed = idx < 10;
                  return (
                    <tr key={idx}>
                      <td
                        style={{
                          ...cellStyle,
                          background: isBorrowed
                            ? "radial-gradient(circle at 75% 25%, transparent 25%),radial-gradient(circle at 30% 80%, transparent 20%),linear-gradient(145deg, #4dec35, #4dec35 60%, #4dec35)"
                            : "transparent",
                          color: isBorrowed ? "white" : "white",
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                        }}
                      ></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}


        <div
          className="absolute top-0 left-0 flex gap-5 h-full bg-white/10 rounded-[10px] transition-transform duration-200"
          style={{ transform: `translateY(${(sliderValue / 8) * 100}%)` }}
        >
          {sliderValue === 10 && (

            < div
              className="absolute -top-[45px] left-0 flex font-bold text-base"
              style={{ gap: "80px" }}
            >
              <span
                className="inline-block text-base font-bold text-white px-[18px] py-2 rounded-[5px] mb-2.5"
                style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
              >
                {duplicateTensCount}
              </span>
            </div>
          )}

          <table className="border-collapse">
            <tbody>
              <tr>
                {[...Array(10)].map((_, idx) => {
                  const highlight = idx < duplicateTens;
                  return (
                    <td key={idx} style={highlight ? highlightedStyle2 : cellStyle}>
                      {highlight && (
                        <span className="text-2xl font-bold text-[brown]">X </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>

          {sliderValue === 10 && (

            < div
              className="absolute -top-[45px] -right-[0.2rem] flex font-bold text-base"
              style={{ gap: "80px" }}
            >
              <span
                className="inline-block text-base font-bold text-white px-[18px] py-2 rounded-[5px] mb-2.5"
                style={{ background: "linear-gradient(135deg, #ff6b6b, #ff8e53)" }}
              >
                {duplicateOnesCount}
              </span>
            </div>
          )
          }

          <table className="border-collapse">
            <tbody>
              {[...Array(10)].map((_, idx) => {
                let highlight = idx >= 10 - duplicateOnes;
                return (
                  <tr key={idx}>
                    <td style={highlight ? { ...highlightedStyle2, position: "relative" } : cellStyle}>
                      {highlight && (
                        <span className="text-base font-bold text-[brown] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          X{" "}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div >
      </div >
    </div >

  );
}

export default GgbSubtractTwoDigitNumber;
