import React from 'react';

const ItineraryView = ({ data }) => {
  const { destination, days, itinerary, estimated_cost, destination_info, travelers } = data;

  return (
    <div className="space-y-10 px-4 md:px-10">

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={`https://source.unsplash.com/1600x400/?${destination},travel`}
          alt={destination}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 flex flex-col justify-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            ✈️ {days}-Day Trip to {destination}
          </h1>
          <p className="text-white/80">
            {destination_info?.attractions?.length || 0} attractions • {estimated_cost ? `$${estimated_cost}` : 'Cost varies'}
          </p>
        </div>
      </div>

      {/* Destination Info */}
      {destination_info && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Attractions</h3>
            <ul className="space-y-2">
              {destination_info.attractions?.slice(0, 5).map((att, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="mr-2 text-blue-600">🏛️</span>
                  {att}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local Tips</h3>
            <p className="text-gray-600">{destination_info.weather || 'Perfect weather for exploration!'}</p>
          </div>
        </div>
      )}

      {/* Itinerary */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Itinerary</h2>

        {itinerary?.structured?.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-indigo-100/60 px-6 py-3 border-b">
              <h3 className="text-xl font-bold text-gray-900">Day {day.day}: {day.theme} (Est. ${day.estimated_cost})</h3>
            </div>
            <div className="p-6 space-y-4">
              {day.activities?.map((activity, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-sm font-semibold text-indigo-600 pt-1">
                    {activity.time}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gray-900 font-bold">{activity.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    {activity.cost > 0 && (
                      <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        Est. Cost: ${activity.cost}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {day.notes && <p className="text-gray-500 italic">Note: {day.notes}</p>}
            </div>
          </div>
        ))}

        {/* Fallback text */}
        {!itinerary?.structured && itinerary?.text && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <pre className="whitespace-pre-wrap text-gray-700">{itinerary.text}</pre>
          </div>
        )}
      </div>

      {/* Cost Summary */}
      {estimated_cost && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">💰 Estimated Cost</h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">Total for {travelers} travelers × {days} days:</p>
            <p className="text-3xl font-bold text-green-600">${estimated_cost}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Includes activities, food, and local transportation
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50">
          Download PDF
        </button>
        <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
          Share with Friends
        </button>
      </div>
    </div>
  );
};

export default ItineraryView;
