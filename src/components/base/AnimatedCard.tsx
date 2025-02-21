import * as motion from 'motion/react-client';

const AnimatedCard = () => {
  // Fixed positions and sizes for the coins based on the image
  const coins = [
    { top: '15%', left: '15%', size: 'w-6 h-6' }, // Top left - large
    { top: '8%', left: '70%', size: 'w-3 h-3' }, // Top right - small
    { top: '45%', left: '85%', size: 'w-6 h-6' }, // Middle right - large
    { top: '60%', left: '75%', size: 'w-3 h-3' }, // Bottom right - small
  ];

  return (
    <div className="relative w-72 h-72 group perspective-1000">
      {/* Floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        {coins.map((coin, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 z-50 ${coin.size}`}
            style={{
              top: coin.top,
              left: coin.left,
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="w-full h-full rounded-xl p-6 bg-slate-800/90 backdrop-blur-sm shadow-xl 
                    transform transition-transform duration-500 ease-in-out 
                    group-hover:rotate-y-6 group-hover:scale-105"
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {/* Google Logo */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              alt="Google"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Text Content */}
          <h3 className="text-xl font-semibold text-white text-center">
            Google
          </h3>
          <p className="text-sm text-gray-300 text-center max-w-[200px]">
            Generate and recover your crypto wallet via Google account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
