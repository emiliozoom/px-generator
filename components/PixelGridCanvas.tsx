"use client";

import { useState, useRef } from "react";
import ModuleTile from "./ModuleTile";
import StatsPanel from "./StatsPanel";
import { toPng } from "html-to-image";

const SCALE = 0.25;

export default function PixelGridCanvas() {
  // Resolución total de la pantalla LED
  const screenWidthPx = 768;
  const screenHeightPx = 512;

  const [modules, setModules] = useState<any[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  function addModule() {
    const widthPx = 128;
    const heightPx = 256;

    let x = 0;
    let y = 0;

    for (const m of modules) {
      x = m.x + m.widthPx;
      if (x + widthPx > screenWidthPx) {
        x = 0;
        y += heightPx;
      }
    }

    if (y + heightPx > screenHeightPx) return;

    setModules([
      ...modules,
      {
        id: crypto.randomUUID(),
        widthPx,
        heightPx,
        x,
        y,
      },
    ]);
  }

  async function exportPNG() {
    if (!gridRef.current) return;
    const dataUrl = await toPng(gridRef.current);
    const link = document.createElement("a");
    link.download = "px-generator.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={addModule}>+ Add Module</button>
          <button onClick={exportPNG}>Export PNG</button>
        </div>

        <div
          ref={gridRef}
          style={{
            marginTop: 12,
            width: screenWidthPx * SCALE,
            height: screenHeightPx * SCALE,
            position: "relative",
            background: "#0e0e11",
            border: "1px solid #333",
            backgroundImage:
              "linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          {modules.map((m) => (
            <ModuleTile
              key={m.id}
              m={m}
              scale={SCALE}
              onRemove={() =>
                setModules(modules.filter((x) => x.id !== m.id))
              }
            />
          ))}
        </div>
      </div>

      <StatsPanel modules={modules} />
    </>
  );
}
