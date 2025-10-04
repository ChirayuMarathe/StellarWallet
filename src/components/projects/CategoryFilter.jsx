import { motion } from "framer-motion";
import {
  Globe,
  Coins,
  Lock,
  TrendingUp,
  Network,
  Layers,
  Wallet,
  Code,
  Zap,
  Shield,
  Database,
  GitBranch,
  Users,
} from "lucide-react";

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "defi", name: "DeFi Protocol", icon: Coins },
    { id: "dex", name: "DEX & AMM", icon: TrendingUp },
    { id: "lending", name: "Lending & Borrowing", icon: Wallet },
    { id: "staking", name: "Staking & Yield", icon: Layers },
    { id: "nft", name: "NFT & Gaming", icon: Zap },
    { id: "dao", name: "DAO & Governance", icon: Users },
    { id: "infrastructure", name: "Infrastructure", icon: Network },
    { id: "security", name: "Security & Audit", icon: Shield },
    { id: "bridge", name: "Cross-Chain Bridge", icon: GitBranch },
    { id: "oracle", name: "Oracle & Data", icon: Database },
    { id: "privacy", name: "Privacy & ZK", icon: Lock },
    { id: "developer", name: "Dev Tools", icon: Code },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category.id)}
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: selectedCategory === category.id ? "400" : "300",
            fontSize: "0.95rem",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
          className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
            selectedCategory === category.id
              ? "bg-black border-2 border-white text-white shadow-lg"
              : "bg-black border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
          }`}
        >
          <category.icon className="w-5 h-5" strokeWidth={1.5} />
          <span>{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
