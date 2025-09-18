import React, { useState, useEffect } from 'react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    certificates: 0,
    verifications: 0,
    institutions: 0,
    countries: 0
  });

  // Animación de contadores
  useEffect(() => {
    const finalStatsLocal = {
      certificates: 15420,
      verifications: 89350,
      institutions: 247,
      countries: 32
    };

    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        certificates: Math.min(prev.certificates + finalStatsLocal.certificates / steps, finalStatsLocal.certificates),
        verifications: Math.min(prev.verifications + finalStatsLocal.verifications / steps, finalStatsLocal.verifications),
        institutions: Math.min(prev.institutions + finalStatsLocal.institutions / steps, finalStatsLocal.institutions),
        countries: Math.min(prev.countries + finalStatsLocal.countries / steps, finalStatsLocal.countries)
      }));
    }, increment);

    setTimeout(() => {
      clearInterval(timer);
      setCounters(finalStatsLocal);
    }, duration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      number: Math.floor(counters.certificates).toLocaleString(),
      label: "Certificados Emitidos",
      icon: "📜",
      suffix: "+",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: Math.floor(counters.verifications).toLocaleString(),
      label: "Verificaciones Realizadas",
      icon: "✅",
      suffix: "+",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: Math.floor(counters.institutions),
      label: "Instituciones Afiliadas",
      icon: "🏛️",
      suffix: "+",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: Math.floor(counters.countries),
      label: "Países Alcanzados",
      icon: "🌍",
      suffix: "+",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-gray-900/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #00ffea, #ff0080, #7928ca, #00ffea)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            Números que Hablan por Sí Solos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La confianza de miles de estudiantes e instituciones nos respalda
          </p>
        </div>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
            >
              {/* Icono con efecto glow */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                <div className="relative text-5xl">
                  {stat.icon}
                </div>
              </div>

              {/* Número principal */}
              <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}{stat.suffix}
              </div>

              {/* Label */}
              <p className="text-gray-400 text-lg font-medium group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </p>

              {/* Efecto de brillo en hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Sistema 100% Operativo</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Verificaciones en Tiempo Real</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Red Somnia Activa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Líneas decorativas animadas */}
        <div className="absolute top-1/4 left-0 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-px bg-gradient-to-l from-transparent via-blue-500/30 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default StatsSection;