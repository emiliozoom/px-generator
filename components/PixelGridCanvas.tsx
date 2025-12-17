"use client";

import { useState } from "react";
import StatsPanel from "./StatsPanel";

type Module = {
  id: number;
};

export default function PixelGridCanvas() {
  // GRID SIZE (por ahora fijo, luego será dinámico)
  const moduleCols = 4;
  const moduleRows = 4;

  // EJEMPLO REAL LED
  // Módulo: 1m alto x 0.5m ancho
  // Resolución módulo: 128 x 256 px
  const modulePixelWidth = 128;
  const modulePixelHeight = 256;

  const [modules, setModules] = useState<Module[]>(
    Array.from({ length: moduleCols * moduleRows }, (_, i) => ({
      id: i,
    }))
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
      }}
    >
      {/* PIXEL GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${moduleCols}, 80px)`,
          gridTemplateRows: `repeat(${moduleRows}, 80px)`,
          gap: 4,
          padding: 8,
          background: "#020617",
          border: "1px solid #1f2937",
        }}
      >
        {modules.map((mod) => (
          <div
            key={mod.id}
            style={{
              width: 80,
              height: 80,
              background: "#0f172a",
              border: "1px solid #334155",
            }}
          />
        ))}
      </div>

      {/* STATS PANEL */}
      <StatsPanel
        moduleCols={moduleCols}
        moduleRows={moduleRows}
        modulePixelWidth={modulePixelWidth}
        modulePixelHeight={modulePixelHeight}
        modulesCount={modules.length}
      />
    </div>
  );
}
