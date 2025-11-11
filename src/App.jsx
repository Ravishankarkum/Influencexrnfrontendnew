import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Analytics } from './components/analytics/Analytics';
import { LoginForm } from './components/auth/LoginForm';
import { CampaignDiscovery } from './components/campaigns/CampaignDiscovery';
import { CreateCampaign } from './components/campaigns/CreateCampaign';
import { MyCampaigns } from './components/campaigns/MyCampaigns';
import { CollaborationManager } from './components/collaborations/CollaborationManager';
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/LoadingSpinner';
import BrandDashboard from './components/dashboard/brand/BrandDashboard';
import { ApplyForm } from './components/dashboard/influencer/ApplyForm';
import { InfluencerDashboard } from './components/dashboard/influencer/InfluencerDashboard';
import { EarningsTracker } from './components/earnings/EarningsTracker';
import { InfluencerDirectory } from './components/influencers/InfluencerDirectory';
import { LandingPage } from './components/landing/LandingPage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { InfluencerProfile } from './components/profile/InfluencerProfile';
import { Settings } from './components/settings/Settings';
import SignupForm from './components/auth/SignupForm';
import ConnectionTest from './components/ConnectionTest';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Helper function to determine if user is a brand
const isBrandUser = (user) => {
  if (!user || !user.role) return false;
  
  // Normalize the role
  const normalizedRole = user.role.toString().trim().toLowerCase();
  console.log("Normalized role for brand check:", normalizedRole);
  
  return normalizedRole === 'brand';
};

// Helper function to determine if user is an influencer
const isInfluencerUser = (user) => {
  if (!user || !user.role) return true; // default to influencer
  
  // Normalize the role
  const normalizedRole = user.role.toString().trim().toLowerCase();
  console.log("Normalized role for influencer check:", normalizedRole);
  
  return normalizedRole === 'influencer' || normalizedRole === 'admin';
};

function AppContent() {
  const { user, isInitializing } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Listen for navigation events from components
    const handleNavigation = (event) => {
      setActiveSection(event.detail);
    };

    window.addEventListener('navigate', handleNavigation);
    
    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setActiveSection('dashboard');
      console.log("=== USER AUTHENTICATION DEBUG INFO ===");
      console.log("Full user object:", JSON.stringify(user, null, 2));
      console.log("User role:", user?.role);
      console.log("User role type:", typeof user?.role);
      console.log("User role length:", user?.role?.length);
      if (user?.role) {
        console.log("User role char codes:", [...user.role].map(c => c.charCodeAt(0)));
      }
      console.log("=====================================");
    }
  }, [user]);

  // Function to reset to landing page
  const goToLanding = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  if (isInitializing) return <PageLoader />;

  if (!user && !showLogin && !showSignup) {
    return (
      <div>
        <LandingPage 
          onGetStarted={() => setShowLogin(true)} 
          onSignUp={() => setShowSignup(true)} 
        />
        <ConnectionTest />
      </div>
    );
  }

  if (!user && showSignup) {
    return <SignupForm 
      onBackToLogin={() => {
        setShowSignup(false);
        setShowLogin(true);
      }}
      onBackToLanding={goToLanding}
    />;
  }

  if (!user && showLogin) {
    return <LoginForm 
      onSignupClick={() => {
        setShowLogin(false);
        setShowSignup(true);
      }}
      onBackToLanding={goToLanding}
    />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    if (!user) return <PageLoader />;
    
    // Determine user type with explicit checks
    const isBrand = isBrandUser(user);
    const isInfluencer = isInfluencerUser(user);
    
    console.log("=== DASHBOARD RENDERING DEBUG INFO ===");
    console.log("User role:", user?.role);
    console.log("Is brand user (helper):", isBrand);
    console.log("Is influencer user (helper):", isInfluencer);
    console.log("Component to render:", isBrand ? "BrandDashboard" : "InfluencerDashboard");
    console.log("=====================================");
    
    // TEMPORARY OVERRIDE FOR DEBUGGING - Remove this in production
    // Force influencer dashboard for testing
    // const forceInfluencer = true; // Set to false to test brand dashboard
    // if (forceInfluencer) {
    //   console.log("FORCING INFLUENCER DASHBOARD (DEBUG MODE)");
    //   return <InfluencerDashboard />;
    // }
    
    switch (activeSection) {
      case 'dashboard':
        // Force the correct dashboard based on our explicit checks
        if (isBrand) {
          console.log("Rendering BrandDashboard");
          return <BrandDashboard />;
        } else {
          console.log("Rendering InfluencerDashboard");
          return <InfluencerDashboard />;
        }
      case 'discover':
        return <CampaignDiscovery />;
      case 'create-campaign':
        return <CreateCampaign />;
      case 'campaigns':
        return <MyCampaigns />;
      case 'my-campaigns':
        return <CampaignDiscovery />;
      case 'influencers':
        return <InfluencerDirectory />;
      case 'collaborations':
        return <CollaborationManager />;
      case 'earnings':
        return <EarningsTracker />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return isInfluencer ? (
          <InfluencerProfile
            influencer={user}
            onUpdate={(updatedData) => {
              console.log('Profile updated:', updatedData);
            }}
          />
        ) : (
          <Settings />
        );
      default:
        // Fallback to explicit check
        if (isBrand) {
          console.log("Rendering BrandDashboard (fallback)");
          return <BrandDashboard />;
        } else {
          console.log("Rendering InfluencerDashboard (fallback)");
          return <InfluencerDashboard />;
        }
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        goToLanding={goToLanding} // Pass the goToLanding function to Sidebar
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary-500/90 backdrop-blur-sm z-10 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-8 scrollbar-thin">{renderContent()}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route path="/apply/:campaignId" element={<ApplyForm />} />
          <Route path="*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;