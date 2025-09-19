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

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL,
});

const DirectorPanel = ({ modoOscuro, signer, account }: DirectorPanelProps) => {
  const [activeTab, setActiveTab] = useState("issue");
  const [studentName, setStudentName] = useState("");
  const [institution, setInstitution] = useState("");
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
  const [certificateId, setCertificateId] = useState<string>(uuidv4());

  const [jsonData, setJsonData] = useState({
    description: "",
    name: "",
    base: "",
    content: "",
  });

  const certRef = useRef<HTMLDivElement>(null);

  // Function to save certificate in Supabase
  const saveCertificateInDB = async (
    studentName: string,
    institutionName: string,
    walletDestination: string,
    ipfsCertificate?: string,
    ipfsMetadata?: string,
    creatorWallet?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .insert([
          {
            id: certificateId,
            student_name: studentName,
            institution: institutionName,
            wallet_destination: walletDestination,
            ipfs_certificate: ipfsCertificate || null,
            ipfs_metadata: ipfsMetadata || null,
            status: "issued",
            created_by: creatorWallet || account || null,
            emission_date: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error saving to DB:", error);
        throw error;
      }

      console.log("✅ Certificate saved in DB:", data);
      setCertificateId(data.id);
      return data;
    } catch (error) {
      console.error("❌ Error saving to database:", error);
      throw error;
    }
  };

  // Function to update certificate with transaction hash
  const updateCertificateWithTx = async (
    certificateId: string,
    txHash: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .update({
          tx_hash: txHash,
          status: "minted",
        })
        .eq("id", certificateId)
        .select()
        .single();

      if (error) {
        console.error("Error updating certificate:", error);
        throw error;
      }

      console.log("✅ Certificate updated with TX:", data);
      return data;
    } catch (error) {
      console.error("❌ Error updating certificate:", error);
      throw error;
    }
  };

  // Function to get current mint price
  const getMintPrice = async () => {
    try {
      setIsLoadingPrice(true);

      let providerOrSigner;
      if (signer) {
        providerOrSigner = signer;
      } else {
        if (!(window as any).ethereum) {
          throw new Error("MetaMask is not installed");
        }
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        providerOrSigner = provider;
      }

      const contract = getCertiChainTokenContract(providerOrSigner);
      const price = await contract.mintPrice();
      const priceInEth = ethers.formatEther(price);
      setMintPrice(priceInEth);
    } catch (error) {
      console.error("Error getting price:", error);
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

  // UPLOAD IMAGE - Function optimized for 1536x1024px quality
  const handleUpload = async () => {
    if (!studentName || !institution) {
      setUploadStatus("⚠️ Please complete all fields.");
      return;
    }

    try {
      setUploadStatus("🖼️ Generating high quality image...");

      // Ensure component is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      const certElement = certRef.current;
      if (!certElement) {
        throw new Error("Certificate element not found");
      }

      // Wait for all images to load
      const images = certElement.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            // Safety timeout
            setTimeout(reject, 10000);
          });
        })
      );

      console.log("✅ All images are loaded");

      // Get real element dimensions
      const rect = certElement.getBoundingClientRect();
      
      // Calculate dimensions to maintain original quality
      const targetWidth = 1536;
      const targetHeight = 1024;
      const scale = Math.max(targetWidth / rect.width, targetHeight / rect.height);

      console.log(`📏 Original dimensions: ${rect.width}x${rect.height}`);
      console.log(`🎯 Target dimensions: ${targetWidth}x${targetHeight}`);
      console.log(`⚡ Calculated scale: ${scale}`);

      // Optimized configuration for html2canvas with exact resolution
      const canvas = await html2canvas(certElement, {
        useCORS: true,
        scale: scale, // Calculated scale to reach 1536x1024
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: true, // Enable logging for debug
        width: targetWidth / scale, // Adjusted width
        height: targetHeight / scale, // Adjusted height
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false, // Disable for better img compatibility
        removeContainer: true,
        imageTimeout: 15000, // Longer timeout to load images
        onclone: (clonedDoc) => {
          // Ensure images load in the clone
          const clonedElement = clonedDoc.getElementById("certificate-element");
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

      console.log(`✅ Canvas generated: ${canvas.width}x${canvas.height}`);

      // If canvas doesn't have exact dimensions, resize it
      let finalCanvas = canvas;
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        console.log("🔄 Resizing canvas to exact resolution...");
        finalCanvas = document.createElement('canvas');
        finalCanvas.width = targetWidth;
        finalCanvas.height = targetHeight;
        
        const ctx = finalCanvas.getContext('2d');
        if (ctx) {
          // Use high quality interpolation
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
        }
      }

      // Convert to blob with maximum quality using PNG to avoid compression
      const blob = await new Promise<Blob>((resolve) =>
        finalCanvas.toBlob(
          (blob) => resolve(blob!), 
          "image/png", // PNG without compression
          1.0 // Maximum quality
        )
      );

      console.log(`📦 Blob generated: ${blob.size} bytes`);

      setUploadStatus("🌀 Getting presigned URL...");
      const urlResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/presigned_url`
      );

      if (!urlResponse.ok) {
        throw new Error(
          `Error getting presigned URL: ${urlResponse.statusText}`
        );
      }

      const contentType = urlResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await urlResponse.text();
        throw new Error(`Unexpected server response: ${text}`);
      }

      const data = await urlResponse.json();

      setUploadStatus("⬆️ Uploading high quality certificate to IPFS...");
      const fileName = `certificate-${studentName
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
        setUploadStatus(`✅ Certificate uploaded in ${targetWidth}x${targetHeight}px quality.`);
        setShowJsonForm(true);
      } else {
        setUploadStatus("❌ File upload failed.");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus(
        `⚠️ Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // UPLOAD JSON
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
      setUploadStatus("📦 Uploading JSON metadata...");

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
        setUploadStatus(`✅ JSON uploaded successfully.`);
        setJsonLink(ipfsJsonLink);

        try {
          setUploadStatus("💾 Saving certificate to database...");
          await saveCertificateInDB(
            studentName,
            institution,
            walletToMint || "",
            link,
            ipfsJsonLink,
            account
          );
          setUploadStatus(
            "✅ Certificate saved to database and ready to mint."
          );
        } catch (dbError) {
          console.error("Error saving to DB:", dbError);
          setUploadStatus(
            "⚠️ JSON uploaded but error saving to DB. You can continue with mint."
          );
        }

        setShowMintForm(true);
      } else {
        throw new Error("CID not received");
      }
    } catch (error: any) {
      console.error("Error uploading JSON:", error);
      setUploadStatus(
        "❌ Error uploading JSON: " + (error?.message || "see console")
      );
    }
  };

  // MINT NFT
  async function mintNFT(ipfsJsonLink: string) {
    try {
      setIsMinting(true);
      setMintStatus("🔄 Connecting to contract...");

      if (!(window as any).ethereum) {
        throw new Error("MetaMask is not installed.");
      }
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const contract = getCertiChainTokenContract(signer);

      if (typeof contract.mintPrice !== "function") {
        throw new Error(
          "The mintPrice function does not exist in the contract. Check the ABI."
        );
      }

      setMintStatus("💰 Getting current price...");
      const currentPrice = await contract.mintPrice();
      console.log("💰 Price in wei:", currentPrice.toString());
      console.log("💰 Price in STT:", ethers.formatEther(currentPrice));

      if (!ethers.isAddress(walletToMint)) {
        throw new Error("Invalid wallet address");
      }
      console.log("✅ Valid wallet address:", walletToMint);

      if (!certificateId) {
        setMintStatus("💾 Saving certificate to database...");
        await saveCertificateInDB(
          studentName,
          institution,
          walletToMint,
          link,
          ipfsJsonLink,
          account
        );
      } else {
        const { error } = await supabase
          .from("certificates")
          .update({ wallet_destination: walletToMint })
          .eq("id", certificateId);

        if (error) {
          console.error("Error updating destination wallet:", error);
        }
      }

      setMintStatus("🚀 Executing mint on blockchain...");
      const tx = await contract.safeMint(walletToMint, ipfsJsonLink, {
        value: currentPrice,
      });

      setMintStatus("⏳ Waiting for blockchain confirmation...");
      const receipt = await tx.wait();
      console.log("✅ NFT minted:", receipt);

      if (certificateId) {
        setMintStatus("💾 Updating database record...");
        await updateCertificateWithTx(certificateId, receipt.hash);
      }

      setMintStatus(`✅ NFT Certificate minted successfully! 
🔗 Transaction hash: ${receipt.hash}
💎 Token sent to: ${walletToMint}
📋 IPFS Metadata: ${ipfsJsonLink}`);
    } catch (error: any) {
      console.error("❌ Error in mintNFT:", error.message || error);
      setMintStatus(`❌ Minting error: ${error.message || error}`);
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
            Director/Administrator Panel
          </h1>

          <div
            className={`flex border-b-2 mb-12 ${
              modoOscuro ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {["issue", "verify", "history", "reports"].map((tab) => (
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
            {activeTab === "issue" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                  <div className="space-y-8">
                    <h2
                      className={`text-3xl font-semibold ${
                        modoOscuro ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Issue New Certificates
                    </h2>

                    <input
                      type="text"
                      placeholder="Student name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className={`w-full p-4 text-xl rounded-xl border-2 ${
                        modoOscuro
                          ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />

                    <input
                      type="text"
                      placeholder="Institution name"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
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
                      id="certificate-element"
                      className="relative w-full max-w-[900px]"
                      style={{
                        aspectRatio: "1536 / 1024",
                      }}
                    >
                      {/* Background image as img element for better capture */}
                      <img
                        src={certificadoImg}
                        alt="Certificate Background"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ zIndex: 0 }}
                        crossOrigin="anonymous"
                      />
                      
                      {/* Overlaid content */}
                      <div className="absolute inset-0" style={{ zIndex: 1 }}>
                        <div className="absolute top-4 right-2.5">
                          <QRCodeSVG
                            value={`${"https://frontend-certify-chain.vercel.app"}/${certificateId}`}
                            size={90}
                          />
                        </div>

                        {/* Dynamic name - Auto adjustment */}
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
                          title={studentName} // Shows complete name on hover
                        >
                          {studentName}
                        </div>

                        {/* Institution - Text adjusted to avoid clipping */}
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
                          {institution}
                        </div>

                        {/* Date */}
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
                      Generate and Upload Certificate
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
                      Upload JSON Metadata
                    </h3>
                    <input
                      type="text"
                      placeholder="Certificate description"
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
                      placeholder="Certificate name"
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
                      placeholder="Base/Course"
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
                      placeholder="Content/Specialty"
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
                      Upload JSON to IPFS
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
                      🔗 View Certificate on IPFS
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
                      🎯 Mint NFT Certificate - Anyone can mint
                    </h3>

                    {certificateId && (
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
                          💾 Certificate saved in DB with ID:{" "}
                          <code className="font-mono">{certificateId}</code>
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
                          💰 NFT certificate cost:
                        </span>
                        <span
                          className={`font-bold text-2xl ${
                            modoOscuro ? "text-blue-100" : "text-blue-900"
                          }`}
                        >
                          {isLoadingPrice
                            ? "⏳ Loading..."
                            : `${mintPrice} STT`}
                        </span>
                      </div>
                      <p
                        className={`text-xl mt-3 ${
                          modoOscuro ? "text-blue-300" : "text-blue-600"
                        }`}
                      >
                        🌍 Anyone with MetaMask can pay and mint this certificate
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
                      placeholder="Destination wallet address (0x...)"
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
                          ? "⏳ Loading price..."
                          : isMinting
                          ? "⏳ Minting..."
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
                          ? "⏳ Updating..."
                          : "🔄 Update price"}
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
