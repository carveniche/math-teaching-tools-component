import React, { useRef, useState, useEffect } from 'react';
import { usePlotContext } from '../context/PlotContext';
// ✅ replaced local DropdownPortal + ReactDOM import with shared utilities
import { PortalDropdown, useDropdown, useContainerSize } from './Graphutils';

// ── Main BarGraph ────────────────────────────────────────────────
const BarGraph = () => {
  const { xMarkersBarPlot, barLineText, yMarkersBarPlot, role_Name, isLiveClass,
    filledUpTo, setFilledUpTo,
    teamCountsBar, setTeamCountsBar

  } = usePlotContext();



  const [noticaleIndex, setNoticaleIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ replaces: local [openIndex, setOpenIndex], triggerRefs, outside-click useEffect
  const { openIndex, toggle, close, triggerRefs } = useDropdown(xMarkersBarPlot.length);

  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ replaces: local [size, setSize] + ResizeObserver useEffect
  const { w, h } = useContainerSize(containerRef);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);
  const heightMulti = isLiveClass ? 0.50 : 0.40
  // Height budget
  const OUTER_PAD = 16;
  const GAP = 20;
  const XAXIS_H = 38;
  const usableH = Math.max(10, h - OUTER_PAD - GAP - XAXIS_H);
  const tableH = usableH * heightMulti;
  const chartH = usableH * heightMulti;
  const numRows = xMarkersBarPlot.length;
  const headerH = tableH * 0.28;
  const rowH = (tableH - headerH) / numRows;
  const contentW = Math.min(w - 24, 520);
  const fs = Math.max(9, Math.min(13, rowH * 0.45));
  const largest = Math.max(...yMarkersBarPlot);
  const ySteps = yMarkersBarPlot.length - 1;
  const yLabelW = largest >= 100 ? 42 : largest >= 10 ? 30 : 22;
  const colors = ['#f54a0c', '#3b82f6', '#ABCF1B', '#cf561b'];
  const dropH = Math.max(16, rowH * 0.72);
  const dropW = Math.min(120, contentW * 0.30);

  const handleSelect = (index: number, value: number | string) => {
    const val = Number(value);
    const si = yMarkersBarPlot.findIndex(v => v === val);
    const u = [...filledUpTo]; u[index] = si; setFilledUpTo(u);
    const c = [...teamCountsBar]; c[index] = val; setTeamCountsBar(c);
  };

  const handleClick = (xIdx: number, yIdx: number) => {
    const u = [...filledUpTo]; u[xIdx] = yIdx + 1; setFilledUpTo(u);
    const c = [...teamCountsBar]; c[xIdx] = yMarkersBarPlot[yIdx + 1]; setTeamCountsBar(c);
    setNoticaleIndex(xIdx);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setNoticaleIndex(null), 1000);
  };

  const isAcess = isLiveClass ? role_Name === "tutor" : true
  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        padding: '8px 0',
        gap: GAP,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ══ TABLE ═══════════════════════════════════════════════ */}
      <div
        style={{
          width: contentW,
          height: tableH,
          flexShrink: 0,
          border: '2px solid #0077BC',
          borderRadius: 10,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', height: headerH, flexShrink: 0 }}>
          {Object.values(barLineText).map((val, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(to bottom, #00A9D8, #93F6FF)',
                fontWeight: 700,
                fontSize: fs + 2,
                borderRight: i === 0 ? '1px solid #0077BC' : undefined,
                borderRadius: i === 0 ? '8px 0 0 0' : '0 8px 0 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {val}
            </div>
          ))}
        </div>

        {/* Rows */}
        {xMarkersBarPlot.map((row, index) => {
          const isLast = index === numRows - 1;
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                height: rowH,
                flexShrink: 0,
                borderBottom: isLast ? 'none' : '1px solid #0077BC',
              }}
            >
              {/* Label */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#BBF8FF',
                  borderRight: '1px solid #0077BC',
                  fontSize: fs + 4,
                  fontWeight: "500",
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  borderBottomLeftRadius: isLast ? 8 : 0,
                }}
              >
                {row}
              </div>

              {/* Dropdown trigger */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#BBF8FF',
                  borderBottomRightRadius: isLast ? 8 : 0,
                }}
              >
                {/* ✅ same ref pattern — portal reads this to position itself */}
                <div
                  ref={el => { triggerRefs.current[index] = el; }}
                  style={{ position: 'relative', width: dropW }}
                  onClick={e => e.stopPropagation()}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: dropH,
                      backgroundColor: noticaleIndex === index ? '#FECACA' : '#EDFCFF',
                      border: `1px solid ${noticaleIndex === index ? '#EF4444' : '#0077BC'}`,
                      borderRadius: 6,
                      padding: '0 8px',
                      cursor: 'pointer',
                      fontSize: fs + 4,
                      userSelect: 'none',
                    }}
                    onClick={e => {
                      if (!isAcess) {
                        return;
                      }
                      e.stopPropagation();
                      toggle(index); // ✅ replaces: setOpenIndex(openIndex === index ? null : index)
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>
                      {teamCountsBar[index] === -1 ? 0 : teamCountsBar[index]}
                    </span>
                    <img
                      src='https://d3g74fig38xwgn.cloudfront.net/teaching-tool/dropDownIcon.svg'
                      alt='▾'
                      style={{
                        width: 11,
                        height: 11,
                        flexShrink: 0,
                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </div>

                  {/* ✅ replaces local DropdownPortal with shared PortalDropdown */}
                  {openIndex === index && (
                    <PortalDropdown
                      triggerRef={{ current: triggerRefs.current[index] as HTMLDivElement }}
                      options={yMarkersBarPlot}
                      fs={fs + 4}
                      onSelect={val => handleSelect(index, val)}
                      onClose={close} // ✅ replaces: () => setOpenIndex(null)
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ BAR CHART ════════════════════════════════════════════ */}
      <div style={{ width: contentW, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', width: '100%', height: chartH }}>
          {/* Y-axis */}
          <div
            style={{
              width: yLabelW,
              flexShrink: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column-reverse',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingRight: 3,
              borderRight: '2px solid #111',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -(fs * 8),
                top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)',
                whiteSpace: 'nowrap',
                fontSize: fs + 2,
                fontWeight: "600",
                color: '#333',
                pointerEvents: 'none',
              }}
            >
              {barLineText.ylavelBarPlot}
            </div>
            <span style={{ fontSize: fs + 2, fontWeight: "600", color: '#333', lineHeight: 1 }}>0</span>
            {yMarkersBarPlot.slice(1).map(label => (
              <span
                key={label}
                style={{
                  fontSize: fs + 2, fontWeight: "600", color: '#333', lineHeight: 1,
                  height: `${100 / ySteps}%`,
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Bars */}
          <div style={{ flex: 1, height: '100%', display: 'flex', justifyContent: 'space-around', paddingLeft: 4 }}>
            {xMarkersBarPlot.map((_, xIdx) => (
              <div
                key={xIdx}
                style={{
                  flex: 1, maxWidth: 56, height: '100%',
                  display: 'flex', flexDirection: 'column-reverse', gap: 1,
                }}
              >
                {yMarkersBarPlot.slice(1).map((_, yIdx) => (
                  <div
                    key={yIdx}
                    onClick={() => {
                      if (!isAcess) {
                        return;
                      }
                      // setNoticaleIndex(xIdx);
                      handleClick(xIdx, yIdx);
                    }}
                    style={{
                      width: '90%', margin: '0 auto',
                      height: `${100 / ySteps}%`,
                      borderTopLeftRadius: 3, borderTopRightRadius: 3,
                      cursor: 'pointer',
                      backgroundColor: yIdx < filledUpTo[xIdx] ? colors[xIdx % colors.length] : '#9ca3af',
                      transition: 'background-color 0.25s',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* X-axis */}
        <div style={{ marginLeft: yLabelW, height: 2, backgroundColor: '#111' }} />
        <div style={{ marginLeft: yLabelW, display: 'flex', justifyContent: 'space-around', paddingTop: 3 }}>
          {xMarkersBarPlot.map((label, i) => (
            <div key={i} style={{ flex: 1, maxWidth: 56, textAlign: 'center', fontSize: fs + 2, fontWeight: "600", color: '#333', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: fs + 2, fontWeight: "600", color: '#333', marginTop: 2 }}>
          {barLineText.xlavelBarPlot}
        </div>
      </div>
    </div>
  );
};

export default BarGraph;