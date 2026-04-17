import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Vitalis | Directorio Médico Comodoro",
  description: "Encuentra tu médico especialista de confianza y reserva turno en Comodoro Rivadavia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("font-sans", inter.variable, plusJakarta.variable)}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
