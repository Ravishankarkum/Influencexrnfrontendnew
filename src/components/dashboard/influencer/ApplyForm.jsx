import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function ApplyForm() {
  // Extract campaign ID from URL parameters
  const { campaignId } = useParams();

  // Local form state for pitch and portfolio link
  const [formData, setFormData] = useState({
    pitch: '',
    portfolio: ''
  });

  // Handle input changes and update form state
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Make API POST request to /api/applications with campaignId and formData
    console.log('Submitting application for campaign:', campaignId);
    console.log('Form data:', formData);

    // Temporary success alert (until backend integration)
    alert('Application submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      {/* Page Title */}
      <h2 className="text-xl font-bold mb-4">Apply to Campaign</h2>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Pitch Input */}
        <div>
          <label className="block mb-1 font-medium">Your Pitch</label>
          <textarea
            name="pitch"
            rows="4"
            value={formData.pitch}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Tell the brand why you're a good fit..."
            required
          />
        </div>

        {/* Portfolio/Link Input */}
        <div>
          <label className="block mb-1 font-medium">Portfolio / Social Media Link</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="https://yourportfolio.com"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
