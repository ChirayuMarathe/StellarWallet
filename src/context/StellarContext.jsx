import { createContext, useContext, useState, useEffect } from "react";
import {
  Horizon,
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  Keypair,
  BASE_FEE,
  Memo,
} from "@stellar/stellar-sdk";
import {
  isConnected as checkFreighterConnection,
  getPublicKey,
  signTransaction,
  requestAccess,
  setAllowed,
} from "@stellar/freighter-api";
import toast from "react-hot-toast";

const StellarContext = createContext();

export const useStellar = () => {
  const context = useContext(StellarContext);
  if (!context) {
    throw new Error("useStellar must be used within StellarProvider");
  }
  return context;
};

export const StellarProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState("TESTNET"); // or 'PUBLIC'
  const [loading, setLoading] = useState(false);
  const [xlmPrice, setXlmPrice] = useState(null); // XLM price in USD

  const server =
    network === "TESTNET"
      ? new Horizon.Server("https://horizon-testnet.stellar.org")
      : new Horizon.Server("https://horizon.stellar.org");

  const networkPassphrase =
    network === "TESTNET" ? Networks.TESTNET : Networks.PUBLIC;

  // Check wallet connection on mount
  useEffect(() => {
    checkConnection();
    fetchXlmPrice(); // Fetch XLM price on mount
  }, []);

  // Load account balance when connected
  useEffect(() => {
    if (publicKey) {
      loadAccountBalance();
    }
  }, [publicKey, network]);

  // Fetch XLM price from CoinGecko API
  const fetchXlmPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd"
      );
      const data = await response.json();
      if (data.stellar && data.stellar.usd) {
        setXlmPrice(data.stellar.usd);
        console.log("XLM Price:", data.stellar.usd);
      }
    } catch (error) {
      console.error("Error fetching XLM price:", error);
      // Set a fallback price if API fails
      setXlmPrice(0.12); // Approximate fallback price
    }
  };

  const checkConnection = async () => {
    try {
      // Try to check if already connected via Freighter API
      const connected = await checkFreighterConnection();
      if (connected) {
        const key = await getPublicKey();
        if (key) {
          setPublicKey(key);
          setIsConnected(true);
          console.log("Wallet auto-connected:", key);
        }
      }
    } catch (error) {
      // Silently fail on initial check - user needs to manually connect
      // This is normal if Freighter is not installed or not connected
      console.log(
        "Auto-connect not available - user needs to connect manually"
      );
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);

      // Step 1: Request access/permission from Freighter
      // This will show the Freighter popup asking user to approve
      const accessGranted = await setAllowed();

      if (!accessGranted) {
        toast.error(
          "Permission denied. Please approve the connection in Freighter."
        );
        return;
      }

      // Step 2: Now get the public key after permission granted
      const key = await getPublicKey();

      if (!key) {
        toast.error("Could not retrieve wallet address. Please try again.");
        return;
      }

      setPublicKey(key);
      setIsConnected(true);
      toast.success(
        `Wallet connected: ${key.substring(0, 4)}...${key.substring(
          key.length - 4
        )}`
      );

      return key;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));

      // Handle specific error cases
      const errorMessage = error?.message?.toLowerCase() || "";

      if (
        errorMessage.includes("user declined") ||
        errorMessage.includes("rejected") ||
        errorMessage.includes("denied")
      ) {
        toast.error("Connection request was declined");
      } else if (
        errorMessage.includes("freighter") &&
        (errorMessage.includes("not") || errorMessage.includes("install"))
      ) {
        toast.error("Freighter wallet not found. Installing...");
        setTimeout(() => {
          window.open("https://www.freighter.app/", "_blank");
        }, 1000);
      } else if (errorMessage.includes("locked")) {
        toast.error("Please unlock your Freighter wallet and try again");
      } else {
        // Generic error - likely Freighter not installed
        toast.error("Please install and setup Freighter wallet extension", {
          duration: 4000,
        });
        setTimeout(() => {
          window.open("https://www.freighter.app/", "_blank");
        }, 2000);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setPublicKey(null);
    setIsConnected(false);
    setBalance(null);
    toast.success("Wallet disconnected");
  };

  const loadAccountBalance = async () => {
    if (!publicKey) return;

    try {
      const account = await server.loadAccount(publicKey);
      const xlmBalance = account.balances.find(
        (b) => b.asset_type === "native"
      );

      const balances = account.balances.map((balance) => {
        if (balance.asset_type === "native") {
          return {
            asset: "XLM",
            balance: balance.balance,
            limit: null,
          };
        } else {
          return {
            asset: `${balance.asset_code}:${balance.asset_issuer}`,
            balance: balance.balance,
            limit: balance.limit,
          };
        }
      });

      setBalance({
        xlm: xlmBalance?.balance || "0",
        all: balances,
      });
    } catch (error) {
      console.error("Error loading balance:", error);
      if (error.response?.status === 404) {
        toast.error("Account not funded. Please fund your account first.");
      }
    }
  };

  const sendPayment = async ({
    destination,
    amount,
    asset = "native",
    memo = "",
    assetCode = null,
    assetIssuer = null,
  }) => {
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      throw new Error("Wallet not connected");
    }

    try {
      setLoading(true);

      // Load source account
      const sourceAccount = await server.loadAccount(publicKey);

      // Build transaction
      let transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: networkPassphrase,
      });

      // Add memo if provided
      if (memo) {
        transaction = transaction.addMemo(Memo.text(memo));
      }

      // Add payment operation
      const payment =
        asset === "native"
          ? Operation.payment({
              destination: destination,
              asset: Asset.native(),
              amount: amount.toString(),
            })
          : Operation.payment({
              destination: destination,
              asset: new Asset(assetCode, assetIssuer),
              amount: amount.toString(),
            });

      transaction = transaction.addOperation(payment).setTimeout(180).build();

      // Sign transaction with Freighter
      const xdr = transaction.toXDR();
      const signedXdr = await signTransaction(xdr, {
        network: network,
        networkPassphrase: networkPassphrase,
      });

      // Submit transaction
      const transactionResult = await server.submitTransaction(
        TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
      );

      toast.success("Payment sent successfully!");
      await loadAccountBalance(); // Refresh balance

      return transactionResult;
    } catch (error) {
      console.error("Error sending payment:", error);
      toast.error(`Payment failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTrustline = async (
    assetCode,
    assetIssuer,
    limit = "100000000"
  ) => {
    if (!publicKey) {
      toast.error("Please connect your wallet first");
      throw new Error("Wallet not connected");
    }

    try {
      setLoading(true);

      const sourceAccount = await server.loadAccount(publicKey);

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: networkPassphrase,
      })
        .addOperation(
          Operation.changeTrust({
            asset: new Asset(assetCode, assetIssuer),
            limit: limit,
          })
        )
        .setTimeout(180)
        .build();

      const xdr = transaction.toXDR();
      const signedXdr = await signTransaction(xdr, {
        network: network,
        networkPassphrase: networkPassphrase,
      });

      const transactionResult = await server.submitTransaction(
        TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
      );

      toast.success("Trustline created successfully!");
      await loadAccountBalance();

      return transactionResult;
    } catch (error) {
      console.error("Error creating trustline:", error);
      toast.error(`Failed to create trustline: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const switchNetwork = (newNetwork) => {
    setNetwork(newNetwork);
    toast.success(`Switched to ${newNetwork}`);
    if (publicKey) {
      loadAccountBalance();
    }
  };

  const value = {
    publicKey,
    isConnected,
    balance,
    network,
    loading,
    xlmPrice,
    connectWallet,
    disconnectWallet,
    sendPayment,
    createTrustline,
    loadAccountBalance,
    switchNetwork,
    fetchXlmPrice,
    server,
    networkPassphrase,
  };

  return (
    <StellarContext.Provider value={value}>{children}</StellarContext.Provider>
  );
};
