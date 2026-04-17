export function Footer() {
  return (
    <footer id="contacto" className="w-full bg-[#0F2D5E] text-white py-20 px-8 md:px-[120px] flex flex-col md:flex-row justify-between items-start gap-12 border-t border-white/5">
      <div className="flex flex-col gap-6 max-w-sm">
        <span className="text-3xl font-bold font-serif tracking-tight">Vitalis</span>
        <p className="text-white/60 text-base leading-relaxed">
          El directorio médico más confiable de Comodoro Rivadavia. Conectamos pacientes con especialistas de manera rápida y segura.
        </p>
        <div className="flex flex-col gap-1 text-sm text-[#00C896] font-bold">
           <span>Próximamente en San Juan</span>
           <div className="h-0.5 w-12 bg-[#00C896]"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-2 opacity-50">Plataforma</h4>
          <a href="/buscar" className="text-white/70 hover:text-[#00C896] transition-all text-sm font-medium">Buscar especialistas</a>
          <a href="/registro" className="text-white/70 hover:text-[#00C896] transition-all text-sm font-medium">Registrar consultorio</a>
          <a href="/planes" className="text-white/70 hover:text-[#00C896] transition-all text-sm font-medium">Planes y precios</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-2 opacity-50">Legal</h4>
          <a href="#" className="text-white/70 hover:text-[#00C896] transition-all text-sm font-medium">Términos y condiciones</a>
          <a href="#" className="text-white/70 hover:text-[#00C896] transition-all text-sm font-medium">Políticas de privacidad</a>
          <a href="/contacto" className="text-white/70 hover:text-[#00C896] transition-all text-sm font-medium">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
