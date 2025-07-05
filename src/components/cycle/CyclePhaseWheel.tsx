import React from 'react';
import { CyclePhase, UserCycle } from '../../types/cycle';
import { phaseInfoData } from '../../data/phaseData';

interface CyclePhaseWheelProps {
  userCycle: UserCycle;
  onPhaseClick: (phase: CyclePhase) => void;
}

const CyclePhaseWheel: React.FC<CyclePhaseWheelProps> = ({ userCycle, onPhaseClick }) => {
  const phases = Object.values(CyclePhase);
  const totalDays = userCycle.settings.averageCycleLength;
  
  // Calculate the percentage of the cycle for each phase
  const getPhasePercentage = (phase: CyclePhase) => {
    const phaseInfo = phaseInfoData[phase];
    const avgDuration = (phaseInfo.durationRange[0] + phaseInfo.durationRange[1]) / 2;
    return (avgDuration / totalDays) * 100;
  };

  // Determine if a phase is the current phase
  const isCurrentPhase = (phase: CyclePhase) => {
    return userCycle.currentPhase === phase;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="relative">
        {/* Circular progress background */}
        <div className="w-64 h-64 mx-auto rounded-full overflow-hidden flex">
          {phases.map((phase, index) => {
            const percentage = getPhasePercentage(phase);
            return (
              <div
                key={phase}
                className={`h-full transition-all duration-300 ${
                  isCurrentPhase(phase) ? 'opacity-100' : 'opacity-60'
                }`}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: phaseInfoData[phase].color,
                  cursor: 'pointer',
                }}
                onClick={() => onPhaseClick(phase)}
              />
            );
          })}
        </div>
        
        {/* Current day indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-4xl font-bold text-rose-500">{userCycle.currentCycleDay}</span>
            <span className="text-sm text-gray-600">Day of Cycle</span>
            <div className="mt-2">
              <span className="text-base font-medium" style={{ color: phaseInfoData[userCycle.currentPhase].color }}>
                {phaseInfoData[userCycle.currentPhase].displayName}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phase legend */}
      <div className="grid grid-cols-2 gap-2 mt-6">
        {phases.map(phase => (
          <div 
            key={phase}
            className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
              isCurrentPhase(phase) ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => onPhaseClick(phase)}
          >
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: phaseInfoData[phase].color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {phaseInfoData[phase].displayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyclePhaseWheel;