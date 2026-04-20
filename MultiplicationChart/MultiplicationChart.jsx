import React, { useState, useMemo, useEffect } from "react";
// import "../css/multiplicationChart.css";

const MultiplicationChart = ({ props, handleDataTrack }) => {
  const { isLiveClass = false, role_name } = props ?? {}
  const isTeacherAccess = isLiveClass ? role_name === "tutor" : true;
  const dynamicPointer = isTeacherAccess ? " pointer" : "default"

  const [selectedCell, setSelectedCell] = useState({ x: null, y: null });
  const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [startX, setStartX] = useState(1);
  const [colour, setColour] = useState("bg-blue-500");
  const [xAxis, setXAxis] = useState(20);
  const [yAxis, setYAxis] = useState(20);

  const fullColours = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const [colours, setColours] = useState(fullColours);

  const updateAxis = () => {
    const width = window.screen.availWidth;

    if (width < 600) {
      setXAxis(5);
      setYAxis(10);
    } else if (width < 900) {
      setXAxis(10);
      setYAxis(10);
    } else {
      setXAxis(20);
      setYAxis(20);
    }
  };

  const updateColours = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      setColours(fullColours.slice(0, 2));
    } else {
      setColours(fullColours);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateColours();
      updateAxis();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCordinatHandler = (x, y) => {
    if (enableMultipleSelection) {
      const isAlreadySelected = selectedCells.some(
        (cell) => cell.x === x && cell.y === y
      );

      if (isAlreadySelected) {
        setSelectedCells((prev) =>
          prev.map((cell) =>
            cell.x === x && cell.y === y ? { ...cell, colour: colour } : cell
          )
        );
      } else {
        setSelectedCells((prev) => [...prev, { x, y, colour }]);
      }
    }

    setSelectedCell({ x, y });
  };

  const isCellInMultipleSelection = (x, y) => {
    return selectedCells.find((cell) => cell.x === x && cell.y === y);
  };

  const handleClear = () => {
    if (!isTeacherAccess) return;
    setSelectedCell({ x: null, y: null });
    setSelectedCells([]);
    setEnableMultipleSelection(false);
    setColour("bg-blue-500");
  };

  const nextFiveTables = () => {
    setXAxis((prev) => (prev + 5 <= 20 ? prev + 5 : prev));

    setStartX((prev) => {
      const newXAxis = prev + 4;
      if (newXAxis <= 20) {
        return newXAxis === 5 ? newXAxis : newXAxis + 1;
      }
      return prev;
    });
  };

  const preFiveTables = () => {
    setXAxis((prev) => (prev - 5 >= 5 ? prev - 5 : prev));

    setStartX((prev) => {
      const newXAxis = prev - 4;
      if (newXAxis >= 1) {
        return newXAxis === 1 ? newXAxis : newXAxis - 1;
      }
      return prev;
    });
  };

  const memoColourStyleMap = {
    "bg-red-500": { backgroundColor: "#ef4444" },
    "bg-blue-500": { backgroundColor: "#3b82f6" },
    "bg-green-500": { backgroundColor: "#10b981" },
    "bg-yellow-500": { backgroundColor: "#f59e0b" },
    "bg-purple-500": { backgroundColor: "#8b5cf6" },
    "bg-pink-500": { backgroundColor: "#ec4899" },
  };

  const memoColour = useMemo(() => colour, [selectedCell, selectedCells]);

  const [isFullScreenState, setIsFullScreenState] = useState(false);

  const toggleFullscreen = () => {
    const fullScreenElem = document.getElementById("enable-full-screen");

    if (!document.fullscreenElement) {
      setIsFullScreenState(true);
      fullScreenElem?.requestFullscreen?.();
    } else {
      setIsFullScreenState(false);
      document.exitFullscreen?.();
    }
  };

  // LIVE CLASS FUNCTION

  const sendDataTrack = (isFrom, data) => {
    if (!isLiveClass || !isTeacherAccess) return;
    handleDataTrack?.({ isFrom, data });
  };


  const { Data } = props ?? {}

  useEffect(() => {
    if (isLiveClass && role_name === "tutor") return;
    if (!Data) return;

    if (Data.colour !== undefined && Data.colour !== colour) {
      setColour(Data.colour);
    }

    if (
      Data.enableMultipleSelection !== undefined &&
      Data.enableMultipleSelection !== enableMultipleSelection
    ) {
      setEnableMultipleSelection(Data.enableMultipleSelection);
    }

    if (
      Data.selectedCell &&
      JSON.stringify(Data.selectedCell) !== JSON.stringify(selectedCell)
    ) {
      setSelectedCell(Data.selectedCell);
    }

    // ✅ FIX IS HERE
    if (
      Array.isArray(Data.selectedCells) &&
      JSON.stringify(Data.selectedCells) !== JSON.stringify(selectedCells)
    ) {
      setSelectedCells([...Data.selectedCells]);
    }

  }, [Data]);

  useEffect(() => {
    sendDataTrack("colour", colour);
  }, [colour]);

  useEffect(() => {
    sendDataTrack("enableMultipleSelection", enableMultipleSelection);
  }, [enableMultipleSelection]);

  useEffect(() => {
    sendDataTrack("selectedCell", selectedCell);
  }, [selectedCell]);

  useEffect(() => {
    sendDataTrack("selectedCells", selectedCells);
  }, [selectedCells]);


  return (
    <div
      // className="custom-container"
      style={{
        height: "100%",
        width: isLiveClass ? "90%" : "100%",
        display: "flex",
        flexDirection: "column",
      }}
      id="enable-full-screen"
    >
      <div
        // className="card-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          width: "100%"
        }}
      >
        {/* Header */}
        <div style={{ padding: "0.5rem", position: "", display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => {
              if (!isTeacherAccess) return;
              setEnableMultipleSelection(!enableMultipleSelection)
            }
            }
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: dynamicPointer,
              backgroundColor: enableMultipleSelection ? "#3b82f6" : "#e5e7eb",
              color: enableMultipleSelection ? "#fff" : "#000",
            }}
          >
            {enableMultipleSelection
              ? "Disable Multiple Selection"
              : "Enable Multiple Selection"}
          </button>

          {/* Result display */}
          {selectedCell.x && selectedCell.y && (
            <div
              style={{
                position: "",
                left: "50%",
                // transform: "translateX(-50%)",
                top: "5px",
                padding: "0.5rem 1.5rem",
                borderRadius: "12px",
                border: "2px solid #1d4ed8",
                fontSize: "1.5rem",
                fontWeight: "bold",
                background: "#fff",
              }}
            >
              {selectedCell.y} × {selectedCell.x} ={" "}
              {selectedCell.x * selectedCell.y}
            </div>
          )}

          {/* Colour picker */}
          <div style={{ position: "", right: "70px", top: "5px" }}>
            {colours.map((colorClass, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTeacherAccess) return;
                  setColour(colorClass)
                }}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "6px",
                  border:
                    colour === colorClass ? "2px solid black" : "1px solid #ccc",
                  backgroundColor:
                    memoColourStyleMap[colorClass]?.backgroundColor,
                  cursor: dynamicPointer,
                }}
              />
            ))}
          </div>

          {/* Clear */}
          {isTeacherAccess ? (
            <img
              src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/refereshIcon.png"
              alt="clear"
              onClick={handleClear}
              style={{
                width: "35px",
                height: "35px",
                position: "",
                right: "40px",
                top: "5px",
                cursor: dynamicPointer,
              }}
            />) : (
            <div></div>
          )}

          {/* Fullscreen */}
          {!isLiveClass && (<img
            src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png"
            alt="fullscreen"
            onClick={toggleFullscreen}
            style={{
              width: "30px",
              position: "",
              right: "5px",
              top: "5px",
              cursor: dynamicPointer,
            }}
          />)}
        </div>

        {/* TABLE AREA (Dynamic Height + Scroll) */}
        <div
          className="scrollbar-hide"
          style={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <table
            style={{
              border: "1px solid #93c5fd",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#dbeafe",
                  color: "#1d4ed8",
                  position: "sticky",
                  top: 0,
                }}
              >
                <th style={{ border: "1px solid #93c5fd", padding: "0.5rem" }}>
                  ×
                </th>

                {Array.from({ length: xAxis - startX + 1 }, (_, i) => {
                  const value = i + startX;
                  return (
                    <th
                      key={value}
                      style={{
                        border: "1px solid #93c5fd",
                        padding: "0.5rem",
                      }}
                    >
                      {value}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: yAxis }, (_, i) => (
                <tr key={i}>
                  <td
                    style={{
                      backgroundColor: "#dbeafe",
                      border: "1px solid #93c5fd",
                      padding: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}
                  </td>

                  {Array.from({ length: xAxis - startX + 1 }, (_, j) => {
                    const x = j + startX;
                    const y = i + 1;

                    const isSelected =
                      !enableMultipleSelection &&
                      selectedCell.x === x &&
                      selectedCell.y === y;

                    const multipleCell = enableMultipleSelection
                      ? isCellInMultipleSelection(x, y)
                      : null;

                    const cellColor = isSelected
                      ? memoColour
                      : multipleCell
                        ? multipleCell.colour
                        : "";

                    return (
                      <td
                        key={j}
                        onClick={() => {
                          if (!isTeacherAccess) return;
                          getCordinatHandler(x, y)
                        }}
                        style={{
                          cursor: dynamicPointer,
                          border: "1px solid #93c5fd",
                          padding: "0.5rem",
                          ...(cellColor
                            ? {
                              ...memoColourStyleMap[cellColor],
                              color: "#fff",
                              fontWeight: "700",
                            }
                            : { backgroundColor: "#eff6ff" }),
                        }}
                      >
                        {x * y}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MultiplicationChart;