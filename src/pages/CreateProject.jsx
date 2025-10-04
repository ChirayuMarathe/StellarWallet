import { motion } from "framer-motion";
import { useState } from "react";
import { useStellar } from "../context/StellarContext";
import { useProjects } from "../context/ProjectsContext";
import {
  Upload,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Wallet,
  Plus,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const { publicKey, isConnected, connectWallet } = useStellar();
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "DeFi Infrastructure",
    goal: "",
    location: "",
    website: "",
    twitter: "",
    stellarAddress: publicKey || "",
  });

  const [milestones, setMilestones] = useState([
    { title: "", amount: "", date: "" }
  ]);

  const blockchainCategories = [
    { value: "DeFi Infrastructure", label: "DeFi Infrastructure" },
    { value: "Smart Contracts", label: "Smart Contracts" },
    { value: "Layer 2 & Scaling", label: "Layer 2 & Scaling" },
    { value: "NFT & Gaming", label: "NFT & Gaming" },
    { value: "Identity & Privacy", label: "Identity & Privacy" },
    { value: "Cross-Chain", label: "Cross-Chain" },
    { value: "Developer Tools", label: "Developer Tools" },
    { value: "Privacy Technology", label: "Privacy Technology" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Please connect your wallet first");
      await connectWallet();
      return;
    }

    if (!formData.title || !formData.description || !formData.fullDescription || !formData.goal) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate milestones
    const validMilestones = milestones.filter(
      m => m.title && m.amount && m.date
    ).map((m, idx) => ({
      id: idx + 1,
      title: m.title,
      amount: parseInt(m.amount),
      date: m.date,
      completed: false
    }));

    if (validMilestones.length === 0) {
      toast.error("Please add at least one milestone");
      return;
    }

    try {
      // Create slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newProject = {
        slug,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        fullDescription: formData.fullDescription,
        goal: parseInt(formData.goal),
        location: formData.location || "Decentralized",
        milestones: validMilestones,
        creator: {
          name: "Project Creator",
          address: formData.stellarAddress,
          verified: false,
          memberSince: new Date().getFullYear().toString()
        },
        updates: [],
        donations: []
      };

      addProject(newProject);
      toast.success("Project created successfully!");
      
      setTimeout(() => {
        navigate(`/project/${slug}`);
      }, 1500);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", amount: "", date: "" }]);
  };

  const removeMilestone = (index) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
            className="text-white mb-6"
          >
            Create Blockchain Project
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "1.125rem",
              letterSpacing: "0.01em",
            }}
            className="text-gray-400"
          >
            Launch your DeFi, NFT, or blockchain infrastructure project
          </p>
        </motion.div>

        {/* Wallet Connection Warning */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black border border-white/10 rounded-xl p-8 mb-8"
          >
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "1.125rem",
                    letterSpacing: "0.02em",
                  }}
                  className="text-white mb-2"
                >
                  Connect Your Wallet
                </h3>
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.95rem",
                  }}
                  className="text-gray-400 mb-4"
                >
                  You need to connect your Stellar wallet to create a project
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={connectWallet}
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="flex items-center space-x-2 bg-black border border-white/20 text-white px-6 py-3 rounded-xl hover:border-white/40 transition-all duration-300"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Information */}
          <div className="bg-black border border-white/10 rounded-xl p-8">
            <h2
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "400",
                fontSize: "1.5rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              className="text-white mb-6"
            >
              Basic Information
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Stellar DeFi Liquidity Protocol"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief one-line description (max 200 characters)"
                  rows={2}
                  maxLength={200}
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Detailed description of your project, technical features, goals, and roadmap"
                  rows={8}
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    lineHeight: "1.8",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                    className="block text-gray-400 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                    }}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:border-white/30 focus:outline-none transition-all"
                    required
                  >
                    {blockchainCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                    className="block text-gray-400 mb-2"
                  >
                    Funding Goal (USD) *
                  </label>
                  <input
                    type="number"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    placeholder="e.g., 200000"
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: "300",
                    }}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Decentralized, Global, or specific location"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-black border border-white/10 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
                className="text-white"
              >
                Milestones *
              </h2>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMilestone}
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
                className="flex items-center space-x-2 bg-black border border-white/20 text-white px-4 py-2 rounded-xl hover:border-white/40 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                        fontSize: "0.875rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                      className="text-gray-400"
                    >
                      Milestone {index + 1}
                    </span>
                    {milestones.length > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeMilestone(index)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) =>
                        updateMilestone(index, "title", e.target.value)
                      }
                      placeholder="Milestone title (e.g., Testnet Launch)"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                      }}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={milestone.amount}
                        onChange={(e) =>
                          updateMilestone(index, "amount", e.target.value)
                        }
                        placeholder="Funding amount (USD)"
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontWeight: "300",
                        }}
                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                        min="0"
                      />

                      <input
                        type="date"
                        value={milestone.date}
                        onChange={(e) =>
                          updateMilestone(index, "date", e.target.value)
                        }
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontWeight: "300",
                        }}
                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="bg-black border border-white/10 rounded-xl p-8">
            <h2
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "400",
                fontSize: "1.5rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              className="text-white mb-6"
            >
              Blockchain Information
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Stellar Wallet Address *
                </label>
                <input
                  type="text"
                  name="stellarAddress"
                  value={formData.stellarAddress || publicKey || ""}
                  onChange={handleChange}
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                  required
                  disabled={isConnected}
                />
                {isConnected && (
                  <div className="flex items-center space-x-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                        fontSize: "0.875rem",
                      }}
                      className="text-green-400"
                    >
                      Connected wallet address
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="bg-black border border-white/10 rounded-xl p-8">
            <h2
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "400",
                fontSize: "1.5rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              className="text-white mb-6"
            >
              Additional Links
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourproject.com"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="block text-gray-400 mb-2"
                >
                  Twitter
                </label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="@yourproject"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-white/30 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/projects/all")}
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "400",
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              className="bg-black border border-white/10 text-white px-8 py-4 rounded-xl hover:border-white/30 transition-all duration-300"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isConnected}
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "400",
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              className="bg-black border border-white/20 text-white px-8 py-4 rounded-xl hover:border-white/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Project
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default CreateProject;
