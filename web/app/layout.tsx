import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpsRocket — OpenRocket, rewritten in Rust, validated to the last bit",
  description:
    "A bit-for-bit Rust reimplementation of the OpenRocket simulator core: 17/17 fixtures mass bit-exact, CP within 1 cm, −0.0% against a flown altimeter.",
  icons: { icon: "/favicon.ico" },
};

// Inline pre-paint script: reads the saved theme from localStorage and
// applies the data-theme attribute on <html> before the first CSS evaluation
// so there's no light-to-dark flicker. Source of truth is the workbench's
// bottom-right toggle (gui/src/lib/theme.ts); same-origin iframes share
// this localStorage key.
const themeBoot = `
(function(){
  try {
    var t = localStorage.getItem('opsrocket_theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
    addEventListener('storage', function(e){
      if (e.key === 'opsrocket_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
    });
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
