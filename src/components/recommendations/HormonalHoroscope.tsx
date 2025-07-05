import React, { useState, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CyclePhase, UserCycle } from '../../types/cycle'; // Assuming these types are defined elsewhere
import Card from '../common/Card'; // Assuming Card component is defined elsewhere
import { cycleDayContentData, DayContent } from './cycleData'; // Import the data

interface HormonalHoroscopeProps {
  userCycle: UserCycle;
}

// Helper function to get a default day's content if a specific day is not found
// This is a robust fallback, though with current logic it might not be strictly needed
// if averageCycleLength is always covered by cycleDayContentData.
const getDefaultDayContent = (day: number): DayContent => {
  return {
    day: day,
    hormoneHoroscope: `Content for day ${day} is currently unavailable. Please check back later.`,
    makeTodayBetter: 'Focus on general well-being today. Stay hydrated and listen to your body.',
    funFact: 'Did you know? Understanding your cycle can be empowering!',
  };
};


const HormonalHoroscope: React.FC<HormonalHoroscopeProps> = ({ userCycle }) => {
  const [currentDay, setCurrentDay] = useState(userCycle.currentCycleDay);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const averageCycleLength = userCycle.settings.averageCycleLength > 0 && userCycle.settings.averageCycleLength <= cycleDayContentData.length 
                             ? userCycle.settings.averageCycleLength 
                             : 28; // Default to 28 if invalid or not set, ensure it aligns with available data

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(difference) < minSwipeDistance) return;

    if (difference > 0) {
      handleNextDay();
    } else {
      handlePrevDay();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrevDay = () => {
    setCurrentDay(prev => (prev > 1 ? prev - 1 : averageCycleLength));
  };

  const handleNextDay = () => {
    setCurrentDay(prev => (prev < averageCycleLength ? prev + 1 : 1));
  };

  const getHormoneLevels = () => {
    const normalizedDay = currentDay / averageCycleLength;
    
    const estrogen = Math.sin(normalizedDay * Math.PI * 2 - Math.PI / 2) * 0.45 + 0.55; // Adjusted for typical curve
    let progesterone = 0.1;
    if (normalizedDay > 0.5 && normalizedDay <= 1) { // Luteal phase rise and fall
         progesterone = Math.sin((normalizedDay - 0.5) * Math.PI) * 0.8 + 0.1;
    }
    progesterone = Math.max(0.1, Math.min(progesterone, 0.9));


    const testosteroneMidCycleBoost = normalizedDay > 0.3 && normalizedDay < 0.6 ? 0.2 : 0;
    const testosteroneBase = 0.2;
    let testosterone = Math.sin((normalizedDay + 0.1) * Math.PI * 2) * 0.15 + testosteroneBase + testosteroneMidCycleBoost;
    testosterone = Math.max(0.1, Math.min(testosterone, 0.5));
    
    return { 
        estrogen: Math.max(0.1, Math.min(estrogen, 1)), // clamp between 0.1 and 1
        progesterone: Math.max(0.1, Math.min(progesterone, 1)),
        testosterone: Math.max(0.1, Math.min(testosterone, 1))
    };
  };

  const { estrogen, progesterone, testosterone } = getHormoneLevels();

  const getCurrentPhase = (day: number): CyclePhase => {
    // This function relies on userCycle.predictedCycleDays. 
    // Ensure this data is available and correctly maps days to phases.
    // If not, you might need a more direct way to determine phase from day number.
    const cycleDayInfo = userCycle.predictedCycleDays.find(d => d.dayOfCycle === day);
    
    // Fallback logic if predictedCycleDays doesn't cover the day or is unavailable
    if (cycleDayInfo?.phase) {
        return cycleDayInfo.phase;
    } else {
        // Simplified phase determination if detailed prediction is missing
        if (day <= Math.floor(averageCycleLength * 0.18)) return CyclePhase.MENSTRUAL; // Approx 5 days for 28 day cycle
        if (day <= Math.floor(averageCycleLength * 0.46)) return CyclePhase.FOLLICULAR; // Approx up to day 13
        if (day <= Math.floor(averageCycleLength * 0.54)) return CyclePhase.OVULATORY; // Approx day 14-15
        return CyclePhase.LUTEAL; // Rest of the days
    }
  };
  
  const currentPhase = getCurrentPhase(currentDay);

  // Get content for the current day
  // The find operation is 1-indexed for `d.day` matching `currentDay`
  const dayData = cycleDayContentData.find(d => d.day === currentDay) || getDefaultDayContent(currentDay);

  return (
    <div
      className="space-y-6"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Card className="p-6 relative">
        <button
          onClick={handlePrevDay}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors z-10"
          aria-label="Previous day"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          onClick={handleNextDay}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors z-10"
          aria-label="Next day"
        >
          <ChevronRight size={20} />
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 px-8 sm:px-12 text-center sm:text-left">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">Day {dayData.day} of Your Cycle</h2>
            {dayData.notes && <p className="text-sm text-rose-500 mt-1">{dayData.notes}</p>}
            <p className="text-gray-600 mt-1">{currentPhase} Phase</p>
          </div>
          <div className="text-right w-full sm:w-auto">
            <div className="text-sm text-gray-600">Hormone Levels (Illustrative):</div>
            <div className="flex flex-col gap-1 mt-2 items-center sm:items-end">
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm w-20 text-left">Estrogen</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${estrogen * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm w-20 text-left">Progesterone</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${progesterone * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm w-20 text-left">Testosterone</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${testosterone * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-rose-600 mb-2">Today's Hormone Horoscope</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {dayData.hormoneHoroscope}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-rose-600 mb-2">Make Today Better</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {dayData.makeTodayBetter}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-rose-600 mb-2">Fun Fact</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {dayData.funFact}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HormonalHoroscope;

// Make sure CyclePhase enum/type is defined, for example:
/*
export enum CyclePhase {
  MENSTRUAL = 'Menstrual',
  FOLLICULAR = 'Follicular',
  OVULATORY = 'Ovulatory',
  LUTEAL = 'Luteal',
}

export interface UserCycle {
  currentCycleDay: number;
  settings: {
    averageCycleLength: number;
  };
  predictedCycleDays: Array<{ dayOfCycle: number; phase: CyclePhase }>;
  currentPhase: CyclePhase; // This might be redundant if calculated by getCurrentPhase
}
*/