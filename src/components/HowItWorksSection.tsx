const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Emisión del Certificado",
      description: "Las instituciones educativas crean certificados digitales únicos que se almacenan como NFTs en la blockchain de Somnia.",
      icon: "📋",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      title: "Generación de QR",
      description: "Cada certificado genera automáticamente un código QR único que contiene toda la información verificable.",
      icon: "🔲",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Verificación Instantánea",
      description: "Cualquier persona puede escanear el QR para verificar inmediatamente la autenticidad del certificado en blockchain.",
      icon: "✅",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-20">
          <h2 
            className="text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #00ffea, #7928ca, #ff0080, #00ffea)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            ¿Cómo Funciona CertifyChain?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un proceso simple y seguro que revoluciona la certificación académica
          </p>
        </div>

        {/* Timeline de pasos */}
        <div className="relative">
          {/* Línea conectora */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Número del paso */}
                <div className="flex items-center justify-center mb-8">
                  <div 
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl font-bold text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    {step.number}
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute w-20 h-20 rounded-full bg-gradient-to-r ${step.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                </div>

                {/* Icono */}
                <div className="text-center mb-6">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300 inline-block">
                    {step.icon}
                  </span>
                </div>

                {/* Contenido */}
                <div className="text-center bg-gray-900/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Flecha conectora (solo en desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-8 text-4xl text-purple-500/50 group-hover:text-purple-400 transition-colors duration-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
            <div className="text-4xl">🚀</div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">¿Listo para comenzar?</h3>
              <p className="text-gray-300">Únete a la revolución de la certificación digital</p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;