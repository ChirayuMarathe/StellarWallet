import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-32 pb-32">
      {/* Animated Dotted Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            backgroundPosition: "0 0, 25px 25px",
          }}
        />

        {/* Animated Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5"
            style={{
              width: i % 2 === 0 ? "1px" : "100%",
              height: i % 2 === 0 ? "100%" : "1px",
              left: i % 2 === 0 ? `${(i / 2) * 25}%` : 0,
              top: i % 2 === 0 ? 0 : `${(i / 2) * 25}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Animated Dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading - Centered Professional Style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
            className="text-white mb-8 tracking-tight"
          >
            ADVANCED KEY
            <br />
            <span style={{ fontWeight: "400" }}>PROTECTION</span>
          </motion.h1>

          {/* Subtitle - Centered */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "clamp(0.875rem, 1.2vw, 1.05rem)",
              letterSpacing: "0.02em",
              lineHeight: "1.7",
            }}
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            ChainFund's smart backup developed with cutting-edge technology,
            ensures your private keys are secure and accessible.
          </motion.p>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link to="/projects/all">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                }}
                className="px-8 py-3.5 bg-white text-black rounded-lg uppercase transition-all hover:bg-gray-200 shadow-lg hover:shadow-xl"
              >
                Explore Projects
              </motion.button>
            </Link>

            <Link to="/create-project">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                }}
                className="px-8 py-3.5 border border-white/20 text-white rounded-lg uppercase transition-all hover:border-white/40 hover:bg-white/5"
              >
                Create Project
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats - Numbered Cards Style - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                number: "01",
                title: "Verified Projects",
                desc: "The platform generates a unique private key that remains hidden.",
              },
              {
                number: "02",
                title: "Secure Transfer",
                desc: "Projects securely connect to transfer your encrypted private keys safely.",
              },
              {
                number: "03",
                title: "Distributed Keys",
                desc: "Keys are distributed across three cards with no other copies existing.",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm p-8 text-left"
              >
                <div
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "3rem",
                    letterSpacing: "-0.02em",
                  }}
                  className="text-gray-600 mb-6"
                >
                  {stat.number}
                </div>
                <h3
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "1.125rem",
                    letterSpacing: "0.02em",
                  }}
                  className="text-white mb-3"
                >
                  {stat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                  }}
                  className="text-gray-400"
                >
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
