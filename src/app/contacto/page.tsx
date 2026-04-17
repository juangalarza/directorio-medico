"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-20 bg-slate-50 flex flex-col">
      <div className="bg-[#0F2D5E] relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#00C896]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-[#00C896]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-[120px] py-16 md:py-24 relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold font-serif mb-6"
          >
            Estamos aquí para <span className="text-[#00C896]">ayudarte</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Si tienes dudas sobre nuestra plataforma, planes para profesionales o sugerencias, nuestro equipo está listo para responderte.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-[120px] py-16 md:py-24 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100"
          >
            <h2 className="text-3xl font-bold font-serif text-[#0F2D5E] mb-2">Envíanos un mensaje</h2>
            <p className="text-gray-500 mb-8">Te responderemos a la brevedad posible.</p>

            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-[#0F2D5E]">Nombre completo</Label>
                  <Input id="name" placeholder="Ej. Juan Pérez" className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-[#0F2D5E]">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="juan@ejemplo.com" className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject" className="text-sm font-semibold text-[#0F2D5E]">Asunto</Label>
                <Input id="subject" placeholder="¿Cómo podemos ayudarte?" className="h-12 rounded-xl bg-slate-50 border-slate-200" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-sm font-semibold text-[#0F2D5E]">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..."
                  className="min-h-[150px] rounded-xl bg-slate-50 border-slate-200 resize-none p-4"
                />
              </div>
              <Button className="h-14 mt-4 w-full bg-[#00C896] hover:bg-[#00a37b] text-white rounded-xl text-lg font-bold shadow-md transition-all flex items-center justify-center gap-2">
                Enviar mensaje <Send className="w-5 h-5" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center gap-10"
          >
            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0F2D5E] group-hover:bg-[#00C896] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#0F2D5E] mb-1">Correo Electrónico</h3>
                <p className="text-gray-500 mb-2">Para consultas generales y de soporte.</p>
                <a href="mailto:hola@vitalis.com.ar" className="text-[#00C896] font-semibold text-lg hover:underline">hola@vitalis.com.ar</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0F2D5E] group-hover:bg-[#00C896] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#0F2D5E] mb-1">Teléfono</h3>
                <p className="text-gray-500 mb-2">Lunes a Viernes de 09:00 a 18:00 hs.</p>
                <a href="tel:+542971234567" className="text-[#00C896] font-semibold text-lg hover:underline">+54 297 123 4567</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0F2D5E] group-hover:bg-[#00C896] group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#0F2D5E] mb-1">Ubicación</h3>
                <p className="text-gray-500 mb-2">Comodoro Rivadavia, Chubut.</p>
                <span className="text-slate-700 font-semibold text-lg">San Martín 123, Piso 4</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
