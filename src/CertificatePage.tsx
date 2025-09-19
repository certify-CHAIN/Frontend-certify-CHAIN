import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import AnimatedBackground from './components/AnimatedBackground';
import img1 from './assets/logo.svg';

interface Certificate {
  id: string;
  student_name: string;
  institucion: string;
  wallet_destinatario: string;
  fecha_emision: string;
  ipfs_certificado: string | null;
  ipfs_metadata: string | null;
  tx_hash: string | null;
  estado: string;
  creado_por: string | null;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get certificate by ID
  const getCertificate = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!id) {
        setError('Certificate ID not provided');
        return;
      }

      const { data, error } = await supabase
        .from('certificados')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Certificate not found');
        } else {
          setError('Error verifying certificate');
        }
        return;
      }

      setCertificate(data);
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Unexpected error verifying certificate');
    } finally {
      setLoading(false);
    }
  };

  // Format date function
  const formatDate = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status information function
  const getStatusInfo = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'emitido':
        return {
          texto: 'Issued',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icono: '📋',
          descripcion: 'The certificate has been generated and is ready'
        };
      case 'minted':
        return {
          texto: 'NFT Certificate',
          color: 'bg-green-100 text-green-800 border-green-300',
          icono: '💎',
          descripcion: 'Certificate permanently registered on blockchain'
        };
      case 'revocado':
        return {
          texto: 'Revoked',
          color: 'bg-red-100 text-red-800 border-red-300',
          icono: '❌',
          descripcion: 'This certificate has been revoked'
        };
      default:
        return {
          texto: estado,
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icono: '📄',
          descripcion: 'Certificate status'
        };
    }
  };

  // Function to copy text to clipboard
  const copyText = (texto: string, mensaje: string) => {
    navigator.clipboard.writeText(texto);
    alert(mensaje);
  };

  // Function to open links
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    getCertificate();
  }, [id]);

  return (
  <div className="min-h-screen relative bg-gray-950 text-gray-100">
    <AnimatedBackground />
    
    {/* Header */}
    <div className="bg-gray-900 shadow-sm border-b border-gray-800 relative z-10">
  <div className="max-w-4xl mx-auto px-4 py-8"> {/* aumenté py-6 -> py-8 */}
    <h1 
      className="text-4xl md:text-5xl font-extrabold mb-6 relative leading-tight md:leading-snug"
      style={{
        background:
          "linear-gradient(90deg, #ff0080, #7928ca, #00ffea, #ff0080)",
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "rgbTextGlow 3s linear infinite",
        textAlign: "center"
      }}
    >
      Digital Certificate Verification
      <style>
        {`
          @keyframes rgbTextGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </h1>

    <div className="flex items-center py-4 justify-center">
  <img
    src={img1}
    alt="CertiChain Logo"
    className="h-15 w-auto max-w-none md:h-20 lg:h-25"  // Aumenté el tamaño
    style={{
      minWidth: "300px",  // Aumenté el ancho mínimo
      objectFit: "contain",
    }}
  />
</div>
  </div>
</div>


    {/* Main content */}
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      {loading ? (
        // Loading state
        <div className="bg-gray-900 rounded-2xl shadow-lg p-12 text-center border border-gray-800">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Verifying certificate...
          </h2>
          <p className="text-gray-400">
            Querying database information
          </p>
        </div>
      ) : error ? (
        // Estado de error
        <div className="bg-gray-900 rounded-2xl shadow-lg p-12 text-center border border-gray-800">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-3xl font-bold text-red-500 mb-4">
            {error}
          </h2>
          <p className="text-gray-400 mb-8">
            Could not verify the authenticity of this certificate.
          </p>
          <div className="bg-red-950 border border-red-700 rounded-xl p-6">
            <h3 className="font-semibold text-red-300 mb-2">
              ID consultado:
            </h3>
            <code className="bg-red-900 px-3 py-2 rounded font-mono text-sm text-red-200">
              {id}
            </code>
          </div>

          <button
  onClick={getCertificate}
  className="group relative mt-6 px-6 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors overflow-hidden"
>
  {/* Glow animado detrás */}
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

  {/* Texto visible por encima */}
  <span className="relative z-10">Try Again</span>

  {/* Animación keyframes */}
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
      ) : certificate ? (
        // Certificate found
        <div className="space-y-8">
          {/* Status Badge */}
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border ${getStatusInfo(certificate.estado).color} font-semibold text-lg`}>
              <span className="text-2xl mr-2">{getStatusInfo(certificate.estado).icono}</span>
              {getStatusInfo(certificate.estado).texto}
            </div>
            <p className="text-gray-400 mt-2">
              {getStatusInfo(certificate.estado).descripcion}
            </p>
          </div>

          {/* Main certificate information */}
          <div className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-800">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h2 className="text-4xl font-bold mb-2">
                {certificate.student_name}
              </h2>
              <p className="text-blue-200 text-xl">
                {certificate.institucion}
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="text-2xl mr-2">📋</span>
                      Certificate Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start p-4 bg-gray-800 rounded-xl">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Student</p>
                          <p className="text-lg font-semibold text-white">
                            {certificate.student_name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start p-4 bg-gray-800 rounded-xl">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Institution</p>
                          <p className="text-lg font-semibold text-white">
                            {certificate.institucion}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-start p-4 bg-gray-800 rounded-xl">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Fecha de emisión</p>
                          <p className="text-lg font-semibold text-white">
                            {formatDate(certificate.fecha_emision)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="text-2xl mr-2">🔧</span>
                      Technical Information
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800 rounded-xl">
                        <p className="text-sm font-medium text-gray-400 mb-2">Certificate ID</p>
                        <div className="flex items-center justify-between">
                          <code className="bg-gray-700 px-3 py-1 rounded text-sm font-mono text-gray-200">
                            {certificate.id}
                          </code>
                          <button
                            onClick={() => copyText(certificate.id, 'ID copied to clipboard')}
                            className="text-blue-400 hover:text-blue-600 text-sm font-medium"
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      {certificate.wallet_destinatario && (
                        <div className="p-4 bg-gray-800 rounded-xl">
                          <p className="text-sm font-medium text-gray-400 mb-2">Student Wallet</p>
                          <div className="flex items-center justify-between">
                            <code className="bg-gray-700 px-3 py-1 rounded text-sm font-mono truncate mr-2 text-gray-200">
                              {certificate.wallet_destinatario}
                            </code>
                            <button
                              onClick={() => copyText(certificate.wallet_destinatario, 'Wallet copied to clipboard')}
                              className="text-blue-400 hover:text-blue-600 text-sm font-medium whitespace-nowrap"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      )}

                      {certificate.creado_por && (
                        <div className="p-4 bg-gray-800 rounded-xl">
                          <p className="text-sm font-medium text-gray-400 mb-2">Issuer</p>
                          <code className="bg-gray-700 px-3 py-1 rounded text-sm font-mono truncate text-gray-200">
                            {certificate.creado_por}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate image */}
          {certificate.ipfs_certificado && (
            <div className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                <span className="text-3xl mr-3">🖼️</span>
                Digital Certificate
              </h3>
              <div className="flex justify-center">
                <img
                  src={certificate.ipfs_certificado}
                  alt={`Certificate of ${certificate.student_name}`}
                  className="max-w-full h-auto rounded-xl shadow-md border border-gray-700"
                  style={{ maxHeight: '600px' }}
                />
              </div>
            </div>
          )}

          {/* Acciones y enlaces */}
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-3">🔗</span>
              Links and Verification
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {certificate.ipfs_certificado && (
                <button
                  onClick={() => openLink(certificate.ipfs_certificado!)}
                  className="w-full p-4 bg-blue-950 hover:bg-blue-900 border border-blue-700 rounded-xl transition-colors text-center"
                >
                  <div className="text-2xl mb-2">📜</div>
                  <div className="font-semibold text-blue-300">View Certificate</div>
                  <div className="text-sm text-blue-400">Abrir imagen IPFS</div>
                </button>
              )}

              {certificate.ipfs_metadata && (
                <button
                  onClick={() => openLink(certificate.ipfs_metadata!)}
                  className="w-full p-4 bg-green-950 hover:bg-green-900 border border-green-700 rounded-xl transition-colors text-center"
                >
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-semibold text-green-300">Metadata JSON</div>
                  <div className="text-sm text-green-400">View technical information</div>
                </button>
              )}

              {certificate.tx_hash && (
                <button
                  onClick={() => openLink(`https://shannon-explorer.somnia.network/tx/${certificate.tx_hash}`)}
                  className="w-full p-4 bg-purple-950 hover:bg-purple-900 border border-purple-700 rounded-xl transition-colors text-center"
                >
                  <div className="text-2xl mb-2">⛓️</div>
                  <div className="font-semibold text-purple-300">View on Blockchain</div>
                  <div className="text-sm text-purple-400">Etherscan Sepolia</div>
                </button>
              )}
            </div>

            {/* Información de verificación */}
            <div className="mt-8 p-6 bg-green-950 border border-green-700 rounded-xl">
              <div className="flex items-center justify-center mb-4">
                <div className="text-4xl mr-3">✅</div>
                <h4 className="text-xl font-bold text-green-300">
                  Verified Certificate
                </h4>
              </div>
              <p className="text-green-400 text-center mb-4">
                This certificate has been successfully verified and is registered in our system.
              </p>
              <div className="text-center text-sm text-green-500">
                <p>Last updated: {formatDate(certificate.updated_at)}</p>
                <p className="mt-1">CertiChain System - Blockchain Certificates</p>
              </div>
            </div>
          </div>

          {/* Footer with additional information */}
          <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800">
            <h4 className="font-semibold text-white mb-2">
              How to verify authenticity?
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl mb-2">🔍</div>
                <p><strong>Unique ID:</strong> Each certificate has a unique and unrepeatable identifier</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl mb-2">🌐</div>
                <p><strong>IPFS:</strong> Los archivos están almacenados de forma descentralizada</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl mb-2">⛓️</div>
                <p><strong>Blockchain:</strong> Registro inmutable en red Ethereum (cuando está minteado)</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);
};

export default CertificatePage;
