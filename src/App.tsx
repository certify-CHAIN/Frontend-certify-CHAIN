import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./contracts/CertifyRoles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useWalletClient } from "wagmi";
import AdminPanel from "./components/AdminPanel";
import DirectorPanel from "./components/DirectorPanel";
import StudentPanel from "./components/StudentPanel";
import AnimatedBackground from "./components/AnimatedBackground";
import logo from "./assets/logo.svg";
import logoDark from "./assets/logo-black.svg";

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
  const { address, isConnected, isConnecting } = useAccount();
  // Hook para obtener el wallet client (equivalente a signer en viem)
  const { data: walletClient } = useWalletClient();
  // Hook para desconectar la wallet
  const { disconnect } = useDisconnect();

  // Verificar rol basado en la dirección de la wallet
  const verificarRol = async (
    address: string,
    signer: ethers.Signer
  ): Promise<UserRole> => {
    try {
      const contract = getContract(signer);
      const role: string = await contract.checkRole(address);
      if (role === "admin" || role === "director" || role === "student") {
        return role as UserRole;
      }
      return null;
    } catch (error) {
      console.error("Error verificando rol:", error);
      return null;
    }
  };

  // Efecto para verificar el rol cuando se conecta una wallet
  useEffect(() => {
    const checkUserRole = async () => {
      if (isConnected && address && walletClient) {
        setLoading(true);
        try {
          // Convertir wallet client a ethers signer
          const signer = await walletClientToSigner(walletClient);
          if (signer) {
            const rol = await verificarRol(address, signer);
            setUserRole(rol);
          }
        } catch (error) {
          console.error("Error verificando rol:", error);
          setUserRole(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUserRole(null);
      }
    };

    checkUserRole();
  }, [isConnected, address, walletClient]);

  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  // Aplicar clase de modo oscuro/claro al elemento html
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [modoOscuro]);

  const desconectar = () => {
    disconnect();
    setUserRole(null);
  };

  // Modificar el useEffect del widget para que se active/desactive según el estado de la cuenta
  useEffect(() => {
    const removeExistingScript = () => {
      const existingScript = document.getElementById("codeGPTWidgetScript");
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
        // También remover el widget si existe
        const widgetFrame = document.querySelector('iframe[title="CodeGPT"]');
        if (widgetFrame && widgetFrame.parentNode) {
          widgetFrame.parentNode.removeChild(widgetFrame);
        }
      }
    };

    if (!isConnected) {
      // Primero remover cualquier instancia existente
      removeExistingScript();

      // Luego agregar el nuevo script
      const script = document.createElement("script");
      script.id = "codeGPTWidgetScript";
      script.type = "module";
      script.async = true;
      script.defer = true;
      script.src = "https://widget.codegpt.co/chat-widget.js";
      script.setAttribute(
        "data-widget-id",
        "4dcf2feb-cd3d-4334-aae9-cc0f2e928926"
      );

      document.body.appendChild(script);
    } else {
      // Si hay cuenta conectada, remover todo
      removeExistingScript();
    }

    // Limpieza cuando el componente se desmonte
    return () => {
      removeExistingScript();
    };
  }, [isConnected]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        modoOscuro ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <AnimatedBackground />
      {/* Encabezado común para todos los roles */}
      <header
        className={`shadow-sm relative z-10 ${
          modoOscuro ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center py-1">
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
              {/* Botón de modo oscuro/claro */}
              <button
                onClick={alternarModo}
                className={`p-2 rounded-full transition-colors ${
                  modoOscuro
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {modoOscuro ? "☀️" : "🌙"}
              </button>

              {/* Estado de conexión */}
              {/* {isConnected && (
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-medium ${
                      modoOscuro ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {`${address?.substring(0, 6)}...${address?.substring(
                      address.length - 4
                    )}`}
                  </span>
                  <button
                    onClick={desconectar}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      modoOscuro
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Desconectando..." : "Desconectar"}
                  </button>
                </div>
              )} */}
              
              {/* Botón de conexión de RainbowKit */}
              <ConnectButton 
                showBalance={true}
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal basado en el rol */}
      <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-80px)] relative z-10">
        {isConnecting ? (
          <div className={`text-center p-8 rounded-xl shadow-lg ${modoOscuro ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Conectando...</p>
          </div>
        ) : !isConnected ? (
          <div
            className={`text-center max-w-2xl mx-auto flex flex-col justify-center items-center w-full p-8 rounded-xl shadow-lg ${
              modoOscuro ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-4xl md:text-5xl font-extrabold mb-6 ${
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
            <p
              className={`text-lg md:text-xl mb-8 ${
                modoOscuro ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Conecta tu billetera para acceder al panel correspondiente según
              tu rol en la plataforma.
            </p>
          </div>
        ) : userRole === "admin" ? (
          <AdminPanel account={address || ""} modoOscuro={modoOscuro} />
        ) : userRole === "director" ? (
          <DirectorPanel
            account={address || ""}
            modoOscuro={modoOscuro}
            walletClient={walletClient}
          />
        ) : (
          <StudentPanel account={address || ""} modoOscuro={modoOscuro} />
        )}
      </main>
    </div>
  );
};

export default App;