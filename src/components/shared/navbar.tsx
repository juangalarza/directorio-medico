import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="w-full h-20 px-8 md:px-[120px] bg-white flex items-center justify-between border-b">
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold text-[#0F2D5E] font-serif">Vitalis</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/buscar" className="text-base text-gray-700 hover:text-[#0F2D5E] transition-colors">
          Médicos
        </Link>
        <Link href="/buscar?specialty=all" className="text-base text-gray-700 hover:text-[#0F2D5E] transition-colors">
          Especialidades
        </Link>
        <Button className="bg-[#00C896] hover:bg-[#00a37b] text-white rounded-full px-6">
          Soy Profesional
        </Button>
      </nav>
    </header>
  );
}
