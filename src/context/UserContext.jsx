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

  const login = async (email, password) => {
    // Simulate API call - replace with actual authentication
    try {
      // Check if user exists in localStorage (for demo purposes)
      const storedUsers = localStorage.getItem("stellar_all_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        setIsAnonymous(false);
        return true;
      }

      // For demo: allow any login
      const demoUser = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
        createdAt: new Date().toISOString(),
        totalDonations: 0,
        donationHistory: [],
        projectsCreated: [],
        projectsSupported: [],
        upvotedProjects: [],
        downvotedProjects: [],
      };
      setUser(demoUser);
      setIsAnonymous(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name, email, password) => {
    // Simulate API call - replace with actual authentication
    try {
      // Store user in localStorage (for demo purposes)
      const storedUsers = localStorage.getItem("stellar_all_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if user already exists
      if (users.find((u) => u.email === email)) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
        totalDonations: 0,
        donationHistory: [],
        projectsCreated: [],
        projectsSupported: [],
        upvotedProjects: [],
        downvotedProjects: [],
      };

      users.push(newUser);
      localStorage.setItem("stellar_all_users", JSON.stringify(users));

      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      setIsAnonymous(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
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
    login,
    register,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
