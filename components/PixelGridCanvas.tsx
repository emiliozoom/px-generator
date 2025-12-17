"use client";

const GRID_COLS = 12;
const GRID_ROWS = 8;
const CELL_SIZE = 40;

// Tamaño de un módulo LED (en celdas)
const MODULE_COLS = 2;
const MODULE_ROWS = 2;

// Lista de módulos (posición en celdas)
const modules = [
  { id: 1, x: 0, y: 0 },
  { id: 2, x: 2, y: 0 },
  { id: 3, x: 0, y: 2 },
  { id: 4, x: 2, y: 2 },
];

export default function PixelGridCanvas() {
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
          border: "2px solid #2a2a2a",
          background: "#0e1117",
        }}
      >
        {/* GRID */}
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

        {/* MÓDULOS LED */}
        {modules.map((mod) => (
          <div
            key={mod.id}
            style={{
              position: "absolute",
              left: mod.x * CELL_SIZE,
              top: mod.y * CELL_SIZE,
              width: MODULE_COLS * CELL_SIZE,
              height: MODULE_ROWS * CELL_SIZE,
              background: "rgba(0, 180, 255, 0.35)",
              border: "2px solid #00b4ff",
              boxSizing: "border-box",
            }}
          />
        ))}
      </div>
    </div>
  );
}
