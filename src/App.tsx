import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { getContract } from "./contracts/CertifyRoles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";
import AdminPanel from "./components/AdminPanel";
import DirectorPanel from "./components/DirectorPanel";
import StudentPanel from "./components/StudentPanel";
import { StarsCanvas } from "./components/main/star-background";
import { Encryption } from "./components/main/encryption";
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
import logo from "./assets/logo.svg";
import logoDark from "./assets/logo-black.svg";
import imgperonaje  from "./assets/somnia titulo per.png";

// Tipos para los roles
type UserRole = "admin" | "director" | "student" | null;

// Función para convertir wallet client a ethers signer
function walletClientToSigner(walletClient: any) {
  if (!walletClient) return null;
  
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new ethers.BrowserProvider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

const App = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(true);
  
  // Hook de RainbowKit/Wagmi para obtener la cuenta conectada
  const { address, isConnected } = useAccount();
  
  // Hook para obtener el wallet client
  const { data: walletClient } = useWalletClient();

  // Función para obtener el rol del usuario
  const obtenerRolUsuario = useCallback(async (userAddress: string) => {
    try {
      setLoading(true);

      // Obtener el contrato
      const signer = await walletClientToSigner(walletClient);
      if (!signer) {
        console.error("No se pudo obtener el signer");
        return null;
      }

      const contract = getContract(signer);
      if (!contract) {
        console.error("No se pudo obtener el contrato");
        return null;
      }

      // Verificar si es admin
      const esAdmin = await contract.esAdmin(userAddress);
      if (esAdmin) {
        console.log("Usuario es admin");
        return "admin";
      }

      // Verificar si es director
      const esDirector = await contract.esDirector(userAddress);
      if (esDirector) {
        console.log("Usuario es director");
        return "director";
      }

      // Verificar si es estudiante
      const esEstudiante = await contract.esEstudiante(userAddress);
      if (esEstudiante) {
        console.log("Usuario es estudiante");
        return "student";
      }

      console.log("Usuario no tiene rol asignado");
      return null;
    } catch (error) {
      console.error("Error al obtener rol:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [walletClient]);

  // Efecto para obtener el rol cuando se conecta una cuenta
  useEffect(() => {
    const checkRole = async () => {
      if (address && walletClient && isConnected) {
        const role = await obtenerRolUsuario(address);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
    };
    
    checkRole();
  }, [address, walletClient, isConnected, obtenerRolUsuario]);

  // Aplicar clase de modo oscuro/claro al elemento html
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [modoOscuro]);

  return (
    <div
      className="h-screen bg-[#030014] overflow-hidden relative"
      style={{
        background: '#030014',
      }}
    >
      {/* Fondo condicional basado en el estado de conexión */}
      {!isConnected ? <StarsCanvas /> : <AnimatedBackground />}
      
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
        
        
        {/* Contenido principal basado en el rol */}
        <main>
          {!isConnected ? (
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
          ) : loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-white text-lg">Verificando rol del usuario...</p>
              </div>
            </div>
          ) : userRole === "admin" ? (
            <AdminPanel account={address || ""} modoOscuro={modoOscuro} />
          ) : userRole === "director" ? (
            <DirectorPanel account={address || ""} modoOscuro={modoOscuro} />
          ) : userRole === "student" ? (
            <StudentPanel account={address || ""} modoOscuro={modoOscuro} />
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 max-w-md">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-white mb-4">Sin Rol Asignado</h3>
                <p className="text-gray-400 mb-6">
                  Tu wallet no tiene un rol asignado en la plataforma CertifyChain.
                </p>
                <p className="text-gray-500 text-sm">
                  Contacta con tu institución educativa para obtener acceso.
                </p>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer solo se muestra si no está conectado */}
        {!isConnected && <Footer />}
      </div>
    </div>
  );
};

export default App;