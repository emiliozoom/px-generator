"use client";

import { useState } from "react";

type Cell = {
  x: number;
  y: number;
};

const GRID_COLS = 16;
const GRID_ROWS = 10;

export default function PixelGridCanvas() {
  const [activeCells, setActiveCells] = useState<Cell[]>([]);
  const [flowMode, setFlowMode] = useState<"HORIZONTAL" | "VERTICAL">(
    "HORIZONTAL"
  );

  function toggleCell(x: number, y: number) {
    setActiveCells((prev) => {
      const exists = prev.find((c) => c.x === x && c.y === y);
      if (exists) {
        return prev.filter((c) => !(c.x === x && c.y === y));
      }
      return [...prev, { x, y }];
    });
  }

  function getActiveCells() {
    return [...activeCells];
  }

  function uniqueNumbers(values: number[]) {
    const result: number[] = [];
    for (const v of values) {
      if (!result.includes(v)) result.push(v);
    }
    return result;
  }

  function getFlowPath() {
    const active = getActiveCells();
    if (!active.length) return [];

    const path: Cell[] = [];

    if (flowMode === "HORIZONTAL") {
      const rows = uniqueNumbers(active.map((c) => c.y)).sort(
        (a, b) => a - b
      );

      rows.forEach((row, idx) => {
        let rowCells = active
          .filter((c) => c.y === row)
          .sort((a, b) => a.x - b.x);

        if (idx % 2 === 1) rowCells = rowCells.reverse();
        path.push(...rowCells);
      });
    } else {
      const cols = uniqueNumbers(active.map((c) => c.x)).sort(
        (a, b) => a - b
      );

      cols.forEach((col, idx) => {
        let colCells = active
          .filter((c) => c.x === col)
          .sort((a, b) => a.y - b.y);

        if (idx % 2 === 1) colCells = colCells.reverse();
        path.push(...colCells);
      });
    }

    return path;
  }

  const flowPath = getFlowPath();

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() =>
            setFlowMode(
              flowMode === "HORIZONTAL" ? "VERTICAL" : "HORIZONTAL"
            )
          }
        >
          Flow: {flowMode}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, 32px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 32px)`,
          gap: 2,
          background: "#0b0f14",
          padding: 10,
          width: "fit-content",
        }}
      >
        {Array.from({ length: GRID_ROWS }).map((_, y) =>
          Array.from({ length: GRID_COLS }).map((_, x) => {
            const active = activeCells.some(
              (c) => c.x === x && c.y === y
            );

            const index = flowPath.findIndex(
              (c) => c.x === x && c.y === y
            );

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => toggleCell(x, y)}
                style={{
                  width: 32,
                  height: 32,
                  background: active ? "#0ea5e9" : "#111827",
                  border: "1px solid #1f2933",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                {index >= 0 ? index + 1 : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
