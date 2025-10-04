import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage
    const stored = localStorage.getItem("stellar_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        return null;
      }
    }
    return null;
  });

  const [isAnonymous, setIsAnonymous] = useState(() => {
    // Check if user prefers to be anonymous
    const stored = localStorage.getItem("stellar_anonymous");
    return stored === "true";
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("stellar_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("stellar_user");
    }
  }, [user]);

  // Save anonymous preference
  useEffect(() => {
    localStorage.setItem("stellar_anonymous", isAnonymous.toString());
  }, [isAnonymous]);

  const createProfile = (profileData) => {
    const newUser = {
      id: Date.now().toString(),
      ...profileData,
      createdAt: new Date().toISOString(),
      totalDonations: 0,
      donationHistory: [],
      projectsCreated: [],
      projectsSupported: [],
      upvotedProjects: [],
      downvotedProjects: [],
    };
    setUser(newUser);
    setIsAnonymous(false);
    return newUser;
  };

  const updateProfile = (updates) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addDonation = (projectSlug, amount, txHash) => {
    if (user) {
      const donation = {
        id: Date.now().toString(),
        projectSlug,
        amount,
        txHash,
        date: new Date().toISOString(),
      };
      setUser({
        ...user,
        totalDonations: user.totalDonations + amount,
        donationHistory: [...user.donationHistory, donation],
        projectsSupported: user.projectsSupported.includes(projectSlug)
          ? user.projectsSupported
          : [...user.projectsSupported, projectSlug],
      });
    }
  };

  const addCreatedProject = (projectSlug) => {
    if (user) {
      setUser({
        ...user,
        projectsCreated: [...user.projectsCreated, projectSlug],
      });
    }
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const logout = () => {
    setUser(null);
    setIsAnonymous(true);
    localStorage.removeItem("stellar_user");
    localStorage.setItem("stellar_anonymous", "true");
  };

  const value = {
    user,
    isAnonymous,
    isLoggedIn: !!user,
    createProfile,
    updateProfile,
    addDonation,
    addCreatedProject,
    toggleAnonymous,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
