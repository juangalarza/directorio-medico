export function Footer() {
  return (
    <footer className="w-full bg-[#0F2D5E] text-white py-16 px-8 md:px-[120px] flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-bold font-serif">Vitalis</span>
        <p className="text-white/70 text-sm">
          Directorio Médico de Comodoro Rivadavia.<br />
          Próximamente en San Juan.
        </p>
      </div>
      
      <div className="flex flex-col gap-2">
        <h4 className="font-bold mb-2">Plataforma</h4>
        <a href="/buscar" className="text-white/70 hover:text-white transition-colors text-sm">Buscar especialistas</a>
        <a href="/registro" className="text-white/70 hover:text-white transition-colors text-sm">Soy Profesional</a>
        <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Términos y condiciones</a>
      </div>
    </footer>
  );
}
