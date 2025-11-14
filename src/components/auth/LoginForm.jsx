import { ArrowLeft, Building, Eye, EyeOff, Handshake, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

export function LoginForm({ onSignupClick, onBackToLanding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('influencer');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

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
    }
    
    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email) validateField('email', value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password) validateField('password', value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    
    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await login(email, password, userType);
      const loggedInUserRole = response.user?.role || response.role;

      const normalizedLoggedInRole = loggedInUserRole?.toLowerCase();
      const normalizedSelectedType = userType?.toLowerCase();

      if (normalizedSelectedType !== normalizedLoggedInRole) {
        setGeneralError(
          normalizedSelectedType === 'brand'
            ? 'Influencer account found. Please select the correct user type.'
            : 'Brand account found. Please select the correct user type.'
        );
        return;
      }

      navigate('/');
    } catch (err) {
      setGeneralError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleSignupClickInternal = () =>
    onSignupClick ? onSignupClick() : (window.location.hash = '');

  const handleBackToLanding = () =>
    onBackToLanding ? onBackToLanding() : (window.location.hash = '');

  const isFormValid = email && password && !errors.email && !errors.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="card p-10 w-full max-w-md">

        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#00FFFF' }}>
            <Handshake size={32} style={{ color: '#0A192F' }} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-3" style={{ color: '#0A192F' }}>Welcome Back</h1>
          <p className="text-lg" style={{ color: '#222222' }}>Sign in to your account</p>
        </div>

        {/* user type selector */}
        <div className="mb-8">
          <div className="flex bg-neutral-100 rounded-2xl p-2">
            <button
              type="button"
              onClick={() => setUserType('influencer')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold transition-all"
              style={userType === 'influencer' ? { backgroundColor: '#00FFFF', color: '#0A192F' } : { color: '#666666' }}
            >
              <User size={18} />
              Influencer
            </button>
            <button
              type="button"
              onClick={() => setUserType('brand')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold transition-all"
              style={userType === 'brand' ? { backgroundColor: '#00FFFF', color: '#0A192F' } : { color: '#666666' }}
            >
              <Building size={18} />
              Brand
            </button>
          </div>
        </div>

        {generalError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* email */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)}
                className={`input-icon ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* password */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={(e) => validateField('password', e.target.value)}
                className={`input-icon pr-14 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`btn-primary w-full py-4 text-lg ${!isFormValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover-lift'}`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* ⭐ GOOGLE LOGIN BUTTON ⭐ */}
        <button 
          onClick={() => window.location.href = "http://localhost:5000/auth/google"} 
          className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-300 py-3 rounded-xl shadow-sm hover:shadow-md transition-all mt-4"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google Logo" 
            className="w-5 h-5"
          />
          <span className="text-neutral-700 font-medium">Sign in with Google</span>
        </button>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleBackToLanding}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          <p className="text-base text-neutral-600">
            Don't have an account?{' '}
            <button
              onClick={handleSignupClickInternal}
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
