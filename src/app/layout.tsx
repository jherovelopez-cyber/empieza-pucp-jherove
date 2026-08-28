import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/app/providers";

export const metadata: Metadata = {
  title: "Empieza PUCP",
  description: "Ruta mobile-first para cachimbos, JH y Centros Federados PUCP.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Empieza PUCP",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#008CFF",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
