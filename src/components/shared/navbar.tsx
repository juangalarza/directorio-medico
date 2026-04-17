import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-20 px-8 md:px-[120px] bg-white/95 backdrop-blur-sm flex items-center justify-between border-b">
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold text-[#0F2D5E] font-serif">Vitalis</span>
      </Link>
      
      <nav className="hidden lg:flex items-center gap-8">
        <Link href="/#como-funciona" className="text-sm font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors">
          CÓMO FUNCIONA
        </Link>
        <Link href="/#especialidades" className="text-sm font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors">
          ESPECIALIDADES
        </Link>
        <Link href="/#profesionales" className="text-sm font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors">
          PROFESIONALES
        </Link>
        <Link href="/#planes" className="text-sm font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors">
          PLANES
        </Link>
        <Link href="/#contacto" className="text-sm font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors">
          CONTÁCTANOS
        </Link>
        <Button className="bg-[#00C896] hover:bg-[#00a37b] text-white rounded-full px-6 font-bold text-sm tracking-wide">
          SOY PROFESIONAL
        </Button>
      </nav>
    </header>
  );
}
