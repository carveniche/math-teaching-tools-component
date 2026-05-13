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
  // Decide what to display
  let displayHundreds = 0;
  let displayTens = tens;
  let displayOnes = ones;

  // After slide to add
  if (showAdded && !showRegrouped) {
    displayTens = addedTens;
    displayOnes = addedOnes;
  }

  // After regroup ones → tens
  if (showRegrouped) {
    displayTens = regroupedTens;
    displayOnes = regroupedOnes;
  }

  // After regroup tens → hundreds
  if (showHundredRegrouped) {
    displayHundreds = finalHundreds;
    displayTens = finalTens;
    displayOnes = finalOnes;
  }

  return (
    <div className={ggbAddition.leftSideTableContainer}>
{showAdded && (
  <div className={ggbAddition.resultWrapper}>
    <div className={ggbAddition.resultCard}>
      <span className={ggbAddition.resultLabel}>Result</span>
      <span className={ggbAddition.resultValue}>
        {finalHundreds}{finalTens}{finalOnes}
      </span>
    </div>
  </div>
)}

      {/* INITIAL VIEW - TWO TABLES */}
   
          <div
    className={`${ggbAddition.initialView} ${
      showAdded ? ggbAddition.fadeOut : ggbAddition.fadeIn
    }`}
  >
          {/* FIRST NUMBER */}
          <div className={ggbAddition.originalTensAndOnesTableHolder}>
            {/* TENS */}
            <div>
              <span className={ggbAddition.hundredBubble}>{displayTens}</span>
              <table>
                <tr style={{ height: "180px" }}>
                  {[...Array(10)].map((_, index) => (
                    <th
                      className={`${ggbAddition.tableStyleControl} ${
                        showRegrouped ? ggbAddition.tensPop : ""
                      }`}
                      key={index}
                      style={{
                        backgroundColor:
                          index < displayTens ? "#2196F3" : "white",
                      }}
                    />
                  ))}
                </tr>
              </table>
            </div>

            {/* ONES */}
            <div>
              <span className={ggbAddition.hundredBubble}>{displayOnes}</span>
              <table>
                {[...Array(10)].map((_, index) => (
                  <tr key={index} style={{ height: "1.12rem" }}>
                    <th
                      className={`${ggbAddition.tableStyleControl} ${
                        showRegrouped && index < 10
                          ? ggbAddition.moveToTens
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          index < displayOnes ? "#2196F3" : "white",
                      }}
                    />
                  </tr>
                ))}
              </table>
            </div>
          </div>

          {/* SECOND NUMBER */}
          <div className={ggbAddition.SecondOriginalTensAndOnesTableHolder}>
            <div>
              <span className={ggbAddition.hundredBubble}>{secondTens}</span>
              <table>
                <tr style={{ height: "180px" }}>
                  {[...Array(10)].map((_, index) => (
                    <th
                      className={ggbAddition.tableStyleControl}
                      key={index}
                      style={{
                        backgroundColor:
                          index < secondTens ? "yellow" : "white",
                      }}
                    />
                  ))}
                </tr>
              </table>
            </div>

            <div>
              <span className={ggbAddition.hundredBubble}>{secondOnes}</span>
              <table>
                {[...Array(10)].map((_, index) => (
                  <tr key={index} style={{ height: "1.12rem" }}>
                    <th
                      className={ggbAddition.tableStyleControl}
                      style={{
                        backgroundColor:
                          index < secondOnes ? "yellow" : "white",
                      }}
                    />
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
  
        {/* /* ADDED OR REGROUPED VIEW - SINGLE TABLE */ }
          <div
    className={`${ggbAddition.addedView} ${
      showAdded ? ggbAddition.fadeIn : ggbAddition.fadeOut
    }`}
  >
        <div className={ggbAddition.originalTensAndOnesTableHolder}>
          {/* HUNDREDS */}
          {displayHundreds > 0 && (
            <div>
              <span className={ggbAddition.hundredBubble}>{displayHundreds}</span>
              <table>
                <tr style={{ height: "180px" }}>
                  {[...Array(1)].map((_, index) => (
                    <th
                      className={`${ggbAddition.tableStyleControl} ${
                        showHundredRegrouped ? ggbAddition.hundredAnimate : ""
                      }`}
                      key={index}
                      style={{
                        width: "200px",
                        backgroundColor:
                          index < displayHundreds ? "skyblue" : "white",
                      }}
                    />
                  ))}
                </tr>
              </table>
            </div>
          )}
          <div>
            <span className={ggbAddition.hundredBubble}>{displayTens}</span>

            <div style={{ display: "flex", gap: "10px" }}>
              {Array.from({
                length: Math.max(1, Math.ceil(displayTens / 10)),
              }).map((_, tableIndex) => {
                const boxesInThisTable = Math.min(
                  10,
                  displayTens - tableIndex * 10,
                );

                return (
                  <table key={tableIndex}>
                    <tr style={{ height: "180px" }}>
                      {[...Array(10)].map((_, index) => (
                        <th
                          className={ggbAddition.tableStyleControl}
                          key={index}
                          style={{
                            backgroundColor:
                              index < boxesInThisTable ? "green" : "white",
                          }}
                        />
                      ))}
                    </tr>
                  </table>
                );
              })}
            </div>
          </div>

          <div>
            <span className={ggbAddition.hundredBubble}>{displayOnes}</span>

            <div style={{ display: "flex", gap: "10px" }}>
              {Array.from({
                length: Math.max(1, Math.ceil(displayOnes / 10)),
              }).map((_, tableIndex) => {
                const boxesInThisTable = Math.min(
                  10,
                  displayOnes - tableIndex * 10,
                );

                return (
                  <table key={tableIndex}>
                    {[...Array(10)].map((_, index) => (
                      <tr key={index} style={{ height: "1.12rem" }}>
                        <th
                          className={ggbAddition.tableStyleControl}
                          style={{
                            backgroundColor:
                              index < boxesInThisTable ? "#2196F3" : "white",
                          }}
                        />
                      </tr>
                    ))}
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
