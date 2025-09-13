import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./contracts/CertifyRoles";
import Web3Modal from "web3modal";
import AdminPanel from "./components/AdminPanel";
import DirectorPanel from "./components/DirectorPanel";
import StudentPanel from "./components/StudentPanel";
import AnimatedBackground from "./components/AnimatedBackground";
import logo from "./assets/logo.svg";
import logoDark from "./assets/logo-black.svg";

// Tipos para los roles
type UserRole = "admin" | "director" | "student" | null;

const App = () => {
  const [account, setAccount] = useState<string>("");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(true);
  const [signer, setSigner] = useState<ethers.Signer | null>(null); // Nuevo estado para el signer

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

  const conectarBilletera = async () => {
    setLoading(true);
    try {
      const web3Modal = new Web3Modal();
      const conexion = await web3Modal.connect();
      const proveedor = new ethers.BrowserProvider(conexion);
      const firmante = await proveedor.getSigner();
      const direccion = await firmante.getAddress();

      const rol = await verificarRol(direccion, firmante);

      setAccount(direccion);
      setUserRole(rol);
      setSigner(firmante); // Guardar el signer en el estado
    } catch (error) {
      console.error("Error conectando billetera:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setAccount("");
    setUserRole(null);
    setSigner(null); // Limpiar el signer al desconectar
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

    if (!account) {
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
  }, [account]); // Dependencia del estado de account

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
              {account && (
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-medium ${
                      modoOscuro ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {`${account.substring(0, 6)}...${account.substring(
                      account.length - 4
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
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal basado en el rol */}
      <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-80px)] relative z-10">
        {!account ? (
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
            
            <button
              onClick={conectarBilletera}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold shadow transition-all duration-200 relative overflow-hidden
                ${
                  modoOscuro
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
                group
              `}
              style={{ zIndex: 1 }}
            >

              <span
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(270deg, #ff0080, #7928ca, #00ffea, #ff0080)",
                  backgroundSize: "600% 600%",
                  animation: "rgbGlow 2s linear infinite",
                  filter: "blur(12px)",
                  zIndex: 0,
                }}
              />
              <span className="relative z-10">
                {loading ? "Conectando..." : "Conectar Wallet"}
              </span>
              <style>
                {`
                  @keyframes rgbGlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
              </style>
            </button>
          </div>
        ) : userRole === "admin" ? (
          <AdminPanel account={account} modoOscuro={modoOscuro} />
        ) : userRole === "director" ? (
          <DirectorPanel
            account={account}
            modoOscuro={modoOscuro}
            signer={signer!} // Pasamos el signer al DirectorPanel
          />
        ) : (
          <StudentPanel account={account} modoOscuro={modoOscuro} />
        )}
      </main>
    </div>
  );
};

export default App;
