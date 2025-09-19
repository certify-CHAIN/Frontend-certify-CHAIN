import img1 from "../assets/Logo UMSA.png";
import img2 from "../assets/cryptoCoders.png";
const UniverityParnes = () => {
  const partners = [
    {
      name: "UMSA",
      fullName: "Universidad Mayor de San Andrés",
      logo: img1,
      description:
        "Leading public university in Bolivia, pioneer in adopting blockchain technology for academic certification",
      establishedYear: "1830",
      students: "180,000+",
      programs: "150+",
      achievements: [
        "First Bolivian university on blockchain",
        "NFT certificates implemented",
        "Automatic verification system",
        "80% reduction in verification time",
      ],
      color: "from-blue-600 to-indigo-700",
      website: "www.umsa.bo",
    },
    {
      name: "CryptoCoders",
      fullName: "CryptoCoders Academy",
      logo: img2,
      description:
        "Academy specialized in blockchain technology and cryptocurrency development, training professionals for the digital future",
      establishedYear: "2019",
      students: "5,000+",
      programs: "25+",
      achievements: [
        "Blockchain technology specialists",
        "Cryptocurrency certifications",
        "DeFi development courses",
        "Graduates working in Web3",
      ],
      color: "from-purple-600 to-pink-600",
      website: "www.cryptocoders.academy",
    },
  ];

  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-transparent ">
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
            Our Educational Partners
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneer institutions that trust CertifyChain to revolutionize
            academic certification
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header with logo and basic information */}
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 mr-4 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-lg text-purple-400 font-semibold">
                    {partner.fullName}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {partner.description}
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-gray-800/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">
                    {partner.establishedYear}
                  </div>
                  <div className="text-sm text-gray-400">Founded</div>
                </div>
                <div className="text-center bg-gray-800/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">
                    {partner.students}
                  </div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div className="text-center bg-gray-800/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">
                    {partner.programs}
                  </div>
                  <div className="text-sm text-gray-400">Programs</div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Achievements with CertifyChain:
                </h4>
                <ul className="space-y-2">
                  {partner.achievements.map((achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="text-gray-300 text-sm flex items-center group-hover:text-gray-200 transition-colors duration-300"
                    >
                      <span className="text-green-400 mr-2">✅</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Website */}
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">{partner.website}</span>
              
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
              ></div>
            </div>
          ))}
        </div>

        {/* Joint impact section */}
        <div className="text-center">
          <div className="">
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-white mb-4">
                🚀 Joint Impact of Our Partners
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Together we are transforming education in the World
              </p>
              
              {/* Two-column layout: content on left, video on right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left column: Statistics */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gray-800/40 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-3">
                        <div className="text-3xl mr-3">📊</div>
                        <h4 className="text-2xl font-bold text-white">185,000+</h4>
                      </div>
                      <p className="text-gray-300">
                        Students benefited with blockchain certification
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/40 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-3">
                        <div className="text-3xl mr-3">🔒</div>
                        <h4 className="text-2xl font-bold text-white">100%</h4>
                      </div>
                      <p className="text-gray-300">
                        Reduction in certificate fraud
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/40 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-3">
                        <div className="text-3xl mr-3">⚡</div>
                        <h4 className="text-2xl font-bold text-white">80%</h4>
                      </div>
                      <p className="text-gray-300">
                        Reduction in verification time
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right column: Video */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-video">
                    <video
                      loop
                      muted
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover opacity-60"
                    >
                      <source src="/Videos/mundo.webm" type="video/webm" />
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <p className="text-gray-400">Video not available</p>
                      </div>
                    </video>
                    
                    {/* Overlay with gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
                    
                    {/* Overlay text */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium bg-black/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                        Transforming global education with blockchain
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniverityParnes;
