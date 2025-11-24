import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export function CreateCampaign() {
  // Form state to store all campaign inputs
  const [formData, setFormData] = useState({
    campaign_title: '',
    description: '',
    category: '',
    budget: '',
    ended_at: '',
    requirements: [''] // starts with one empty requirement field
  });

  // Predefined category options
  const categories = ['Fashion', 'Technology', 'Health & Fitness', 'Food', 'Travel', 'Lifestyle', 'Beauty', 'Gaming'];

  // Generic input handler for all simple fields
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new requirement input field
  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  // Update a requirement by index
  const updateRequirement = (index, value) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => (i === index ? value : req))
    }));
  };

  // Remove requirement at specific index
  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Campaign created:', formData);
    // TODO: Send data to backend API
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page title & description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Campaign</h2>
        <p className="text-gray-600">Launch a new influencer marketing campaign</p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
        
        {/* Basic details inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Campaign Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title</label>
            <input
              type="text"
              value={formData.campaign_title}
              onChange={(e) => handleInputChange('campaign_title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter campaign title"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Budget input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter budget amount"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={formData.ended_at}
              onChange={(e) => handleInputChange('ended_at', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Description textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Describe your campaign, target audience, and expectations..."
            required
          />
        </div>

        {/* Requirements Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>

          <div className="space-y-3">
            {/* Dynamic list of requirement fields */}
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter requirement (e.g., Instagram post, 50K+ followers)"
                />

                {/* Remove requirement button (only shown if more than 1 exists) */}
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            {/* Add new requirement button */}
            <button
              type="button"
              onClick={addRequirement}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Plus size={16} />
              Add Requirement
            </button>
          </div>
        </div>

        {/* Submit + Draft buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Create Campaign
          </button>

          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            Save Draft
          </button>
        </div>
      </form>
    </div>
  );
}
