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

  // ⭐ GOOGLE LOGIN FUNCTION
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";

    // WHEN YOU DEPLOY, CHANGE THIS TO:
    // window.location.href = "https://your-backend-url.onrender.com/auth/google";
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
      const userRole = response.user?.role || response.role;

      if (userRole !== userType) {
        setGeneralError(`This account is registered as ${userRole}. Please switch user type.`);
        return;
      }

      navigate('/');
    } catch (err) {
      if (err.response?.data?.message) {
        setGeneralError(err.response.data.message);
      } else {
        setGeneralError(err.message || 'Login failed. Please try again.');
      }
    }
  };

  const isFormValid = email && password && !errors.email && !errors.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="card p-10 w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{ backgroundColor: '#00FFFF' }}
          >
            <Handshake size={32} style={{ color: '#0A192F' }} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-3" style={{ color: '#0A192F' }}>
            Welcome Back
          </h1>
          <p className="text-lg" style={{ color: '#222222' }}>
            Sign in to your account
          </p>
        </div>

        {/* User Type Switch */}
        <div className="mb-8">
          <div className="flex bg-neutral-100 rounded-2xl p-2">
            <button
              type="button"
              onClick={() => setUserType('influencer')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold transition-all ${
                userType === 'influencer'
                  ? 'bg-cyan-300 text-[#0A192F]'
                  : 'text-gray-500'
              }`}
            >
              <User size={18} />
              Influencer
            </button>

            <button
              type="button"
              onClick={() => setUserType('brand')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold transition-all ${
                userType === 'brand'
                  ? 'bg-cyan-300 text-[#0A192F]'
                  : 'text-gray-500'
              }`}
            >
              <Building size={18} />
              Brand
            </button>
          </div>
        </div>

        {/* ERROR */}
        {generalError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
            {generalError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Email Address
            </label>

            <div className="relative">
              <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)}
                className={`input-icon ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1">
              Password
            </label>

            <div className="relative">
              <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" />
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
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`btn-primary w-full py-4 text-lg ${
              !isFormValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover-lift'
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* ⭐ GOOGLE SIGN-IN BUTTON */}
       {/* ⭐ GOOGLE SIGN-IN BUTTON (Google Style) */}
<button
  onClick={handleGoogleLogin}
  className="w-full mt-4 flex items-center justify-center gap-3"
  style={{
    background: "#ffffff",
    border: "1px solid #dadce0",
    borderRadius: "999px",
    padding: "10px 16px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  }}
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    style={{ width: "20px", height: "20px" }}
  />
  Sign in with Google
</button>


        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onBackToLanding}
            className="flex items-center text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>

          <p className="text-base text-neutral-600">
            Don't have an account?{' '}
            <button
              onClick={onSignupClick}
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
