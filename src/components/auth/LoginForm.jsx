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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="card p-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#00FFFF' }}>
            <span className="font-bold text-3xl" style={{ color: '#0A192F' }}>I</span>
          </div>
          <h1 className="text-3xl font-display font-bold mb-3" style={{ color: '#0A192F' }}>Welcome Back</h1>
          <p className="text-lg" style={{ color: '#222222' }}>Sign in to your account</p>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-icon"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-icon pr-14"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-error-50 border border-error-200 rounded-xl">
              <p className="text-center text-error-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-base text-neutral-600 mt-8">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignup(true)}
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
