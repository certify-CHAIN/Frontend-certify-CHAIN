import logoSomnia from "../assets/logo somnia.png";
const CTASection = () => {
  const ctaOptions = [
    {
      title: "For Students",
      subtitle: "Protect your academic achievements",
      description:
        "Get verifiable NFT certificates that will last forever on blockchain",
      icon: "🎓",
      color: "from-blue-500 to-cyan-500",
      buttonText: "Verify Certificate",
      features: [
        "✅ Instant verification",
        "✅ 24/7 mobile access",
        "✅ Global recognition",
        "✅ Blockchain security",
      ],
    },
    {
      title: "For Institutions",
      subtitle: "Revolutionize your certification system",
      description:
        "Reduce costs, eliminate fraud and position your institution as a technology pioneer",
      icon: "🏛️",
      color: "from-purple-500 to-pink-500",
      buttonText: "Request Demo",
      features: [
        "✅ 70% cost reduction",
        "✅ Zero counterfeiting",
        "✅ Advanced analytics",
        "✅ Simple API integration",
      ],
    },
    {
      title: "For Employers",
      subtitle: "Verify credentials instantly",
      description:
        "Accelerate your hiring process with automatic certificate verification",
      icon: "💼",
      color: "from-green-500 to-emerald-500",
      buttonText: "Start Verification",
      features: [
        "✅ Verification in seconds",
        "✅ Global database",
        "✅ Automated process",
        "✅ Absolute trust",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Main title */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl font-bold mb-6"
            style={{
              background:
                "linear-gradient(90deg, #7928ca, #ff0080, #00ffea, #7928ca)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            Join the Digital Revolution
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Regardless of your role, CertifyChain has the perfect solution
            for you
          </p>
        </div>

        {/* CTA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((cta, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
            >
              {/* Icon with glow */}
              <div className="relative mb-6">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${cta.color} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>
                <div
                  className={`relative w-20 h-20 mx-auto bg-gradient-to-r ${cta.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {cta.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {cta.title}
              </h3>
              <p className="text-lg text-purple-400 mb-4 font-semibold">
                {cta.subtitle}
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {cta.description}
              </p>

              {/* Features list */}
              <ul className="text-left mb-8 space-y-2">
                {cta.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              {/* <button className={`w-full bg-gradient-to-r ${cta.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group-hover:shadow-2xl`}>
                {cta.buttonText}
              </button> */}

              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${cta.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
              ></div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-center mb-16">
          <h2
            className="text-5xl font-bold mb-6"
            style={{
              background:
                "linear-gradient(90deg, #7928ca, #ff0080, #00ffea, #7928ca)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            Guaranteed Security with Somnia
          </h2>
        </div>
          <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full -z-20 -top-40">
            
            {/* <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
              <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.9]">
                <h1 className="Welcome-text text-[12px]">Seguridad</h1>
              </div>
            </div> */}
            

            {/* Somnia logo in the center */}
            <div className="absolute z-[25] flex items-center justify-center">
              <img 
                src={logoSomnia} 
                alt="Somnia Logo"
                className="w-32 h-32 object-contain opacity-90 animate-pulse"
              />
            </div>

            
              <video
                loop
                muted
                autoPlay
                playsInline
                preload="false"
                className="w-full h-auto opacity-50"
              >
                <source
                  src="/Videos/encryption-bg.webm"
                  type="video/webm"
                />
              </video>
            
          </div>
        </div>

        {/* Additional urgency section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">
                🚀 Launch Offer
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                The first 100 institutions to register will get:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    50% Discount
                  </h4>
                  <p className="text-gray-400 text-sm">
                    On the first year of subscription
                  </p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Free Setup
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Configuration and integration at no cost
                  </p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">📞</div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Premium Support
                  </h4>
                  <p className="text-gray-400 text-sm">
                    6 months of dedicated support
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                🔥 Take Advantage of Offer
              </button>
            </div>
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent to-purple-500/30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-24 h-px bg-gradient-to-l from-transparent to-blue-500/30 animate-pulse"></div>
      </div>
    </section>
  );
};

export default CTASection;
