import { addDays, differenceInDays } from 'date-fns';
import { CyclePhase, CycleSettings, CycleDay } from '../types/cycle';

export const calculateCyclePhases = (settings: CycleSettings): CycleDay[] => {
  const { averageCycleLength, lastPeriodStartDate, periodLength } = settings;
  
  // Calculate the length of each phase based on average cycle length
  const follicularLength = Math.floor((averageCycleLength - periodLength) * 0.4);
  const ovulatoryLength = 3; // Usually around 3 days
  const lutealLength = averageCycleLength - periodLength - follicularLength - ovulatoryLength;
  
  // Generate days for two cycles (to ensure we have future days)
  const days: CycleDay[] = [];
  
  // Add days for current and next cycle
  for (let cycle = 0; cycle < 2; cycle++) {
    const cycleStartDate = new Date(lastPeriodStartDate);
    cycleStartDate.setDate(cycleStartDate.getDate() + (cycle * averageCycleLength));
    
    // Menstrual phase
    for (let i = 0; i < periodLength; i++) {
      days.push({
        dayOfCycle: i + 1,
        date: addDays(cycleStartDate, i),
        phase: CyclePhase.MENSTRUAL
      });
    }
    
    // Follicular phase
    for (let i = 0; i < follicularLength; i++) {
      days.push({
        dayOfCycle: periodLength + i + 1,
        date: addDays(cycleStartDate, periodLength + i),
        phase: CyclePhase.FOLLICULAR
      });
    }
    
    // Ovulatory phase
    for (let i = 0; i < ovulatoryLength; i++) {
      days.push({
        dayOfCycle: periodLength + follicularLength + i + 1,
        date: addDays(cycleStartDate, periodLength + follicularLength + i),
        phase: CyclePhase.OVULATORY
      });
    }
    
    // Luteal phase
    for (let i = 0; i < lutealLength; i++) {
      days.push({
        dayOfCycle: periodLength + follicularLength + ovulatoryLength + i + 1,
        date: addDays(cycleStartDate, periodLength + follicularLength + ovulatoryLength + i),
        phase: CyclePhase.LUTEAL
      });
    }
  }
  
  return days;
};

export const getCurrentCycleDay = (
  cycleDays: CycleDay[],
  currentDate: Date = new Date()
): CycleDay | undefined => {
  // Find the day that matches the current date
  return cycleDays.find(day => 
    day.date.getDate() === currentDate.getDate() &&
    day.date.getMonth() === currentDate.getMonth() &&
    day.date.getFullYear() === currentDate.getFullYear()
  );
};

export const getDaysSinceLastPeriod = (lastPeriodDate: Date): number => {
  return differenceInDays(new Date(), lastPeriodDate);
};

export const getDaysUntilNextPeriod = (
  lastPeriodDate: Date,
  cycleLength: number
): number => {
  const daysPassed = getDaysSinceLastPeriod(lastPeriodDate);
  return cycleLength - (daysPassed % cycleLength);
};