"use client";

export default function ModuleTile({
  m,
  scale,
  onRemove,
}: {
  m: any;
  scale: number;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: m.x * scale,
        top: m.y * scale,
        width: m.widthPx * scale,
        height: m.heightPx * scale,
        background: "#1b3c59",
        border: "1px solid #4fa3ff",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onRemove}
        style={{
          position: "absolute",
          top: 2,
          right: 2,
          background: "#ff3b3b",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
