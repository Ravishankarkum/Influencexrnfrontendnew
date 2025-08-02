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
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user, isInitializing } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (user) {
      setActiveSection('dashboard');
    }
  }, [user]);

  if (isInitializing) return <PageLoader />;

  if (!user && !showLogin && !showSignup) {
    return (
      <LandingPage 
        onGetStarted={() => setShowLogin(true)} 
        onSignUp={() => setShowSignup(true)} 
      />
    );
  }

  if (!user && (showLogin || showSignup)) {
    return <LoginForm />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    if (!user) return <PageLoader />;
    const isBrand = user?.role === 'brand';

    switch (activeSection) {
      case 'dashboard':
        return isBrand ? <BrandDashboard /> : <InfluencerDashboard />;
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
        return user.role === 'influencer' ? (
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
        return isBrand ? <BrandDashboard /> : <InfluencerDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
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
