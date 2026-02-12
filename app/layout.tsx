import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Spline Viewer (for 3D elements) */}
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.51/build/spline-viewer.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className={`${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
