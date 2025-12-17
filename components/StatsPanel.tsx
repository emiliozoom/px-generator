"use client";

import { calculateStats } from "@/lib/calculations";

export default function StatsPanel({ modules }: { modules: any[] }) {
  const stats = calculateStats(modules);

  return (
    <div
      style={{
        minWidth: 220,
        background: "#12151c",
        padding: 12,
        border: "1px solid #2a2a2a",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Stats</h3>
      <p>Modules: {modules.length}</p>
      <p>
        Resolution: {stats.width} × {stats.height}px
      </p>
      <p>Total pixels: {stats.totalPixels.toLocaleString()}</p>
    </div>
  );
}
