import { useState, useEffect } from "react";

export const useNumberLineDecimalLogic = () => {
  const [getIntegerStart, setgetIntegerStart] = useState("0");
  const [getIntegerEnd, setgetIntegerEnd] = useState("5");
  const [getDiviser, setgetDiviser] = useState([]);
  const [Error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [sendStartData, setsendStartData] = useState(0);
  const [sendEndData, setsendEndData] = useState(5);
  const [gettingHopsValue, setgettingHopsValue] = useState([]);
  const [openSetting, setopenSetting] = useState(false);
  const [inputDivisor, setInputDivisior] = useState("10");

  const calculateDivisorsAndHops = () => {
    let render_totalDivisor = [];
    let start = parseFloat(getIntegerStart);
    let end = parseFloat(getIntegerEnd);
    let range = end - start;
    let getEndDivisor_data = parseInt(inputDivisor);
    let step = range / getEndDivisor_data;

    if (
      !isNaN(start) &&
      !isNaN(end) &&
      start < end &&
      range <= 100 &&
      getEndDivisor_data > 0
    ) {
      setsendStartData(start);
      setsendEndData(end);
      setShowError(false);

      // Generate division points, ensuring end value is included
      for (let i = start; i <= end + Number.EPSILON; i += step) {
        render_totalDivisor.push(Number(i.toFixed(2)));
      }
      // Ensure the end value is exactly included
      if (Math.abs(render_totalDivisor[render_totalDivisor.length - 1] - end) > Number.EPSILON) {
        render_totalDivisor[render_totalDivisor.length - 1] = end;
      }
      setgetDiviser(render_totalDivisor);
      setgettingHopsValue(render_totalDivisor);
    } else {
      setShowError(true);
      if (isNaN(start)) {
        setError("Please Enter Valid Start Value");
      } else if (isNaN(end)) {
        setError("Please Enter Valid End Value");
      } else if (start >= end) {
        setError("Start Value Should Be Less Than End Value");
      } else if (range > 100) {
        setError("Range Between Start and End Should Be Less Than or equal to 100");
      }
      else if (!getEndDivisor_data) {
        setError("Enter valid Divisions");
      }
       else if (getEndDivisor_data <= 0) {
        setError("Divisions Must Be Greater Than 0");
      }
    }
  };

  useEffect(() => {
    calculateDivisorsAndHops();
  }, [getIntegerStart, getIntegerEnd, inputDivisor]);

  const handleOpenSetting = () => {
    setopenSetting(!openSetting);
  };

  return {
    getIntegerStart,
    setgetIntegerStart,
    getIntegerEnd,
    setgetIntegerEnd,
    getDiviser,
    Error,
    showError,
    sendStartData,
    sendEndData,
    gettingHopsValue,
    openSetting,
    inputDivisor,
    setInputDivisior,
    handleOpenSetting,
  };
};