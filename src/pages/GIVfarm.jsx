import { motion } from "framer-motion";
import { useState } from "react";
import { useStellar } from "../context/StellarContext";
import {
  Wallet,
  Lock,
  TrendingUp,
  Gift,
  Percent,
  Sparkles,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

const GIVfarm = () => {
  const { publicKey, isConnected, connectWallet, balance } = useStellar();
  const [activePool, setActivePool] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");

  const stakingPools = [
    {
      id: 1,
      name: "GIV Single Staking",
      pair: "GIV",
      apr: "45%",
      tvl: "$2.5M",
      rewards: "GIV",
      icon: Gift,
    },
    {
      id: 2,
      name: "GIV-XLM LP",
      pair: "GIV/XLM",
      apr: "85%",
      tvl: "$4.2M",
      rewards: "GIV + XLM",
      icon: Sparkles,
    },
    {
      id: 3,
      name: "GIV-USDC LP",
      pair: "GIV/USDC",
      apr: "65%",
      tvl: "$3.1M",
      rewards: "GIV + USDC",
      icon: DollarSign,
    },
  ];

  const userStats = {
    totalStaked: "1,250.00",
    totalEarned: "125.50",
    pendingRewards: "12.50",
  };

  const handleStake = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      connectWallet();
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    toast.success("Staking transaction submitted!");
    setStakeAmount("");
    setActivePool(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            <span style={{ fontWeight: "400" }}>GIVFARM</span> STAKING
          </h1>
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "300",
              fontSize: "1rem",
              letterSpacing: "0.02em",
            }}
            className="text-gray-400 max-w-3xl mx-auto"
          >
            Stake your GIV tokens or provide liquidity to earn attractive
            rewards and support the Stellar Giveth ecosystem.
          </p>
        </motion.div>

        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Staked</div>
                  <div className="text-2xl font-bold text-white">
                    {userStats.totalStaked}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">GIV Tokens</div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Earned</div>
                  <div className="text-2xl font-bold text-white">
                    {userStats.totalEarned}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">GIV Tokens</div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Pending Rewards</div>
                  <div className="text-2xl font-bold text-white">
                    {userStats.pendingRewards}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">GIV Tokens</div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakingPools.map((pool, index) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:border-gray-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center">
                    <pool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{pool.name}</h3>
                    <p className="text-sm text-gray-400">{pool.pair}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">APR</span>
                  <span className="text-xl font-bold text-white flex items-center">
                    <Percent className="w-4 h-4 mr-1 text-gray-300" />
                    {pool.apr}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">TVL</span>
                  <span className="text-lg font-semibold text-white">
                    {pool.tvl}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rewards</span>
                  <span className="text-sm font-medium text-gray-300">
                    {pool.rewards}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActivePool(pool)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                {isConnected ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Stake</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {activePool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActivePool(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="card max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center">
                    <activePool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {activePool.name}
                    </h3>
                    <p className="text-sm text-gray-400">{activePool.pair}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePool(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-dark-800/50 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Amount to Stake</span>
                    {balance && (
                      <span className="text-sm text-gray-500">
                        Balance: {parseFloat(balance.xlm).toFixed(2)} GIV
                      </span>
                    )}
                  </div>

                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.00"
                    className="input text-2xl font-bold"
                    min="0"
                    step="0.01"
                  />

                  <div className="flex space-x-2 mt-3">
                    {[25, 50, 75, 100].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => {
                          if (balance) {
                            const amount = (
                              (parseFloat(balance.xlm) * percent) /
                              100
                            ).toFixed(2);
                            setStakeAmount(amount);
                          }
                        }}
                        className="flex-1 py-2 px-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm text-gray-300 transition-colors"
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>APR</span>
                    <span className="text-white font-semibold">
                      {activePool.apr}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Daily Rewards (Est.)</span>
                    <span className="text-white font-semibold">
                      {stakeAmount
                        ? (
                            (parseFloat(stakeAmount) *
                              parseFloat(activePool.apr)) /
                            100 /
                            365
                          ).toFixed(4)
                        : "0.00"}{" "}
                      GIV
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Lock Period</span>
                    <span className="text-white font-semibold">None</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStake}
                  disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" />
                  <span>Confirm Stake</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="card text-center">
              <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Connect Your Wallet
              </h3>
              <p className="text-gray-400 mb-6">
                Connect your Stellar wallet to start staking and earning rewards
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="btn-primary mx-auto flex items-center space-x-2"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GIVfarm;
