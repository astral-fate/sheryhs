import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { CyclePhase, UserCycle } from '../../types/cycle';
import { phaseInfoData } from '../../data/phaseData';
import Button from '../common/Button';

interface CycleVisualizationProps {
  userCycle: UserCycle;
}

const CycleVisualization: React.FC<CycleVisualizationProps> = ({ userCycle }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [viewMode, setViewMode] = useState<'calendar' | 'detail'>('calendar');
  
  // Find the cycle day for the selected date
  const selectedCycleDay = userCycle.predictedCycleDays.find(day => 
    isSameDay(new Date(day.date), selectedDate)
  );

  // Generate days for the current month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Get the day of week for the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = startOfMonth(currentMonth).getDay();
  
  // Create empty cells for days before the first day of the month
  const blanks = Array(firstDayOfMonth).fill(null);

  // Get color for a specific cycle day
  const getCycleDayColor = (date: Date) => {
    const cycleDay = userCycle.predictedCycleDays.find(day => 
      isSameDay(new Date(day.date), date)
    );
    
    if (!cycleDay) return 'bg-gray-100';
    
    switch (cycleDay.phase) {
      case CyclePhase.MENSTRUAL:
        return 'bg-rose-200';
      case CyclePhase.FOLLICULAR:
        return 'bg-lavender-200';
      case CyclePhase.OVULATORY:
        return 'bg-green-200';
      case CyclePhase.LUTEAL:
        return 'bg-amber-200';
      default:
        return 'bg-gray-100';
    }
  };

  // Get hormone levels for visualization
  const getHormoneLevels = () => {
    const cycleLength = userCycle.settings.averageCycleLength;
    const currentDay = selectedCycleDay?.dayOfCycle || 1;
    const normalizedDay = currentDay / cycleLength;
    
    // These are simplified hormone curves - in a real app, these would be more accurate
    const estrogen = Math.sin(normalizedDay * Math.PI * 2) * 0.5 + 0.5;
    const progesterone = normalizedDay > 0.5 
      ? Math.sin((normalizedDay - 0.5) * Math.PI * 2) * 0.5 + 0.5 
      : 0.1;
    const testosterone = Math.sin((normalizedDay + 0.1) * Math.PI * 2) * 0.3 + 0.2;
    
    return { estrogen, progesterone, testosterone };
  };

  // Get the current week of the cycle
  const getCurrentWeek = () => {
    if (!selectedCycleDay) return 1;
    const day = selectedCycleDay.dayOfCycle;
    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;
    return 4;
  };

  // Get hormone tips based on the current phase
  const getHormoneTips = () => {
    if (!selectedCycleDay) return null;
    
    const phase = selectedCycleDay.phase;
    
    switch (phase) {
      case CyclePhase.MENSTRUAL:
        return {
          title: "Today's Hormone Horoscope",
          description: "Your hormone levels are at their lowest. This is a good time for reflection and self-care. You may feel more introspective and need extra rest.",
          tips: "Focus on gentle activities and prioritize rest. Iron-rich foods can help replenish what's lost during menstruation.",
          funFact: "The average person loses only about 2-3 tablespoons of blood during their period, though it can often feel like much more!"
        };
      case CyclePhase.FOLLICULAR:
        return {
          title: "Today's Hormone Horoscope",
          description: "Estrogen is rising, boosting your energy and mood. You may feel more creative and outgoing as your body prepares for ovulation.",
          tips: "This is a great time to start new projects, exercise, and socialize. Your body is naturally more energetic now.",
          funFact: "Rising estrogen improves verbal fluency - you might notice you're more articulate during this phase!"
        };
      case CyclePhase.OVULATORY:
        return {
          title: "Today's Hormone Horoscope",
          description: "Estrogen peaks and testosterone rises slightly. You likely feel your most confident and energetic. Communication skills and social confidence are enhanced.",
          tips: "Take advantage of your peak energy for important meetings or social events. Your natural charisma is at its highest.",
          funFact: "Studies show people tend to dress more attractively and feel more confident during ovulation - it's your body's natural way of highlighting fertility."
        };
      case CyclePhase.LUTEAL:
        return {
          title: "Today's Hormone Horoscope",
          description: "Progesterone is rising, which can make you feel more mellow and introspective. You may notice changes in energy levels and food cravings as your body prepares for potential menstruation.",
          tips: "Practice self-care and be mindful of potential mood changes. Complex carbohydrates can help stabilize mood and energy.",
          funFact: "Progesterone is triggering water retention throughout your Week 3 and Week 4, which can make you feel uncomfortably heavy and bloated. To the rescue: Foods that act as natural mild diuretics, which include asparagus, cucumber, ginger, parsley, watercress and watermelon."
        };
      default:
        return null;
    }
  };

  const hormoneInfo = getHormoneTips();
  const { estrogen, progesterone, testosterone } = getHormoneLevels();
  const currentWeek = getCurrentWeek();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      {viewMode === 'calendar' ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-rose-500">
              My Cycle Calendar
            </h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setViewMode('detail')}
              >
                View Details
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <h3 className="text-lg text-rose-400">
              Today is Day {userCycle.currentCycleDay}
            </h3>
            <p className="text-gray-500">{format(new Date(), 'MMMM yyyy')}</p>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-sm font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
            
            {[...blanks, ...daysInMonth].map((day, i) => {
              if (!day) return <div key={`blank-${i}`} className="aspect-square"></div>;
              
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const cycleDay = userCycle.predictedCycleDays.find(cd => 
                isSameDay(new Date(cd.date), day)
              );
              
              return (
                <button
                  key={i}
                  className={`aspect-square rounded-md flex flex-col items-center justify-center p-1 transition-all
                    ${isSelected ? 'ring-2 ring-rose-500' : 'hover:bg-gray-50'}
                    ${isCurrentMonth ? getCycleDayColor(day) : 'opacity-40 bg-gray-100'}
                  `}
                  onClick={() => {
                    setSelectedDate(day);
                    setViewMode('detail');
                  }}
                >
                  <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
                    {format(day, 'd')}
                  </span>
                  
                  {cycleDay && (
                    <div className="mt-1 text-xs">
                      Day {cycleDay.dayOfCycle}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 text-center text-gray-400">
            Swipe left/right to change month
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setViewMode('calendar')}
            >
              Back to Calendar
            </Button>
          </div>
          
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-rose-500">
              Day {selectedCycleDay?.dayOfCycle || '?'}
            </h2>
            <p className="text-gray-500">
              {format(selectedDate, 'MMMM d, yyyy')}
            </p>
            {selectedCycleDay && (
              <div 
                className="inline-block px-3 py-1 mt-2 rounded-full text-sm font-medium" 
                style={{ 
                  backgroundColor: `${phaseInfoData[selectedCycleDay.phase].color}33`,
                  color: phaseInfoData[selectedCycleDay.phase].color.replace('33', '')
                }}
              >
                {phaseInfoData[selectedCycleDay.phase].displayName}
              </div>
            )}
          </div>
          
          {/* Hormone Graph */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-400 rounded-full mr-1"></div>
                <span className="text-xs">Estrogen</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span className="text-xs">Progesterone</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs">Testosterone</span>
              </div>
            </div>
            
            <div className="relative h-32 w-full">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d={`M0,${100 - estrogen * 60} C30,${100 - 90} 70,${100 - 70} 100,${100 - estrogen * 40}`} 
                  stroke="#EC4899" 
                  fill="none" 
                  strokeWidth="2"
                />
                
                <path 
                  d={`M0,${100 - progesterone * 20} C30,${100 - progesterone * 30} 70,${100 - progesterone * 80} 100,${100 - progesterone * 40}`} 
                  stroke="#8B5CF6" 
                  fill="none" 
                  strokeWidth="2"
                />
                
                <path 
                  d={`M0,${100 - testosterone * 30} C30,${100 - testosterone * 50} 70,${100 - testosterone * 60} 100,${100 - testosterone * 30}`} 
                  stroke="#10B981" 
                  fill="none" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            
            {/* Week indicator */}
            <div className="grid grid-cols-4 text-center text-xs text-white font-medium mt-1">
              <div className={`py-1 ${currentWeek === 1 ? 'bg-rose-500' : 'bg-gray-400'}`}>WEEK 1</div>
              <div className={`py-1 ${currentWeek === 2 ? 'bg-lavender-500' : 'bg-gray-400'}`}>WEEK 2</div>
              <div className={`py-1 ${currentWeek === 3 ? 'bg-rose-400' : 'bg-gray-400'}`}>WEEK 3</div>
              <div className={`py-1 ${currentWeek === 4 ? 'bg-gray-500' : 'bg-gray-400'}`}>WEEK 4</div>
            </div>
          </div>
          
          {/* Hormone Horoscope */}
          {hormoneInfo && (
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{hormoneInfo.title}</h3>
              <p className="mb-4 text-gray-700">{hormoneInfo.description}</p>
              
              <h4 className="font-bold text-lg mb-2">Make today better</h4>
              <p className="mb-4 text-gray-700">{hormoneInfo.tips}</p>
              
              <h4 className="font-bold text-lg mb-2">Fun fact</h4>
              <p className="text-gray-700">{hormoneInfo.funFact}</p>
            </div>
          )}
          
          <div className="mt-6 text-center text-rose-300">
            Swipe Left and Right to Change Cycle Day
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button className="bg-sky-300 text-white py-3 px-4 rounded-full text-center">
              Share via Email
            </button>
            <button className="bg-sky-300 text-white py-3 px-4 rounded-full text-center">
              Share via Text
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CycleVisualization;