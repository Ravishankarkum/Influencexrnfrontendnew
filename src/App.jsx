import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Analytics } from "./components/analytics/Analytics";
import { LoginForm } from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import { CampaignDiscovery } from "./components/campaigns/CampaignDiscovery";
import { CreateCampaign } from "./components/campaigns/CreateCampaign";
import { MyCampaigns } from "./components/campaigns/MyCampaigns";
import { CollaborationManager } from "./components/collaborations/CollaborationManager";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { PageLoader } from "./components/common/LoadingSpinner";
import ConnectionTest from "./components/ConnectionTest";
import BrandDashboard from "./components/dashboard/brand/BrandDashboard";
import { ApplyForm } from "./components/dashboard/influencer/ApplyForm";
import { InfluencerDashboard } from "./components/dashboard/influencer/InfluencerDashboard";
import { EarningsTracker } from "./components/earnings/EarningsTracker";
import { InfluencerDirectory } from "./components/influencers/InfluencerDirectory";
import { LandingPage } from "./components/landing/LandingPage";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { InfluencerProfile } from "./components/profile/InfluencerProfile";
import { Settings } from "./components/settings/Settings";
import { HelpSupport } from "./components/Support/HelpSupport";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import GoogleSuccess from "./components/auth/GoogleSuccess";

// --------------------------------------
// ROLE HELPERS
// --------------------------------------
const isBrandUser = (user) => {
  if (!user || !user.role) return false;
  return user.role.trim().toLowerCase() === "brand";
};

const isInfluencerUser = (user) => {
  if (!user || !user.role) return true;
  const r = user.role.trim().toLowerCase();
  return r === "influencer" || r === "admin";
};

// --------------------------------------
// MAIN APP CONTENT
// --------------------------------------
function AppContent() {
  const { user, isInitializing } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (user) setActiveSection("dashboard");
  }, [user]);

  const goToLanding = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  if (isInitializing) return <PageLoader />;

  // --------------------
  // PUBLIC LANDING PAGE
  // --------------------
  if (!user && !showLogin && !showSignup) {
    return (
      <div>
        <LandingPage
          onGetStarted={() => setShowLogin(true)}
          onSignUp={() => setShowSignup(true)}
        />
        
      </div>
    );
  }

  if (!user && showSignup) {
    return (
      <SignupForm
        onBackToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
        onBackToLanding={goToLanding}
      />
    );
  }

  if (!user && showLogin) {
    return (
      <LoginForm
        onSignupClick={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        onBackToLanding={goToLanding}
      />
    );
  }

  // --------------------
  // LOGGED IN USER UI
  // --------------------
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    if (!user) return <PageLoader />;

    const isBrand = isBrandUser(user);
    const isInfluencer = isInfluencerUser(user);

    switch (activeSection) {
      case "dashboard":
        return isBrand ? <BrandDashboard /> : <InfluencerDashboard />;
      case "discover":
        return <CampaignDiscovery />;
      case "create-campaign":
        return <CreateCampaign />;
      case "campaigns":
        return <MyCampaigns />;
      case "influencers":
        return <InfluencerDirectory />;
      case "collaborations":
        return <CollaborationManager />;
      case "earnings":
        return <EarningsTracker />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "help":
        return <HelpSupport />;
      case "profile":
        return isInfluencer ? (
          <InfluencerProfile influencer={user} />
        ) : (
          <Settings />
        );
      default:
        return isBrand ? <BrandDashboard /> : <InfluencerDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        goToLanding={goToLanding}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary-500/90 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-8">{renderContent()}</main>
      </div>
    </div>
  );
}

// --------------------------------------
// FINAL APP (NO GoogleOAuthProvider needed)
// --------------------------------------
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          {/* Route where backend redirects after Google login */}
          <Route path="/google-success" element={<GoogleSuccess />} />

          {/* Public route */}
          <Route path="/apply/:campaignId" element={<ApplyForm />} />

          {/* Everything else */}
          <Route path="*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
