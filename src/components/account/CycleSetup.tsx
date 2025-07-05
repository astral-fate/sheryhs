import React, { useState } from 'react';
import Button from '../common/Button';
import { format, subDays } from 'date-fns';

interface CycleSetupProps {
  onComplete: (data: {
    cycleLength: number;
    periodLength: number;
    lastPeriodDate: Date;
  }) => void;
}

const CycleSetup: React.FC<CycleSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(subDays(new Date(), 7));

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Ensure the date is valid before completing
    if (lastPeriodDate && !isNaN(lastPeriodDate.getTime())) {
      onComplete({
        cycleLength,
        periodLength,
        lastPeriodDate,
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setLastPeriodDate(date);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 relative">
        <div className="flex justify-between items-center w-full mb-2">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                stepNumber <= step
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-rose-500 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Cycle Length</h2>
          <p className="text-gray-600">
            How many days are there typically between the first day of your period and the
            first day of your next period?
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button
              className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center focus:outline-none"
              onClick={() => setCycleLength(Math.max(21, cycleLength - 1))}
            >
              -
            </button>
            <div className="text-3xl font-bold text-gray-800 min-w-16 text-center">
              {cycleLength}
            </div>
            <button
              className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center focus:outline-none"
              onClick={() => setCycleLength(Math.min(35, cycleLength + 1))}
            >
              +
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">days</p>

          <div className="pt-4">
            <Button fullWidth onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Period Length</h2>
          <p className="text-gray-600">
            How many days does your period typically last?
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button
              className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center focus:outline-none"
              onClick={() => setPeriodLength(Math.max(2, periodLength - 1))}
            >
              -
            </button>
            <div className="text-3xl font-bold text-gray-800 min-w-16 text-center">
              {periodLength}
            </div>
            <button
              className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center focus:outline-none"
              onClick={() => setPeriodLength(Math.min(10, periodLength + 1))}
            >
              +
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">days</p>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" fullWidth onClick={handleBack}>
              Back
            </Button>
            <Button fullWidth onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Last Period</h2>
          <p className="text-gray-600">
            When did your last period start?
          </p>

          <div className="my-6">
            <input
              type="date"
              value={format(lastPeriodDate, 'yyyy-MM-dd')}
              onChange={handleDateChange}
              max={format(new Date(), 'yyyy-MM-dd')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" fullWidth onClick={handleBack}>
              Back
            </Button>
            <Button fullWidth onClick={handleComplete}>
              Complete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleSetup;