import { Building, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function SignupForm({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'influencer',
    phone: '',
    city: '',
    brand_name: '',
    industry: '',
    website: '',
    campaigns_posted: 0,
    username: '',
    name: '',
    category: '',
    followers: '',
    bio: '',
    engagement_rate: 0,
    portfolio_links: [],
    visibility_tier: 'standard'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { signup, isLoading } = useAuth();

  const industries = ['Technology', 'Fashion', 'Health & Fitness', 'Food & Beverage', 'Travel', 'Beauty', 'Automotive', 'Finance', 'Education', 'Entertainment'];
  const categories = ['Fashion', 'Technology', 'Health & Fitness', 'Food', 'Travel', 'Lifestyle', 'Beauty', 'Gaming', 'Music', 'Sports'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.email.trim()) {
        alert('Please enter your email.');
        return false;
      }
      if (!formData.password || formData.password.length < 6) {
        alert('Password must be at least 6 characters.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.phone.trim()) {
        alert('Please enter your phone number.');
        return false;
      }
      if (!formData.city.trim()) {
        alert('Please enter your city.');
        return false;
      }
      if (formData.userType === 'brand') {
        if (!formData.brand_name.trim()) {
          alert('Please enter your brand name.');
          return false;
        }
        if (!formData.industry.trim()) {
          alert('Please select your industry.');
          return false;
        }
      } else {
        if (!formData.username.trim()) {
          alert('Please enter your username.');
          return false;
        }
        if (!formData.name.trim()) {
          alert('Please enter your full name.');
          return false;
        }
        if (!formData.category.trim()) {
          alert('Please select your category.');
          return false;
        }
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const payload = { ...formData };
    payload.email = payload.email.trim().toLowerCase();
    payload.phone = payload.phone.trim();
    payload.city = payload.city.trim();
    payload.username = payload.username.trim();
    payload.name = payload.name.trim();
    payload.brand_name = payload.brand_name.trim();
    payload.bio = payload.bio.trim();
    payload.role = formData.userType;
    try {
      await signup(payload);
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message || 'Signup failed. Please try again.');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          type="button"
          onClick={() => handleInputChange('userType', 'influencer')}
          className={`flex-1 py-2 rounded-lg font-medium ${formData.userType === 'influencer' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'}`}
        >
          <User size={16} className="inline mr-1" />
          Influencer
        </button>
        <button
          type="button"
          onClick={() => handleInputChange('userType', 'brand')}
          className={`flex-1 py-2 rounded-lg font-medium ${formData.userType === 'brand' ? 'bg-white text-purple-600 shadow' : 'text-gray-600'}`}
        >
          <Building size={16} className="inline mr-1" />
          Brand
        </button>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
      <input
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={(e) => handleInputChange('city', e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
      {formData.userType === 'brand' ? (
        <>
          <input
            type="text"
            placeholder="Brand Name"
            value={formData.brand_name}
            onChange={(e) => handleInputChange('brand_name', e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Industry</option>
            {industries.map((ind, idx) => (
              <option key={idx} value={ind}>{ind}</option>
            ))}
          </select>
          <input
            type="url"
            placeholder="Website (optional)"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Followers (optional)"
            value={formData.followers}
            onChange={(e) => handleInputChange('followers', e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
          <textarea
            placeholder="Bio (optional)"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
        </>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-center">Review your details before submitting</p>
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-2">
        <p><span className="font-medium">Email:</span> {formData.email}</p>
        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
        <p><span className="font-medium">City:</span> {formData.city}</p>
        {formData.userType === 'brand' ? (
          <>
            <p><span className="font-medium">Brand Name:</span> {formData.brand_name}</p>
            <p><span className="font-medium">Industry:</span> {formData.industry}</p>
            {formData.website && (
              <p><span className="font-medium">Website:</span> {formData.website}</p>
            )}
          </>
        ) : (
          <>
            <p><span className="font-medium">Full Name:</span> {formData.name}</p>
            <p><span className="font-medium">Username:</span> {formData.username}</p>
            <p><span className="font-medium">Category:</span> {formData.category}</p>
            {formData.followers && (
              <p><span className="font-medium">Followers:</span> {formData.followers}</p>
            )}
            {formData.bio && (
              <p><span className="font-medium">Bio:</span> {formData.bio}</p>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Create your {formData.userType} account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="flex-1 border p-3 rounded-xl">
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="flex-1 bg-purple-600 text-white p-3 rounded-xl">
                Next
              </button>
            ) : (
              <button type="submit" disabled={isLoading} className="flex-1 bg-purple-600 text-white p-3 rounded-xl disabled:opacity-50">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <button onClick={onBackToLogin} className="text-purple-600 underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
