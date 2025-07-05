import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import JournalEntryForm from '../components/journal/JournalEntry';
import JournalCalendar from '../components/journal/JournalCalendar';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { JournalEntry } from '../types/cycle';

const JournalPage: React.FC = () => {
  const { user, addJournalEntry } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-center text-gray-600">Please log in to access your journal.</p>
        </div>
      </div>
    );
  }
  
  const existingEntry = user.journalEntries.find(entry => 
    entry.date.getDate() === selectedDate.getDate() &&
    entry.date.getMonth() === selectedDate.getMonth() &&
    entry.date.getFullYear() === selectedDate.getFullYear()
  );

  const handleSaveEntry = (entryData: { 
    mood?: { mood: 'happy' | 'content' | 'neutral' | 'sad' | 'irritated' | 'anxious'; intensity: 1 | 2 | 3 | 4 | 5 }; 
    symptoms: { type: string; intensity: 1 | 2 | 3 | 4 | 5; notes?: string }[]; 
    notes: string 
  }) => {
    const newEntry: JournalEntry = {
      id: existingEntry?.id || Date.now().toString(),
      date: selectedDate,
      ...entryData
    };
    
    addJournalEntry(newEntry);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Journal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <JournalCalendar 
              entries={user.journalEntries} 
              selectedDate={selectedDate} 
              onSelectDate={setSelectedDate} 
            />
          </div>
          
          <div className="md:col-span-2">
            {isEditing ? (
              <JournalEntryForm
                onSave={handleSaveEntry}
                existingEntry={existingEntry}
              />
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h2>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant={existingEntry ? "outline" : "primary"}
                    size="sm"
                  >
                    {existingEntry ? "Edit Entry" : "Add Entry"}
                  </Button>
                </div>
                
                {existingEntry ? (
                  <div className="space-y-4">
                    {existingEntry.mood && (
                      <Card className="p-4">
                        <h3 className="text-lg font-medium mb-2">Mood</h3>
                        <div className="flex items-center">
                          <span className="text-xl mr-2">
                            {existingEntry.mood.mood === 'happy' && '😊'}
                            {existingEntry.mood.mood === 'content' && '😌'}
                            {existingEntry.mood.mood === 'neutral' && '😐'}
                            {existingEntry.mood.mood === 'sad' && '😔'}
                            {existingEntry.mood.mood === 'irritated' && '😠'}
                            {existingEntry.mood.mood === 'anxious' && '😰'}
                          </span>
                          <span className="capitalize font-medium">
                            {existingEntry.mood.mood}
                          </span>
                          <div className="ml-3 flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full mx-0.5 ${
                                  i < existingEntry.mood!.intensity ? 'bg-rose-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </Card>
                    )}
                    
                    {existingEntry.symptoms.length > 0 && (
                      <Card className="p-4">
                        <h3 className="text-lg font-medium mb-3">Symptoms</h3>
                        <div className="space-y-2">
                          {existingEntry.symptoms.map((symptom, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                              <span className="font-medium text-gray-700">{symptom.type}</span>
                              <div className="flex">
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
                          ))}
                        </div>
                      </Card>
                    )}
                    
                    {existingEntry.notes && (
                      <Card className="p-4">
                        <h3 className="text-lg font-medium mb-2">Notes</h3>
                        <p className="text-gray-700 whitespace-pre-line">{existingEntry.notes}</p>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500 mb-4">No journal entry for this date.</p>
                    <Button onClick={() => setIsEditing(true)}>Create Entry</Button>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;