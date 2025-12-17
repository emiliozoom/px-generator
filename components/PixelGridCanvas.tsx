"use client";

import { useState } from "react";

type Cell = {
  x: number;
  y: number;
};

const COLS = 16;
const ROWS = 10;

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

  function unique(values: number[]) {
    const r: number[] = [];
    values.forEach((v) => !r.includes(v) && r.push(v));
    return r;
  }

  function buildFlow() {
    if (!activeCells.length) return [];

    const result: Cell[] = [];

    if (flowMode === "HORIZONTAL") {
      const rows = unique(activeCells.map((c) => c.y)).sort((a, b) => a - b);

      rows.forEach((row, i) => {
        let cells = activeCells
          .filter((c) => c.y === row)
          .sort((a, b) => a.x - b.x);

        if (i % 2 === 1) cells.reverse();
        result.push(...cells);
      });
    } else {
      const cols = unique(activeCells.map((c) => c.x)).sort((a, b) => a - b);

      cols.forEach((col, i) => {
        let cells = activeCells
          .filter((c) => c.x === col)
          .sort((a, b) => a.y - b.y);

        if (i % 2 === 1) cells.reverse();
        result.push(...cells);
      });
    }

    return result;
  }

  const flow = buildFlow();

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() =>
          setFlowMode(flowMode === "HORIZONTAL" ? "VERTICAL" : "HORIZONTAL")
        }>
          Cambiar Flow ({flowMode})
        </button>

        <span style={{ marginLeft: 16 }}>
          Seleccionados: {activeCells.length}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 36px)`,
          gap: 4,
          background: "#020617",
          padding: 12,
        }}
      >
        {Array.from({ length: ROWS }).map((_, y) =>
          Array.from({ length: COLS }).map((_, x) => {
            const active = activeCells.some(
              (c) => c.x === x && c.y === y
            );

            const index = flow.findIndex(
              (c) => c.x === x && c.y === y
            );

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => toggleCell(x, y)}
                style={{
                  width: 36,
                  height: 36,
                  background: active ? "#22c55e" : "#0f172a",
                  border: "2px solid #1e293b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "#e5e7eb",
                  userSelect: "none",
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
