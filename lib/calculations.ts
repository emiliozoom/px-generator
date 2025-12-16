export function calculateStats(modules: any[]) {
  const width = Math.max(...modules.map((m) => m.x + m.widthPx), 0);
  const height = Math.max(...modules.map((m) => m.y + m.heightPx), 0);

  const totalPixels = modules.reduce(
    (acc, m) => acc + m.widthPx * m.heightPx,
    0
  );

  return {
    width,
    height,
    totalPixels,
  };
}
