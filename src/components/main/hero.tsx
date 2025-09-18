export const Hero = () => {
return (
    <div className="flex flex-row relative items-center justify-center h-[500px] w-full -mt-[350px] pt-[100px] z-0" style={{ isolation: 'isolate' }}>
      <div className="w-full flex items-start justify-center absolute h-full z-0">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-full object-cover"
          style={{ opacity: 0.9, zIndex: -1 }}
        >
          <source src="/public/Videos/blackhole.webm" type="video/webm" />
        </video>
      </div>
      
    </div>
  );
};
