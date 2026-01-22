import React from 'react';

const ItineraryView = ({ data }) => {
  const { destination, days, itinerary, estimated_cost, destination_info, travelers } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ✈️ {days}-Day Trip to {destination}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-blue-100">
            {destination_info?.attractions?.length || 0} attractions • {estimated_cost ? `$${estimated_cost}` : 'Cost varies'}
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Save Itinerary
          </button>
        </div>
      </div>

      {/* Destination Info */}
      {destination_info && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About {destination}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Top Attractions</h4>
              <ul className="space-y-2">
                {destination_info.attractions?.slice(0, 5).map((att, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2">🏛️</span>
                    {att}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Local Tips</h4>
              <p className="text-gray-600">
                {destination_info.weather || 'Perfect weather for exploration!'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Itinerary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Itinerary</h2>

        {itinerary?.structured?.map((day, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">{day.day}</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {day.activities?.map((activity, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-600 pt-1">
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Raw text fallback */}
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
      <div className="flex space-x-4">
        <button className="flex-1 bg-white border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
          Download PDF
        </button>
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Share with Friends
        </button>
      </div>
    </div>
  );
};

export default ItineraryView;