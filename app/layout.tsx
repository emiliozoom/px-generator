export const metadata = {
  title: "PX Generator",
  description: "LED Pixel Grid Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0e0e11",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
