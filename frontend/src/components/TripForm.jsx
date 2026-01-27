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
      <h2 className="text-2xl font-bold text-white text-center">Plan Your Trip</h2>

      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Destination
        </label>
        <input
          type="text"
          required
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="Where do you want to go?"
          className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white bg-white/10 placeholder-gray-400 outline-none transition-all"
        />
      </div>

      {/* Days & Travelers */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Days
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-white/20 rounded-lg text-white bg-white/10 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Travelers
          </label>
          <select
            value={formData.travelers}
            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-white/20 rounded-lg text-white bg-white/10 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Budget
        </label>
        <div className="flex space-x-2">
          {['budget', 'midrange', 'luxury'].map(level => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData({ ...formData, budget: level })}
              className={`flex-1 py-3 rounded-lg border transition-all ${formData.budget === level
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/5'
                }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Interests (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {interestsList.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full border transition-all ${formData.interests.includes(interest)
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/5'
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
        className="w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating...' : 'Generate AI Itinerary'}
      </button>
    </form>
  );
};

export default TripForm;
