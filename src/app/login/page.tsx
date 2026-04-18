"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F2D5E]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Medical Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2D5E]/90 to-[#0F2D5E]/40"></div>
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="p-8 md:p-10 rounded-[32px] border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
              <div className="w-10 h-10 rounded-full bg-[#0F2D5E] flex items-center justify-center shadow-lg group-hover:bg-[#00C896] transition-colors">
                <CheckCircle2 className="w-6 h-6 text-[#00C896] group-hover:text-white transition-colors" />
              </div>
              <span className="text-2xl font-serif font-bold text-[#0F2D5E]">Vitalis</span>
            </Link>
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-serif font-bold text-[#0F2D5E]">Bienvenido de nuevo</h1>
              <p className="text-slate-500 font-medium tracking-tight">Ingresa tus credenciales para acceder</p>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F2D5E] ml-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    type="email" 
                    placeholder="ejemplo@correo.com" 
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-[#00C896]/20 focus:border-[#00C896] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[#0F2D5E] ml-1">Contraseña</label>
                  <Link href="#" className="text-xs font-bold text-[#00C896] hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:ring-[#00C896]/20 focus:border-[#00C896] transition-all"
                  />
                </div>
              </div>
            </div>

            <Button className="h-14 bg-[#00C896] hover:bg-[#00a37b] text-white rounded-2xl text-lg font-black shadow-lg shadow-[#00C896]/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2">
              INICIAR SESIÓN
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-slate-500 text-sm font-medium">
              ¿No tienes una cuenta?{" "}
              <Link href="#" className="text-[#0F2D5E] font-bold hover:text-[#00C896] transition-colors underline underline-offset-4">Regístrate</Link>
            </p>
          </div>
        </Card>

        {/* Back to Home Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
