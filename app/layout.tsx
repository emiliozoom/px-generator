import "./globals.css";

export const metadata = {
  title: "PX Generator",
  description: "LED Pixel Grid Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0d12", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
