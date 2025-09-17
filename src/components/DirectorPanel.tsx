import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { PinataSDK } from "pinata";
import certificadoImg from "../assets/ofiSomniaCertify.png";
import { ethers } from "ethers";
import { getCertiChainTokenContract } from "../contracts/CertiChainToken";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

interface DirectorPanelProps {
  account: string;
  modoOscuro: boolean;
  signer?: ethers.Signer;
}

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL,
});

const DirectorPanel = ({ modoOscuro, signer, account }: DirectorPanelProps) => {
  const [activeTab, setActiveTab] = useState("emitir");
  const [nombre, setNombre] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [link, setLink] = useState("");
  const [showJsonForm, setShowJsonForm] = useState(false);
  const [walletToMint, setWalletToMint] = useState("");
  const [showMintForm, setShowMintForm] = useState(false);
  const [mintStatus, setMintStatus] = useState("");
  const [jsonLink, setJsonLink] = useState("");
  const [mintPrice, setMintPrice] = useState("0");
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [certificadoId, setCertificadoId] = useState<string>(uuidv4());

  const [jsonData, setJsonData] = useState({
    description: "",
    name: "",
    base: "",
    content: "",
  });

  const certRef = useRef<HTMLDivElement>(null);

  // Función para guardar certificado en Supabase
  const guardarCertificadoEnBD = async (
    nombreEstudiante: string,
    institucionNombre: string,
    walletDestinatario: string,
    ipfsCertificado?: string,
    ipfsMetadata?: string,
    creadorWallet?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("certificados")
        .insert([
          {
            id: certificadoId,
            nombre_estudiante: nombreEstudiante,
            institucion: institucionNombre,
            wallet_destinatario: walletDestinatario,
            ipfs_certificado: ipfsCertificado || null,
            ipfs_metadata: ipfsMetadata || null,
            estado: "emitido",
            creado_por: creadorWallet || account || null,
            fecha_emision: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error guardando en BD:", error);
        throw error;
      }

      console.log("✅ Certificado guardado en BD:", data);
      setCertificadoId(data.id);
      return data;
    } catch (error) {
      console.error("❌ Error al guardar en base de datos:", error);
      throw error;
    }
  };

  // Función para actualizar certificado con hash de transacción
  const actualizarCertificadoConTx = async (
    certificadoId: string,
    txHash: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("certificados")
        .update({
          tx_hash: txHash,
          estado: "minted",
        })
        .eq("id", certificadoId)
        .select()
        .single();

      if (error) {
        console.error("Error actualizando certificado:", error);
        throw error;
      }

      console.log("✅ Certificado actualizado con TX:", data);
      return data;
    } catch (error) {
      console.error("❌ Error al actualizar certificado:", error);
      throw error;
    }
  };

  // Función para obtener el precio actual del mint
  const getMintPrice = async () => {
    try {
      setIsLoadingPrice(true);

      let providerOrSigner;
      if (signer) {
        providerOrSigner = signer;
      } else {
        if (!(window as any).ethereum) {
          throw new Error("MetaMask no está instalado");
        }
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        providerOrSigner = provider;
      }

      const contract = getCertiChainTokenContract(providerOrSigner);
      const price = await contract.mintPrice();
      const priceInEth = ethers.formatEther(price);
      setMintPrice(priceInEth);
    } catch (error) {
      console.error("Error obteniendo precio:", error);
      setMintPrice("0.001");
    } finally {
      setIsLoadingPrice(false);
    }
  };

  useEffect(() => {
    if (showMintForm) {
      getMintPrice();
    }
  }, [showMintForm]);

  useEffect(() => {
    if (!document.getElementById("codeGPTWidgetScript")) {
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
    }

    return () => {
      const existingScript = document.getElementById("codeGPTWidgetScript");
      if (existingScript && existingScript.parentNode === document.body) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // SUBIR IMAGEN - Función optimizada para calidad 1536x1024px
  const handleUpload = async () => {
    if (!nombre || !institucion) {
      setUploadStatus("⚠️ Por favor completa todos los campos.");
      return;
    }

    try {
      setUploadStatus("🖼️ Generando imagen en alta calidad...");

      // Asegurar que el componente esté renderizado completamente
      await new Promise((resolve) => setTimeout(resolve, 500));

      const certElement = certRef.current;
      if (!certElement) {
        throw new Error("Elemento de certificado no encontrado");
      }

      // Esperar a que todas las imágenes se carguen
      const images = certElement.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            // Timeout de seguridad
            setTimeout(reject, 10000);
          });
        })
      );

      console.log("✅ Todas las imágenes están cargadas");

      // Obtener las dimensiones reales del elemento
      const rect = certElement.getBoundingClientRect();
      
      // Calcular las dimensiones para mantener la calidad original
      const targetWidth = 1536;
      const targetHeight = 1024;
      const scale = Math.max(targetWidth / rect.width, targetHeight / rect.height);

      console.log(`📏 Dimensiones originales: ${rect.width}x${rect.height}`);
      console.log(`🎯 Dimensiones objetivo: ${targetWidth}x${targetHeight}`);
      console.log(`⚡ Escala calculada: ${scale}`);

      // Configuración optimizada para html2canvas con resolución exacta
      const canvas = await html2canvas(certElement, {
        useCORS: true,
        scale: scale, // Escala calculada para alcanzar 1536x1024
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: true, // Activar logging para debug
        width: targetWidth / scale, // Ancho ajustado
        height: targetHeight / scale, // Alto ajustado
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false, // Desactivar para mejor compatibilidad con img
        removeContainer: true,
        imageTimeout: 15000, // Timeout más largo para cargar imágenes
        onclone: (clonedDoc) => {
          // Asegurar que las imágenes se carguen en el clon
          const clonedElement = clonedDoc.getElementById("certificado-element");
          if (clonedElement) {
            const img = clonedElement.querySelector('img');
            if (img) {
              img.crossOrigin = "anonymous";
              img.style.width = "100%";
              img.style.height = "100%";
              img.style.objectFit = "contain";
            }
          }
        },
      });

      console.log(`✅ Canvas generado: ${canvas.width}x${canvas.height}`);

      // Si el canvas no tiene las dimensiones exactas, redimensionarlo
      let finalCanvas = canvas;
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        console.log("🔄 Redimensionando canvas a resolución exacta...");
        finalCanvas = document.createElement('canvas');
        finalCanvas.width = targetWidth;
        finalCanvas.height = targetHeight;
        
        const ctx = finalCanvas.getContext('2d');
        if (ctx) {
          // Usar interpolación de alta calidad
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
        }
      }

      // Convertir a blob con máxima calidad usando PNG para evitar compresión
      const blob = await new Promise<Blob>((resolve) =>
        finalCanvas.toBlob(
          (blob) => resolve(blob!), 
          "image/png", // PNG sin compresión
          1.0 // Calidad máxima
        )
      );

      console.log(`📦 Blob generado: ${blob.size} bytes`);

      setUploadStatus("🌀 Obteniendo URL prefirmada...");
      const urlResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/presigned_url`
      );

      if (!urlResponse.ok) {
        throw new Error(
          `Error al obtener URL prefirmada: ${urlResponse.statusText}`
        );
      }

      const contentType = urlResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await urlResponse.text();
        throw new Error(`Respuesta inesperada del servidor: ${text}`);
      }

      const data = await urlResponse.json();

      setUploadStatus("⬆️ Subiendo certificado en alta calidad a IPFS...");
      const fileName = `certificado-${nombre
        .toLowerCase()
        .replace(/\s+/g, "-")}-${targetWidth}x${targetHeight}.png`;

      const file = new File([blob], fileName, { type: "image/png" });

      const upload = await pinata.upload.public
        .file(file, {
          metadata: { 
            name: fileName,
          },
        })
        .url(data.url);

      if (upload.cid) {
        const ipfsLink = await pinata.gateways.public.convert(upload.cid);
        setLink(ipfsLink);
        setUploadStatus(`✅ Certificado subido en calidad ${targetWidth}x${targetHeight}px.`);
        setShowJsonForm(true);
      } else {
        setUploadStatus("❌ Falló la subida del archivo.");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus(
        `⚠️ Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // SUBIR JSON
  const handleJsonUpload = async () => {
    const metadata = {
      description: jsonData.description,
      external_url: "https://wirawallet.com",
      image: link,
      name: jsonData.name,
      attributes: [
        { trait_type: "Base", value: jsonData.base },
        { trait_type: "Content", value: jsonData.content },
      ],
    };

    try {
      setUploadStatus("📦 Subiendo metadata JSON...");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/pinata/json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(metadata),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      const cid = result?.cid;
      if (cid) {
        const ipfsJsonLink = `https://${
          import.meta.env.VITE_GATEWAY_URL
        }/ipfs/${cid}`;
        setUploadStatus(`✅ JSON subido exitosamente.`);
        setJsonLink(ipfsJsonLink);

        try {
          setUploadStatus("💾 Guardando certificado en base de datos...");
          await guardarCertificadoEnBD(
            nombre,
            institucion,
            walletToMint || "",
            link,
            ipfsJsonLink,
            account
          );
          setUploadStatus(
            "✅ Certificado guardado en base de datos y listo para mintear."
          );
        } catch (dbError) {
          console.error("Error guardando en BD:", dbError);
          setUploadStatus(
            "⚠️ JSON subido pero error al guardar en BD. Puedes continuar con el mint."
          );
        }

        setShowMintForm(true);
      } else {
        throw new Error("No se recibió el CID");
      }
    } catch (error: any) {
      console.error("Error al subir JSON:", error);
      setUploadStatus(
        "❌ Error al subir JSON: " + (error?.message || "ver consola")
      );
    }
  };

  // MINTEAR NFT
  async function mintNFT(ipfsJsonLink: string) {
    try {
      setIsMinting(true);
      setMintStatus("🔄 Conectando a contrato...");

      if (!(window as any).ethereum) {
        throw new Error("MetaMask no está instalado.");
      }
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contract = getCertiChainTokenContract(signer);

      if (typeof contract.mintPrice !== "function") {
        throw new Error(
          "La función mintPrice no existe en el contrato. Revisa el ABI."
        );
      }

      setMintStatus("💰 Obteniendo precio actual...");
      const currentPrice = await contract.mintPrice();
      console.log("💰 Precio en wei:", currentPrice.toString());
      console.log("💰 Precio en STT:", ethers.formatEther(currentPrice));

      if (!ethers.isAddress(walletToMint)) {
        throw new Error("Dirección de wallet inválida");
      }
      console.log("✅ Dirección de wallet válida:", walletToMint);

      if (!certificadoId) {
        setMintStatus("💾 Guardando certificado en base de datos...");
        await guardarCertificadoEnBD(
          nombre,
          institucion,
          walletToMint,
          link,
          ipfsJsonLink,
          account
        );
      } else {
        const { error } = await supabase
          .from("certificados")
          .update({ wallet_destinatario: walletToMint })
          .eq("id", certificadoId);

        if (error) {
          console.error("Error actualizando wallet destinataria:", error);
        }
      }

      setMintStatus("🚀 Ejecutando mint en blockchain...");
      const tx = await contract.safeMint(walletToMint, ipfsJsonLink, {
        value: currentPrice,
      });

      setMintStatus("⏳ Esperando confirmación de blockchain...");
      const receipt = await tx.wait();
      console.log("✅ NFT minteado:", receipt);

      if (certificadoId) {
        setMintStatus("💾 Actualizando registro en base de datos...");
        await actualizarCertificadoConTx(certificadoId, receipt.hash);
      }

      setMintStatus(`✅ ¡NFT Certificate minteado exitosamente! 
🔗 Hash de transacción: ${receipt.hash}
💎 Token enviado a: ${walletToMint}
📋 Metadata IPFS: ${ipfsJsonLink}`);
    } catch (error: any) {
      console.error("❌ Error en mintNFT:", error.message || error);
      setMintStatus(`❌ Error en el mint: ${error.message || error}`);
    } finally {
      setIsMinting(false);
    }
  }

  return (
    <div
      className={`min-h-screen ${modoOscuro ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="mx-auto py-10 w-full lg:w-[95%] xl:max-w-[1800px] 2xl:max-w-[2000px]">
        <div
          className={`p-10 md:p-16 lg:p-20 rounded-2xl ${
            modoOscuro ? "bg-gray-800" : "bg-white shadow-2xl"
          }`}
        >
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-12 ${
              modoOscuro ? "text-white" : "text-gray-800"
            }`}
          >
            Panel de Director/Administrativo
          </h1>

          <div
            className={`flex border-b-2 mb-12 ${
              modoOscuro ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {["emitir", "verificar", "historial", "reportes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-xl md:text-2xl font-medium capitalize ${
                  modoOscuro ? "text-gray-300" : "text-gray-600"
                } ${
                  activeTab === tab
                    ? modoOscuro
                      ? "border-b-4 border-blue-500 text-white"
                      : "border-b-4 border-blue-500 text-blue-600"
                    : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            className={`p-10 md:p-12 rounded-xl ${
              modoOscuro ? "bg-gray-700" : "bg-gray-50 shadow-lg"
            }`}
          >
            {activeTab === "emitir" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                  <div className="space-y-8">
                    <h2
                      className={`text-3xl font-semibold ${
                        modoOscuro ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Emitir Nuevos Certificados
                    </h2>

                    <input
                      type="text"
                      placeholder="Nombre del estudiante"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />

                    <input
                      type="text"
                      placeholder="Institución"
                      value={institucion}
                      onChange={(e) => setInstitucion(e.target.value)}
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>

                  <div className="flex justify-center w-full">
                    <div
                      ref={certRef}
                      id="certificado-element"
                      className="relative w-full max-w-[900px]"
                      style={{
                        aspectRatio: "1536 / 1024",
                      }}
                    >
                      {/* Imagen de fondo como elemento img para mejor captura */}
                      <img
                        src={certificadoImg}
                        alt="Certificado Background"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ zIndex: 0 }}
                        crossOrigin="anonymous"
                      />
                      
                      {/* Contenido superpuesto */}
                      <div className="absolute inset-0" style={{ zIndex: 1 }}>
                        <div className="absolute top-4 right-2.5">
                          <QRCodeSVG
                            value={`${"https://frontend-certify-chain.vercel.app"}/${certificadoId}`}
                            size={90}
                          />
                        </div>

                        {/* Nombre dinámico - Ajuste automático */}
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 text-center font-sans text-white whitespace-nowrap"
                          style={{
                            fontSize: "clamp(14px, 2vw, 36px)",
                            maxWidth: "95%",
                            top: "34%",
                            transform: "translateX(-50%)",
                            lineHeight: "1.1",
                            fontWeight: "600",
                            overflowWrap: "break-word",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                          }}
                          title={nombre} // Muestra el nombre completo al pasar el mouse
                        >
                          {nombre}
                        </div>

                        {/* Institución - Texto ajustado para evitar corte */}
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 text-center font-sans text-white"
                          style={{
                            fontSize: "clamp(14px, 2vw, 36px)",
                            maxWidth: "95%",
                            top: "54%",
                            transform: "translateX(-50%)",
                            lineHeight: "1.1",
                            fontWeight: "600",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                          }}
                        >
                          {institucion}
                        </div>

                        {/* Fecha */}
                        <div
                          className="absolute text-white font-sans"
                          style={{
                            left: "15%",
                            top: "78%",
                            fontSize: "clamp(12px, 1.3vw, 24px)",
                            lineHeight: "1",
                            fontWeight: "500",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                          }}
                        >
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex justify-center">
                  <button
                    onClick={handleUpload}
                    className={`group px-12 py-5 text-xl rounded-xl font-bold transition-all duration-200 relative overflow-hidden ${
                      modoOscuro
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    <span
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(270deg, #ff0080, #7928ca, #00ffea, #ff0080)",
                        backgroundSize: "600% 600%",
                        animation: "rgbGlow 3s linear infinite",
                        filter: "blur(14px)",
                        zIndex: 0,
                      }}
                    />

                    <span className="relative z-10 text-white">
                      Generar y Subir Certificado
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

                {showJsonForm && (
                  <div className="mt-16 space-y-6">
                    <h3
                      className={`text-2xl font-semibold ${
                        modoOscuro ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Subir Metadata JSON
                    </h3>
                    <input
                      type="text"
                      placeholder="Descripción del certificado"
                      value={jsonData.description}
                      onChange={(e) =>
                        setJsonData({
                          ...jsonData,
                          description: e.target.value,
                        })
                      }
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Nombre del certificado"
                      value={jsonData.name}
                      onChange={(e) =>
                        setJsonData({ ...jsonData, name: e.target.value })
                      }
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Base/Curso"
                      value={jsonData.base}
                      onChange={(e) =>
                        setJsonData({ ...jsonData, base: e.target.value })
                      }
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Contenido/Especialidad"
                      value={jsonData.content}
                      onChange={(e) =>
                        setJsonData({ ...jsonData, content: e.target.value })
                      }
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <button
                      onClick={handleJsonUpload}
                      className="px-8 py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors text-lg"
                    >
                      Subir JSON a IPFS
                    </button>
                  </div>
                )}

                {uploadStatus && (
                  <div
                    className={`mt-8 p-5 rounded-xl text-center text-xl ${
                      uploadStatus.includes("✅")
                        ? modoOscuro
                          ? "bg-green-800 text-green-200"
                          : "bg-green-100 text-green-700"
                        : uploadStatus.includes("❌")
                        ? modoOscuro
                          ? "bg-red-800 text-red-200"
                          : "bg-red-100 text-red-700"
                        : modoOscuro
                        ? "bg-blue-800 text-blue-200"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {uploadStatus}
                  </div>
                )}

                {link && (
                  <div className="mt-8 text-center">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xl underline"
                    >
                      🔗 Ver Certificado en IPFS
                    </a>
                  </div>
                )}

                {showMintForm && (
                  <div className="mt-16 space-y-8">
                    <h3
                      className={`text-2xl font-semibold ${
                        modoOscuro ? "text-white" : "text-gray-800"
                      }`}
                    >
                      🎯 Mint NFT Certificate - Cualquier persona puede mintear
                    </h3>

                    {certificadoId && (
                      <div
                        className={`p-5 rounded-xl ${
                          modoOscuro
                            ? "bg-green-900 border border-green-700"
                            : "bg-green-50 border border-green-200"
                        }`}
                      >
                        <p
                          className={`text-xl ${
                            modoOscuro ? "text-green-200" : "text-green-800"
                          }`}
                        >
                          💾 Certificado guardado en BD con ID:{" "}
                          <code className="font-mono">{certificadoId}</code>
                        </p>
                      </div>
                    )}

                    <div
                      className={`p-6 rounded-xl ${
                        modoOscuro
                          ? "bg-blue-900 border border-blue-700"
                          : "bg-blue-50 border border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-medium text-xl ${
                            modoOscuro ? "text-blue-200" : "text-blue-800"
                          }`}
                        >
                          💰 Costo del certificado NFT:
                        </span>
                        <span
                          className={`font-bold text-2xl ${
                            modoOscuro ? "text-blue-100" : "text-blue-900"
                          }`}
                        >
                          {isLoadingPrice
                            ? "⏳ Cargando..."
                            : `${mintPrice} STT`}
                        </span>
                      </div>
                      <p
                        className={`text-xl mt-3 ${
                          modoOscuro ? "text-blue-300" : "text-blue-600"
                        }`}
                      >
                        🌍 Cualquier persona con MetaMask puede pagar y mintear
                        este certificado
                      </p>
                    </div>

                    <div className="space-y-4">
                      <span
                        className={`text-xl ${
                          modoOscuro ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        📋 JSON Metadata IPFS:
                      </span>
                      <a
                        href={jsonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-400 hover:text-blue-300 text-lg underline break-all"
                      >
                        {jsonLink}
                      </a>
                    </div>

                    <input
                      type="text"
                      placeholder="Dirección wallet destinataria (0x...)"
                      value={walletToMint}
                      onChange={(e) => setWalletToMint(e.target.value)}
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />

                    <button
                      onClick={() => mintNFT(jsonLink)}
                      disabled={
                        !walletToMint ||
                        !jsonLink ||
                        isLoadingPrice ||
                        isMinting
                      }
                      className={`w-full p-5 text-xl rounded-xl font-bold transition-all duration-200 relative overflow-hidden ${
                        !walletToMint ||
                        !jsonLink ||
                        isLoadingPrice ||
                        isMinting
                          ? "bg-gray-400 cursor-not-allowed"
                          : modoOscuro
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      <span className="relative z-10 text-white">
                        {isLoadingPrice
                          ? "⏳ Cargando precio..."
                          : isMinting
                          ? "⏳ Minteando..."
                          : `💎 Mint Certificate NFT (${mintPrice} ETH)`}
                      </span>
                    </button>

                    {mintStatus && (
                      <div
                        className={`p-5 rounded-xl whitespace-pre-line text-xl ${
                          mintStatus.includes("✅")
                            ? modoOscuro
                              ? "bg-green-800 text-green-100 border border-green-600"
                              : "bg-green-100 text-green-800 border border-green-300"
                            : modoOscuro
                            ? "bg-red-800 text-red-100 border border-red-600"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {mintStatus}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <button
                        onClick={getMintPrice}
                        disabled={isLoadingPrice}
                        className={`px-8 py-3 text-lg rounded-xl ${
                          modoOscuro
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } disabled:opacity-50`}
                      >
                        {isLoadingPrice
                          ? "⏳ Actualizando..."
                          : "🔄 Actualizar precio"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorPanel;
