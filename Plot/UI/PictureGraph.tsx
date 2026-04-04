import React, { useRef, useState, useEffect } from "react";
import { usePlotContext } from "../context/PlotContext";
import { PortalDropdown, useDropdown, useContainerSize } from "./Graphutils";

// ── Static config maps (outside component — never re-created) ────


const Y_OPTIONS = [0, 1, 2, 3, 4];
const MAX_ICONS = 4;

const PictureGraph = () => {
  const { pictureGraph, teamCounts, setTeamCounts, IMAGE_MAP, CATEGORY_CONFIG, role_Name, isLiveClass } = usePlotContext();

  const config = CATEGORY_CONFIG[pictureGraph] ?? CATEGORY_CONFIG["Ice Cream"];
  const images = IMAGE_MAP[pictureGraph] ?? IMAGE_MAP["Ice Cream"];


  const [noticaleIndex, setNoticaleIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset counts when category changes
  useEffect(() => {
    setTeamCounts(Array(config.rows.length).fill(0));
  }, [pictureGraph, config.rows.length]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  },
    [],);

  // Dropdown
  const { openIndex, toggle, close, triggerRefs } = useDropdown(
    config.rows.length,
  );

  // Responsive size
  const containerRef = useRef<HTMLDivElement>(null);
  const { w, h } = useContainerSize(containerRef);

  // ── Layout budget ────────────────────────────────────────────
  // table: 38%  |  gap  |  picture chart: rest
  const OUTER_PAD = 16;
  const GAP = 12;
  const usableH = Math.max(10, h - OUTER_PAD - GAP);

  const numRows = config.rows.length;
  const tableH = usableH * 0.4;
  const chartH = usableH * 0.6;

  const headerH = tableH * 0.27;
  const rowH = (tableH - headerH) / numRows;

  const contentW = Math.min(w - 24, 520);
  const fs = Math.max(18, Math.min(13, rowH * 0.45));

  // Icon size: fit MAX_ICONS icons per row inside chart height
  const CHART_PAD = Math.max(8, chartH * 0.04);
  const ROW_LABEL_W = contentW * 0.28;
  const iconAreaW = contentW - ROW_LABEL_W - CHART_PAD * 2;
  const iconAreaH = chartH / numRows;
  const iconSize = Math.max(
    18,
    Math.min(
      Math.floor(iconAreaW / (MAX_ICONS + 1)),
      Math.floor(iconAreaH * 0.75),
    ),
  );
  const chartRowH = chartH / numRows;
  const chartFs = Math.max(18, Math.min(13, chartRowH * 0.3));

  const dropH = Math.max(16, rowH * 0.72);
  const dropW = Math.min(120, contentW * 0.3);

  const handleSelect = (index: number, value: string) => {
    const u = [...teamCounts];
    u[index] = Number(value);
    setTeamCounts(u);
  };

  const selectIconHandler = (rowIndex: number, iconIndex: number) => {
    setNoticaleIndex(rowIndex);
    const u = [...teamCounts];
    u[rowIndex] = Y_OPTIONS[iconIndex];
    setTeamCounts(u);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setNoticaleIndex(null), 1000);
  };

  const isAcess = isLiveClass ? role_Name === "tutor" : true

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        gap: GAP,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ══ TABLE ════════════════════════════════════════════════ */}
      <div
        style={{
          width: contentW,
          height: tableH,
          flexShrink: 0,
          border: "2px solid #0077BC",
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", height: headerH, flexShrink: 0 }}>
          {config.headers.map((val, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "linear-gradient(to bottom, #00A9D8, #93F6FF)",
                fontWeight: 700,
                fontSize: fs + 1,
                borderRight: i === 0 ? "1px solid #0077BC" : undefined,
                borderRadius: i === 0 ? "8px 0 0 0" : "0 8px 0 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textAlign: "center",
                padding: "0 4px",
              }}
            >
              {val}
            </div>
          ))}
        </div>

        {/* Rows */}
        {config.rows.map((row, index) => {
          const isLast = index === numRows - 1;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                height: rowH,
                flexShrink: 0,
                borderBottom: isLast ? "none" : "1px solid #0077BC",
              }}
            >
              {/* Label */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#BBF8FF",
                  borderRight: "1px solid #0077BC",
                  fontSize: fs,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  borderBottomLeftRadius: isLast ? 8 : 0,
                }}
              >
                {row}
              </div>

              {/* Dropdown */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#BBF8FF",
                  borderBottomRightRadius: isLast ? 8 : 0,
                }}
              >
                <div
                  ref={(el) => {
                    triggerRefs.current[index] = el;
                  }}
                  style={{ position: "relative", width: dropW }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: dropH,
                      backgroundColor:
                        noticaleIndex === index ? "#FECACA" : "#EDFCFF",
                      border: `1px solid ${noticaleIndex === index ? "#EF4444" : "#0077BC"}`,
                      borderRadius: 6,
                      padding: "0 8px",
                      cursor: "pointer",
                      fontSize: fs,
                      userSelect: "none",
                    }}
                    onClick={(e) => {
                      if (!isAcess) {
                        return;
                      }
                      e.stopPropagation();
                      toggle(index);
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{teamCounts[index]}</span>
                    <img
                      src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/dropDownIcon.svg"
                      alt="▾"
                      style={{
                        width: 11,
                        height: 11,
                        flexShrink: 0,
                        transform:
                          openIndex === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </div>

                  {openIndex === index && (
                    <PortalDropdown
                      triggerRef={{
                        current: triggerRefs.current[index] as HTMLDivElement,
                      }}
                      options={Y_OPTIONS}
                      fs={fs}
                      onSelect={(val) => handleSelect(index, String(val))}
                      onClose={close}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ PICTURE CHART ════════════════════════════════════════ */}
      <div
        style={{
          width: contentW,
          height: chartH,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", marginBottom: 2, textAlign: "center" }}>
          <div
            style={{
              width: ROW_LABEL_W,
              flexShrink: 0,
              fontSize: fs,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {config.headers[0]}
          </div>
          <div
            style={{
              flex: 1,
              fontSize: fs,
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {config.headers[1]}
          </div>
        </div>

        {/* Data rows */}
        {config.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              // height: chartRowH,
              alignItems: "center",
              borderTop: rowIndex === 0 ? "1px solid #0077BC" : undefined,
              borderBottom: "1px solid #0077BC",
              border: "1px solid #0077BC",
            }}
          >
            {/* Row label */}
            <div
              style={{
                width: ROW_LABEL_W,
                flexShrink: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#BBF8FF",
                borderRight: "1px solid #0077BC",
                fontSize: chartFs,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                padding: "0 4px",
              }}
            >
              {row}
            </div>

            {/* Icons */}
            <div
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#E0FBFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                padding: "2px 4px",
              }}
            >
              {[...Array(MAX_ICONS)].map((_, iconIdx) => (
                <div
                  key={iconIdx}
                  onClick={() => {
                    if (!isAcess) {
                      return;
                    }
                    selectIconHandler(rowIndex, iconIdx + 1)
                  }

                  }
                  style={{
                    width: iconSize,
                    height: iconSize,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={
                      iconIdx < Number(teamCounts[rowIndex])
                        ? images.colour
                        : images.faded
                    }
                    alt="icon"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureGraph;
