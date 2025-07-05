import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { JournalEntry } from '../../types/cycle';

interface JournalCalendarProps {
  entries: JournalEntry[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const JournalCalendar: React.FC<JournalCalendarProps> = ({ entries, selectedDate, onSelectDate }) => {
  const currentMonth = startOfMonth(selectedDate);
  const lastDay = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: currentMonth, end: lastDay });
  
  const getEntryForDate = (date: Date) => {
    return entries.find(entry => isSameDay(new Date(entry.date), date));
  };
  
  const getMoodColor = (entry?: JournalEntry) => {
    if (!entry || !entry.mood) return 'bg-gray-100';
    
    switch (entry.mood.mood) {
      case 'happy': return 'bg-green-100 border-green-300';
      case 'content': return 'bg-blue-100 border-blue-300';
      case 'neutral': return 'bg-gray-100 border-gray-300';
      case 'sad': return 'bg-indigo-100 border-indigo-300';
      case 'irritated': return 'bg-orange-100 border-orange-300';
      case 'anxious': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100';
    }
  };
  
  const getMoodEmoji = (entry?: JournalEntry) => {
    if (!entry || !entry.mood) return '';
    
    switch (entry.mood.mood) {
      case 'happy': return '😊';
      case 'content': return '😌';
      case 'neutral': return '😐';
      case 'sad': return '😔';
      case 'irritated': return '😠';
      case 'anxious': return '😰';
      default: return '';
    }
  };
  
  const hasSymptoms = (entry?: JournalEntry) => {
    return entry && entry.symptoms && entry.symptoms.length > 0;
  };
  
  const hasNotes = (entry?: JournalEntry) => {
    return entry && entry.notes && entry.notes.trim().length > 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          >
            &larr;
          </button>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          >
            &rarr;
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-sm font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {daysInMonth.map((day, i) => {
          const entry = getEntryForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          
          return (
            <button
              key={i}
              className={`aspect-square rounded-md flex flex-col items-center justify-center p-1 transition-all ${
                isSelected 
                  ? 'ring-2 ring-rose-500' 
                  : 'hover:bg-gray-50'
              } ${getMoodColor(entry)}`}
              onClick={() => onSelectDate(day)}
            >
              <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
                {format(day, 'd')}
              </span>
              
              {entry && (
                <div className="mt-1 flex flex-col items-center">
                  {entry.mood && (
                    <span className="text-xs">{getMoodEmoji(entry)}</span>
                  )}
                  
                  <div className="flex space-x-0.5 mt-0.5">
                    {hasSymptoms(entry) && (
                      <div className="w-1 h-1 bg-rose-500 rounded-full" />
                    )}
                    {hasNotes(entry) && (
                      <div className="w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JournalCalendar;