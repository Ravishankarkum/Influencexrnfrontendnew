import { Building, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SignupForm from '/src/components/auth/SignupForm.jsx';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('influencer');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState('');

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  if (showSignup) {
    return <SignupForm onBackToLogin={() => setShowSignup(false)} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      /**
       * If your backend expects userType during login, you need to include it.
       * Otherwise, remove `userType` below and keep only email, password.
       */
      const response = await login(email, password);

      console.log("✅ Logged in user data:", response.user || response);

      const userData = response.user || response;

      if (userData.role === 'brand') {
        navigate('/brand-dashboard');
      } else if (userData.role === 'influencer') {
        navigate('/influencer-dashboard');
      } else {
        navigate('/'); // fallback
      }
    } catch (err) {
      console.error('Login submission error:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">I</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setUserType('influencer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all ${
                userType === 'influencer'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <User size={16} />
              Influencer
            </button>
            <button
              type="button"
              onClick={() => setUserType('brand')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all ${
                userType === 'brand'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <Building size={16} />
              Brand
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-center text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignup(true)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
