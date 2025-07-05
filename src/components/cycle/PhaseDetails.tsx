import React from 'react';
import { CyclePhase } from '../../types/cycle';
import { phaseInfoData, phaseRecommendations } from '../../data/phaseData';
import Card from '../common/Card';

interface PhaseDetailsProps {
  phase: CyclePhase;
}

const PhaseDetails: React.FC<PhaseDetailsProps> = ({ phase }) => {
  const phaseInfo = phaseInfoData[phase];
  const recommendations = phaseRecommendations[phase];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2" style={{ color: phaseInfo.color }}>
          {phaseInfo.displayName}
        </h2>
        <p className="text-gray-700 mb-4">{phaseInfo.description}</p>
        <div className="flex items-center text-gray-600 text-sm">
          <span>Typical duration: {phaseInfo.durationRange[0]}-{phaseInfo.durationRange[1]} days</span>
        </div>
      </div>

      {/* Food Recommendations */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-gray-800">Recommended Foods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.foods.map((food, index) => (
            <Card key={index} className="hover:border-l-4 hover:border-l-rose-400 transition-all">
              <div className="flex">
                {food.imageUrl && (
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={food.imageUrl} 
                      alt={food.name} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-gray-800">{food.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{food.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {food.benefits.map((benefit, i) => (
                      <span key={i} className="inline-block px-2 py-0.5 text-xs bg-rose-50 text-rose-700 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Exercise Recommendations */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-gray-800">Recommended Exercises</h3>
        <div className="space-y-4">
          {recommendations.exercises.map((exercise, index) => (
            <Card key={index} className={`border-l-4 ${
              exercise.intensity === 'light' ? 'border-l-green-400' : 
              exercise.intensity === 'moderate' ? 'border-l-yellow-400' : 
              'border-l-orange-400'
            }`}>
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    exercise.intensity === 'light' ? 'bg-green-100 text-green-800' : 
                    exercise.intensity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {exercise.intensity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                <p className="text-sm font-medium mt-2">Duration: {exercise.duration}</p>
                
                <div className="mt-3">
                  <p className="text-xs font-medium uppercase text-gray-500 mb-1">Instructions:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {exercise.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Meditation Recommendations */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-gray-800">Recommended Meditations</h3>
        <div className="space-y-3">
          {recommendations.meditations.map((meditation, index) => (
            <Card key={index} className="hover:bg-lavender-50 transition-all">
              <h4 className="font-medium text-gray-800">{meditation.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{meditation.description}</p>
              <p className="text-sm mt-2">Duration: {meditation.duration}</p>
              <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                {meditation.instructions}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhaseDetails;