import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import CyclePhaseWheel from '../components/cycle/CyclePhaseWheel';
import PhaseDetails from '../components/cycle/PhaseDetails';
import { CyclePhase } from '../types/cycle';

const CyclePage: React.FC = () => {
  const { user } = useUser();
  const [selectedPhase, setSelectedPhase] = useState<CyclePhase | null>(
    user?.cycle.currentPhase || null
  );

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-center text-gray-600">Please log in to view your cycle information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Cycle</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <CyclePhaseWheel 
            userCycle={user.cycle} 
            onPhaseClick={(phase) => setSelectedPhase(phase)} 
          />
        </div>
        
        {selectedPhase && (
          <PhaseDetails phase={selectedPhase} />
        )}
      </div>
    </div>
  );
};

export default CyclePage;