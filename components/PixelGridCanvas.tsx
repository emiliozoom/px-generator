"use client";

import { useState } from "react";

const GRID_COLS = 16;
const GRID_ROWS = 10;
const CELL = 48;

type FlowMode = "HORIZONTAL" | "VERTICAL";

type Cell = {
  x: number;
  y: number;
  active: boolean;
};

export default function PixelGridCanvas() {
  const [flowMode, setFlowMode] = useState<FlowMode>("HORIZONTAL");
  const [cells, setCells] = useState<Cell[]>(() => {
    const arr: Cell[] = [];
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        arr.push({ x, y, active: x < 4 && y < 2 });
      }
    }
    return arr;
  });

  function toggleCell(x: number, y: number) {
    setCells((prev) =>
      prev.map((c) =>
        c.x === x && c.y === y ? { ...c, active: !c.active } : c
      )
    );
  }

  function getActiveCells() {
    return cells.filter((c) => c.active);
  }

  function getFlowPath() {
    const active = getActiveCells();
    if (!active.length) return [];

    const path: Cell[] = [];

    if (flowMode === "HORIZONTAL") {
      const rows = [...new Set(active.map((c) => c.y))].sort((a, b) => a - b);

      rows.forEach((row, idx) => {
        const rowCells = active
          .filter((c) => c.y === row)
          .sort((a, b) => a.x - b.x);

        if (idx % 2 === 1) rowCells.reverse();
        path.push(...rowCells);
      });
    } else {
      const cols = [...new Set(active.map((c) => c.x))].sort((a, b) => a - b);

      cols.forEach((col, idx) => {
        const colCells = active
          .filter((c) => c.x === col)
          .sort((a, b) => a.y - b.y);

        if (idx % 2 === 1) colCells.reverse();
        path.push(...colCells);
      });
    }

    return path;
  }

  const flow = getFlowPath();

  function getIndex(x: number, y: number) {
    const idx = flow.findIndex((c) => c.x === x && c.y === y);
    return idx === -1 ? null : idx + 1;
  }

  return (
    <div>
      {/* CONTROLS */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setFlowMode("HORIZONTAL")}
          style={{
            marginRight: 8,
            background: flowMode === "HORIZONTAL" ? "#0ff" : "#222",
          }}
        >
          Flow A ↔
        </button>
        <button
          onClick={() => setFlowMode("VERTICAL")}
          style={{
            background: flowMode === "VERTICAL" ? "#0ff" : "#222",
          }}
        >
          Flow B ↕
        </button>
      </div>

      {/* GRID */}
      <div
        style={{
          position: "relative",
          width: GRID_COLS * CELL,
          height: GRID_ROWS * CELL,
          background: "#0b0f14",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL}px)`,
        }}
      >
        {cells.map((c) => {
          const index = getIndex(c.x, c.y);
          const isIn = index === 1;
          const isOut = index === flow.length && index !== null;

          let bg = "transparent";
          if (c.active) bg = "#0ea5e9aa";
          if (isIn) bg = "#22c55e";
          if (isOut) bg = "#ef4444";

          return (
            <div
              key={`${c.x}-${c.y}`}
              onClick={() => toggleCell(c.x, c.y)}
              style={{
                width: CELL,
                height: CELL,
                boxSizing: "border-box",
                border: "1px solid #1f2937",
                background: bg,
                color: "white",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {index && <span>{index}</span>}
              {isIn && (
                <span style={{ position: "absolute", top: 2, left: 2 }}>
                  IN
                </span>
              )}
              {isOut && (
                <span style={{ position: "absolute", bottom: 2, right: 2 }}>
                  OUT
                </span>
              )}
            </div>
          );
        })}

        {/* FLOW SVG */}
        <svg
          width={GRID_COLS * CELL}
          height={GRID_ROWS * CELL}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
            </marker>
          </defs>

          {flow.map((c, i) => {
            const next = flow[i + 1];
            if (!next) return null;

            return (
              <line
                key={i}
                x1={c.x * CELL + CELL / 2}
                y1={c.y * CELL + CELL / 2}
                x2={next.x * CELL + CELL / 2}
                y2={next.y * CELL + CELL / 2}
                stroke="white"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
