"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, HeartPulse, MapPin, Calendar, CheckCircle2, Check, Star, Smile, Eye, Brain, Activity, Scan, User as UserIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
} as const;

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
} as const;

const staggerItem = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
} as const;

const DOCTORS = [
  {
    name: "Dr. Marcos Silva",
    spec: "Cardiología clínica y deportiva enfocada en alto rendimiento.",
    rating: "4.9",
    location: "Centro",
    reviews: "154",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Luis Miguel",
    spec: "Pediatría integral, desarrollo infantil y acompañamiento.",
    rating: "5.0",
    location: "Norte",
    reviews: "89",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Carlos Ruiz",
    spec: "Traumatología general, cirugía y lesiones articulares.",
    rating: "4.8",
    location: "Sur",
    reviews: "212",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dra. Ana Martínez",
    spec: "Dermatología clínica, estética y oncología cutánea.",
    rating: "4.9",
    location: "Este",
    reviews: "320",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Jorge Paz",
    spec: "Oftalmología, cirugía láser y tratamientos de retina.",
    rating: "4.7",
    location: "Oeste",
    reviews: "115",
    img: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dra. Sofía Lima",
    spec: "Ginecología, obstetricia y planificación familiar integral.",
    rating: "5.0",
    location: "Centro",
    reviews: "450",
    img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/hero.png"
            alt="Medical background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0F2D5E]/85"></div>
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative z-10 flex flex-col items-center max-w-5xl px-4 text-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
            <span className="text-white text-sm font-bold tracking-wide">EL BUSCADOR DE SALUD #1 DE COMODORO</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-[64px] font-bold font-serif text-white tracking-tight leading-[1.1]"
          >
            Encontrá tu especialista.<br />
            <span className="text-[#00C896]">Al instante.</span>
          </motion.h1>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl p-2 rounded-[24px] border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Especialidad, médico o enfermedad..."
                className="pl-12 border-0 bg-white h-14 text-black rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 text-lg shadow-inner"
              />
            </div>
            <Button className="h-14 px-10 bg-[#00C896] hover:bg-[#00a37b] text-white rounded-2xl text-lg font-bold w-full md:w-auto shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
              BUSCAR
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/70 text-base md:text-lg font-medium"
          >
            Búsquedas frecuentes: <span className="text-white">Pediatría</span> · <span className="text-white">Cardiología</span> · <span className="text-white">Odontología</span>
          </motion.p>
        </motion.div>
      </section>

      {/* 2. CÓMO FUNCIONA */}
      <motion.section
        {...fadeIn}
        id="como-funciona" className="py-20 md:py-28 px-4 md:px-[120px] w-full"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#0F2D5E]">
              Cómo funciona
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">Gestionar tu salud nunca fue tan simple. Tres pasos para tu bienestar.</p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { icon: Search, title: "1. Buscá tu especialista", desc: "Encontrá al profesional adecuado cerca tuyo por especialidad o nombre." },
              { icon: UserIcon, title: "2. Revisá su perfil", desc: "Consultá su experiencia, horarios disponibles y opiniones de pacientes." },
              { icon: Calendar, title: "3. Reservá tu turno", desc: "Sin llamados ni esperas. Elegí el horario que más te convenga y listo." }
            ].map((item, i) => (
              <motion.div variants={staggerItem} key={i} className="flex flex-col items-center text-center gap-6 group">
                <div className="w-20 h-20 rounded-[32px] bg-slate-50 flex items-center justify-center text-[#0F2D5E] border border-slate-100 shadow-sm transition-all group-hover:bg-[#00C896] group-hover:text-white group-hover:rotate-6">
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-[#0F2D5E] font-serif">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-[300px] mx-auto">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 3. ESPECIALIDADES DESTACADAS */}
      <motion.section
        {...fadeIn}
        id="especialidades" className="py-20 md:py-28 px-4 md:px-[120px] bg-slate-50 w-full"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0F2D5E]">
              Especialidades Destacadas
            </h2>
            <Link
              href="/especialidades"
              className="inline-flex items-center justify-center bg-[#0F2D5E] hover:bg-[#0d2346] text-white rounded-full px-8 py-4 font-bold shadow-md transition-colors"
            >
              Ver todas
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { label: "Cardiología", slug: "cardiologia", count: "124 Especialistas", icon: HeartPulse, bg: "bg-[#E0F8F1]", fg: "text-[#00C896]" },
              { label: "Pediatría", slug: "pediatria", count: "89 Especialistas", icon: HeartPulse, bg: "bg-[#EAF3FF]", fg: "text-[#0F2D5E]" },
              { label: "Odontología", slug: "odontologia", count: "156 Especialistas", icon: Smile, bg: "bg-[#FDF2E9]", fg: "text-[#F2994A]" },
              { label: "Oftalmología", slug: "oftalmologia", count: "67 Especialistas", icon: Eye, bg: "bg-[#F4EDFA]", fg: "text-[#9B51E0]" },
              { label: "Neurología", slug: "neurologia", count: "42 Especialistas", icon: Brain, bg: "bg-[#FFEFEF]", fg: "text-[#EB5757]" },
              { label: "Dermatología", slug: "dermatologia", count: "75 Especialistas", icon: Activity, bg: "bg-[#EBFBEE]", fg: "text-[#27AE60]" },
              { label: "Traumatología", slug: "traumatologia", count: "110 Especialistas", icon: Scan, bg: "bg-[#FFF7E6]", fg: "text-[#F2C94C]" },
              { label: "Ginecología", slug: "ginecologia", count: "88 Especialistas", icon: UserIcon, bg: "bg-[#F2E8FF]", fg: "text-[#BB6BD9]" }
            ].map((spec, i) => (
              <motion.div variants={staggerItem} key={i}>
                <Link href={`/${spec.slug}`} className="block group">
                  <div className="flex flex-col justify-between w-full h-[180px] bg-white rounded-[24px] p-6 shadow-sm hover:shadow-[0_10px_30px_rgba(15,45,94,0.08)] transition-all duration-300">
                    <div className="flex justify-between items-start w-full">
                      <div className={`w-14 h-14 rounded-full ${spec.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        <spec.icon className={`w-6 h-6 ${spec.fg}`} strokeWidth={2.5} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center -mr-2 -mt-2 group-hover:bg-[#0F2D5E] group-hover:text-white transition-colors text-gray-400">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-auto">
                      <h3 className="text-xl font-bold font-serif text-[#0F2D5E]">{spec.label}</h3>
                      <p className="text-sm text-gray-500">{spec.count}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 4. MÉDICOS RECOMENDADOS & BANNER */}
      <motion.section
        {...fadeIn}
        id="profesionales" className="py-20 md:py-28 px-4 md:px-[120px] w-full bg-slate-50"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-center z-10 relative">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0F2D5E]">
              Médicos Recomendados
            </h2>
            <Button variant="outline" className="hidden md:flex text-[#00C896] border-[#00C896] hover:bg-[#00C896] hover:text-white rounded-full">
              Ver todos los médicos
            </Button>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {DOCTORS.map((doc, i) => (
                <CarouselItem key={i} className="pl-4 md:pl-8 sm:basis-1/2 lg:basis-1/3">
                  <div className="relative overflow-hidden rounded-[32px] border-[8px] border-white shadow-sm aspect-[3/4] group bg-white">
                    <Image
                      src={doc.img}
                      fill
                      alt={doc.name}
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white via-white/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{doc.name}</h3>
                      <p className="text-gray-700 text-sm mb-6 leading-relaxed line-clamp-2">
                        {doc.spec}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{doc.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-amber-500" />
                            <span>{doc.rating}</span>
                          </div>
                        </div>
                        <Button className="bg-[#00C896] hover:bg-[#00a37b] text-white rounded-full px-6 font-bold shadow-sm transition-colors">
                          Ver Perfil
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white shadow-lg border-none hover:bg-slate-50 min-w-12 h-12" />
            <CarouselNext className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white shadow-lg border-none hover:bg-slate-50 min-w-12 h-12" />
          </Carousel>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-full h-32 md:h-40 relative rounded-2xl overflow-hidden mt-8"
          >
            <Image
              src="https://images.unsplash.com/photo-1549477881-1a8180c72ac8?auto=format&fit=crop&q=80"
              alt="Ad Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8 md:p-12">
              <div className="text-white">
                <h4 className="text-xl md:text-2xl font-bold mb-2">Clínica del Valle</h4>
                <p className="text-sm md:text-base opacity-90 max-w-md">Excelencia médica a tu disposición. Turnos disponibles esta semana.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. PARA MÉDICOS (B2B Layout) */}
      <motion.section
        {...fadeIn}
        className="py-20 md:py-28 px-4 md:px-[120px] bg-[#0F2D5E] text-white w-full"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative">
            <motion.div
              whileInView={{ x: [-20, 0], opacity: [0, 1] }}
              viewport={{ once: true }}
              className="aspect-[4/3] w-full bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-md flex items-center justify-center p-8 overflow-hidden shadow-2xl relative group"
            >
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#00C896]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#00C896]/5 rounded-full blur-3xl"></div>

              <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-2xl flex flex-col p-6 opacity-95 transition-transform group-hover:scale-[1.02] duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-6 w-32 bg-slate-100 rounded-full"></div>
                  <div className="h-8 w-8 bg-[#00C896]/20 rounded-full"></div>
                </div>
                <div className="flex flex-grow gap-6">
                  <div className="w-1/3 bg-slate-50 rounded-xl space-y-3 p-3">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  </div>
                  <div className="w-2/3 space-y-4">
                    <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl w-full"></div>
                    <div className="h-32 bg-[#00C896]/5 rounded-xl border border-[#00C896]/10 w-full flex items-center justify-center">
                      <Activity className="w-12 h-12 text-[#00C896] opacity-30 animate-pulse" />
                    </div>
                    <div className="h-8 bg-slate-50 rounded-xl w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-[#0F2D5E] text-white px-8 py-3 rounded-2xl font-bold shadow-2xl border border-white/10 backdrop-blur-xl">
                  Dashboard Médico
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl font-bold font-serif leading-[1.1]">
              Llevá tu consultorio al <span className="text-[#00C896]">siguiente nivel</span>
            </h2>
            <div className="space-y-6">
              {[
                "Más visibilidad en Comodoro Rivadavia",
                "Turnos automáticos 24/7 sin secretarias",
                "Conexión en tiempo real con Google Calendar"
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00C896]/10 flex items-center justify-center transition-colors group-hover:bg-[#00C896]">
                    <Check className="text-[#00C896] w-6 h-6 group-hover:text-[#0F2D5E] stroke-[4]" />
                  </div>
                  <span className="text-xl text-white/90 font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-[#00C896] hover:bg-[#00a37b] text-white w-fit px-10 py-7 text-xl rounded-2xl font-black shadow-xl transition-all mt-4 uppercase tracking-wide">
                Registrá tu consultorio gratis
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. PRICING */}
      <motion.section
        {...fadeIn}
        id="planes" className="py-20 md:py-28 px-4 md:px-[120px] bg-slate-50 w-full flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#0F2D5E] text-center mb-16">
          Planes pensados para vos
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-center"
        >
          {/* Plan Free */}
          <motion.div variants={staggerItem}>
            <Card className="flex-1 p-8 rounded-[32px] border-white/50 bg-white/80 backdrop-blur-sm shadow-sm flex flex-col relative h-[520px] transition-all hover:scale-[1.02]">
              <h3 className="text-2xl font-bold text-[#0F2D5E] mb-2 font-serif">Básico</h3>
              <div className="h-[72px] mb-8 flex items-end gap-2">
                <span className="text-6xl font-bold text-[#0F2D5E] leading-none">$0</span>
                <span className="text-lg font-medium text-gray-500 mb-1 tracking-tight">/ MES</span>
              </div>
              <ul className="space-y-4 text-gray-600 mb-12 flex-grow">
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Perfil público base</span></li>
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Visibilidad estándar</span></li>
              </ul>
              <Button variant="outline" className="w-full text-[#0F2D5E] border-2 border-[#0F2D5E] font-bold h-14 text-lg rounded-2xl hover:bg-[#0F2D5E] hover:text-white transition-all shadow-md">Comenzar Gratis</Button>
            </Card>
          </motion.div>

          {/* Plan Premium */}
          <motion.div variants={staggerItem}>
            <Card className="flex-1 p-8 rounded-[32px] border-none shadow-[0_32px_64px_-12px_rgba(15,45,94,0.3)] flex flex-col relative bg-[#0F2D5E] h-[520px] overflow-visible transition-all hover:scale-[1.05] z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00C896] text-white px-6 py-2 rounded-full text-sm tracking-widest font-black shadow-xl whitespace-nowrap">
                MÁS ELEGIDO
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-serif">Premium</h3>
              <div className="h-[72px] mb-8 flex items-end gap-2">
                <span className="text-6xl font-bold text-white leading-none">$15</span>
                <span className="text-lg font-medium text-white/60 mb-1 tracking-tight">/ MES</span>
              </div>
              <ul className="space-y-4 text-white mb-12 flex-grow">
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Prioridad en resultados</span></li>
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Gestión de turnos online</span></li>
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Sync con Google Calendar</span></li>
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Sello de Verificado</span></li>
              </ul>
              <Button className="w-full bg-[#00C896] hover:bg-[#00a37b] font-bold h-14 text-lg rounded-2xl shadow-xl text-white transition-all">Iniciar Prueba de 14 Días</Button>
            </Card>
          </motion.div>

          {/* Plan A Medida */}
          <motion.div variants={staggerItem}>
            <Card className="flex-1 p-8 rounded-[32px] border-white/50 bg-white/80 backdrop-blur-sm shadow-sm flex flex-col relative h-[520px] transition-all hover:scale-[1.02]">
              <h3 className="text-2xl font-bold text-[#0F2D5E] mb-2 font-serif">Clínicas</h3>
              <div className="h-[72px] mb-8 flex items-end gap-2">
                <span className="text-4xl font-bold text-[#0F2D5E] leading-none tracking-tight">A Medida</span>
              </div>
              <ul className="space-y-5 text-gray-600 mb-12 flex-grow">
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Múltiples profesionales</span></li>
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Panel administrativo único</span></li>
                <li className="flex items-start gap-3 text-lg"><Check className="w-6 h-6 text-[#00C896] mt-0.5 shrink-0 stroke-[3]" /> <span className="font-medium">Soporte prioritario 24/7</span></li>
              </ul>
              <Button variant="outline" className="w-full text-[#0F2D5E] border-2 border-[#0F2D5E] font-bold h-14 text-lg rounded-2xl hover:bg-[#0F2D5E] hover:text-white transition-all shadow-md">Contactar Ventas</Button>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 7. TESTIMONIOS */}
      <motion.section
        {...fadeIn}
        className="py-20 md:py-28 px-4 md:px-[120px] w-full text-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-[40px] font-bold font-serif text-[#0F2D5E]">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-gray-500 text-lg">Confianza y seguridad en cada experiencia.</p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                text: "Por fin una forma fácil de conseguir turno en Comodoro. Me ahorró horas de llamadas telefónicas y esperas. 10/10.",
                name: "María Gómez",
                role: "Paciente verificada",
                img: "https://i.pravatar.cc/150?img=47"
              },
              {
                text: "Excelente el sistema de búsqueda. Encontré un especialista en mi obra social en segundos. Muy recomendable.",
                name: "Ricardo Sosa",
                role: "Paciente verificado",
                img: "https://i.pravatar.cc/150?img=12"
              },
              {
                text: "Me encanta que me llegue el recordatorio por WhatsApp. Ya no me olvido más de mis consultas médicas.",
                name: "Elena Ruiz",
                role: "Paciente verificada",
                img: "https://i.pravatar.cc/150?img=32"
              }
            ].map((t, i) => (
              <motion.div variants={staggerItem} key={i}>
                <Card className="bg-slate-50 border-0 p-8 rounded-[32px] text-left flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300 h-full">
                  <div className="mb-8">
                    <div className="text-[#00C896] text-4xl font-serif opacity-30 leading-none">“</div>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed mt-2 italic">
                      {t.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-inner relative">
                      <Image src={t.img} alt={t.name} fill className="object-cover" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-[#0F2D5E] text-base">{t.name}</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
