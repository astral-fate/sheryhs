import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserCycle, CyclePhase, CycleSettings, CycleDay, JournalEntry } from '../types/cycle';
import { calculateCyclePhases } from '../utils/cycleUtils';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setupComplete: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setupCycle: (cycleSettings: CycleSettings) => void;
  addJournalEntry: (entry: JournalEntry) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Helper function to parse dates in user data
const parseDatesInUser = (userData: User): User => {
  return {
    ...userData,
    cycle: {
      ...userData.cycle,
      settings: {
        ...userData.cycle.settings,
        lastPeriodStartDate: new Date(userData.cycle.settings.lastPeriodStartDate)
      },
      currentCycleStartDate: new Date(userData.cycle.currentCycleStartDate),
      predictedCycleDays: userData.cycle.predictedCycleDays.map(day => ({
        ...day,
        date: new Date(day.date)
      }))
    },
    journalEntries: userData.journalEntries.map(entry => ({
      ...entry,
      date: new Date(entry.date)
    }))
  };
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  // Simulate loading user data
  useEffect(() => {
    const loadUser = async () => {
      // In a real app, this would check local storage or a token
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parseDatesInUser(parsedUser));
        setSetupComplete(true);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user has setup their cycle
      const hasSetupCycle = localStorage.getItem('setupComplete') === 'true';
      setSetupComplete(hasSetupCycle);
      
      // Create a mock user
      setUser({
        id: '1',
        name: 'Jane Doe',
        email,
        cycle: {
          id: '1',
          settings: {
            averageCycleLength: 28,
            lastPeriodStartDate: new Date(),
            periodLength: 5
          },
          currentCycleStartDate: new Date(),
          currentPhase: CyclePhase.MENSTRUAL,
          currentCycleDay: 1,
          predictedCycleDays: []
        },
        journalEntries: []
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new user without cycle data
      setUser({
        id: '1',
        name,
        email,
        cycle: {
          id: '1',
          settings: {
            averageCycleLength: 28,
            lastPeriodStartDate: new Date(),
            periodLength: 5
          },
          currentCycleStartDate: new Date(),
          currentPhase: CyclePhase.MENSTRUAL,
          currentCycleDay: 1,
          predictedCycleDays: []
        },
        journalEntries: []
      });
      
      setSetupComplete(false);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('setupComplete');
  };

  const setupCycle = (cycleSettings: CycleSettings) => {
    if (!user) return;

    // Calculate cycle phases based on settings
    const cycleDays = calculateCyclePhases(cycleSettings);
    
    // Find current phase and day
    const today = new Date();
    const currentDay = cycleDays.find(day => 
      day.date.getDate() === today.getDate() && 
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
    );
    
    const updatedCycle: UserCycle = {
      ...user.cycle,
      settings: cycleSettings,
      currentCycleStartDate: cycleSettings.lastPeriodStartDate,
      currentPhase: currentDay?.phase || CyclePhase.MENSTRUAL,
      currentCycleDay: currentDay?.dayOfCycle || 1,
      predictedCycleDays: cycleDays
    };
    
    setUser({
      ...user,
      cycle: updatedCycle
    });
    
    localStorage.setItem('setupComplete', 'true');
    setSetupComplete(true);
  };

  const addJournalEntry = (entry: JournalEntry) => {
    if (!user) return;
    
    // Check if entry for this date already exists
    const existingEntryIndex = user.journalEntries.findIndex(e => 
      e.date.getDate() === entry.date.getDate() &&
      e.date.getMonth() === entry.date.getMonth() &&
      e.date.getFullYear() === entry.date.getFullYear()
    );
    
    let updatedEntries = [...user.journalEntries];
    
    if (existingEntryIndex !== -1) {
      // Update existing entry
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        ...entry
      };
    } else {
      // Add new entry
      updatedEntries.push(entry);
    }
    
    setUser({
      ...user,
      journalEntries: updatedEntries
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        setupComplete,
        login,
        signup,
        logout,
        setupCycle,
        addJournalEntry
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;