const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Estudiante de Ingeniería",
      university: "Universidad Tecnológica",
      content: "CertifyChain me dio la confianza de que mis certificados estarán seguros para siempre. Poder verificarlos con un simple QR es increíble.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria-Gonzalez&backgroundColor=b6e3f4,c0aede,d1d4f9",
      rating: 5,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Dr. Carlos Méndez",
      role: "Director Académico",
      university: "Instituto Superior de Educación",
      content: "Implementar CertifyChain redujo nuestros costos operativos en un 70% y eliminó completamente los casos de falsificación.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos-Mendez&backgroundColor=ffd5dc,ffeaa7,ddd6fe&glasses=default",
      rating: 5,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Ana Rodríguez",
      role: "HR Manager",
      university: "TechCorp International",
      content: "La verificación instantánea de certificados nos ahorra semanas en el proceso de contratación. Es revolucionario.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana-Rodriguez&backgroundColor=c7ecee,d4e6f1,fdeaa7&hair=long01",
      rating: 5,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-20">
          <h2 
            className="text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #ff0080, #00ffea, #7928ca, #ff0080)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            Lo Que Dicen Nuestros Usuarios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Miles de estudiantes, instituciones y empleadores confían en CertifyChain
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header con avatar y rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                    <img 
                      src={testimonial.avatar} 
                      alt={`Avatar de ${testimonial.name}`}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Contenido del testimonial */}
              <blockquote className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                "{testimonial.content}"
              </blockquote>

              {/* Universidad/Empresa */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>🏢</span>
                <span className="group-hover:text-gray-400 transition-colors duration-300">
                  {testimonial.university}
                </span>
              </div>

              {/* Comillas decorativas */}
              <div className="absolute top-4 right-4 text-4xl text-purple-500/20 group-hover:text-purple-400/30 transition-colors duration-300">
                "
              </div>

              {/* Efecto de glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Estadísticas de testimonios */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">98%</div>
                <p className="text-gray-300">Satisfacción del Usuario</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">4.9/5</div>
                <p className="text-gray-300">Calificación Promedio</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">2,850+</div>
                <p className="text-gray-300">Reseñas Positivas</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA para agregar testimonial */}
        {/* <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">¿Quieres compartir tu experiencia con CertifyChain?</p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
            Enviar Testimonial
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;