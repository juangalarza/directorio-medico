export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px-300px)]">
      {/* Hero Section Provisional */}
      <section className="w-full flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif text-[#0F2D5E] mb-6">
          Encontrá tu médico en Comodoro
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          El directorio de salud más completo de la ciudad. Busca especialistas y reserva tu turno al instante.
        </p>
      </section>
    </div>
  );
}
