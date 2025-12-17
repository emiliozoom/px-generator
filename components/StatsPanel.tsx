type StatsProps = {
  moduleCols: number;
  moduleRows: number;
  modulePixelWidth: number;
  modulePixelHeight: number;
  modulesCount: number;
};

export default function StatsPanel({
  moduleCols,
  moduleRows,
  modulePixelWidth,
  modulePixelHeight,
  modulesCount,
}: StatsProps) {
  const totalPixelWidth = moduleCols * modulePixelWidth;
  const totalPixelHeight = moduleRows * modulePixelHeight;

  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        background: "#0b1220",
        border: "1px solid #1f2937",
        borderRadius: 6,
        color: "#e5e7eb",
        width: 320,
      }}
    >
      <h3 style={{ marginBottom: 12 }}>📊 Screen Stats</h3>

      <p>Módulos totales: <b>{modulesCount}</b></p>
      <p>Resolución: <b>{totalPixelWidth} × {totalPixelHeight} px</b></p>
      <p>Relación: <b>{(totalPixelWidth / totalPixelHeight).toFixed(2)} : 1</b></p>
      <p>Módulo: <b>{modulePixelWidth} × {modulePixelHeight} px</b></p>
    </div>
  );
}
