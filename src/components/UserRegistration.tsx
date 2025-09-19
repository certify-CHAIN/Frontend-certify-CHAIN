import React, { useState } from 'react';

interface UserRegistrationProps {
  selectedRole: 'director' | 'student';
  walletAddress: string;
  onSubmit: (userData: { nombre: string; rol: 'director' | 'student'; wallet_address: string }) => void;
  onBack: () => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ 
  selectedRole, 
  walletAddress, 
  onSubmit, 
  onBack 
}) => {
  const [nombre, setNombre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleInfo = {
    director: {
      title: 'Institution Director',
      icon: '🏛️',
      color: 'from-purple-500 to-indigo-600',
      subtitle: 'Set up your director profile'
    },
    student: {
      title: 'Student',
      icon: '🎓',
      color: 'from-blue-500 to-cyan-600',
      subtitle: 'Set up your student profile'
    }
  };

  const currentRole = roleInfo[selectedRole];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate a small delay to show loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        nombre: nombre.trim(),
        rol: selectedRole,
        wallet_address: walletAddress
      });
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
          aria-label="Back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-gray-700/50">
          <div className="relative mb-4">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentRole.color} rounded-full blur-xl opacity-30`}></div>
            <div className={`relative w-16 h-16 mx-auto bg-gradient-to-r ${currentRole.color} rounded-full flex items-center justify-center text-3xl`}>
              {currentRole.icon}
            </div>
          </div>
          
          <h2 
            className="text-2xl font-bold mb-2"
            style={{
              background: "linear-gradient(90deg, #ff0080, #7928ca, #00ffea, #ff0080)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "rgbTextGlow 3s linear infinite",
            }}
          >
            {currentRole.title}
          </h2>
          <p className="text-base text-gray-300">
            {currentRole.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Wallet Address Display */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Wallet Address
            </label>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-300 font-mono text-xs break-all">
                  {walletAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Role Display */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Selected Role
            </label>
            <div className={`bg-gradient-to-r ${currentRole.color} bg-opacity-10 rounded-lg p-3 border border-gray-700/50`}>
              <div className="flex items-center space-x-2">
                <span className="text-xl">{currentRole.icon}</span>
                <span className="text-white font-semibold capitalize">
                  {selectedRole}
                </span>
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-300 mb-2">
              Your Full Name *
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              required
              disabled={isSubmitting}
            />
            <p className="text-gray-500 text-xs mt-1">
              This name will appear on your certificates and profile
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!nombre.trim() || isSubmitting}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-sm ${
                !nombre.trim() || isSubmitting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : (
                'Complete Registration'
              )}
            </button>
          </div>
        </form>

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

export default UserRegistration;