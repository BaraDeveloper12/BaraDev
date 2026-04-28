import "./globals.css";

export const metadata = {
  title: "AI Height Scanner",
  description: "Real-time body height scanner"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}