import React, { useState } from 'react';

const TripForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    destination: '',
    days: 5,
    budget: 'midrange',
    interests: [],
    travelers: 2
  });

  const interestsList = [
    'Adventure', 'Food', 'Culture', 'Nature', 'History', 'Shopping', 'Relaxation'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Plan Your Trip</h2>
      
      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Destination
        </label>
        <input
          type="text"
          required
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
          placeholder="Where do you want to go?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Days & Travelers */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.days}
            onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travelers
          </label>
          <select
            value={formData.travelers}
            onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            {[1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget
        </label>
        <div className="flex space-x-2">
          {['budget', 'midrange', 'luxury'].map(level => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData({...formData, budget: level})}
              className={`flex-1 py-3 rounded-lg border ${
                formData.budget === level
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {interestsList.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full border ${
                formData.interests.includes(interest)
                  ? 'bg-purple-100 text-purple-700 border-purple-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !formData.destination}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : 'Generate AI Itinerary'}
      </button>
    </form>
  );
};

export default TripForm;