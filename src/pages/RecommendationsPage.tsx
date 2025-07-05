import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import Card from '../components/common/Card';
import { Salad, Dumbbell, Brain, Calendar } from 'lucide-react';
import { phaseRecommendations } from '../data/phaseData';
import HormonalHoroscope from '../components/recommendations/HormonalHoroscope';
import ExerciseComponent from '../components/recommendations/ExerciseComponent';

type TabType = 'food' | 'exercise' | 'meditation' | 'horoscope';

const RecommendationsPage: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('food');
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-center text-gray-600">Please log in to view recommendations.</p>
        </div>
      </div>
    );
  }
  
  const currentPhase = user.cycle.currentPhase;
  const recommendations = phaseRecommendations[currentPhase];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Recommendations</h1>
        <p className="text-gray-600 mb-6">
          Personalized suggestions for your {recommendations.phase} phase
        </p>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${
              activeTab === 'food'
                ? 'text-rose-600 border-b-2 border-rose-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('food')}
          >
            <Salad size={18} className="mr-2" />
            Nutrition
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${
              activeTab === 'exercise'
                ? 'text-rose-600 border-b-2 border-rose-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('exercise')}
          >
            <Dumbbell size={18} className="mr-2" />
            Exercise
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${
              activeTab === 'meditation'
                ? 'text-rose-600 border-b-2 border-rose-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('meditation')}
          >
            <Brain size={18} className="mr-2" />
            Meditation
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${
              activeTab === 'horoscope'
                ? 'text-rose-600 border-b-2 border-rose-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('horoscope')}
          >
            <Calendar size={18} className="mr-2" />
            Hormonal Horoscope
          </button>
        </div>
        
        {/* Food Recommendations */}
        {activeTab === 'food' && (
          <div className="space-y-6">
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-rose-800 mb-2">Nutrition Focus for Your Phase</h3>
              <p className="text-rose-700 text-sm">
                {currentPhase === 'menstrual' && 
                  "Focus on iron-rich and anti-inflammatory foods to replenish nutrients and reduce discomfort."}
                {currentPhase === 'follicular' && 
                  "Eat foods that support estrogen metabolism and provide energy for your rising activity levels."}
                {currentPhase === 'ovulatory' && 
                  "Choose foods that support hormone balance and provide sustained energy during your peak activity phase."}
                {currentPhase === 'luteal' && 
                  "Focus on foods that help balance mood, reduce cravings, and prepare your body for the next cycle."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.foods.map((food, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <div className="p-5">
                    {food.imageUrl && (
                      <div className="h-40 overflow-hidden rounded-lg mb-4">
                        <img 
                          src={food.imageUrl} 
                          alt={food.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{food.name}</h3>
                    <p className="text-gray-600 mb-3">{food.description}</p>
                    
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {food.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-4 w-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Exercise Recommendations */}
        {activeTab === 'exercise' && (
          <ExerciseComponent />
        )}
        
        {/* Meditation Recommendations */}
        {activeTab === 'meditation' && (
          <div className="space-y-6">
            <div className="bg-lavender-50 border border-lavender-100 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lavender-800 mb-2">Meditation Focus for Your Phase</h3>
              <p className="text-lavender-700 text-sm">
                {currentPhase === 'menstrual' && 
                  "Focus on restorative practices that help you connect with your body and release tension."}
                {currentPhase === 'follicular' && 
                  "Use this creative phase to visualize goals and set intentions for your cycle."}
                {currentPhase === 'ovulatory' && 
                  "Channel your social energy into compassion and connection with yourself and others."}
                {currentPhase === 'luteal' && 
                  "Practice self-compassion and acceptance as your hormones shift toward menstruation."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.meditations.map((meditation, index) => (
                <Card key={index} className="hover:bg-lavender-50 transition-all">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{meditation.name}</h3>
                    <p className="text-gray-600 mb-3">{meditation.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span className="font-medium mr-2">Duration:</span> {meditation.duration}
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Practice Guide:</h4>
                      <p className="text-sm text-gray-600">
                        {meditation.instructions}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Hormonal Horoscope */}
        {activeTab === 'horoscope' && (
          <HormonalHoroscope userCycle={user.cycle} />
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;