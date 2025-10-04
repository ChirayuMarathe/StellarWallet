import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet, ChevronDown, Globe, User } from "lucide-react";
import { useStellar } from "../../context/StellarContext";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const {
    publicKey,
    isConnected,
    connectWallet,
    disconnectWallet,
    balance,
    network,
    switchNetwork,
  } = useStellar();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Projects",
      path: "/projects/all",
      dropdown: [
        { name: "All Projects", path: "/projects/all" },
        { name: "Create Project", path: "/create-project" },
      ],
    },
    { name: "Causes", path: "/causes/all" },
    {
      name: "GIVeconomy",
      path: "/giveconomy",
      dropdown: [
        { name: "Overview", path: "/giveconomy" },
        { name: "GIVfarm", path: "/givfarm" },
      ],
    },
    { name: "Community", path: "/join" },
    { name: "About", path: "/about" },
  ];

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl flex items-center justify-center"
            >
              <Globe className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-display font-bold gradient-text">
              ChainFund
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown && setActiveDropdown(link.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 ${
                    location.pathname === link.path
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 glass-effect rounded-xl shadow-2xl overflow-hidden"
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Wallet Connection & Network Selector */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Profile Button */}
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isLoggedIn
                    ? "text-white hover:bg-white/5"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{isLoggedIn ? user?.name || "Profile" : "Sign In"}</span>
              </motion.button>
            </Link>

            {/* Network Selector - Only show when connected */}
            {isConnected && (
              <div className="relative">
                <select
                  value={network}
                  onChange={(e) => switchNetwork(e.target.value)}
                  className="appearance-none px-3 py-2 pr-8 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/20 focus:outline-none focus:border-white/30 transition-all duration-300 cursor-pointer"
                >
                  <option value="TESTNET">Testnet</option>
                  <option value="PUBLIC">Mainnet</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            {/* Wallet Button with Balance */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWalletClick}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                isConnected
                  ? "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                  : "btn-primary"
              }`}
            >
              {isConnected ? (
                <>
                  <Wallet className="w-4 h-4" />
                  <div className="flex items-center space-x-3">
                    <span className="font-mono">
                      {formatAddress(publicKey)}
                    </span>
                    {balance && (
                      <>
                        <div className="w-px h-4 bg-white/20"></div>
                        <span className="text-white/90">
                          {parseFloat(balance.xlm).toFixed(2)} XLM
                        </span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 backdrop-blur-xl border-t border-dark-700"
          >
            <div className="container-custom py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === link.path
                        ? "text-white bg-white/10"
                        : "text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Wallet Section */}
              <div className="pt-4 border-t border-dark-700 space-y-3">
                {/* Profile Button Mobile */}
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <button
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      isLoggedIn
                        ? "text-white bg-white/5 hover:bg-white/10"
                        : "text-gray-400 bg-white/5 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>
                      {isLoggedIn ? user?.name || "Profile" : "Sign In"}
                    </span>
                  </button>
                </Link>

                {/* Network Selector - Only show when connected */}
                {isConnected && (
                  <div className="relative">
                    <select
                      value={network}
                      onChange={(e) => switchNetwork(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:border-white/20 focus:outline-none focus:border-white/30 transition-all duration-300"
                    >
                      <option value="TESTNET">Testnet</option>
                      <option value="PUBLIC">Mainnet</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}

                {/* Wallet Button */}
                <button
                  onClick={handleWalletClick}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isConnected
                      ? "bg-white/10 hover:bg-white/15 text-white border border-white/20"
                      : "btn-primary"
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>
                    {isConnected ? formatAddress(publicKey) : "Connect Wallet"}
                  </span>
                </button>

                {/* Balance Display - Only show when connected */}
                {isConnected && balance && (
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-center">
                    <span className="text-sm text-gray-400">Balance: </span>
                    <span className="text-sm font-semibold text-white">
                      {parseFloat(balance.xlm).toFixed(2)} XLM
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
