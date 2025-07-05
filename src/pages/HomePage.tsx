import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Calendar, BookOpen, Users, Sun, Moon } from 'lucide-react';
import { phaseInfoData } from '../data/phaseData';
import { getDaysUntilNextPeriod } from '../utils/cycleUtils';
import { CyclePhase } from '../types/cycle';

const HomePage: React.FC = () => {
  const { user, isAuthenticated, setupComplete } = useUser();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to CycleSage</h1>
                <p className="text-gray-600 mb-8">
                  Your personalized menstrual cycle companion for tracking, insights, and wellness.
                </p>
                <div className="space-y-4">
                  <Button 
                    fullWidth 
                    onClick={() => navigate('/login')}
                  >
                    Log In
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 bg-rose-100 p-8 md:p-12">
                <h2 className="text-xl font-semibold text-rose-800 mb-6">Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rose-500 flex items-center justify-center text-white">
                      <Calendar size={14} />
                    </div>
                    <span className="ml-3 text-rose-900">Personalized cycle tracking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rose-500 flex items-center justify-center text-white">
                      <Sun size={14} />
                    </div>
                    <span className="ml-3 text-rose-900">Phase-based recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rose-500 flex items-center justify-center text-white">
                      <BookOpen size={14} />
                    </div>
                    <span className="ml-3 text-rose-900">Symptom and mood tracking</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rose-500 flex items-center justify-center text-white">
                      <Users size={14} />
                    </div>
                    <span className="ml-3 text-rose-900">Community support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!setupComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Profile</h1>
          <p className="text-gray-600 mb-6">
            Let's set up your cycle tracking to get personalized recommendations.
          </p>
          <Button onClick={() => navigate('/setup')}>
            Continue Setup
          </Button>
        </div>
      </div>
    );
  }
  
  // User is authenticated and setup is complete
  const currentPhase = user?.cycle.currentPhase;
  const phaseInfo = currentPhase ? phaseInfoData[currentPhase] : null;
  const daysUntilNextPeriod = user?.cycle ? getDaysUntilNextPeriod(
    user.cycle.settings.lastPeriodStartDate,
    user.cycle.settings.averageCycleLength
  ) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome back, {user?.name}
        </h1>
        
        {/* Current Phase & Cycle Info */}
        <Card className="mb-8 p-6">
          <div className="md:flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                <span>Day {user?.cycle.currentCycleDay} of your cycle</span>
              </h2>
              {phaseInfo && (
                <div className="mb-2">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium" 
                    style={{ 
                      backgroundColor: phaseInfo.color + '33',
                      color: phaseInfo.color.replace('33', '') 
                    }}
                  >
                    {phaseInfo.displayName}
                  </span>
                </div>
              )}
              <p className="text-gray-600">{phaseInfo?.description}</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="bg-rose-50 rounded-lg p-4 text-center">
                <span className="block text-sm text-rose-700">Next period in</span>
                <span className="block text-3xl font-bold text-rose-800">{daysUntilNextPeriod}</span>
                <span className="block text-sm text-rose-700">days</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={() => navigate('/cycle')}>
              View My Cycle
            </Button>
          </div>
        </Card>
        
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card 
            className="p-6 hover:shadow transition-shadow"
            onClick={() => navigate('/journal')}
          >
            <div className="h-12 w-12 rounded-full bg-lavender-100 flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-lavender-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Journal Today</h3>
            <p className="text-gray-600 text-sm">
              Track your symptoms, mood, and thoughts for today.
            </p>
          </Card>
          
          <Card 
            className="p-6 hover:shadow transition-shadow"
            onClick={() => navigate('/recommendations')}
          >
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Sun size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Today's Recommendations</h3>
            <p className="text-gray-600 text-sm">
              Nutrition, exercise, and wellness tips for your current phase.
            </p>
          </Card>
          
          <Card 
            className="p-6 hover:shadow transition-shadow"
            onClick={() => navigate('/community')}
          >
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Users size={24} className="text-amber-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Connect with others and share experiences.
            </p>
          </Card>
        </div>
        
        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h3 className="text-lg font-medium mb-3">Wellness Tip for Today</h3>
              <p className="text-gray-600 mb-4">
                {currentPhase === CyclePhase.MENSTRUAL && "Focus on rest and gentle movement. Your body is working hard!"}
                {currentPhase === CyclePhase.FOLLICULAR && "Your energy is rising! It's a great time for new projects and activities."}
                {currentPhase === CyclePhase.OVULATORY && "You're at your peak energy! Take advantage of your natural confidence."}
                {currentPhase === CyclePhase.LUTEAL && "Begin to slow down and practice self-care as your cycle winds down."}
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate('/recommendations')}>
                See More Tips
              </Button>
            </div>
            <div className="md:w-1/2 bg-gray-50 p-6">
              <h3 className="text-lg font-medium mb-3">Recommended Today</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                  <span className="text-gray-700">
                    {currentPhase === CyclePhase.MENSTRUAL && "Iron-rich foods like spinach and lentils"}
                    {currentPhase === CyclePhase.FOLLICULAR && "Fermented foods for gut health"}
                    {currentPhase === CyclePhase.OVULATORY && "Fresh fruits and zinc-rich foods"}
                    {currentPhase === CyclePhase.LUTEAL && "Complex carbs and calcium-rich foods"}
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                  <span className="text-gray-700">
                    {currentPhase === CyclePhase.MENSTRUAL && "Gentle yoga or walking"}
                    {currentPhase === CyclePhase.FOLLICULAR && "Strength training or HIIT workouts"}
                    {currentPhase === CyclePhase.OVULATORY && "Dance workouts or circuit training"}
                    {currentPhase === CyclePhase.LUTEAL && "Pilates or yin yoga"}
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>
                  <span className="text-gray-700">
                    {currentPhase === CyclePhase.MENSTRUAL && "Body scan meditation"}
                    {currentPhase === CyclePhase.FOLLICULAR && "Visualization meditation"}
                    {currentPhase === CyclePhase.OVULATORY && "Loving-kindness meditation"}
                    {currentPhase === CyclePhase.LUTEAL && "Self-compassion meditation"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;