import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import DirectorPanel from "./components/DirectorPanel";
import StudentPanel from "./components/StudentPanel";
import RoleSelector from "./components/RoleSelector";
import UserRegistration from "./components/UserRegistration";
import { StarsCanvas } from "./components/main/star-background";
import { Hero } from "./components/main/hero";
import AnimatedBackground from "./components/AnimatedBackground";
import TypewriterText from "./components/TypewriterText";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import BenefitsSection from "./components/BenefitsSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { userDatabase } from "./utils/userDatabase";
import type { UserData } from "./utils/userDatabase";
import logo from "./assets/logo.svg";
import logoDark from "./assets/logo-black.svg";
import imgperonaje  from "./assets/somnia titulo per.svg";

// Tipos para los roles simplificados
type UserRole = "director" | "estudiante" | null;

// Estados de la aplicación
type AppState = "landing" | "role-selection" | "registration" | "dashboard";

const App = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appState, setAppState] = useState<AppState>("landing");
  const [selectedRole, setSelectedRole] = useState<'director' | 'estudiante' | null>(null);
  const [modoOscuro] = useState(true);
  
  // Hook de RainbowKit/Wagmi para obtener la cuenta conectada
  const { address, isConnected } = useAccount();

  // Verificar si el usuario ya está registrado cuando conecta la wallet
  useEffect(() => {
    const checkUserRegistration = async () => {
      if (isConnected && address) {
        try {
          // Verificar si el usuario ya está en la base de datos
          const existingUser = await userDatabase.getUserByWallet(address);
          
          if (existingUser) {
            // Usuario ya registrado, ir directo al dashboard
            setUserData(existingUser);
            setUserRole(existingUser.rol);
            setAppState("dashboard");
          } else {
            // Usuario nuevo, mostrar selector de rol
            setAppState("role-selection");
          }
        } catch (error) {
          console.error('Error verificando registro de usuario:', error);
          setAppState("role-selection");
        }
      } else {
        // No conectado, mostrar landing page
        setAppState("landing");
        setUserRole(null);
        setUserData(null);
        setSelectedRole(null);
      }
    };

    checkUserRegistration();
  }, [isConnected, address]);

  // Aplicar clase de modo oscuro al elemento html
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [modoOscuro]);

  // Manejar selección de rol
  const handleRoleSelection = (role: 'director' | 'estudiante') => {
    setSelectedRole(role);
    setAppState("registration");
  };

  // Manejar registro de usuario
  const handleUserRegistration = async (newUserData: { nombre: string; rol: 'director' | 'estudiante'; wallet_address: string }) => {
    try {
      const registeredUser = await userDatabase.registerUser(newUserData);
      if (registeredUser) {
        setUserData(registeredUser);
        setUserRole(registeredUser.rol);
        setAppState("dashboard");
      }
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error al registrar usuario. Por favor, intenta de nuevo.');
    }
  };

  // Función para volver al selector de rol desde el formulario
  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setAppState("role-selection");
  };

  // Función para cancelar el proceso de registro
  const handleCancelRegistration = () => {
    setSelectedRole(null);
    setAppState("landing");
    // Optionally disconnect wallet here if desired
  };

  // Renderizar componente basado en el estado de la app
  const renderContent = () => {
    switch (appState) {
      case "landing":
        return (
          <>
            {/* Landing Page para usuarios no conectados */}
            <Hero />
            
            <h2
              className={`flex flex-1 items-center justify-center top-10 text-4xl md:text-5xl -mt-[100px] font-extrabold mb-6 ${
                modoOscuro ? "text-white" : "text-gray-800"
              } relative`}
              style={{
                background:
                  "linear-gradient(90deg, #ff0080, #7928ca, #00ffea, #ff0080)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "rgbTextGlow 3s linear infinite",
              }}
            >
              Plataforma de Certificados NFT
              <style>
                {`
                  @keyframes rgbTextGlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
              </style>
            </h2>
            <br /><br />
            <div className="relative z-50">
              <TypewriterText />
            </div>
            <div className="flex justify-center items-center mt-8 relative z-40">
              <img 
                src={imgperonaje} 
                alt="Personaje Somnia" 
                className="max-w-md w-full h-auto object-contain opacity-90"
                style={{ maxHeight: '250px' }}
              />
            </div>

            {/* Secciones de la Landing Page */}
            <FeaturesSection />
            <HowItWorksSection />
            <StatsSection />
            <BenefitsSection />
            <TestimonialsSection />
            <CTASection />
          </>
        );

      case "role-selection":
        return (
          <RoleSelector
            onRoleSelect={handleRoleSelection}
            onCancel={handleCancelRegistration}
          />
        );

      case "registration":
        if (!selectedRole || !address) {
          return <div>Error: Datos faltantes para el registro</div>;
        }
        return (
          <UserRegistration
            selectedRole={selectedRole}
            walletAddress={address}
            onSubmit={handleUserRegistration}
            onBack={handleBackToRoleSelection}
          />
        );

      case "dashboard":
        if (!userData || !address) {
          return <div>Error: Datos de usuario no disponibles</div>;
        }
        
        return userRole === "director" ? (
          <DirectorPanel account={address} modoOscuro={modoOscuro} />
        ) : (
          <StudentPanel account={address} modoOscuro={modoOscuro} />
        );

      default:
        return <div>Estado desconocido</div>;
    }
  };

  return (
    <div
      className="h-screen bg-[#030014] overflow-hidden relative"
      style={{
        background: '#030014',
      }}
    >
      {/* Fondo condicional basado en el estado de conexión */}
      {appState === "landing" ? <StarsCanvas /> : <AnimatedBackground />}
      
      {/* Header fijo */}
      <header
        className="fixed top-0 left-0 w-full h-[65px] shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10"
      >
        <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
          <div className="flex items-center">
            <img
              src={modoOscuro ? logo : logoDark}
              alt="CertiChain Logo"
              className="h-12 w-auto max-w-none"
              style={{
                minWidth: "200px",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div 
              className="rounded-xl p-[3px] shadow-lg hover:shadow-2xl transition-all duration-300 animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)',
                backgroundSize: '400% 400%',
                animation: 'rainbow 3s linear infinite'
              }}
            >
              <div className="bg-[#030014] rounded-xl">
                <ConnectButton 
                  showBalance={true}
                  accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                  }}
                />
              </div>
              <style>
                {`
                  @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </header>
      
      {/* Contenedor con scroll único */}
      <div className="h-full overflow-y-auto overflow-x-hidden pt-[65px]">
        {/* Contenido principal basado en el estado de la app */}
        <main>
          {renderContent()}
        </main>
        
        {/* Footer solo se muestra en landing page */}
        {appState === "landing" && <Footer />}
        
        {/* Componente de prueba de Supabase - remover en producción */}
      </div>
    </div>
  );
};

export default App;