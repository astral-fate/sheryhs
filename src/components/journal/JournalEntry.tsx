import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { MoodEntry, SymptomEntry } from '../../types/cycle';

interface JournalEntryFormProps {
  onSave: (entry: { mood?: MoodEntry; symptoms: SymptomEntry[]; notes: string }) => void;
  existingEntry?: {
    mood?: MoodEntry;
    symptoms: SymptomEntry[];
    notes: string;
  };
}

const commonSymptoms = [
  'Cramps', 'Headache', 'Bloating', 'Fatigue', 
  'Breast Tenderness', 'Acne', 'Mood Swings', 'Cravings',
  'Insomnia', 'Back Pain', 'Nausea'
];

const moodOptions = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'content', label: 'Content', emoji: '😌' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'sad', label: 'Sad', emoji: '😔' },
  { value: 'irritated', label: 'Irritated', emoji: '😠' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' }
];

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ onSave, existingEntry }) => {
  const [mood, setMood] = useState<MoodEntry | undefined>(existingEntry?.mood);
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>(existingEntry?.symptoms || []);
  const [notes, setNotes] = useState(existingEntry?.notes || '');
  const [customSymptom, setCustomSymptom] = useState('');
  const [symptomIntensity, setSymptomIntensity] = useState<1 | 2 | 3 | 4 | 5>(3);

  const handleMoodSelect = (moodValue: 'happy' | 'content' | 'neutral' | 'sad' | 'irritated' | 'anxious', intensity: 1 | 2 | 3 | 4 | 5) => {
    setMood({ mood: moodValue, intensity });
  };

  const handleAddSymptom = (symptomType: string) => {
    if (!symptomType.trim()) return;
    
    // Check if symptom already exists
    if (!symptoms.some(s => s.type === symptomType)) {
      setSymptoms([...symptoms, { type: symptomType, intensity: symptomIntensity }]);
    }
    
    setCustomSymptom('');
  };

  const handleRemoveSymptom = (symptomType: string) => {
    setSymptoms(symptoms.filter(s => s.type !== symptomType));
  };

  const handleSave = () => {
    onSave({
      mood,
      symptoms,
      notes
    });
  };

  return (
    <div className="space-y-6">
      {/* Mood Section */}
      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                mood?.mood === option.value
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleMoodSelect(option.value as any, mood?.intensity || 3)}
            >
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
        
        {mood && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Intensity</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                    mood.intensity === value
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setMood({ ...mood, intensity: value as 1 | 2 | 3 | 4 | 5 })}
                >
                  {value}
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {mood.intensity === 1 ? 'Mild' : 
                 mood.intensity === 2 ? 'Light' : 
                 mood.intensity === 3 ? 'Moderate' : 
                 mood.intensity === 4 ? 'Strong' : 'Intense'}
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Symptoms Section */}
      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">Symptoms</h3>
        
        <div className="mb-4">
          <div className="flex mb-3">
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="Add a symptom..."
              className="flex-grow rounded-l-md border-gray-300 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
            />
            <div className="flex items-center border-t border-r border-b border-gray-300 rounded-r-md divide-x divide-gray-300">
              <select
                value={symptomIntensity}
                onChange={(e) => setSymptomIntensity(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                className="h-full border-none focus:ring-0 text-sm"
              >
                <option value={1}>Mild</option>
                <option value={2}>Light</option>
                <option value={3}>Moderate</option>
                <option value={4}>Strong</option>
                <option value={5}>Intense</option>
              </select>
              <button
                onClick={() => handleAddSymptom(customSymptom)}
                className="px-3 py-2 bg-rose-500 text-white text-sm rounded-r-md hover:bg-rose-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleAddSymptom(symptom)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  symptoms.some(s => s.type === symptom)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={symptoms.some(s => s.type === symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
          
          {symptoms.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Your symptoms:</h4>
              {symptoms.map((symptom) => (
                <div key={symptom.type} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700">{symptom.type}</span>
                    <div className="ml-3 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full mx-0.5 ${
                            i < symptom.intensity ? 'bg-rose-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSymptom(symptom.type)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Notes Section */}
      <Card className="p-5">
        <h3 className="text-lg font-medium mb-3">Journal Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="How was your day? What's on your mind?"
          className="w-full rounded-md border-gray-300 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
        />
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Entry</Button>
      </div>
    </div>
  );
};

export default JournalEntryForm;