import React, { useState, useRef, useEffect } from 'react';
import styles from './graphcoordinate.module.css';
import { createAxesAndGrid, addLabelsAtPoint, drawLines } from './grapcordinates';
// import Header from './Header';


const GraphCoordinate = ({ props, handleDataTrack = () => { } }) => {
  const { isLiveClass, role_name, Data } = props ?? {};
  const isStudentLive = isLiveClass && role_name !== 'tutor'
  const graphRef = useRef(null);
  const canvasRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);
  const [coordinates, setCoordinates] = useState('');
  const [showError, setShowError] = useState(false);
  const [points, setPoints] = useState([]);
  const pointsElementsRef = useRef([]);
  const [showTable, setShowTable] = useState(false);
  const [editablePoints, setEditablePoints] = useState(new Set(['A']));
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const maxClicks = 11;
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const [pendingInputs, setPendingInputs] = useState(
    labels.reduce((acc, label) => ({ ...acc, [label]: { x: '', y: '' } }), {})
  );

  // Update canvas size and redraw on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (graphRef.current) {
        const { width, height } = graphRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (graphRef.current) resizeObserver.observe(graphRef.current);
    window.addEventListener('resize', updateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Draw axes and grid
  useEffect(() => {
    if (graphRef.current) {
      createAxesAndGrid(graphRef.current, dimensions.width, dimensions.height, styles);
    }
  }, [dimensions]);

  // Draw lines on canvas
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        if (points.length >= 2) {
          drawLines(ctx, points, dimensions.width, dimensions.height);
        }
      }
    }
  }, [points, dimensions]);

  // Update DOM points and labels
  useEffect(() => {
    pointsElementsRef.current.forEach(({ point, label }) => {
      point.remove();
      label.remove();
    });
    pointsElementsRef.current = [];

    points.forEach((point, index) => {
      if (graphRef.current && index < labels.length) {
        const graphX = (point.x - dimensions.width * 0.1) / (dimensions.width * 0.8) * 10;
        const graphY = 10 - (point.y - dimensions.height * 0.1) / (dimensions.height * 0.8) * 10;
        const pointElement = addLabelsAtPoint(
          graphRef.current,
          graphX,
          graphY,
          labels[index],
          dimensions.width,
          dimensions.height,
          styles
        );
        pointsElementsRef.current.push(pointElement);
      }
    });
  }, [points, dimensions]);

  const handleGraphClick = (e) => {
    if (clickCount >= maxClicks) {
      setShowError(true);
      return;
    }

    if (!graphRef.current) return;

    const rect = graphRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = 0.1 * dimensions.width;
    const graphWidth = dimensions.width - 2 * padding;
    const graphHeight = dimensions.height - 2 * padding;

    let graphX = ((x - padding) / graphWidth) * 10;
    let graphY = 10 - ((y - padding) / graphHeight) * 10;

    graphX = Math.round(Math.max(0, Math.min(10, graphX)));
    graphY = Math.round(Math.max(0, Math.min(10, graphY)));

    const pixelX = padding + (graphX / 10) * graphWidth;
    const pixelY = padding + ((10 - graphY) / 10) * graphHeight;

    const isDuplicate = points.some(point =>
      Math.abs(point.x - pixelX) < 5 && Math.abs(point.y - pixelY) < 5
    );

    if (isDuplicate) return;

    setShowError(false);

    const pointElement = addLabelsAtPoint(graphRef.current, graphX, graphY, labels[clickCount], dimensions.width, dimensions.height, styles);
    pointsElementsRef.current.push(pointElement);

    setPoints(prev => [...prev, { x: pixelX, y: pixelY }]);
    setCoordinates(`Point at: (${graphX}, ${graphY})`);
    setClickCount(prev => prev + 1);

    setPendingInputs(prev => ({
      ...prev,
      [labels[clickCount]]: { x: graphX.toString(), y: graphY.toString() }
    }));

    setEditablePoints(prev => {
      const newSet = new Set(['A']);
      const newPoints = [...points, { x: pixelX, y: pixelY }];
      newPoints.forEach((point, index) => {
        if (
          point.x >= padding &&
          point.x <= padding + graphWidth &&
          point.y >= padding &&
          point.y <= padding + graphHeight
        ) {
          newSet.add(labels[index]);
        }
      });
      if (clickCount + 1 < labels.length) {
        newSet.add(labels[clickCount + 1]);
      }
      return newSet;
    });

    // live Class Data Tracking
    if (isLiveClass) {
      handleDataTrack?.({
        isFrom: "graphAddPoint",
        data: {
          x: graphX,
          y: graphY,
          label: labels[clickCount]
        }
      });
    }

  };

  const handleUndo = () => {
    if (clickCount > 0) {
      const lastElements = pointsElementsRef.current.pop();
      if (lastElements) {
        lastElements.point.remove();
        lastElements.label.remove();
      }

      setPoints(prev => prev.slice(0, -1));
      setClickCount(prev => prev - 1);
      setShowError(false);

      setPendingInputs(prev => ({
        ...prev,
        [labels[clickCount - 1]]: { x: '', y: '' }
      }));

      const padding = 0.1 * dimensions.width;
      const graphWidth = dimensions.width - 2 * padding;
      const graphHeight = dimensions.height - 2 * padding;

      setEditablePoints(prev => {
        const newSet = new Set(['A']);
        const validPoints = points.slice(0, -1);
        validPoints.forEach((point, index) => {
          if (
            point.x >= padding &&
            point.x <= padding + graphWidth &&
            point.y >= padding &&
            point.y <= padding + graphHeight
          ) {
            newSet.add(labels[index]);
          }
        });
        if (clickCount - 1 < labels.length) {
          newSet.add(labels[clickCount - 1]);
        }
        return newSet;
      });

      if (clickCount > 1) {
        const lastPoint = points[clickCount - 2];
        const graphX = Math.round((lastPoint.x - dimensions.width * 0.1) / (dimensions.width * 0.8) * 10);
        const graphY = 10 - Math.round((lastPoint.y - dimensions.height * 0.1) / (dimensions.height * 0.8) * 10);
        setCoordinates(`Point at: (${graphX}, ${graphY})`);
      } else {
        setCoordinates('');
      }

      if (isLiveClass) {
        handleDataTrack?.({
          isFrom: "graphUndo",
          data: Date.now(),
        });
      }
    }
  };

  const handleShowTable = () => {
    setShowTable(!showTable);
    const closingTable = document.getElementsByClassName('close-table')[0];
    if (closingTable) {
      closingTable.innerText = showTable ? "Show Table" : "Close Table";
    }

    if (!showTable) {
      const newSet = new Set(['A']);
      const padding = 0.1 * dimensions.width;
      const graphWidth = dimensions.width - 2 * padding;
      const graphHeight = dimensions.height - 2 * padding;
      points.forEach((point, index) => {
        if (
          point.x >= padding &&
          point.x <= padding + graphWidth &&
          point.y >= padding &&
          point.y <= padding + graphHeight
        ) {
          newSet.add(labels[index]);
        }
      });
      if (clickCount > 0 && clickCount < labels.length) {
        newSet.add(labels[clickCount]);
      }
      setEditablePoints(newSet);
    } else {
      setEditablePoints(prev => {
        const newSet = new Set(['A']);
        const padding = 0.1 * dimensions.width;
        const graphWidth = dimensions.width - 2 * padding;
        const graphHeight = dimensions.height - 2 * padding;
        points.forEach((point, index) => {
          if (
            point.x >= padding &&
            point.x <= padding + graphWidth &&
            point.y >= padding &&
            point.y <= padding + graphHeight
          ) {
            newSet.add(labels[index]);
          }
        });
        if (clickCount < labels.length) {
          newSet.add(labels[clickCount]);
        }
        return newSet;
      });
    }
  };

  const handleInputChange = (label, axis, value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 10) {
      setPendingInputs(prev => ({
        ...prev,
        [label]: { ...prev[label], [axis]: value }
      }));
      return;
    }

    const index = labels.indexOf(label);
    if (index < 0 || index >= maxClicks) return;

    const padding = 0.1 * dimensions.width;
    const graphWidth = dimensions.width - 2 * padding;
    const graphHeight = dimensions.height - 2 * padding;

    setPendingInputs(prev => ({
      ...prev,
      [label]: { ...prev[label], [axis]: value }
    }));

    const pending = { ...pendingInputs[label], [axis]: value };
    const xValid = !isNaN(parseInt(pending.x)) && parseInt(pending.x) >= 0 && parseInt(pending.x) <= 10;
    const yValid = !isNaN(parseInt(pending.y)) && parseInt(pending.y) >= 0 && parseInt(pending.y) <= 10;

    if (xValid && yValid) {
      const pixelX = padding + (parseInt(pending.x) / 10) * graphWidth;
      const pixelY = padding + ((10 - parseInt(pending.y)) / 10) * graphHeight;

      const isDuplicate = points.some((point, i) =>
        i !== index &&
        Math.abs(point.x - pixelX) < 5 &&
        Math.abs(point.y - pixelY) < 5
      );

      if (isDuplicate) return;

      const newPoints = [...points];
      if (index < points.length) {
        newPoints[index] = { x: pixelX, y: pixelY };
      } else {
        while (newPoints.length < index) {
          newPoints.push({ x: 0, y: 0 });
        }
        newPoints.push({ x: pixelX, y: pixelY });
      }

      setPoints(newPoints);
      setClickCount(prev => Math.max(prev, index + 1));
      setCoordinates(`Point at: (${parseInt(pending.x)}, ${parseInt(pending.y)})`);

      setEditablePoints(prev => {
        const newSet = new Set(['A']);
        newPoints.forEach((p, i) => {
          if (
            p.x >= padding &&
            p.x <= padding + graphWidth &&
            p.y >= padding &&
            p.y <= padding + graphHeight
          ) {
            newSet.add(labels[i]);
          }
        });
        if (index + 1 < labels.length) {
          newSet.add(labels[index + 1]);
        }
        return newSet;
      });
    }


    if (isLiveClass && xValid && yValid) {
      handleDataTrack({
        isFrom: "graphUpdatePoint",
        data: {
          label,
          x: parseInt(pending.x),
          y: parseInt(pending.y)
        }
      });
    }

  };

  const handleInputClamp = (e) => {
    const input = e.currentTarget;
    const value = parseInt(input.value);
    if (isNaN(value) || value < 0) {
      input.value = '0';
    } else if (value > 10) {
      input.value = '10';
    }
  };

  const toggleFullscreen = () => {
    const geting_full_screen = document.getElementById('enable-full-screen');
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

  const addPointFromTeacher = ({ x, y, label }) => {
    const padding = 0.1 * dimensions.width;
    const graphWidth = dimensions.width - 2 * padding;
    const graphHeight = dimensions.height - 2 * padding;

    const pixelX = padding + (x / 10) * graphWidth;
    const pixelY = padding + ((10 - y) / 10) * graphHeight;

    setPoints(prev => [...prev, { x: pixelX, y: pixelY }]);
    setClickCount(prev => prev + 1);

    setPendingInputs(prev => ({
      ...prev,
      [label]: { x: x.toString(), y: y.toString() }
    }));
    setCoordinates(`Point at: (${x}, ${y})`);
  };
  // const undoFromTeacher = () => {
  //   const lastElements = points.pop();
  //   console.log(lastElements,"shshshshshshshhshshshsh");
  //   setPoints(prev => prev.slice(0, -1));
  //   setClickCount(prev => Math.max(prev - 1, 0));
  // };

  const undoFromTeacher = () => {
    // ✅ remove DOM point
    const last = pointsElementsRef.current.pop();
    if (last) {
      last.point.remove();
      last.label.remove();
    }

    setPoints(prev => {
      const updated = prev.slice(0, -1);

      // ✅ update coordinate display
      if (updated.length > 0) {
        const lastPoint = updated[updated.length - 1];

        const graphX = Math.round(
          (lastPoint.x - dimensions.width * 0.1) /
          (dimensions.width * 0.8) * 10
        );

        const graphY = 10 - Math.round(
          (lastPoint.y - dimensions.height * 0.1) /
          (dimensions.height * 0.8) * 10
        );

        setCoordinates(`Point at: (${graphX}, ${graphY})`);
      } else {
        setCoordinates('');
      }

      return updated;
    });

    setClickCount(prev => Math.max(prev - 1, 0));

    // ✅ clear last input field
    setPendingInputs(prev => {
      const newInputs = { ...prev };
      const lastLabel = labels[clickCount - 1];
      if (lastLabel) {
        newInputs[lastLabel] = { x: '', y: '' };
      }
      return newInputs;
    });
  };

  const updatePointFromTeacher = ({ label, x, y }) => {
    const index = labels.indexOf(label);
    if (index === -1) return;

    const padding = 0.1 * dimensions.width;
    const graphWidth = dimensions.width - 2 * padding;
    const graphHeight = dimensions.height - 2 * padding;

    const pixelX = padding + (x / 10) * graphWidth;
    const pixelY = padding + ((10 - y) / 10) * graphHeight;

    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[index] = { x: pixelX, y: pixelY };
      return newPoints;
    });

    setPendingInputs(prev => ({
      ...prev,
      [label]: { x: x.toString(), y: y.toString() }
    }));
  };

  useEffect(() => {
    if (!isLiveClass || !isStudentLive) return;
    if (!Data?.graphUndo) return;

    if (Data.graphUndo) {
      console.log(Data.graphUndo, "graphUNdo");
      undoFromTeacher();
    }



  }, [Data?.graphUndo]);

  useEffect(() => {
    if (!isLiveClass || !isStudentLive) return;
    if (!Data) return;

    if (Data.graphAddPoint) {
      addPointFromTeacher(Data.graphAddPoint);
    }


  }, [Data?.graphAddPoint]);
  useEffect(() => {
    if (!isLiveClass || !isStudentLive) return;
    if (!Data?.graphUpdatePoint) return;

    if (Data.graphUpdatePoint) {
      updatePointFromTeacher(Data.graphUpdatePoint);
    }
  }, [Data?.graphUpdatePoint]);

  const isTeacher = isLiveClass ? role_name === 'tutor' : true;

  return (
    <>
      {/* <Header data={coordinates} /> */}

      {!isLiveClass && (
        <img
          src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png'
          alt='full-screen'
          onClick={toggleFullscreen}
          style={{ position: "absolute", right: "2rem", zIndex: "10", cursor: "pointer" }}
        />
      )}

      <div className={styles.graphApp} id='enable-full-screen'>
        <div
          ref={graphRef}
          className={styles.graphContainer}
          onClick={isTeacher ? handleGraphClick : undefined}
        >
          <canvas
            ref={canvasRef}
            className={styles.graphCanvas}
            width={dimensions.width}
            height={dimensions.height}
          />
          {showError && (
            <div className={styles.errorMessage}>Maximum 11 points allowed</div>
          )}
        </div>

        <div className={styles.btnParent}>
          {isTeacher && (<button
            className={`${styles.undoBtn} text_body`}
            onClick={handleUndo}
            disabled={clickCount === 0}
          >
            Undo
          </button>)}
          {isTeacher && (<button
            className={`${styles.undoBtn} close-table text_body`}
            onClick={handleShowTable}
          >
            {showTable ? "Close Table" : "Show Table"}
          </button>)}
          {coordinates && (
            <button
              className={styles.undoBtn}
              style={{ cursor: "not-allowed", pointerEvents: "none" }}
            >
              {coordinates}
            </button>
          )}
        </div>

        {showTable && (
          <div className={`${styles.tableContainer} ${showTable ? styles.show : ''}`}>
            <div className={styles.tableContent}>
              <button className={styles.closeBtn} onClick={handleShowTable}>
                X
              </button>
              <table>
                <thead>
                  <tr>
                    <th style={{ background: "lightblue" }} className='h4'>Point</th>
                    <th style={{ background: "lightblue" }} className='h4'>X-Axis</th>
                    <th style={{ background: "lightblue" }} className='h4'>Y-Axis</th>
                  </tr>
                </thead>
                <tbody>
                  {labels.map((label) => (
                    <tr key={label}>
                      <td style={{ background: "lightgreen", color: "white", border: "0.1rem solid white" }}>
                        {label}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={pendingInputs[label].x}
                          min="0"
                          max="10"
                          onChange={(e) => handleInputChange(label, 'x', e.target.value)}
                          onInput={handleInputClamp}
                          disabled={!editablePoints.has(label)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={pendingInputs[label].y}
                          min="0"
                          max="10"
                          onChange={(e) => handleInputChange(label, 'y', e.target.value)}
                          onInput={handleInputClamp}
                          disabled={!editablePoints.has(label)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GraphCoordinate;