import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

interface StudentPanelProps {
  account: string;
  modoOscuro: boolean;
}

interface Certificate {
  id: string;
  student_name: string;
  institution: string;
  wallet_destination: string;
  issue_date: string;
  ipfs_certificate: string | null;
  ipfs_metadata: string | null;
  tx_hash: string | null;
  status: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

// Supabase configuration (use same credentials)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const StudentPanel = ({ account, modoOscuro }: StudentPanelProps) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  // Function to get student certificates
  const getStudentCertificates = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔍 Searching certificates for wallet:", account);

      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .ilike("wallet_destination", account) // Case-insensitive search
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error querying certificates:", error);
        setError("Error loading certificates");
        return;
      }

      console.log("📋 Certificates found:", data);
      setCertificates(data || []);
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Unexpected error loading certificates");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status with emoji
  const getStatusWithEmoji = (status: string) => {
    switch (status.toLowerCase()) {
      case "issued":
        return "📋 Issued";
      case "minted":
        return "💎 NFT Minted";
      case "revoked":
        return "❌ Revoked";
      default:
        return `📄 ${status}`;
    }
  };

  // Function to view certificate on IPFS
  const viewCertificateIPFS = (ipfsUrl: string) => {
    window.open(ipfsUrl, "_blank");
  };

  // Function to view JSON metadata
  const viewMetadataJSON = (metadataUrl: string) => {
    window.open(metadataUrl, "_blank");
  };

  // Function to view transaction on blockchain (Sepolia Etherscan)
  const viewBlockchainTransaction = (txHash: string) => {
    const blockchainExplorer = "https://shannon-explorer.somnia.network/tx/";
    window.open(`${blockchainExplorer}${txHash}`, "_blank");
  };

  // Function to copy wallet to clipboard
  const copyWallet = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    alert("Wallet copied to clipboard");
  };

  // Function to share certificate
  const shareCertificate = (certificate: Certificate) => {
    const link = `https://frontend-certify-chain.vercel.app/${certificate.id}`;
    navigator.clipboard.writeText(link);
    setShareMessage("✅ Link copied to clipboard");
    setTimeout(() => setShareMessage(null), 3000);
  };

  // useEffect to load certificates when wallet changes
  useEffect(() => {
    if (account) {
      getStudentCertificates();
    }
  }, [account]);

  return (
    <div
      className={`min-h-screen ${modoOscuro ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Share message */}
        {shareMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {shareMessage}
          </div>
        )}

        <div
          className={`p-6 rounded-lg ${
            modoOscuro ? "bg-gray-800" : "bg-white shadow"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h1
              className={`text-3xl font-bold ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              📜 My Certificates
            </h1>
            <button
              onClick={getStudentCertificates}
              disabled={loading}
              className={`px-4 py-2 rounded-lg transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : modoOscuro
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "⏳ Loading..." : "🔄 Refresh"}
            </button>
          </div>

          {/* Connected wallet information */}
          <div
            className={`mb-6 p-4 rounded-lg ${
              modoOscuro
                ? "bg-gray-700 border border-gray-600"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <p
              className={`text-sm ${
                modoOscuro ? "text-gray-300" : "text-blue-800"
              }`}
            >
              🔗 <strong>Connected wallet:</strong>
              <span
                className="font-mono ml-2 cursor-pointer hover:underline"
                onClick={() => copyWallet(account)}
                title="Click to copy"
              >
                {account}
              </span>
            </p>
            <p
              className={`text-xs mt-1 ${
                modoOscuro ? "text-gray-400" : "text-blue-600"
              }`}
            >
              Only certificates issued to this wallet are shown
            </p>
          </div>

          {/* Main content */}
          {loading ? (
            <div className="text-center py-12">
              <div
                className={`text-2xl mb-4 ${
                  modoOscuro ? "text-gray-300" : "text-gray-600"
                }`}
              >
                ⏳ Loading certificates...
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className={`text-xl mb-4 text-red-500`}>❌ {error}</div>
              <button
                onClick={getStudentCertificates}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                🔄 Retry
              </button>
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className={`p-6 rounded-lg border transition-all hover:shadow-lg ${
                    modoOscuro
                      ? "border-gray-700 bg-gray-700 hover:bg-gray-650"
                      : "border-gray-200 bg-white hover:shadow-xl"
                  }`}
                >
                  {/* Certificate header */}
                  <div className="mb-4">
                    <h3
                      className={`font-semibold text-lg mb-2 ${
                        modoOscuro ? "text-white" : "text-gray-800"
                      }`}
                    >
                      👨‍🎓 {certificate.student_name}
                    </h3>
                    <p
                      className={`text-sm mb-2 ${
                        modoOscuro ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      🏫 {certificate.institution}
                    </p>
                    <div
                      className={`text-sm mb-2 ${
                        modoOscuro ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      📅 <strong>Issued:</strong>{" "}
                      {formatDate(certificate.issue_date)}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        certificate.status === "minted"
                          ? "text-green-500"
                          : certificate.status === "revoked"
                          ? "text-red-500"
                          : modoOscuro
                          ? "text-yellow-400"
                          : "text-yellow-600"
                      }`}
                    >
                      {getStatusWithEmoji(certificate.status)}
                    </div>
                  </div>

                  {/* Show certificate image if exists */}
                  {certificate.ipfs_certificate && (
                    <div className="mb-4">
                      <img
                        src={certificate.ipfs_certificate}
                        alt={`Certificate for ${certificate.student_name}`}
                        className="w-full rounded-md border"
                        style={{ maxHeight: 250, objectFit: "contain" }}
                      />
                    </div>
                  )}

                  {/* Technical information */}
                  <div
                    className={`mb-4 p-3 rounded text-xs ${
                      modoOscuro
                        ? "bg-gray-800 border border-gray-600"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div
                      className={`mb-1 ${
                        modoOscuro ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      🆔 <span className="font-mono">{certificate.id}</span>
                    </div>
                    {certificate.created_by && (
                      <div
                        className={`mb-1 ${
                          modoOscuro ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        🏛️ Issuer:{" "}
                        <span className="font-mono text-xs">
                          {certificate.created_by.substring(0, 10)}...
                        </span>
                      </div>
                    )}
                    {certificate.tx_hash && (
                      <div
                        className={`${
                          modoOscuro ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        ⛓️ TX:{" "}
                        <span className="font-mono text-xs">
                          {certificate.tx_hash.substring(0, 10)}...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    {certificate.ipfs_certificate && (
                      <button
                        onClick={() =>
                          viewCertificateIPFS(certificate.ipfs_certificate!)
                        }
                        className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                          modoOscuro
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                      >
                        📜 View Certificate (IPFS)
                      </button>
                    )}

                    {certificate.ipfs_metadata && (
                      <button
                        onClick={() =>
                          viewMetadataJSON(certificate.ipfs_metadata!)
                        }
                        className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                          modoOscuro
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        📋 View Metadata JSON
                      </button>
                    )}

                    {certificate.tx_hash && (
                      <button
                        onClick={() =>
                          viewBlockchainTransaction(certificate.tx_hash!)
                        }
                        className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                          modoOscuro
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-purple-500 hover:bg-purple-600 text-white"
                        }`}
                      >
                        ⛓️ View on Blockchain
                      </button>
                    )}

                    {/* Button to share certificate */}
                    <button
                      onClick={() => shareCertificate(certificate)}
                      className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                        modoOscuro
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white"
                      }`}
                    >
                      📤 Share Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p
                className={`text-xl mb-4 ${
                  modoOscuro ? "text-gray-300" : "text-gray-600"
                }`}
              >
                You don't have any certificates registered yet.
              </p>
              <p
                className={`mb-6 ${
                  modoOscuro ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Certificates you receive for wallet{" "}
                <strong>{account}</strong> will appear here automatically.
              </p>
              <button
                onClick={getStudentCertificates}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  modoOscuro
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                🔄 Check again
              </button>
            </div>
          )}
        </div>

        {/* Certificate sharing panel */}
        {certificates.length > 0 && (
          <div
            className={`mt-8 p-6 rounded-lg ${
              modoOscuro ? "bg-gray-800" : "bg-white shadow"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              🔗 Share Certificates
            </h2>
            <p
              className={`mb-4 ${
                modoOscuro ? "text-gray-300" : "text-gray-600"
              }`}
            >
              You can share your certificates with employers or institutions
              using IPFS links.
            </p>

            <div
              className={`p-4 rounded-lg ${
                modoOscuro
                  ? "bg-gray-700 border border-gray-600"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <h3
                className={`font-medium mb-2 ${
                  modoOscuro ? "text-white" : "text-gray-800"
                }`}
              >
                💡 Sharing options:
              </h3>
              <ul
                className={`text-sm space-y-1 ${
                  modoOscuro ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li>
                  📜 <strong>Visual certificate:</strong> Direct link to the
                  certificate image
                </li>
                <li>
                  📋 <strong>JSON Metadata:</strong> Technical information and
                  certificate attributes
                </li>
                <li>
                  ⛓️ <strong>Blockchain:</strong> Immutable proof on the
                  blockchain (minted certificates only)
                </li>
                <li>
                  🆔 <strong>Certificate ID:</strong> Unique identifier
                  for verification
                </li>
                <li>
                  🌐 <strong>Verification link:</strong> Unique link to
                  share and verify your certificate on our platform
                </li>
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => copyWallet(account)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  modoOscuro
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                📋 Copy my wallet
              </button>

              <button
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  modoOscuro
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                onClick={() => {
                  const summary = `🎓 I have ${certificates.length} certificate(s) registered in wallet: ${account}`;
                  navigator.clipboard.writeText(summary);
                  alert("Summary copied to clipboard");
                }}
              >
                📊 Copy summary
              </button>

              {/* New button to import NFT */}
              <button
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  modoOscuro
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
                onClick={() => setShowImport(!showImport)}
              >
                🪙 Import NFT to MetaMask
              </button>
            </div>

            {/* Instructions block */}
            {showImport && (
              <div
                className={`mt-6 p-4 rounded-lg border ${
                  modoOscuro
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-3 ${
                    modoOscuro ? "text-white" : "text-gray-800"
                  }`}
                >
                  🪙 Steps to import your NFT in MetaMask
                </h3>
                <ol
                  className={`list-decimal list-inside space-y-2 ${
                    modoOscuro ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>
                    At the top we will see the certificates we have
                    received. We will click on <strong>View on Blockchain</strong>{" "}
                    so it takes us to see where our NFT is.
                    <div className="mt-4">
                      <img
                        src={img1}
                        alt="NFT import example"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </li>
                  <li>
                    Go to the <strong>copy address</strong> section and verify
                    the ID number <strong>"In this case it's 7"</strong>.
                    <div className="mt-4">
                      <img
                        src={img2}
                        alt="NFT import example"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </li>
                  <li>
                    Open your MetaMask wallet and follow these steps{" "}
                    when we are in add NFT we select the{" "}
                    <strong>sepolia</strong> network, in address we paste what
                    we copied the blockchain address and in ID 7 and we click{" "}
                    <strong>Import</strong>.
                    <div className="mt-4">
                      <img
                        src={img3}
                        alt="NFT import example"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </li>
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPanel;
