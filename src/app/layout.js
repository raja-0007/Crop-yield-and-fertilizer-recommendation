
import "./globals.css";


export const metadata = {
  title: "Agro",
  description: "crop yield and fertilizer recommendation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
