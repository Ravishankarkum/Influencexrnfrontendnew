import { ArrowRight, Handshake, Play, Shield, Star, TrendingUp, Users } from 'lucide-react';

export function LandingPage({ onGetStarted, onSignUp }) {
  const features = [
    {
      icon: Users,
      title: 'Connect & Collaborate',
      description: 'Bridge the gap between brands and influencers with our intelligent matching system.'
    },
    {
      icon: TrendingUp,
      title: 'Track Performance',
      description: 'Monitor campaign success with real-time analytics and comprehensive reporting.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Protected transactions with automated payouts and transparent fee structures.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Influencer',
      content: 'Collabify helped me find amazing brand partnerships that align perfectly with my audience.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Mike Chen',
      role: 'Marketing Director',
      content: 'The platform streamlined our influencer campaigns and delivered exceptional ROI.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Emma Davis',
      role: 'Lifestyle Creator',
      content: 'Professional, reliable, and the best platform for growing my influencer business.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Influencers' },
    { number: '500+', label: 'Brand Partners' },
    { number: '$2M+', label: 'Paid to Creators' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 border-b shadow-sm" style={{ borderColor: '#e5e5e5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#00FFFF' }}>
                <Handshake size={24} style={{ color: '#0A192F' }} />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                Collabify
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="font-medium transition-colors" style={{ color: '#222222' }} onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#222222'}>Features</a>
              <a href="#how-it-works" className="font-medium transition-colors" style={{ color: '#222222' }} onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#222222'}>How it Works</a>
              <a href="#testimonials" className="font-medium transition-colors" style={{ color: '#222222' }} onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#222222'}>Testimonials</a>
              <button
                onClick={onGetStarted}
                className="btn-primary"
              >
                Sign In
              </button>
              <button
                onClick={onSignUp}
                className="btn-secondary"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: '#0A192F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight" style={{ color: '#FFFFFF' }}>
                  Connect Brands with
                  <span className="block mt-2" style={{ color: '#00FFFF' }}>
                    Influencers
                  </span>
                </h1>
                <p className="text-xl md:text-2xl leading-relaxed" style={{ color: '#ffffff99' }}>
                  The premier platform for authentic brand partnerships. Discover opportunities, 
                  manage campaigns, and grow your influence with confidence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={onGetStarted}
                  className="btn-primary text-lg px-10 py-4 hover-lift flex items-center justify-center gap-3 group"
                >
                  Get Started Now
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-outline text-lg px-10 py-4 hover-lift flex items-center justify-center gap-3 group">
                  <Play size={22} className="group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="text-3xl md:text-4xl font-display font-bold" style={{ color: '#00FFFF' }}>{stat.number}</div>
                    <div className="text-sm font-medium" style={{ color: '#ffffff99' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in animation-delay-200">
              <div className="relative z-10 hover-lift">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                  alt="Influencer creating content"
                  className="rounded-3xl shadow-soft-xl"
                />
              </div>
              <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-gradient-to-br from-secondary-300 to-accent-300 rounded-full opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-white">
        <div className="section-container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Powerful tools and features designed to make influencer marketing simple, 
              effective, and profitable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="card-hover p-10 group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft">
                  <feature.icon size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: '#0A192F' }}>
              How It Works
            </h2>
            <p className="text-xl" style={{ color: '#222222' }}>
              Simple steps to start your influencer marketing journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Brands */}
            <div className="space-y-8">
              <h3 className="text-2xl font-display font-bold text-center" style={{ color: '#0A192F' }}>For Brands</h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Create Your Campaign', desc: 'Define your goals, budget, and target audience' },
                  { step: 2, title: 'Find Influencers', desc: 'Browse and connect with relevant content creators' },
                  { step: 3, title: 'Manage Collaborations', desc: 'Track progress and measure campaign success' },
                  { step: 4, title: 'Analyze Results', desc: 'Get detailed insights and ROI analytics' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md" style={{ backgroundColor: '#00FFFF', color: '#0A192F' }}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#0A192F' }}>{item.title}</h4>
                      <p style={{ color: '#222222' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Influencers */}
            <div className="space-y-8">
              <h3 className="text-2xl font-display font-bold text-center" style={{ color: '#0A192F' }}>For Influencers</h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Build Your Profile', desc: 'Showcase your content and audience demographics' },
                  { step: 2, title: 'Discover Campaigns', desc: 'Browse opportunities that match your niche' },
                  { step: 3, title: 'Apply & Collaborate', desc: 'Submit proposals and work with brands' },
                  { step: 4, title: 'Get Paid', desc: 'Receive secure payments for completed work' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md" style={{ backgroundColor: '#00FFFF', color: '#0A192F' }}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#0A192F' }}>{item.title}</h4>
                      <p style={{ color: '#222222' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20" style={{ backgroundColor: '#f7f7f7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: '#0A192F' }}>
              Trusted by Creators & Brands
            </h2>
            <p className="text-xl" style={{ color: '#222222' }}>
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: '#00FFFF' }} className="fill-current" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed" style={{ color: '#222222' }}>"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0A192F' }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: '#666666' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#0A192F' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6" style={{ color: '#FFFFFF' }}>
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: '#ffffff99' }}>
            Join thousands of brands and influencers who are already creating 
            successful partnerships on our platform.
          </p>
          <button
            onClick={onGetStarted}
            className="btn-primary px-8 py-4 inline-flex items-center gap-2"
          >
            Join Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#0A192F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00FFFF' }}>
                  <Handshake size={16} style={{ color: '#0A192F' }} />
                </div>
                <span className="text-lg font-display font-bold" style={{ color: '#00FFFF' }}>Collabify</span>
              </div>
              <p style={{ color: '#ffffff99' }}>
                Connecting brands with influencers for authentic partnerships.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Platform</h3>
              <ul className="space-y-2" style={{ color: '#ffffff99' }}>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>For Brands</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>For Influencers</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Pricing</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Features</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Support</h3>
              <ul className="space-y-2" style={{ color: '#ffffff99' }}>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Help Center</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Contact Us</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>API Docs</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Company</h3>
              <ul className="space-y-2" style={{ color: '#ffffff99' }}>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>About</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Blog</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Careers</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.target.style.color = '#00FFFF'} onMouseLeave={(e) => e.target.style.color = '#ffffff99'}>Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 text-center" style={{ borderTop: '1px solid #ffffff22', color: '#ffffff99' }}>
            <p>&copy; 2024 Collabify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}