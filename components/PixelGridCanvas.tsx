"use client";

const GRID_COLS = 12;
const GRID_ROWS = 8;
const CELL_SIZE = 40; // px visuales por celda

export default function PixelGridCanvas() {
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
          border: "2px solid #2a2a2a",
          background: "#0e1117",
        }}
      >
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
          <div
            key={i}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              border: "1px solid #1f2933",
              boxSizing: "border-box",
            }}
          />
        ))}
      </div>
    </div>
  );
}
