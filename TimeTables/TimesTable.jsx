import React, { useState, useEffect } from 'react';
import styles from './TimesTable.module.css';

const TimesTable = ({ props, handleDataTrack }) => {
  const { isLiveClass, role_name, Data } = props ?? {};
  const [number, setNumber] = useState(2);
  const [table, setTable] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showTable, setShowTabel] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    generateTable(2);
  }, []);

  const generateTable = (selectedNumber) => {
    if (selectedNumber >= 1 && selectedNumber <= 15) {
      setNumber(selectedNumber);
      const newTable = Array.from({ length: 15 }, (_, i) => ({
        multiplicand: i + 1,
        result: (i + 1) * selectedNumber,
      }));
      setTable(newTable);
      const answers = newTable.map(row => row.result);
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      setUserAnswers({});
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShuffledAnswers([...shuffledAnswers].sort(() => Math.random() - 0.5));
  };

  const handleDragStart = (e, answer) => {
    console.log(e, answer, "e,answer");
    e.dataTransfer.setData('text/plain', answer);
  };

  const handleDrop = (e, index, correctResult) => {
    e.preventDefault();
    const droppedAnswer = parseInt(e.dataTransfer.getData('text/plain'));
    setUserAnswers(prev => ({
      ...prev,
      [index]: { answer: droppedAnswer, correct: droppedAnswer === correctResult },
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const toggleFullscreen = () => {
    const fullScreenElem = document.getElementById('enable-full-screen');
    if (!document.fullscreenElement) {
      fullScreenElem?.requestFullscreen?.();
      fullScreenElem?.webkitRequestFullscreen?.();
      fullScreenElem?.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
      document.webkitExitFullscreen?.();
      document.msExitFullscreen?.();
    }
  };

  const handleShowTheTable = () => {
    setShowTabel(!showTable);
  };

  const getAnswerClass = (userAnswer) => {
    if (!userAnswer) return styles.answerField;
    return `${styles.answerField} ${userAnswer.correct ? styles.correct : styles.incorrect}`;
  };

  // Live class 
  const isTeacher = isLiveClass ? role_name === 'tutor' : true;


  return (
    <div className={styles.appWrapper} id="enable-full-screen">
      <div className={styles.container}>

        {/* ── Header (absolute — takes zero layout height) ── */}
        <div className={styles.headingContainer}>
        {isTeacher && (  <div className='flex gap-4'>
          {  <img
              src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/refereshIcon.png"
              alt="refresh"
              onClick={handleReset}
              className={styles.resetIcon}
            />}
            <p
              className={styles.showTablebtn}
              style={{ display: showTable ? 'none' : 'block' }}
              onClick={handleShowTheTable}
            >
              Select Table
            </p>
          </div>)}

          {!isLiveClass && (<div className={styles.topRight}>

            <img
              src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png"
              alt="full-screen"
              className={styles.fullscreenIcon}
              onClick={toggleFullscreen}
            />
          </div>)}
        </div>

        {/* ── Body (owns 100% of container height) ── */}
        <div className={styles.body}>

          {/* Instruction */}
          <p className={styles.instruction}>Drag the correct answers</p>

          {/* Answer Bank */}
          <div className={styles.answerBox}>
            {shuffledAnswers.map((answer, index) => (
              <div
                key={index}
                className={styles.answerCard}
                draggable
                onDragStart={(e) => handleDragStart(e, answer)}
              >
                {answer}
              </div>
            ))}
          </div>

          {/* Table Grid */}
          <div className={styles.tableBox}>

            {/* Left: 1–5 */}
            <div className={styles.tableSide}>
              {table.slice(0, 5).map((row, index) => (
                <div
                  key={index}
                  className={styles.tableCard}
                  onDrop={(e) => handleDrop(e, index, row.result)}
                  onDragOver={handleDragOver}
                >
                  {number} x {row.multiplicand} ={' '}
                  <span className={getAnswerClass(userAnswers[index])}>
                    {userAnswers[index]?.answer || ''}
                  </span>
                </div>
              ))}
            </div>

            {/* Middle: 6–10 */}
            <div className={styles.tableSide}>
              {table.slice(5, 10).map((row, index) => (
                <div
                  key={index + 5}
                  className={styles.tableCard}
                  onDrop={(e) => handleDrop(e, index + 5, row.result)}
                  onDragOver={handleDragOver}
                >
                  {number} x {row.multiplicand} ={' '}
                  <span className={getAnswerClass(userAnswers[index + 5])}>
                    {userAnswers[index + 5]?.answer || ''}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: 11–15 */}
            <div className={styles.tableSide}>
              {table.slice(10, 15).map((row, index) => (
                <div
                  key={index + 10}
                  className={styles.tableCard}
                  onDrop={(e) => handleDrop(e, index + 10, row.result)}
                  onDragOver={handleDragOver}
                >
                  {number} x {row.multiplicand} ={' '}
                  <span className={getAnswerClass(userAnswers[index + 10])}>
                    {userAnswers[index + 10]?.answer || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Table Selector Panel */}
          {showTable && (
            <div className={styles.tableSelectBox}>
              <span className="h5-large">Choose tables</span>
              <div className={styles.tableSelectBoxTwo}>
                <img
                  src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/closebtnTable.svg"
                  alt="close"
                  className={styles.closeBtn}
                  onClick={handleShowTheTable}
                />
                {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
                  <div
                    key={num}
                    className={`${styles.tableSelectCard} ${num === number ? styles.selected : ''}`}
                    onClick={() => generateTable(num)}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TimesTable;