import { motion } from "framer-motion";
import { Coins, TrendingUp, Gift, Zap, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GIVeconomy = () => {
  const features = [
    {
      icon: Coins,
      title: "GIV Token",
      description:
        "The native governance and utility token powering the ChainFund ecosystem.",
      color: "from-yellow-500 to-orange-500",
      link: "#",
    },
    {
      icon: Gift,
      title: "GIVbacks",
      description:
        "Get rewarded with GIV tokens when you donate to verified projects.",
      color: "from-purple-500 to-pink-500",
      link: "#",
    },
    {
      icon: TrendingUp,
      title: "GIVpower",
      description:
        "Stake your GIV to boost projects and earn additional rewards.",
      color: "from-blue-500 to-cyan-500",
      link: "#",
    },
    {
      icon: Zap,
      title: "GIVstream",
      description:
        "Continuous token distribution aligned with long-term commitment.",
      color: "from-green-500 to-emerald-500",
      link: "#",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom">
        {/* Hero Section */}
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
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
            className="text-white mb-6 tracking-tight"
          >
            THE ECONOMY OF <span style={{ fontWeight: "400" }}>GIVING</span>
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "1rem",
              letterSpacing: "0.02em",
            }}
            className="text-gray-400 max-w-3xl mx-auto mb-8"
          >
            GIVeconomy rewards and empowers those who give to projects, society,
            and the world. Participate in the revolution of philanthropy on the
            Stellar blockchain.
          </p>
          <Link to="/givfarm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-black border border-white/10 rounded-xl p-8 hover:border-white/30 transition-all duration-300 group cursor-pointer"
            >
              <feature.icon
                className="w-12 h-12 text-white/80 mb-6"
                strokeWidth={1.5}
              />

              <h3
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  letterSpacing: "0.02em",
                }}
                className="text-white mb-4 group-hover:text-gray-300 transition-colors"
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                  fontSize: "0.95rem",
                  letterSpacing: "0.01em",
                  lineHeight: "1.6",
                }}
                className="text-gray-500 mb-6 leading-relaxed"
              >
                {feature.description}
              </p>

              <a
                href={feature.link}
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                }}
                className="text-white font-semibold flex items-center space-x-2 group-hover:translate-x-1 transition-transform uppercase"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { value: "10M+", label: "GIV Distributed", icon: Coins },
            { value: "$2M+", label: "GIVbacks Rewarded", icon: Gift },
            { value: "5K+", label: "Active Participants", icon: Users },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="card text-center"
            >
              <stat.icon
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                strokeWidth={1.5}
              />
              <div
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "clamp(2.5rem, 4vw, 3rem)",
                }}
                className="text-white mb-2"
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "300",
                  fontSize: "1.125rem",
                  letterSpacing: "0.01em",
                }}
                className="text-gray-500"
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GIVeconomy;
