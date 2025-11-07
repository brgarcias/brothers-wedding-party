import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import SiteHeader from "@/components/SiteHeader";
import CommonClient from "@/components/CommonClient";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dynamicFavicon = (colorScheme: "light" | "dark") => {
  const fill = colorScheme === "dark" ? "fff" : "000";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <style>
    path { fill: #${fill}; }
    @media (prefers-color-scheme: dark) { path { fill: #fff } }
    @media (prefers-color-scheme: light) { path { fill: #000 } }
  </style>

  <!-- L -->
  <path d="M45 40 v90 h50 v-12 h-38 v-78 z" />

  <!-- D (curva suave e elegante) -->
  <path d="
    M105 40 
    v90 
    h30 
    c20 0 35 -18 35 -45 
    s-15 -45 -35 -45 
    h-30 
    z
    M117 52 h18 
    c12 0 22 13 22 33 
    s-10 33 -22 33 
    h-18 
    v-66 
    z
  " />

</svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const metadata: Metadata = {
  manifest: "favicon/manifest.json",
  icons: {
    icon: [
      {
        url: dynamicFavicon("light"),
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
        sizes: "any",
      },
      {
        url: dynamicFavicon("dark"),
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
        sizes: "any",
      },
      {
        url: "favicon/favicon.ico",
        type: "image/x-icon",
        sizes: "48x48",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  authors: {
    name: "Leonardo Débora",
    url: "https://casamento-leo-deb.netlify.app",
  },
  keywords: "leonardo, debora, noivado, casa nova, cha, casa, casal, festa",
  title: {
    default: "Leonardo e Débora — Casamento",
    template: "%s | Leonardo e Débora — Casamento",
  },
  robots: {
    index: true,
    follow: true,
  },
  description: "Leonardo e Débora estão se casando!.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} scroll-smooth`}>
      <head>
        <link
          rel="alternate icon"
          href="favicon/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Providers>
          <SiteHeader />
          {children}
          <CommonClient />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
