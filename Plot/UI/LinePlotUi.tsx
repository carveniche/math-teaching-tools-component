import React, { useRef, useState, useEffect } from 'react';
import { usePlotContext } from '../context/PlotContext';
import { PortalDropdown, useDropdown, useContainerSize } from './Graphutils';

const Y_OPTIONS = [0, 1, 2, 3, 4];
const MAX_MARKS = 4;

const LinePlotUi = () => {
  const { lineText, xMarkers, role_Name, isLiveClass, teamCountsLine, setTeamCountsLine } = usePlotContext();

  const heightMulti = isLiveClass ? 0.50 : 0.40
  // const [teamCounts, setTeamCounts] = useState<number[]>(Array(xMarkers.length).fill(0));
  const [noticaleIndex, setNoticaleIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openIndex, toggle, close, triggerRefs } = useDropdown(xMarkers.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const { w, h } = useContainerSize(containerRef);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  // ── Layout ────────────────────────────────────────────────────
  const GAP = 20;
  const OUTER_PAD = 16;
  const usableH = Math.max(60, h - OUTER_PAD - GAP);
  const tableH = usableH * heightMulti;
  const chartH = usableH * heightMulti;
  const numRows = xMarkers.length;
  const headerH = tableH * 0.27;
  const rowH = (tableH - headerH) / numRows;
  const contentW = Math.min(w - 24, 520);
  const fs = Math.max(9, Math.min(13, rowH * 0.45));
  const dropH = Math.max(16, rowH * 0.72);
  const dropW = Math.min(120, contentW * 0.30);

  // ── Chart pixel geometry (all explicit, no flex magic) ────────
  const CP = Math.max(6, chartH * 0.04);   // chart padding top/sides
  const AXIS_Y = chartH - CP - 36;             // y-position of axis line from top of chart box
  // 36px reserved below axis: 6 tick + 16 label + 14 title
  const TICK_H = 6;
  const LABEL_H = 16;
  const TITLE_H = 14;
  const PLOT_H = AXIS_Y - CP;                  // height available for marks above axis
  const markSize = Math.max(12, Math.min(30, Math.floor(PLOT_H / MAX_MARKS) - 2));
  const chartFs = Math.max(9, Math.min(12, markSize * 0.65));
  const colW = (contentW - CP * 2) / xMarkers.length;

  const handleSelect = (index: number, value: number) => {
    const u = [...teamCountsLine]; u[index] = value; setTeamCountsLine(u);
  };

  const handleMarkClick = (colIdx: number, markRank: number) => {
    // markRank: 1 = bottom mark, MAX_MARKS = top mark
    setNoticaleIndex(colIdx);
    const u = [...teamCountsLine]; u[colIdx] = markRank; setTeamCountsLine(u);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setNoticaleIndex(null), 1000);
  };
  const isAcess = isLiveClass ? role_Name === "tutor" : true

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%', width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent:"center",
        padding: '8px 0', gap: GAP, boxSizing: 'border-box', overflow: 'hidden',
      }}
    >
      {/* ══ TABLE ════════════════════════════════════════════════ */}
      <div style={{
        width: contentW, height: tableH, flexShrink: 0,
        border: '2px solid #0077BC', borderRadius: 10,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', height: headerH, flexShrink: 0 }}>
          {Object.values(lineText).map((val, i) => (
            <div key={i} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundImage: 'linear-gradient(to bottom, #00A9D8, #93F6FF)',
              fontWeight: 700, fontSize: fs + 1,
              borderRight: i === 0 ? '1px solid #0077BC' : undefined,
              borderRadius: i === 0 ? '8px 0 0 0' : '0 8px 0 0',
              whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center', padding: '0 4px',
            }}>
              {val}
            </div>
          ))}
        </div>

        {/* Rows */}
        {xMarkers.map((row, index) => {
          const isLast = index === numRows - 1;
          return (
            <div key={index} style={{
              display: 'flex', height: rowH, flexShrink: 0,
              borderBottom: isLast ? 'none' : '1px solid #0077BC',
            }}>
              {/* Label */}
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#BBF8FF', borderRight: '1px solid #0077BC',
                fontSize: fs, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                borderBottomLeftRadius: isLast ? 8 : 0,
              }}>
                {row}
              </div>

              {/* Custom dropdown */}
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#BBF8FF', borderBottomRightRadius: isLast ? 8 : 0,
              }}>
                <div
                  ref={el => { triggerRefs.current[index] = el; }}
                  style={{ position: 'relative', width: dropW }}
                  onClick={e => e.stopPropagation()}
                >
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      height: dropH,
                      backgroundColor: noticaleIndex === index ? '#FECACA' : '#EDFCFF',
                      border: `1px solid ${noticaleIndex === index ? '#EF4444' : '#0077BC'}`,
                      borderRadius: 6, padding: '0 8px', cursor: 'pointer',
                      fontSize: fs, userSelect: 'none',
                    }}
                    onClick={e => {
                      if (!isAcess) {
                        return;
                      }
                      e.stopPropagation();
                      toggle(index);
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{teamCountsLine[index]}</span>
                    <img
                      src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/dropDownIcon.svg'
                      alt='▾'
                      style={{
                        width: 11, height: 11, flexShrink: 0,
                        transform: openIndex === index ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </div>
                  {openIndex === index && (
                    <PortalDropdown
                      triggerRef={{ current: triggerRefs.current[index] as HTMLDivElement }}
                      options={Y_OPTIONS}
                      fs={fs}
                      onSelect={val => handleSelect(index, val as number)}
                      onClose={close}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ LINE PLOT CHART ══════════════════════════════════════
          Uses position:relative + absolute children so every
          element lands at an exact pixel — no flex alignment surprises.
      ══════════════════════════════════════════════════════════ */}
      <div style={{
        width: contentW,
         height: chartH,
          flexShrink: 0,
        backgroundColor: '#BBF8FF', border: '2px solid #06b6d4',
        borderRadius: 16, boxSizing: 'border-box',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* ── Marks columns ── */}
        {xMarkers.map((label, colIdx) => {
          const colLeft = CP + colIdx * colW;
          const count = teamCountsLine[colIdx];

          return (
            <React.Fragment key={colIdx}>
              {/* X marks — rendered bottom-up above the axis */}
              {[...Array(MAX_MARKS)].map((_, i) => {
                // i=0 → bottom-most mark (rank 1), i=MAX_MARKS-1 → top mark
                const rank = i + 1;                         // 1..4
                const filled = rank <= count;
                const step = PLOT_H / MAX_MARKS;
                const markTop = AXIS_Y - (i + 1) * step + (step - markSize) / 2;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (!isAcess) {
                        return;
                      }
                      handleMarkClick(colIdx, rank)
                    }}
                    style={{
                      position: 'absolute',
                      top: markTop,
                      left: colLeft + colW / 2 - markSize / 2,
                      width: markSize, 
                      height: markSize,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: markSize * 1, fontWeight: 900,
                      cursor: 'pointer', color: filled ? '#dc2626' : '#d1d5db',
                      userSelect: 'none', lineHeight: 1,
                    }}
                  >
                    ✕
                  </div>
                );
              })}

              {/* Tick below axis */}
              <div style={{
                position: 'absolute',
                top: AXIS_Y + 2,
                left: colLeft + colW / 2 - 1,
                width: 2,
                height: TICK_H,
                backgroundColor: '#dc2626',
              }} />

              {/* Category label */}
              <div style={{
                position: 'absolute',
                top: AXIS_Y + 2 + TICK_H,
                left: colLeft,
                width: colW,
                height: LABEL_H,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: chartFs,
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </div>
            </React.Fragment>
          );
        })}

        {/* ── Axis line ── */}
        <div style={{
          position: 'absolute',
          top: AXIS_Y,
          left: CP - 4,
          right: CP - 4,
          height: 2,
          backgroundColor: '#dc2626',
        }} />

        {/* Left arrow */}
        <img
          src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/leftArrow.png'
          alt=''
          style={{ position: 'absolute', top: AXIS_Y - 5, left: CP - 8, width: 8 }}
        />
        {/* Right arrow */}
        <img
          src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/rightArrow.png'
          alt=''
          style={{ position: 'absolute', top: AXIS_Y - 5, right: CP - 8, width: 8 }}
        />

        {/* X-axis title */}
        <div style={{
          position: 'absolute',
          top: AXIS_Y + 2 + TICK_H + LABEL_H,
          left: 0,
          right: 0,
          height: TITLE_H,
          textAlign: 'center',
          fontSize: chartFs,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {lineText.xlavel}
        </div>
      </div>
    </div>
  );
};

export default LinePlotUi;