const BenefitsSection = () => {
  const benefitGroups = [
    {
      title: "For Students",
      icon: "🎓",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        {
          icon: "🔒",
          title: "Total Security",
          description: "Your certificates are immutable and cannot be falsified"
        },
        {
          icon: "📱",
          title: "Mobile Access",
          description: "Carry all your certificates on your mobile device"
        },
        {
          icon: "🌍",
          title: "Global Recognition",
          description: "Instant international verification of your achievements"
        },
        {
          icon: "⚡",
          title: "Instant Verification",
          description: "Employers can verify your credentials in seconds"
        }
      ]
    },
    {
      title: "For Institutions",
      icon: "🏛️",
      color: "from-purple-500 to-pink-500",
      benefits: [
        {
          icon: "💰",
          title: "Cost Reduction",
          description: "Eliminates printing and physical processing costs"
        },
        {
          icon: "🔐",
          title: "Fraud Prevention",
          description: "Blockchain technology prevents diploma falsification"
        },
        {
          icon: "📊",
          title: "Advanced Analytics",
          description: "Detailed tracking of certificate issuance and verification"
        },
        {
          icon: "🌱",
          title: "Sustainability",
          description: "100% digital process, environmentally friendly"
        }
      ]
    },
    {
      title: "For Employers",
      icon: "💼",
      color: "from-green-500 to-emerald-500",
      benefits: [
        {
          icon: "✅",
          title: "Reliable Verification",
          description: "Confirms credential authenticity in real time"
        },
        {
          icon: "⏱️",
          title: "Fast Process",
          description: "Reduces verification time from days to seconds"
        },
        {
          icon: "📋",
          title: "Global Database",
          description: "Access to a worldwide network of certified institutions"
        },
        {
          icon: "🛡️",
          title: "Absolute Trust",
          description: "Blockchain technology guarantees information veracity"
        }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main title */}
        <div className="text-center mb-20">
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
            Benefits For Everyone
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            CertifyChain transforms the educational ecosystem benefiting students, 
            institutions and employers alike
          </p>
        </div>

        {/* Grid de grupos de beneficios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {benefitGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="relative group">
              {/* Header del grupo */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${group.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{group.icon}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{group.title}</h3>
              </div>

              {/* Lista de beneficios */}
              <div className="space-y-6">
                {group.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-gray-900/30 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${group.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl">{benefit.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Efecto de glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${group.color} opacity-5 rounded-2xl blur-3xl group-hover:opacity-10 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to experience these benefits?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the digital certification revolution and discover a safer and more efficient future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                I'm a Student
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                I'm an Institution
              </button>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                I'm an Employer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;