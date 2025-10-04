import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Globe, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Decentralization",
      description: "Empowering communities through blockchain technology",
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Open and verifiable transactions on-chain",
    },
    {
      icon: Users,
      title: "Innovation",
      description: "Building cutting-edge DeFi infrastructure",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Audited smart contracts and secure protocols",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
            className="text-white mb-6"
          >
            ABOUT <span style={{ fontWeight: "400" }}>STELLAR BLOCKCHAIN</span>
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "1.25rem",
              letterSpacing: "0.01em",
            }}
            className="text-gray-400"
          >
            Building the future of decentralized finance on Stellar
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 mb-12"
        >
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
              <Target className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "2rem",
                  letterSpacing: "0.02em",
                }}
                className="text-white mb-4"
              >
                Our Mission
              </h2>
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                  fontSize: "1.125rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.8",
                }}
                className="text-gray-400"
              >
                Stellar Blockchain Platform is revolutionizing decentralized
                finance by leveraging cutting-edge blockchain technology to
                create transparent, efficient, and globally accessible DeFi
                infrastructure. We empower developers and projects to build
                next-generation financial applications without intermediaries or
                excessive fees.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 mb-20"
        >
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
              <Eye className="w-8 h-8 text-white/80" strokeWidth={1.5} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "2rem",
                  letterSpacing: "0.02em",
                }}
                className="text-white mb-4"
              >
                Our Vision
              </h2>
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                  fontSize: "1.125rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.8",
                }}
                className="text-gray-400"
              >
                We envision a world where decentralized finance is accessible to
                everyone, transparent by default, and secure through open-source
                technology. Where blockchain enables trust and innovation at
                scale, and where developers can build the future of finance
                without barriers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              fontSize: "2rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
            className="mb-8 text-white text-center"
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300"
              >
                <value.icon
                  className="w-12 h-12 text-gray-400 mb-4"
                  strokeWidth={1.5}
                />
                <h3
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "1.5rem",
                    letterSpacing: "0.02em",
                  }}
                  className="mb-3 text-white"
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "1rem",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                  }}
                  className="text-gray-500"
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
