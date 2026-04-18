"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/#como-funciona", label: "CÓMO FUNCIONA" },
  { href: "/#especialidades", label: "ESPECIALIDADES" },
  { href: "/#profesionales", label: "PROFESIONALES" },
  { href: "/#planes", label: "PLANES" },
  { href: "/contacto", label: "CONTÁCTANOS" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-16 md:h-20 px-4 md:px-[120px] bg-white/80 backdrop-blur-md flex items-center justify-between border-b border-slate-100 shadow-sm">
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold text-[#0F2D5E] font-serif">Vitalis</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="text-sm font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link href="/login">
          <Button className="bg-[#00C896] hover:bg-[#00a37b] text-white rounded-full px-6 font-bold text-sm tracking-wide">
            SOY PROFESIONAL
          </Button>
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 text-[#0F2D5E]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-screen w-[80%] max-w-[400px] bg-white shadow-2xl lg:hidden flex flex-col p-8 pt-20"
            >
              <button 
                className="absolute top-4 right-4 p-2 text-[#0F2D5E]"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-[#0F2D5E] hover:text-[#00C896] transition-colors border-b border-slate-50 pb-2"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <Link href="/login" onClick={() => setIsOpen(false)} className="mt-4">
                  <Button className="w-full bg-[#00C896] hover:bg-[#00a37b] text-white rounded-full py-6 font-bold text-lg tracking-wide shadow-lg">
                    SOY PROFESIONAL
                  </Button>
                </Link>
              </div>

              <div className="mt-auto text-center text-slate-400 text-sm">
                <p>© 2026 Vitalis. Todos los derechos reservados.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
