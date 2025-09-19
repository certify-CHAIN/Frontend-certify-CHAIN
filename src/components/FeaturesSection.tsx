import qr from "../assets/qr.jpg";
import logoSomnia from "../assets/logo somnia.png";
import seguridad from "../assets/seguridad-icon.png";
import nft from "../assets/nft.png";
const FeaturesSection = () => {
  const features = [
    {
      icon: "nft",
      title: "Certificados NFT",
      description: "Diplomas y certificados inmutables en blockchain que garantizan autenticidad permanente",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: "qr-image",
      title: "Verificación QR",
      description: "Escaneado instantáneo para verificar la validez del certificado en segundos",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: "seguridad",
      title: "Seguridad Blockchain",
      description: "Tecnología descentralizada que previene falsificaciones y fraudes académicos",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "somnia-image",
      title: "Red Somnia",
      description: "Powered by Somnia Network para transacciones rápidas y costos mínimos",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #ff0080, #7928ca, #00ffea, #ff0080)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            Características Revolucionarias
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            CertifyChain utiliza tecnología blockchain de vanguardia para crear un ecosistema 
            educativo seguro, transparente y verificable.
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icono con gradiente */}
              <div className={`text-6xl mb-6 relative`}>
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>
                {feature.icon === "qr-image" ? (
                  <div className="relative z-10 w-16 h-16 mx-auto">
                    <img 
                      src={qr} 
                      alt="QR Code Icon" 
                      className="w-full h-full object-contain rounded-sm border-2 border-gray-600 shadow-lg group-hover:scale-110 group-hover:border-green-400 transition-all duration-300"
                    />
                  </div>
                ) : feature.icon === "somnia-image" ? (
                  <div className="relative z-10 w-16 h-16 mx-auto">
                    <img 
                      src={logoSomnia} 
                      alt="Somnia Network Icon" 
                      className="w-full h-full object-contain rounded-sm shadow-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                ):feature.icon === "seguridad" ? (
                  <div className="relative z-10 w-16 h-16 mx-auto">
                    <img 
                      src={seguridad} 
                      alt="Seguridad Icon" 
                      className="w-full h-full object-contain rounded-sm shadow-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                ) : feature.icon === "nft" ? (
                  <div className="relative z-10 w-16 h-16 mx-auto">
                    <img 
                      src={nft} 
                      alt="NFT Icon" 
                      className="w-full h-full object-contain rounded-sm shadow-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                ) : (
                  <span className="relative z-10">{feature.icon}</span>
                )}
              </div>

              {/* Contenido */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Líneas decorativas */}
        <div className="absolute top-1/2 left-1/4 w-32 h-px bg-gradient-to-r from-transparent to-purple-500/30"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-transparent to-blue-500/30"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;