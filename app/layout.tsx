import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.51/build/spline-viewer.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
