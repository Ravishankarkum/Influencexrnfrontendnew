import { Camera, Edit, ExternalLink, MapPin, Plus, Save, TrendingUp, Users, X } from 'lucide-react';
import { useState } from 'react';
import { MediaUpload } from '../upload/MediaUpload';

export function InfluencerProfile({ influencer, onUpdate, isEditing = false }) {
  const [editMode, setEditMode] = useState(isEditing);
  const [formData, setFormData] = useState({
    name: influencer?.name || '',
    username: influencer?.username || '',
    bio: influencer?.bio || '',
    category: influencer?.category || '',
    city: influencer?.city || '',
    website: influencer?.website || '',
    portfolio_links: influencer?.portfolio_links || [],
    profile_image: influencer?.profile_image || null,
    portfolio_images: influencer?.portfolio_images || []
  });

  const categories = ['Fashion', 'Technology', 'Health & Fitness', 'Food', 'Travel', 'Lifestyle', 'Beauty', 'Gaming'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      name: influencer?.name || '',
      username: influencer?.username || '',
      bio: influencer?.bio || '',
      category: influencer?.category || '',
      city: influencer?.city || '',
      website: influencer?.website || '',
      portfolio_links: influencer?.portfolio_links || [],
      profile_image: influencer?.profile_image || null,
      portfolio_images: influencer?.portfolio_images || []
    });
    setEditMode(false);
  };

  const addPortfolioLink = () => {
    handleInputChange('portfolio_links', [...formData.portfolio_links, '']);
  };

  const updatePortfolioLink = (index, value) => {
    const updatedLinks = formData.portfolio_links.map((link, i) => 
      i === index ? value : link
    );
    handleInputChange('portfolio_links', updatedLinks);
  };

  const removePortfolioLink = (index) => {
    const updatedLinks = formData.portfolio_links.filter((_, i) => i !== index);
    handleInputChange('portfolio_links', updatedLinks);
  };

  const handleProfileImageUpload = (files) => {
    if (files.length > 0) {
      handleInputChange('profile_image', files[0]);
    }
  };

  const handlePortfolioUpload = (files) => {
    handleInputChange('portfolio_images', files);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {editMode ? 'Edit Profile' : 'My Profile'}
        </h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            {/* Profile Image */}
            <div className="text-center">
              <div className="relative inline-block">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image.url || formData.profile_image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white font-bold text-3xl">
                      {formData.name.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                
                {editMode && (
                  <div className="absolute -bottom-2 -right-2">
                    <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
                      <MediaUpload
                        onUpload={handleProfileImageUpload}
                        acceptedTypes="image/*"
                        maxFiles={1}
                        existingFiles={formData.profile_image ? [formData.profile_image] : []}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              {editMode ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{formData.name}</h3>
                    <p className="text-purple-600 font-medium">{formData.username}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      <span>{formData.city || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} />
                      <span>{influencer?.followers?.toLocaleString() || '0'} followers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp size={16} />
                      <span>{influencer?.engagement_rate || '0'}% engagement</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Stats */}
            {!editMode && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {influencer?.campaigns_completed || 0}
                  </div>
                  <div className="text-xs text-gray-600">Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    ${influencer?.total_earned?.toLocaleString() || '0'}
                  </div>
                  <div className="text-xs text-gray-600">Earned</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">About</h4>
            {editMode ? (
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell us about yourself and your content..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {formData.bio || 'No bio provided yet.'}
              </p>
            )}
          </div>

          {/* Portfolio Links */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Portfolio Links</h4>
              {editMode && (
                <button
                  onClick={addPortfolioLink}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
                >
                  <Plus size={16} />
                  Add Link
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="space-y-3">
                {formData.portfolio_links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => updatePortfolioLink(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                    <button
                      onClick={() => removePortfolioLink(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {formData.portfolio_links.length === 0 && (
                  <p className="text-gray-500 text-sm">No portfolio links added yet.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {formData.portfolio_links.length > 0 ? (
                  formData.portfolio_links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm"
                    >
                      <ExternalLink size={14} />
                      {link}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No portfolio links added yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Portfolio Images */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Gallery</h4>
            
            {editMode ? (
              <MediaUpload
                onUpload={handlePortfolioUpload}
                acceptedTypes="image/*,video/*"
                maxFiles={10}
                existingFiles={formData.portfolio_images}
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.portfolio_images.length > 0 ? (
                  formData.portfolio_images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image.url || image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Camera size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No portfolio images uploaded yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {editMode && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}