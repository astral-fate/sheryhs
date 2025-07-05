import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import CycleSetup from '../components/account/CycleSetup';

const SetupPage: React.FC = () => {
  const { setupCycle } = useUser();
  const navigate = useNavigate();
  
  const handleSetupComplete = (data: {
    cycleLength: number;
    periodLength: number;
    lastPeriodDate: Date;
  }) => {
    setupCycle({
      averageCycleLength: data.cycleLength,
      periodLength: data.periodLength,
      lastPeriodStartDate: data.lastPeriodDate
    });
    
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Set Up Your Cycle
        </h1>
        <p className="text-center text-gray-600 mb-8">
          This information helps us provide personalized recommendations and accurate cycle tracking.
        </p>
        
        <CycleSetup onComplete={handleSetupComplete} />
      </div>
    </div>
  );
};

export default SetupPage;