const CTASection = () => {
  const ctaOptions = [
    {
      title: "Para Estudiantes",
      subtitle: "Protege tus logros académicos",
      description: "Obtén certificados NFT verificables que durarán para siempre en blockchain",
      icon: "🎓",
      color: "from-blue-500 to-cyan-500",
      buttonText: "Verificar Certificado",
      features: [
        "✅ Verificación instantánea",
        "✅ Acceso móvil 24/7",
        "✅ Reconocimiento global",
        "✅ Seguridad blockchain"
      ]
    },
    {
      title: "Para Instituciones",
      subtitle: "Revoluciona tu sistema de certificación",
      description: "Reduce costos, elimina fraudes y posiciona tu institución como pionera en tecnología",
      icon: "🏛️",
      color: "from-purple-500 to-pink-500",
      buttonText: "Solicitar Demo",
      features: [
        "✅ Reducción de costos 70%",
        "✅ Cero falsificaciones",
        "✅ Analytics avanzados",
        "✅ Integración API simple"
      ]
    },
    {
      title: "Para Empleadores",
      subtitle: "Verifica credenciales al instante",
      description: "Acelera tu proceso de contratación con verificación automática de certificados",
      icon: "💼",
      color: "from-green-500 to-emerald-500",
      buttonText: "Comenzar Verificación",
      features: [
        "✅ Verificación en segundos",
        "✅ Base de datos global",
        "✅ Proceso automatizado",
        "✅ Confianza absoluta"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #7928ca, #ff0080, #00ffea, #7928ca)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            Únete a la Revolución Digital
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Independientemente de tu rol, CertifyChain tiene la solución perfecta para ti
          </p>
        </div>

        {/* Grid de CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((cta, index) => (
            <div 
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
            >
              {/* Icono con glow */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${cta.color} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                <div className={`relative w-20 h-20 mx-auto bg-gradient-to-r ${cta.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {cta.icon}
                </div>
              </div>

              {/* Contenido */}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {cta.title}
              </h3>
              <p className="text-lg text-purple-400 mb-4 font-semibold">
                {cta.subtitle}
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {cta.description}
              </p>

              {/* Lista de características */}
              <ul className="text-left mb-8 space-y-2">
                {cta.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Botón */}
              {/* <button className={`w-full bg-gradient-to-r ${cta.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group-hover:shadow-2xl`}>
                {cta.buttonText}
              </button> */}

              {/* Efecto de brillo */}
              <div className={`absolute inset-0 bg-gradient-to-r ${cta.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full -z-20">
      <div className="absolute w-auto h-auto top-0 z-[5]">
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">

        <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.9]">
          <h1 className="Welcome-text text-[12px]">Encryption</h1>
        </div>
      </div>

      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <div className="cursive text-[20px] font-medium text-center text-gray-300">
          Secure your data with end-to-end encryption.
        </div>
      </div>

      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
        >
          <source src="/public/Videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </div>

        </div>

        {/* Sección adicional de urgencia */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">
                🚀 Oferta de Lanzamiento
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                Las primeras 100 instituciones que se registren obtendrán:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="text-lg font-semibold text-white mb-2">50% Descuento</h4>
                  <p className="text-gray-400 text-sm">En el primer año de suscripción</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Setup Gratuito</h4>
                  <p className="text-gray-400 text-sm">Configuración e integración sin costo</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">📞</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Soporte Premium</h4>
                  <p className="text-gray-400 text-sm">6 meses de soporte dedicado</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                🔥 Aprovechar Oferta
              </button>
            </div>
          </div>
        </div>

        {/* Líneas decorativas */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent to-purple-500/30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-24 h-px bg-gradient-to-l from-transparent to-blue-500/30 animate-pulse"></div>
      </div>
    </section>
  );
};

export default CTASection;