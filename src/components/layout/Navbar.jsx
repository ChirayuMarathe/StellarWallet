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
              Stellar Giveth
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
          <div className="hidden lg:flex items-center space-x-4">
            {/* Profile Button */}
            {isLoggedIn ? (
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-black border border-white/20 rounded-xl text-white hover:border-white/40 transition-all duration-300"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name || "Profile"}</span>
                </motion.button>
              </Link>
            ) : (
              <Link to="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-black border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: "300",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </motion.button>
              </Link>
            )}

            {/* Network Selector */}
            {isConnected && (
              <select
                value={network}
                onChange={(e) => switchNetwork(e.target.value)}
                className="px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="TESTNET">Testnet</option>
                <option value="PUBLIC">Mainnet</option>
              </select>
            )}

            {/* Wallet Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWalletClick}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isConnected
                  ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white"
                  : "btn-primary"
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>
                {isConnected ? formatAddress(publicKey) : "Connect Wallet"}
              </span>
            </motion.button>

            {/* Balance Display */}
            {isConnected && balance && (
              <div className="px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg">
                <span className="text-sm text-gray-400">Balance: </span>
                <span className="text-sm font-semibold text-white">
                  {parseFloat(balance.xlm).toFixed(2)} XLM
                </span>
              </div>
            )}
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
                {isLoggedIn ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black border border-white/20 rounded-xl text-white"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: "400",
                        fontSize: "0.875rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      <User className="w-4 h-4" />
                      <span>{user?.name || "Profile"}</span>
                    </button>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black border border-white/10 rounded-xl text-gray-400"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: "300",
                        fontSize: "0.875rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      <User className="w-4 h-4" />
                      <span>Sign In</span>
                    </button>
                  </Link>
                )}

                {isConnected && (
                  <select
                    value={network}
                    onChange={(e) => switchNetwork(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-gray-300"
                  >
                    <option value="TESTNET">Testnet</option>
                    <option value="PUBLIC">Mainnet</option>
                  </select>
                )}

                <button
                  onClick={handleWalletClick}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold ${
                    isConnected
                      ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white"
                      : "btn-primary"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span>
                    {isConnected ? formatAddress(publicKey) : "Connect Wallet"}
                  </span>
                </button>

                {isConnected && balance && (
                  <div className="px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-center">
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
