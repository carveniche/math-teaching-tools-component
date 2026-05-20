import React from "react";
import ggbAddition from "./GggbAddition.module.css";

function GggbTableSectorContainer({
  secondTens,
  secondOnes,
  tens,
  ones,
  showAdded,
  showRegrouped,
  addedTens,
  addedOnes,
  regroupedTens,
  regroupedOnes,
  showHundredRegrouped,
  finalHundreds,
  finalTens,
  finalOnes,
}) {
  let displayHundreds = 0;
  let displayTens = tens;
  let displayOnes = ones;

  if (showAdded && !showRegrouped) {
    displayTens = addedTens;
    displayOnes = addedOnes;
  }

  if (showRegrouped) {
    displayTens = regroupedTens;
    displayOnes = regroupedOnes;
  }

  if (showHundredRegrouped) {
    displayHundreds = finalHundreds;
    displayTens = finalTens;
    displayOnes = finalOnes;
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center flex-col overflow-hidden">

      {showAdded && (
        <div className="absolute top-[10px] left-0 z-1">
          <div
            className="text-white px-3 py-2 rounded-[12px] flex flex-col items-center"
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              animation: "resultFadeIn 0.5s ease",
            }}
          >
            <span className="text-[0.65rem] opacity-80 tracking-widest">Result</span>
            <span className="text-[1.2rem] font-bold mt-0.5">
              {finalHundreds}{finalTens}{finalOnes}
            </span>
          </div>
        </div>
      )}

      {/* INITIAL VIEW - TWO TABLES */}
      <div
        className={`absolute w-full h-full flex flex-col  items-center gap-[2vh] transition-all duration-[0.6s] ease-in-out ${showAdded ? ggbAddition.fadeOut : ggbAddition.fadeIn
          }`}
      >
        {/* FIRST NUMBER */}
        <div className="w-full flex justify-center items-end flex-row gap-[10px]">
          {/* TENS */}
          <div className="flex flex-col">
            <span
              className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                animation: "bubblePop 0.4s ease",
              }}
            >
              {displayTens}
            </span>
            <table className="h-[18vh] min-h-[80px] max-h-[180px]">
              <tbody>
                <tr style={{ height: "100%" }}>
                  {[...Array(10)].map((_, index) => (
                    <th
                      className={`w-[20px] sm:w-[25px] md:w-[30px] border border-[#ff8c42] transition-all duration-500 ${showRegrouped ? ggbAddition.tensPop : ""
                        }`}
                      key={index}
                      style={{
                        backgroundColor: index < displayTens ? "#2196F3" : "white",
                      }}
                    />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* ONES */}
          <div className="flex flex-col items-center">
            <span
              className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                animation: "bubblePop 0.4s ease",
              }}
            >
              {displayOnes}
            </span>
            <table className="h-[18vh] min-h-[80px] max-h-[180px]">
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index} style={{ height: "10%" }}>
                    <th
                      className={`w-[20px] sm:w-[25px] md:w-[30px] border border-[#ff8c42] transition-all duration-500 ${showRegrouped && index < 10 ? ggbAddition.moveToTens : ""
                        }`}
                      style={{
                        backgroundColor: index < displayOnes ? "#2196F3" : "white",
                      }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECOND NUMBER */}
        <div className="w-full flex justify-center items-end flex-row gap-[10px]">
          <div className="flex flex-col">
            <span
              className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                animation: "bubblePop 0.4s ease",
              }}
            >
              {secondTens}
            </span>
            <table className="h-[18vh] min-h-[80px] max-h-[180px]">
              <tbody>
                <tr style={{ height: "100%" }}>
                  {[...Array(10)].map((_, index) => (
                    <th
                      className="w-[20px] sm:w-[25px] md:w-[30px] border border-[#ff8c42] transition-all duration-500"
                      key={index}
                      style={{
                        backgroundColor: index < secondTens ? "yellow" : "white",
                      }}
                    />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col ">
            <span
              className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                animation: "bubblePop 0.4s ease",
              }}
            >
              {secondOnes}
            </span>
            <table className="h-[18vh] min-h-[80px] max-h-[180px]">
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index} style={{ height: "10%" }}>
                    <th
                      className="w-[20px] sm:w-[25px] md:w-[30px] border border-[#ff8c42] transition-all duration-500"
                      style={{
                        backgroundColor: index < secondOnes ? "yellow" : "white",
                      }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADDED OR REGROUPED VIEW - SINGLE TABLE */}
      <div
        className={`absolute w-full h-full flex justify-center items-center transition-all duration-[0.6s] ease-in-out ${showAdded ? ggbAddition.fadeIn : ggbAddition.fadeOut
          }`}
      >
        <div className="w-full flex  items-end justify-center flex-row gap-[10px]">

          {/* HUNDREDS */}
          {displayHundreds > 0 && (
            <div className="flex flex-col">
              <span
                className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                  animation: "bubblePop 0.4s ease",
                }}
              >
                {displayHundreds}
              </span>
              <table className="h-[18vh] min-h-[80px] max-h-[180px]">
                <tbody>
                  <tr style={{ height: "100%" }}>
                    {[...Array(1)].map((_, index) => (
                      <th
                        className={`border border-[#ff8c42] transition-all duration-500 ${showHundredRegrouped ? ggbAddition.hundredAnimate : ""
                          }`}
                        key={index}
                        style={{
                          width: "clamp(60px, 10vw, 200px)",
                          backgroundColor: index < displayHundreds ? "skyblue" : "white",
                        }}
                      />
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TENS */}
          <div className="flex flex-col">
            <span
              className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                animation: "bubblePop 0.4s ease",
              }}
            >
              {displayTens}
            </span>
            <div className="flex gap-[6px]">
              {Array.from({
                length: Math.max(1, Math.ceil(displayTens / 10)),
              }).map((_, tableIndex) => {
                const boxesInThisTable = Math.min(10, displayTens - tableIndex * 10);
                return (
                  <table key={tableIndex} className="h-[18vh] min-h-[80px] max-h-[180px]">
                    <tbody>
                      <tr style={{ height: "100%" }}>
                        {[...Array(10)].map((_, index) => (
                          <th
                            className="w-[20px] sm:w-[25px] md:w-[30px] border border-[#ff8c42] transition-all duration-500"
                            key={index}
                            style={{
                              backgroundColor: index < boxesInThisTable ? "green" : "white",
                            }}
                          />
                        ))}
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>

          {/* ONES */}
          <div className="flex flex-col items-center">
            <span
              className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#333] text-[0.9rem] font-bold mb-[4px] flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
                animation: "bubblePop 0.4s ease",
              }}
            >
              {displayOnes}
            </span>
            <div className="flex gap-[6px]">
              {Array.from({
                length: Math.max(1, Math.ceil(displayOnes / 10)),
              }).map((_, tableIndex) => {
                const boxesInThisTable = Math.min(10, displayOnes - tableIndex * 10);
                return (
                  <table key={tableIndex} className="h-[18vh] min-h-[80px] max-h-[180px]">
                    <tbody>
                      {[...Array(10)].map((_, index) => (
                        <tr key={index} style={{ height: "10%" }}>
                          <th
                            className="w-[20px] sm:w-[25px] md:w-[30px] border border-[#ff8c42] transition-all duration-500"
                            style={{
                              backgroundColor: index < boxesInThisTable ? "#2196F3" : "white",
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GggbTableSectorContainer;