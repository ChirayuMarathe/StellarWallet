import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Donate from "./pages/Donate";
import GIVeconomy from "./pages/GIVeconomy";
import GIVfarm from "./pages/GIVfarm";
import Community from "./pages/Community";
import Causes from "./pages/Causes";
import About from "./pages/About";
import Onboarding from "./pages/Onboarding";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Context
import { StellarProvider } from "./context/StellarContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { UserProvider, useUser } from "./context/UserContext";

// Effects
import ClickSpark from "./components/effects/ClickSpark";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

// Background Animation Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Pure black gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)",
        }}
      />

      {/* Subtle gray animated orbs - no color */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gray accent orb */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.08, 0.04],
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Another gray accent - extremely subtle */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-6"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.06, 0.03],
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};

// Layout wrapper component
function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideNavFooter = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <StellarProvider>
      <UserProvider>
        <ProjectsProvider>
          <Router>
            <ScrollToTop />
            <ClickSpark
              sparkColor="#ffffff"
              sparkSize={12}
              sparkRadius={20}
              sparkCount={8}
              duration={500}
            >
              <div className="min-h-screen relative">
                <AnimatedBackground />

                <div className="relative z-10">
                  <LayoutWrapper>
                    <AnimatePresence mode="wait">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />

                        {/* Protected Routes */}
                        <Route
                          path="/"
                          element={
                            <ProtectedRoute>
                              <Home />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/projects/all"
                          element={
                            <ProtectedRoute>
                              <Projects />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/project/:slug"
                          element={
                            <ProtectedRoute>
                              <ProjectDetail />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/donate/:slug"
                          element={
                            <ProtectedRoute>
                              <Donate />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/giveconomy"
                          element={
                            <ProtectedRoute>
                              <GIVeconomy />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/givfarm"
                          element={
                            <ProtectedRoute>
                              <GIVfarm />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/join"
                          element={
                            <ProtectedRoute>
                              <Community />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/causes/all"
                          element={
                            <ProtectedRoute>
                              <Causes />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/about"
                          element={
                            <ProtectedRoute>
                              <About />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/onboarding"
                          element={
                            <ProtectedRoute>
                              <Onboarding />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/create-project"
                          element={
                            <ProtectedRoute>
                              <CreateProject />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </AnimatePresence>
                  </LayoutWrapper>
                </div>

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#1e293b",
                      color: "#f1f5f9",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      padding: "16px",
                    },
                    success: {
                      iconTheme: {
                        primary: "#0ea5e9",
                        secondary: "#f1f5f9",
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: "#ef4444",
                        secondary: "#f1f5f9",
                      },
                    },
                  }}
                />
              </div>
            </ClickSpark>
          </Router>
        </ProjectsProvider>
      </UserProvider>
    </StellarProvider>
  );
}

export default App;
