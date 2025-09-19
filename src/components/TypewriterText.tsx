import Typewriter from "typewriter-effect";

const TypewriterText = () => {
  return (
    <div className="text-2xl md:text-4xl font-bold text-white mb-4 text-center flex items-center justify-center" style={{ opacity: 1, color: '#ffffff' }}>
      <Typewriter
        options={{
          strings: [
            "Secure NFT Certificates",
            "Blockchain Verification",
            "Guaranteed Authenticity", 
            "Decentralized Technology",
            "Digital Certification"
          ],
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
          cursor: "|",
          cursorClassName: "text-purple-900",
        }}
      />
    </div>
  );
};

export default TypewriterText;