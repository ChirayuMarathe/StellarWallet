import { motion } from "framer-motion";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useStellar } from "../context/StellarContext";
import {
  Wallet,
  ChevronDown,
  Info,
  CheckCircle,
  AlertCircle,
  Heart,
  Zap,
  ArrowRight,
  Lock,
  Sparkles,
  DollarSign,
  Gift,
} from "lucide-react";
import toast from "react-hot-toast";
import { getProjectBySlug } from "../data/projects";

const Donate = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    publicKey,
    isConnected,
    connectWallet,
    sendPayment,
    balance,
    loading,
    xlmPrice,
  } = useStellar();

  const [donationAmount, setDonationAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("XLM");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [givethDonation, setGivethDonation] = useState(10);
  const [memo, setMemo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Format address helper function
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get project data dynamically
  const project = getProjectBySlug(slug);

  // If project not found, redirect to projects page
  if (!project) {
    return <Navigate to="/projects/all" replace />;
  }

  const assets = [
    { code: "XLM", name: "Stellar Lumens", icon: Sparkles },
    { code: "USDC", name: "USD Coin", icon: DollarSign },
    { code: "GIV", name: "Giveth Token", icon: Gift },
  ];

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const handleDonate = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      await connectWallet();
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    // Convert USD to XLM using current price
    const usdAmount = parseFloat(donationAmount);
    const givethUsdAmount = (usdAmount * givethDonation) / 100;
    const totalUsdAmount = usdAmount + givethUsdAmount;

    // Calculate XLM amount based on current price
    const xlmAmount = xlmPrice ? totalUsdAmount / xlmPrice : totalUsdAmount;

    if (balance && xlmAmount > parseFloat(balance.xlm)) {
      toast.error("Insufficient XLM balance");
      return;
    }

    try {
      setIsProcessing(true);

      const memoText = `Donation to ${project.title}${
        isAnonymous ? " (Anonymous)" : ""
      }`;

      await sendPayment({
        destination: project.creator.stellarAddress,
        amount: xlmAmount.toFixed(7), // Stellar supports 7 decimal places
        asset: "native",
        memo: memo || memoText,
      });

      toast.success("Donation successful! Thank you for your support!");

      setTimeout(() => {
        navigate(`/project/${slug}`);
      }, 2000);
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Donation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const totalAmount = donationAmount
    ? (parseFloat(donationAmount) * (1 + givethDonation / 100)).toFixed(2)
    : "0.00";

  const totalXlmAmount =
    xlmPrice && donationAmount
      ? (
          (parseFloat(donationAmount) * (1 + givethDonation / 100)) /
          xlmPrice
        ).toFixed(4)
      : "0.0000";

  const balanceInUsd =
    balance && xlmPrice
      ? (parseFloat(balance.xlm) * xlmPrice).toFixed(2)
      : null;

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
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <h1
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "300",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
              }}
              className="text-white mb-4 tracking-tight"
            >
              SUPPORT{" "}
              <span style={{ fontWeight: "400" }}>
                {project.title.toUpperCase()}
              </span>
            </h1>
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "300",
                fontSize: "1rem",
                letterSpacing: "0.02em",
              }}
              className="text-gray-400"
            >
              Your donation helps make a real difference
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {!isConnected ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        Connect Your Wallet
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Please connect your Stellar wallet to continue with the
                        donation
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={connectWallet}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Wallet className="w-5 h-5" />
                        <span>Connect Wallet</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-gray-300" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Wallet Connected
                      </h3>
                      <p className="text-sm text-gray-400">
                        {formatAddress(publicKey)}
                      </p>
                    </div>
                  </div>
                  {balance && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">
                        Available:{" "}
                        <span className="text-white font-semibold">
                          {parseFloat(balance.xlm).toFixed(2)} XLM
                        </span>
                      </p>
                      {balanceInUsd && (
                        <p className="text-xs text-gray-500">
                          ≈ ${balanceInUsd} USD
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Select Asset
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <motion.button
                      key={asset.code}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAsset(asset.code)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAsset === asset.code
                          ? "border-gray-500 bg-gray-500/10"
                          : "border-dark-700 hover:border-gray-500/50"
                      }`}
                    >
                      <asset.icon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <div className="font-semibold text-white text-sm">
                        {asset.code}
                      </div>
                      <div className="text-xs text-gray-400">{asset.name}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Donation Amount
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {quickAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        donationAmount === amount.toString()
                          ? "border-gray-500 bg-gray-500/10 text-white"
                          : "border-dark-700 text-gray-400 hover:border-gray-500/50"
                      }`}
                    >
                      ${amount}
                    </motion.button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="input pl-10 text-2xl font-bold"
                    min="0"
                    step="0.01"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">
                  Additional Options
                </h3>

                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                  <div className="flex-1">
                    <div className="font-medium text-white mb-1">
                      Recurring Donation
                    </div>
                    <div className="text-sm text-gray-400">
                      Make this a monthly donation
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRecurring(!isRecurring)}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      isRecurring ? "bg-gray-600" : "bg-dark-700"
                    }`}
                  >
                    <motion.div
                      animate={{ x: isRecurring ? 24 : 4 }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                  <div className="flex-1">
                    <div className="font-medium text-white mb-1">
                      Anonymous Donation
                    </div>
                    <div className="text-sm text-gray-400">
                      Hide your identity from the public
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      isAnonymous ? "bg-gray-600" : "bg-dark-700"
                    }`}
                  >
                    <motion.div
                      animate={{ x: isAnonymous ? 24 : 4 }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="p-4 bg-dark-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-white">
                      Support Stellar Giveth
                    </div>
                    <span className="text-white font-semibold">
                      {givethDonation}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={givethDonation}
                    onChange={(e) =>
                      setGivethDonation(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <div className="text-sm text-gray-400 mt-2">
                    Add {givethDonation}% to support platform operations
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message (Optional)
                  </label>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Add a message to your donation"
                    className="input"
                    maxLength="28"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {memo.length}/28 characters
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card sticky top-24"
              >
                <h3 className="text-xl font-semibold mb-6 text-white">
                  Donation Summary
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Project Donation</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        ${donationAmount || "0.00"}
                      </div>
                      {xlmPrice && donationAmount && (
                        <div className="text-xs text-gray-500">
                          ≈ {(parseFloat(donationAmount) / xlmPrice).toFixed(4)}{" "}
                          XLM
                        </div>
                      )}
                    </div>
                  </div>

                  {givethDonation > 0 && (
                    <div className="flex justify-between text-gray-400">
                      <span>Platform Support ({givethDonation}%)</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">
                          $
                          {donationAmount
                            ? (
                                (parseFloat(donationAmount) * givethDonation) /
                                100
                              ).toFixed(2)
                            : "0.00"}
                        </div>
                        {xlmPrice && donationAmount && (
                          <div className="text-xs text-gray-500">
                            ≈{" "}
                            {(
                              (parseFloat(donationAmount) * givethDonation) /
                              100 /
                              xlmPrice
                            ).toFixed(4)}{" "}
                            XLM
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-dark-700">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">
                        Total
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">
                          ${totalAmount}
                        </div>
                        {xlmPrice && (
                          <div className="text-sm text-gray-400 mt-1">
                            ≈ {totalXlmAmount} XLM
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {xlmPrice && (
                    <div className="pt-4 border-t border-dark-700/50">
                      <div className="text-xs text-gray-500 text-center">
                        Current XLM Price: ${xlmPrice.toFixed(4)} USD
                      </div>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDonate}
                  disabled={!isConnected || isProcessing || !donationAmount}
                  className="btn-primary w-full mb-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Complete Donation</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-start space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <Lock className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-semibold">
                      Secure & Transparent:
                    </span>{" "}
                    All transactions are processed on the Stellar blockchain
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Donate;
