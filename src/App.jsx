import { useState } from 'react';
import { Analytics } from './components/analytics/Analytics';
import { LoginForm } from './components/auth/LoginForm';
import { CampaignDiscovery } from './components/campaigns/CampaignDiscovery';
import { CreateCampaign } from './components/campaigns/CreateCampaign';
import { MyCampaigns } from './components/campaigns/MyCampaigns';
import { CollaborationManager } from './components/collaborations/CollaborationManager';
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/LoadingSpinner';
import { BrandDashboard } from './components/dashboard/brand/BrandDashboard';
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

  // Show loading spinner while initializing auth
  if (isInitializing) {
    return <PageLoader />;
  }

  // Show landing page if no user and neither login nor signup requested
  if (!user && !showLogin && !showSignup) {
    return (
      <LandingPage 
        onGetStarted={() => setShowLogin(true)} 
        onSignUp={() => setShowSignup(true)}
      />
    );
  }

  // Show login/signup forms if no user but requested
  if (!user && (showLogin || showSignup)) {
    return <LoginForm />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return user.userType === 'brand' ? <BrandDashboard /> : <InfluencerDashboard />;
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
        return user.userType === 'influencer' ? (
          <InfluencerProfile 
            influencer={user} 
            onUpdate={(updatedData) => {
              // Update user profile logic here
              console.log('Profile updated:', updatedData);
            }} 
          />
        ) : <Settings />;
      default:
        return user.userType === 'brand' ? <BrandDashboard /> : <InfluencerDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
      />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;