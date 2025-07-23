// User types and interfaces for the influencer marketing platform

export const UserTypes = {
  BRAND: 'brand',
  INFLUENCER: 'influencer'
};

export const CollaborationStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
};

export const CampaignStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused'
};

export const PayoutStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const VisibilityTier = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
  FEATURED: 'featured'
};

// Sample data structures matching backend schema
export const sampleUser = {
  id: '',
  email: '',
  userType: UserTypes.INFLUENCER
};

export const sampleBrand = {
  id: '',
  brand_name: '',
  email: '',
  phone: '',
  city: '',
  industry: '',
  website: '',
  campaigns_posted: 0,
  created_at: ''
};

export const sampleInfluencer = {
  id: '',
  username: '',
  name: '',
  email: '',
  phone: '',
  city: '',
  category: '',
  followers: 0,
  engagement_rate: 0,
  portfolio_links: [],
  bio: '',
  visibility_tier: VisibilityTier.STANDARD,
  created_at: ''
};

export const sampleCampaign = {
  id: '',
  brand_id: '',
  campaign_title: '',
  description: '',
  category: '',
  budget: 0,
  requirements: [],
  ended_at: '',
  created_at: '',
  status: CampaignStatus.ACTIVE,
  applications: 0
};

export const sampleCollaboration = {
  id: '',
  influencer_id: '',
  brand_id: '',
  campaign_id: '',
  deal_amount: 0,
  commission_charged: 0,
  status: CollaborationStatus.PENDING,
  completed_on: null,
  applied_influencers: [],
  selected_influencer: null,
  created_at: ''
};

export const sampleEarning = {
  id: '',
  influencer_id: '',
  total_earned: 0,
  payouts: []
};

export const samplePayout = {
  amount: 0,
  date: '',
  method: '',
  status: PayoutStatus.PENDING
};