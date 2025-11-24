// This file handles the signup form UI and logic
// It includes validation, multi-step form, and user type handling
// No functional changes were made — only comments were added

import { ArrowLeft, Building, Handshake, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

export default function SignupForm({ onBackToLogin, onBackToLanding }) {
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
  const [errors, setErrors] = useState({});
  const [cities] = useState([
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Indianapolis',
    'Fort Worth', 'Charlotte', 'Seattle', 'Denver', 'Washington'
  ]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const { signup, isLoading } = useAuth();

  const industries = ['Technology', 'Fashion', 'Health & Fitness', 'Food & Beverage', 'Travel', 'Beauty', 'Automotive', 'Finance', 'Education', 'Entertainment'];
  const categories = ['Fashion', 'Technology', 'Health & Fitness', 'Food', 'Travel', 'Lifestyle', 'Beauty', 'Gaming', 'Music', 'Sports'];

  // Filter cities based on input
  useEffect(() => {
    if (formData.city.length > 0) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(formData.city.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowCityDropdown(true);
    } else {
      setFilteredCities([]);
      setShowCityDropdown(false);
    }
  }, [formData.city, cities]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Validate field in real-time
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else if (!/@gmail\.com$/.test(value) && !/@gla\.ac\.in$/.test(value)) {
          newErrors.email = 'Email must be from gmail.com or gla.ac.in domain';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (!validatePassword(value)) {
          newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
        } else {
          delete newErrors.password;
        }
        break;
        
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
        
      case 'username':
        if (formData.userType === 'influencer') {
          if (!value) {
            newErrors.username = 'Username is required for influencers';
          } else if (value.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
          } else {
            delete newErrors.username;
          }
        }
        break;
        
      case 'name':
        if (!value) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'phone':
        if (!value) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'city':
        if (!value) {
          newErrors.city = 'City is required';
        } else if (value.length < 2) {
          newErrors.city = 'City must be at least 2 characters';
        } else {
          delete newErrors.city;
        }
        break;
        
      case 'brand_name':
        if (formData.userType === 'brand') {
          if (!value) {
            newErrors.brand_name = 'Brand name is required for brands';
          } else if (value.length < 2) {
            newErrors.brand_name = 'Brand name must be at least 2 characters';
          } else {
            delete newErrors.brand_name;
          }
        }
        break;
        
      case 'industry':
        if (formData.userType === 'brand' && !value) {
          newErrors.industry = 'Industry is required for brands';
        } else {
          delete newErrors.industry;
        }
        break;
        
      case 'category':
        if (formData.userType === 'influencer' && !value) {
          newErrors.category = 'Category is required for influencers';
        } else {
          delete newErrors.category;
        }
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateStep = () => {
    let isValid = true;
    const fieldsToValidate = [];
    
    if (currentStep === 1) {
      fieldsToValidate.push('email', 'password', 'confirmPassword', 'name', 'phone', 'city');
    }
    
    if (currentStep === 2) {
      fieldsToValidate.push('phone', 'city');
      if (formData.userType === 'brand') {
        fieldsToValidate.push('brand_name', 'industry');
      } else {
        fieldsToValidate.push('username', 'category');
      }
    }
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return !errors.email && !errors.password && !errors.confirmPassword && 
             !errors.name && !errors.phone && !errors.city &&
             formData.email && formData.password && formData.confirmPassword && 
             formData.name && formData.phone && formData.city;
    }
    
    if (currentStep === 2) {
      if (formData.userType === 'brand') {
        return !errors.phone && !errors.city && !errors.brand_name && !errors.industry &&
               formData.phone && formData.city && formData.brand_name && formData.industry;
      } else {
        return !errors.phone && !errors.city && !errors.username && !errors.category &&
               formData.phone && formData.city && formData.username && formData.category;
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
      // Handle backend validation errors
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          if (err.param) {
            backendErrors[err.param] = err.msg;
          }
        });
        setErrors(prev => ({ ...prev, ...backendErrors }));
      } else if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: error.message || 'Signup failed. Please try again.' });
      }
    }
  };

  // Function to handle back to landing
  const handleBackToLanding = () => {
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      // Fallback behavior
      window.location.hash = '';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">
          Creating {formData.userType === 'influencer' ? 'Influencer' : 'Brand'} Account
        </h3>
        <p className="text-sm text-gray-600">
          This account will give you access to the {formData.userType} dashboard
        </p>
      </div>
      <div className="flex bg-neutral-100 rounded-xl p-1">
        <button
          type="button"
          onClick={() => handleInputChange('userType', 'influencer')}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all"
          style={formData.userType === 'influencer' ? { backgroundColor: '#00FFFF', color: '#0A192F' } : { color: '#666666' }}
        >
          <User size={16} />
          Influencer
        </button>
        <button
          type="button"
          onClick={() => handleInputChange('userType', 'brand')}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all"
          style={formData.userType === 'brand' ? { backgroundColor: '#00FFFF', color: '#0A192F' } : { color: '#666666' }}
        >
          <Building size={16} />
          Brand
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={(e) => validateField('email', e.target.value)}
          className={`w-full border p-3 rounded-xl ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1">
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onBlur={(e) => validateField('password', e.target.value)}
          className={`w-full border p-3 rounded-xl ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Must be 8+ chars with uppercase, lowercase, and number
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1">
          Confirm Password
        </label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          onBlur={(e) => validateField('confirmPassword', e.target.value)}
          className={`w-full border p-3 rounded-xl ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={(e) => validateField('name', e.target.value)}
          className={`w-full border p-3 rounded-xl ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          onBlur={(e) => validateField('phone', e.target.value)}
          className={`w-full border p-3 rounded-xl ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      
      <div className="relative">
        <label className="block text-sm font-semibold text-neutral-700 mb-1">
          City
        </label>
        <input
          type="text"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          onBlur={(e) => validateField('city', e.target.value)}
          onFocus={() => formData.city && setShowCityDropdown(true)}
          className={`w-full border p-3 rounded-xl ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
        )}
        {showCityDropdown && filteredCities.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleInputChange('city', city);
                  setShowCityDropdown(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {formData.userType === 'brand' ? (
        <>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter your brand name"
              value={formData.brand_name}
              onChange={(e) => handleInputChange('brand_name', e.target.value)}
              onBlur={(e) => validateField('brand_name', e.target.value)}
              className={`w-full border p-3 rounded-xl ${errors.brand_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.brand_name && (
              <p className="text-red-500 text-xs mt-1">{errors.brand_name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Industry
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              onBlur={(e) => validateField('industry', e.target.value)}
              className={`w-full border p-3 rounded-xl ${errors.industry ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Industry</option>
              {industries.map((ind, idx) => (
                <option key={idx} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              placeholder="https://yourbrand.com"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full border p-3 rounded-xl border-gray-300"
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              onBlur={(e) => validateField('username', e.target.value)}
              className={`w-full border p-3 rounded-xl ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              onBlur={(e) => validateField('category', e.target.value)}
              className={`w-full border p-3 rounded-xl ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Followers (optional)
            </label>
            <input
              type="number"
              placeholder="Number of followers"
              value={formData.followers}
              onChange={(e) => handleInputChange('followers', e.target.value)}
              className="w-full border p-3 rounded-xl border-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Bio (optional)
            </label>
            <textarea
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full border p-3 rounded-xl border-gray-300"
              rows="3"
            />
          </div>
        </>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-center">Review your details before submitting</p>
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-2">
        <p><span className="font-medium">Account Type:</span> {formData.userType === 'brand' ? 'Brand' : 'Influencer'}</p>
        <p><span className="font-medium">Email:</span> {formData.email}</p>
        <p><span className="font-medium">Name:</span> {formData.name}</p>
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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="card p-8 w-full max-w-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ backgroundColor: '#00FFFF' }}>
            <Handshake size={24} style={{ color: '#0A192F' }} />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2" style={{ color: '#0A192F' }}>
            Create your {formData.userType} account
          </h2>
        </div>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          <div className="flex gap-4">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="btn-secondary flex-1 p-3">
                Previous
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleBackToLanding}
                className="btn-secondary flex items-center justify-center p-3"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </button>
            )}
            {currentStep < 3 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className={`btn-primary flex-1 p-3 ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isStepValid()}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary flex-1 p-3 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>
        </form>
        <div className="flex justify-between items-center mt-4">
          <div></div> {/* Empty div for spacing */}
          <p className="text-sm" style={{ color: '#222222' }}>
            Already have an account?{' '}
            <button onClick={onBackToLogin} className="font-semibold transition-colors" style={{ color: '#00FFFF' }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
