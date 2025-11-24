import { Bell, CreditCard, Eye, Save, Shield, User, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Main Settings Component
export function Settings() {

  // Auth context functions: update password, delete account, logout
  const { user, updatePassword, deleteAccount, logout } = useAuth();
  
  // Navigation hook
  const navigate = useNavigate();

  // Active tab state (default: profile)
  const [activeTab, setActiveTab] = useState('profile');

  // All settings form data stored in a single object
  const [formData, setFormData] = useState({

    // Profile settings
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    website: user?.website || '',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    campaignUpdates: true,
    paymentAlerts: true,
    
    // Privacy settings
    profileVisibility: 'public',
    showEarnings: false,
    allowDirectMessages: true,
    
    // Payment settings
    paymentMethod: 'bank',
    bankAccount: '**** **** **** 1234',
    paypalEmail: user?.email || '',
    
    // Security settings (password update)
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Validation errors for forms
  const [errors, setErrors] = useState({});

  // Loader for delete-account action
  const [isDeleting, setIsDeleting] = useState(false);

  // Confirmation input for account deletion
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Sidebar tabs configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  // Update any input value in the formData object
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Removes validation message when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Save settings button handler
  const handleSave = () => {
    console.log('Settings saved:', formData);
    // Add API update logic here when backend is ready
  };

  // Handle password update (Security tab)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Clear old validation errors
    setErrors({});
    
    // Password validations
    if (!formData.currentPassword) {
      setErrors(prev => ({ ...prev, currentPassword: 'Current password is required' }));
      return;
    }
    
    if (!formData.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: 'New password is required' }));
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setErrors(prev => ({ ...prev, newPassword: 'Password must be at least 8 characters' }));
      return;
    }
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrors(prev => ({ ...prev, confirmNewPassword: 'Passwords do not match' }));
      return;
    }
    
    // Try updating password using context function
    try {
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      
      alert('Password updated successfully');
    } 
    catch (error) {
      console.error('Password update error:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to update password. Please try again.');
      }
    }
  };

  // Delete account logic
  const handleDeleteAccount = async () => {
    // Require user to type DELETE
    if (deleteConfirmation !== 'DELETE') {
      alert('Please type "DELETE" to confirm account deletion');
      return;
    }
    
    // Confirm browser popup
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteAccount();
      navigate('/'); // Redirect to home after deletion
    } 
    catch (error) {
      console.error('Account deletion error:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to delete account. Please try again.');
      }
    } 
    finally {
      setIsDeleting(false);
      setDeleteConfirmation('');
    }
  };

  // Renders content based on selected tab
  const renderTabContent = () => {
    switch (activeTab) {

      // ---------------- PROFILE TAB ----------------
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile basic info fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        );

      // ---------------- NOTIFICATION TAB ----------------
      case 'notifications':
        return (
          <div className="space-y-6">
            {/* Notification Toggles */}
            <div className="space-y-4">

              {/* Single notification option UI reusable structure */}
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>

                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
