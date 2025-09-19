import iconLogo from "../assets/iconLogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Producto",
      links: [
        { name: "Características", href: "#features" },
        { name: "Cómo Funciona", href: "#how-it-works" },
        { name: "Beneficios", href: "#benefits" },
        { name: "Precios", href: "#pricing" },
        { name: "Demo", href: "#demo" }
      ]
    },
    {
      title: "Para Instituciones",
      links: [
        { name: "Universidades", href: "#universities" },
        { name: "Colegios", href: "#schools" },
        { name: "Centros de Formación", href: "#training" },
        { name: "Integración API", href: "#api" },
        { name: "Soporte Técnico", href: "#support" }
      ]
    },
    {
      title: "Recursos",
      links: [
        { name: "Documentación", href: "#docs" },
        { name: "Blog", href: "#blog" },
        { name: "Centro de Ayuda", href: "#help" },
        { name: "Webinars", href: "#webinars" },
        { name: "Tutoriales", href: "#tutorials" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nosotros", href: "#about" },
        { name: "Equipo", href: "#team" },
        { name: "Carreras", href: "#careers" },
        { name: "Prensa", href: "#press" },
        { name: "Contacto", href: "#contact" }
      ]
    }
  ];


  const stats = [
    { label: "Uptime", value: "99.9%" },
    { label: "Países", value: "32+" },
    { label: "Certificados", value: "15K+" },
    { label: "Instituciones", value: "247+" }
  ];

  return (
    <footer className="relative z-10 bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-md border-t border-gray-700/50">
      {/* Newsletter Section */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r  rounded-xl flex items-center justify-center p-2">
                <img 
                  src={iconLogo} 
                  alt="CertifyChain Logo"
                  className="w-full h-full object-contain "
                />
              </div>
              <h3 className="text-2xl font-bold text-white">CertifyChain</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Revolucionando la certificación académica con tecnología blockchain, 
              garantizando seguridad, transparencia y verificación instantánea para 
              el futuro de la educación.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-gray-800/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-400">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            {/* <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div> */}
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400">
                © {currentYear} CertifyChain. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Política de Privacidad
                </a>
                <a href="#terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Términos de Servicio
                </a>
                <a href="#cookies" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Cookies
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Powered by Somnia Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-px bg-gradient-to-l from-transparent via-blue-500/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;