import "./globals.css";

export const metadata = {
  title: "AIFR Workspace",
  description: "Face Recognition Matrix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}