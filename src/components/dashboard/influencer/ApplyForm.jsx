import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function ApplyForm() {
  const { campaignId } = useParams();
  const [formData, setFormData] = useState({
    pitch: '',
    portfolio: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You would send a POST request to /api/applications here
    console.log('Submitting application for campaign:', campaignId);
    console.log('Form data:', formData);
    alert('Application submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Apply to Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
