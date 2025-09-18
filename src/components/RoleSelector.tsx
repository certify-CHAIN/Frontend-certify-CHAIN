import React, { useState } from 'react';

interface RoleSelectorProps {
  onRoleSelect: (role: 'director' | 'estudiante') => void;
  onCancel: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect, onCancel }) => {
  const [selectedRole, setSelectedRole] = useState<'director' | 'estudiante' | null>(null);

  const roles = [
    {
      id: 'director',
      title: 'Director',
      subtitle: 'Institución Educativa',
      description: 'Administra certificados y gestiona estudiantes de tu institución',
      icon: '🏛️',
      color: 'from-purple-500 to-indigo-600',
      features: [
        '✅ Crear y emitir certificados NFT',
        '✅ Gestionar estudiantes',
        '✅ Verificar logros académicos',
        '✅ Panel de analytics avanzado'
      ]
    },
    {
      id: 'estudiante',
      title: 'Estudiante',
      subtitle: 'Receptor de Certificados',
      description: 'Recibe, visualiza y comparte tus certificados académicos verificables',
      icon: '🎓',
      color: 'from-blue-500 to-cyan-600',
      features: [
        '✅ Recibir certificados NFT',
        '✅ Ver historial académico',
        '✅ Compartir logros verificables',
        '✅ Acceso móvil 24/7'
      ]
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
          aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-gray-700/50">
          <div className="text-5xl mb-3">🚀</div>
          <h2 
            className="text-3xl font-bold mb-3"
            style={{
              background: "linear-gradient(90deg, #ff0080, #7928ca, #00ffea, #ff0080)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            ¡Bienvenido a CertifyChain!
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Para comenzar, selecciona el rol que mejor describa tu función en el ecosistema educativo
          </p>
        </div>

        {/* Role Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id as 'director' | 'estudiante')}
                className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedRole === role.id 
                    ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900' 
                    : ''
                }`}
              >
                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                  {/* Icon with gradient */}
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-r ${role.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className={`relative w-14 h-14 mx-auto bg-gradient-to-r ${role.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {role.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {role.title}
                    </h3>
                    <p className="text-purple-400 font-semibold mb-3">
                      {role.subtitle}
                    </p>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {role.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {role.features.map((feature, index) => (
                      <li key={index} className="text-gray-300 text-xs group-hover:text-gray-200 transition-colors duration-300">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Selection indicator */}
                  {selectedRole === role.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}

                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3">
            <button
              onClick={onCancel}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 text-sm ${
                selectedRole
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>

        <style>
          {`
            @keyframes rgbTextGlow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default RoleSelector;
