import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, SkipForward, Info, ListChecks, CheckCircle, XCircle, RotateCcw, Sparkles, Brain, Lightbulb, Repeat, Timer, Target, Zap, Award, TrendingUp } from 'lucide-react';

// --- SVG Exercise Icons ---
const ExerciseImageDisplay = ({ exerciseKey, altText }) => {
  const SvgIcon = ({ children, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );

  const exerciseSvgs = {
    jumpingJacks: (props) => (
      <SvgIcon {...props}>
        <circle cx="50" cy="20" r="10" />
        <line x1="50" y1="30" x2="50" y2="55" />
        <line x1="30" y1="40" x2="50" y2="45" />
        <line x1="70" y1="40" x2="50" y2="45" />
        <line x1="35" y1="80" x2="50" y2="55" />
        <line x1="65" y1="80" x2="50" y2="55" />
      </SvgIcon>
    ),
    bodyweightSquats: (props) => (
      <SvgIcon {...props}>
        <circle cx="50" cy="20" r="10" />
        <line x1="50" y1="30" x2="50" y2="50" />
        <line x1="50" y1="50" x2="35" y2="65" />
        <line x1="35" y1="65" x2="35" y2="80" />
        <line x1="50" y1="50" x2="65" y2="65" />
        <line x1="65" y1="65" x2="65" y2="80" />
        <line x1="40" y1="45" x2="30" y2="50" />
        <line x1="60" y1="45" x2="70" y2="50" />
      </SvgIcon>
    ),
    pushUps: (props) => (
      <SvgIcon {...props}>
        <circle cx="25" cy="40" r="8" />
        <line x1="30" y1="45" x2="70" y2="45" />
        <line x1="35" y1="45" x2="35" y2="60" />
        <line x1="60" y1="45" x2="60" y2="60" />
        <line x1="70" y1="45" x2="80" y2="60" />
      </SvgIcon>
    ),
    lunges: (props) => (
      <SvgIcon {...props}>
        <circle cx="50" cy="20" r="10" /> {/* Head */}
        <line x1="50" y1="30" x2="50" y2="55" /> {/* Torso */}
        <line x1="50" y1="40" x2="35" y2="50" /> {/* Left Upper Arm */}
        <line x1="35" y1="50" x2="30" y2="60" /> {/* Left Forearm */}
        <line x1="50" y1="40" x2="65" y2="50" /> {/* Right Upper Arm */}
        <line x1="65" y1="50" x2="70" y2="60" /> {/* Right Forearm */}
        <line x1="50" y1="55" x2="35" y2="70" /> {/* Front Thigh */}
        <line x1="35" y1="70" x2="35" y2="85" /> {/* Front Calf */}
        <line x1="50" y1="55" x2="65" y2="65" /> {/* Back Thigh */}
        <line x1="65" y1="65" x2="65" y2="80" /> {/* Back Calf */}
      </SvgIcon>
    ),
    plank: (props) => (
      <SvgIcon {...props}>
        <circle cx="20" cy="50" r="8" />
        <line x1="25" y1="50" x2="75" y2="50" />
        <line x1="30" y1="50" x2="30" y2="65" />
        <line x1="50" y1="50" x2="50" y2="65" />
        <line x1="75" y1="50" x2="80" y2="60" />
      </SvgIcon>
    ),
    childsPose: (props) => (
      <SvgIcon {...props}>
        <circle cx="70" cy="60" r="8" />
        <path d="M 65 60 Q 50 70 40 60" />
        <path d="M 40 60 Q 30 70 25 55" />
        <line x1="60" y1="55" x2="40" y2="45" />
        <line x1="62" y1="50" x2="45" y2="40" />
      </SvgIcon>
    ),
    highKnees: (props) => (
      <SvgIcon {...props}>
        <circle cx="50" cy="20" r="10" />
        <line x1="50" y1="30" x2="50" y2="55" />
        <line x1="50" y1="40" x2="35" y2="50" />
        <line x1="35" y1="50" x2="40" y2="60" />
        <line x1="50" y1="40" x2="65" y2="50" />
        <line x1="65" y1="50" x2="60" y2="60" />
        <line x1="50" y1="55" x2="40" y2="50" />
        <line x1="40" y1="50" x2="40" y2="65" />
        <line x1="50" y1="55" x2="60" y2="75" />
      </SvgIcon>
    ),
    legSwings: (props) => (
      <SvgIcon {...props}>
        <circle cx="50" cy="20" r="10" /> {/* Head */}
        <line x1="50" y1="30" x2="50" y2="55" /> {/* Torso */}
        <line x1="50" y1="35" x2="25" y2="35" /> {/* Arm reaching for support */}
        <line x1="25" y1="20" x2="25" y2="75" /> {/* Support wall/pole */}
        <line x1="50" y1="55" x2="50" y2="75" /> {/* Standing thigh */}
        <line x1="50" y1="75" x2="50" y2="90" /> {/* Standing calf */}
        <line x1="50" y1="55" x2="75" y2="40" /> {/* Swinging thigh */}
        <line x1="75" y1="40" x2="85" y2="30" /> {/* Swinging calf forward */}
      </SvgIcon>
    ),
    gluteBridges: (props) => (
      <SvgIcon {...props}>
        <circle cx="25" cy="50" r="8" />
        <line x1="30" y1="50" x2="60" y2="30" />
        <line x1="60" y1="30" x2="75" y2="50" />
        <line x1="75" y1="50" x2="75" y2="65" />
        <line x1="70" y1="50" x2="70" y2="65" />
        <line x1="35" y1="55" x2="45" y2="65" />
      </SvgIcon>
    ),
    reverseLunges: (props) => ( 
      <SvgIcon {...props}>
        <circle cx="50" cy="20" r="10" />
        <line x1="50" y1="30" x2="50" y2="55" />
        <line x1="50" y1="55" x2="65" y2="70" />
        <line x1="65" y1="70" x2="65" y2="85" />
        <line x1="50" y1="55" x2="35" y2="65" />
        <line x1="35" y1="65" x2="35" y2="80" />
      </SvgIcon>
    ),
    birdDog: (props) => (
      <SvgIcon {...props}>
        <circle cx="30" cy="40" r="8" />
        <line x1="35" y1="40" x2="65" y2="40" />
        <line x1="75" y1="40" x2="65" y2="40" />
        <line x1="20" y1="40" x2="35" y2="40" />
        <line x1="45" y1="40" x2="45" y2="55" />
        <line x1="55" y1="40" x2="55" y2="55" />
      </SvgIcon>
    ),
    hamstringStretch: (props) => (
      <SvgIcon {...props}>
        <circle cx="30" cy="70" r="8" />
        <line x1="35" y1="70" x2="60" y2="70" />
        <line x1="60" y1="70" x2="70" y2="80" />
        <line x1="55" y1="70" x2="55" y2="30" />
        <line x1="50" y1="40" x2="55" y2="35" />
      </SvgIcon>
    ),
    default: (props) => ( 
      <SvgIcon {...props}>
        <circle cx="50" cy="30" r="15"/>
        <line x1="50" y1="45" x2="50" y2="70"/>
        <line x1="35" y1="55" x2="50" y2="60"/>
        <line x1="65" y1="55" x2="50" y2="60"/>
        <line x1="40" y1="85" x2="50" y2="70"/>
        <line x1="60" y1="85" x2="50" y2="70"/>
      </SvgIcon>
    )
  };

  const IconToRender = exerciseSvgs[exerciseKey] || exerciseSvgs.default;

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl p-4 border border-gray-200">
      <IconToRender className="w-full h-full max-w-[200px] max-h-[200px] text-gray-600" aria-label={altText} />
    </div>
  );
};

// --- Initial Data ---
const initialWorkouts = [
    {
        id: 'fullbodyA',
        name: 'Fullbody A',
        category: 'Full Body',
        duration: 'Approx. 22 mins',
        description: 'A balanced full body routine suitable for beginners to intermediates.',
        equipment: ['Bodyweight', 'Optional: Bench'],
        difficulty: 'Beginner',
        structure: [
            { type: 'Warmup', repeat: 1, exercises: [
                    { id: 'ex1', name: 'Jumping Jacks', duration: 30, targetedMuscles: ['Full Body', 'Cardio'], instructions: '...', image: 'jumpingJacks' },
                    { id: 'ex2', name: 'Bodyweight Squats (Warmup)', duration: 45, targetedMuscles: ['Quads', 'Glutes'], instructions: '...', image: 'bodyweightSquats' },
                ]
            },
            { type: 'Workout', repeat: 2, exercises: [
                    { id: 'ex3', name: 'Push-ups', duration: 45, targetedMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core'], instructions: '...', image: 'pushUps' },
                    { id: 'ex4', name: 'Bodyweight Lunges (alternating)', duration: 60, targetedMuscles: ['Quads', 'Glutes', 'Hamstrings'], instructions: '...', image: 'lunges' },
                    { id: 'ex5', name: 'Plank', duration: 45, targetedMuscles: ['Core', 'Abs', 'Back'], instructions: '...', image: 'plank' },
                ]
            },
            { type: 'Cooldown', repeat: 1, exercises: [
                    { id: 'ex6', name: 'Child\'s Pose', duration: 60, targetedMuscles: ['Back', 'Hips', 'Shoulders'], instructions: '...', image: 'childsPose' },
                ]
            }
        ]
    },
    {
        id: 'lowerCore1',
        name: 'Lowerbody + Core (Phase 1)',
        category: 'Lowerbody and Core',
        duration: 'Approx. 35 mins',
        description: 'Focus on strengthening your legs and core muscles.',
        equipment: ['Bodyweight'],
        difficulty: 'Intermediate',
        structure: [
            { type: 'Warmup', repeat: 1, exercises: [
                    { id: 'ex7', name: 'High Knees', duration: 30, targetedMuscles: ['Cardio', 'Legs', 'Core'], instructions: '...', image: 'highKnees' },
                    { id: 'ex8', name: 'Leg Swings (Forward & Sideways)', duration: 60, targetedMuscles: ['Hips', 'Hamstrings', 'Quads', 'Groin'], instructions: '...', image: 'legSwings' },
                ]
            },
            { type: 'Workout', repeat: 3, exercises: [
                    { id: 'ex9', name: 'Glute Bridges', duration: 45, targetedMuscles: ['Glutes', 'Hamstrings', 'Lower Back'], instructions: '...', image: 'gluteBridges' },
                    { id: 'ex10', name: 'Reverse Lunges', duration: 60, targetedMuscles: ['Quads', 'Glutes', 'Hamstrings'], instructions: '...', image: 'reverseLunges' },
                    { id: 'ex11', name: 'Bird Dog', duration: 60, targetedMuscles: ['Core', 'Abs', 'Back', 'Glutes', 'Shoulders'], instructions: '...', image: 'birdDog' },
                ]
            },
             { type: 'Cooldown', repeat: 1, exercises: [
                    { id: 'ex12', name: 'Lying Hamstring Stretch', duration: 60, targetedMuscles: ['Hamstrings', 'Calves'], instructions: '...', image: 'hamstringStretch' },
                ]
            }
        ]
    },
];

initialWorkouts.forEach(wo => wo.structure.forEach(bl => bl.exercises.forEach(ex => {
    if (!ex.instructions || ex.instructions === '...') {
        ex.instructions = `Perform ${ex.name} for ${ex.duration} seconds. Focus on proper form. ${ex.targetedMuscles.length > 0 ? 'This exercise targets your ' + ex.targetedMuscles.join(', ') + '.' : ''}`;
    }
})));

// --- Helper Functions ---
const flattenWorkoutPlan = (structure) => {
    const plan = [];
    let exerciseOrder = 0;
    structure.forEach(block => {
        for (let i = 0; i < block.repeat; i++) {
            block.exercises.forEach((exercise, exerciseIndexInBlock) => {
                exerciseOrder++;
                plan.push({
                    ...exercise,
                    blockType: block.type,
                    setInfo: `${block.type} - Set ${i + 1}/${block.repeat}`,
                    exerciseProgressInBlock: `Exercise ${exerciseIndexInBlock + 1}/${block.exercises.length}`,
                    overallProgress: `Exercise ${exerciseOrder}`
                });
            });
        }
    });
    return plan.map(ex => ({ ...ex, overallProgress: `${ex.overallProgress}/${plan.length}`}));
};

const callGeminiAPI = async (prompt) => {
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    try {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) { const errorBody = await response.text(); console.error("Gemini API Error:", response.status, errorBody); throw new Error(`API request failed: ${errorBody}`); }
        const result = await response.json();
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) { return result.candidates[0].content.parts[0].text; }
        console.error("Gemini API Error: Unexpected response structure", result); throw new Error("Failed to extract text from Gemini response.");
    } catch (error) { console.error("Error calling Gemini API:", error); return "Sorry, I couldn't fetch information. Please try again."; }
};

// --- Enhanced Components ---
const MuscleDiagram = ({ targetedMuscles = [] }) => {
  const muscleAreas = {
    'Chest': { view: 'front', x: 50, y: 55, width: 50, height: 35, fill: 'rgba(239, 68, 68, 0.7)' },
    'Shoulders': { view: 'both', parts: [{view:'front', x: 30, y: 50, width: 25, height: 20}, {view:'front', x: 95, y: 50, width: 25, height: 20}, {view:'back', x: 30, y: 50, width: 25, height: 20}, {view:'back', x: 95, y: 50, width: 25, height: 20}], fill: 'rgba(245, 101, 101, 0.7)' },
    'Biceps': { view: 'front', parts: [{x: 30, y: 75, width: 20, height: 30}, {x: 100, y: 75, width: 20, height: 30}], fill: 'rgba(251, 146, 60, 0.7)' },
    'Abs': { view: 'front', x: 55, y: 90, width: 40, height: 40, fill: 'rgba(34, 197, 94, 0.7)' },
    'Core': { view: 'both', parts: [{view:'front', x: 50, y: 85, width: 50, height: 50}, {view:'back', x:50, y:85, width:50, height:50}], fill: 'rgba(59, 130, 246, 0.5)' },
    'Quads': { view: 'front', parts: [{x: 45, y: 135, width: 25, height: 50}, {x: 80, y: 135, width: 25, height: 50}], fill: 'rgba(168, 85, 247, 0.7)' },
    'Hips': { view: 'both', parts: [{view:'front', x: 40, y: 125, width: 70, height: 20}, {view:'back', x:40, y:125, width:70, height:20}], fill: 'rgba(236, 72, 153, 0.7)' },
    'Groin': { view: 'front', x: 60, y: 135, width: 30, height: 20, fill: 'rgba(14, 165, 233, 0.7)' },
    'Back': { view: 'back', x: 50, y: 55, width: 50, height: 70, fill: 'rgba(59, 130, 246, 0.7)' },
    'Lower Back': { view: 'back', x: 55, y: 115, width: 40, height: 20, fill: 'rgba(79, 70, 229, 0.7)' },
    'Triceps': { view: 'back', parts: [{x: 30, y: 75, width: 20, height: 30}, {x: 100, y: 75, width: 20, height: 30}], fill: 'rgba(139, 92, 246, 0.7)' },
    'Glutes': { view: 'back', x: 45, y: 125, width: 60, height: 40, fill: 'rgba(219, 39, 119, 0.7)' },
    'Hamstrings': { view: 'back', parts: [{x: 45, y: 165, width: 25, height: 40}, {x: 80, y: 165, width: 25, height: 40}], fill: 'rgba(190, 24, 93, 0.7)' },
    'Calves': { view: 'back', parts: [{x: 48, y: 205, width: 20, height: 25}, {x: 82, y: 205, width: 20, height: 25}], fill: 'rgba(157, 23, 77, 0.7)' },
    'Full Body': { view: 'both', fill: 'rgba(156, 163, 175, 0.5)' },
    'Cardio': { view: 'both', fill: 'rgba(251, 191, 36, 0.5)' },
    'Legs': { view: 'both', fill: 'rgba(34, 197, 94, 0.6)'}
  };

  const BodyShape = ({ currentView, highlightedMuscles }) => (
    <div className="relative">
      <svg width="150" height="250" viewBox="0 0 150 250" className="border border-gray-300 rounded-xl bg-white shadow-md">
        <ellipse cx="75" cy="30" rx="20" ry="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/> 
        <rect x="50" y="50" width="50" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="8"/> 
        <rect x="30" y="55" width="20" height="70" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="6"/> 
        <rect x="100" y="55" width="20" height="70" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="6"/> 
        <rect x="45" y="130" width="25" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="6"/> 
        <rect x="80" y="130" width="25" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="6"/> 

        {Object.entries(muscleAreas).map(([name, area]) => {
          if (highlightedMuscles.includes(name) && (area.view === currentView || area.view === 'both')) {
            if (name === 'Full Body' || name === 'Cardio' || name === 'Legs') {
              return <rect key={`${name}-${currentView}`} x="10" y="10" width="130" height="230" fill={area.fill} rx="12"/>;
            }
            if (area.parts) {
              return area.parts.filter(p => p.view === currentView || p.view === 'both' || area.view === 'both').map((part, index) => (
                <rect key={`${name}-${currentView}-${index}`} x={part.x} y={part.y} width={part.width} height={part.height} fill={area.fill} rx="4"/>
              ));
            }
            return <rect key={`${name}-${currentView}`} x={area.x} y={area.y} width={area.width} height={area.height} fill={area.fill} rx="4"/>;
          }
          return null;
        })}
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row justify-around items-center space-y-6 sm:space-y-0 sm:space-x-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="text-center">
        <p className="text-sm font-bold mb-3 text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">Front View</p>
        <BodyShape currentView="front" highlightedMuscles={targetedMuscles} />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold mb-3 text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">Back View</p>
        <BodyShape currentView="back" highlightedMuscles={targetedMuscles} />
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
            <XCircle size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Enhanced Screens ---
const WorkoutListScreen = ({ workouts, onSelectWorkout }) => (
  <div className="min-h-screen bg-gray-50 p-4 md:p-6">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Workouts</h1>
        <p className="text-gray-600">Choose a workout to get started</p>
      </div>
      
      <div className="grid gap-4 md:gap-6">
        {workouts.map((workout, index) => (
          <div
            key={workout.id}
            className="group bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-gray-200"
            onClick={() => onSelectWorkout(workout)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    {workout.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    workout.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {workout.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Timer size={16} className="text-red-500" />
                    <span className="font-medium">{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target size={16} className="text-gray-500" />
                    <span className="font-medium">{workout.category}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{workout.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {workout.equipment.map((eq, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200">
                <ChevronRight size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WorkoutDetailScreen = ({ workout, onStartWorkout, onGoBack }) => {
  const totalExercises = workout.structure.reduce((acc, block) => acc + (block.exercises.length * block.repeat), 0);
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onGoBack} 
          className="mb-6 text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} /> Back to Workouts
        </button>
        
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {workout.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <Timer size={20} className="text-red-600" />
                <span className="font-semibold text-red-800">{workout.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <Target size={20} className="text-gray-600" />
                <span className="font-semibold text-gray-800">{workout.category}</span>
              </div>
              <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                workout.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {workout.difficulty}
              </span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">{workout.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="text-blue-600" size={24} />
                Equipment Needed
              </h3>
              <div className="flex flex-wrap gap-2">
                {workout.equipment.map((eq, i) => (
                  <span key={i} className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium shadow-sm">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="text-green-600" size={24} />
                Workout Stats
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-semibold">{totalExercises}</span> total exercises</p>
                <p className="text-gray-700"><span className="font-semibold">{workout.structure.length}</span> workout blocks</p>
                <p className="text-gray-700">Difficulty: <span className="font-semibold text-green-600">{workout.difficulty}</span></p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">Workout Preview</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {workout.structure.map((block, blockIndex) => (
              <div key={blockIndex} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
                  <span>{block.type}</span>
                  <span className="text-sm font-semibold px-3 py-1 bg-red-100 text-red-800 rounded-full">
                    {block.repeat}x sets
                  </span>
                </h3>
                <div className="grid gap-3">
                  {block.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                      <span className="font-semibold text-gray-800">{exercise.name}</span>
                      <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                        {exercise.duration}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => onStartWorkout(workout)}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200 text-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
          >
            <Play size={24} />
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkoutInProgressScreen = ({ workout, onFinishWorkout, onQuitWorkout }) => {
  const [activePlan, setActivePlan] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  
  const [aiFitnessTip, setAiFitnessTip] = useState("");
  const [isFetchingTip, setIsFetchingTip] = useState(false);
  const [alternativeExercise, setAlternativeExercise] = useState("");
  const [isFetchingAlternative, setIsFetchingAlternative] = useState(false);

  const REST_PERIOD_SECONDS = 15;

  useEffect(() => {
    const plan = flattenWorkoutPlan(workout.structure);
    setActivePlan(plan);
    if (plan.length > 0) {
      setTimer(plan[0].duration);
      setIsPaused(true);
    }
  }, [workout]);

  const currentExercise = activePlan[currentIndex];

  const resetToExercise = useCallback((index) => {
    if (index >= 0 && index < activePlan.length) {
        setCurrentIndex(index);
        setTimer(activePlan[index].duration);
        setIsPaused(true);
        setIsResting(false);
        setRestTimer(0);
        setAiFitnessTip("");
        setAlternativeExercise("");
    }
  }, [activePlan]);

  useEffect(() => {
    let interval;
    if (!isPaused && currentExercise) {
      interval = setInterval(() => {
        if (isResting) {
          setRestTimer(prev => {
            if (prev <= 1) {
              setIsResting(false);
              const nextIndex = currentIndex + 1;
              if (nextIndex < activePlan.length) {
                resetToExercise(nextIndex);
              } else {
                onFinishWorkout();
              }
              return 0;
            }
            return prev - 1;
          });
        } else {
          setTimer(prev => {
            if (prev <= 1) {
              if (currentIndex < activePlan.length - 1) {
                setIsResting(true);
                setRestTimer(REST_PERIOD_SECONDS);
              } else {
                 onFinishWorkout(); 
              }
              return 0; 
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, isResting, currentExercise, activePlan, onFinishWorkout, resetToExercise]);

  const handlePlayPause = () => {
    if (!currentExercise) return;
    
    if (isResting && restTimer <=0) {
        setIsResting(false);
        const nextIndex = currentIndex + 1;
        if (nextIndex < activePlan.length) {
            resetToExercise(nextIndex);
            setIsPaused(false);
        } else {
            onFinishWorkout();
        }
    } else if (!isResting && timer <= 0 && currentIndex < activePlan.length - 1) {
        setIsResting(true);
        setRestTimer(REST_PERIOD_SECONDS);
        setIsPaused(false);
    }
     else {
       setIsPaused(prev => !prev);
    }
  };

  const handleNextExercise = () => {
    if (currentIndex < activePlan.length - 1) {
      resetToExercise(currentIndex + 1);
    } else {
      onFinishWorkout();
    }
  };

  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      resetToExercise(currentIndex - 1);
    }
  };
  
  const handleRestartCurrentExercise = () => {
    if(currentExercise) {
        resetToExercise(currentIndex);
    }
  };

  const fetchFitnessTip = async () => {
    if (!workout || !workout.category) return;
    setIsFetchingTip(true);
    setAiFitnessTip("");
    const prompt = `Provide a concise and motivational fitness tip suitable for someone currently doing a ${workout.category} workout. Keep it under 30 words.`;
    const tip = await callGeminiAPI(prompt);
    setAiFitnessTip(tip);
    setIsFetchingTip(false);
  };
  
  const fetchAlternativeExercise = async () => {
    if (!currentExercise) return;
    setIsFetchingAlternative(true);
    setAlternativeExercise("");
    const prompt = `Suggest an alternative exercise for '${currentExercise.name}' which targets ${currentExercise.targetedMuscles.join(', ')}. The user might be looking for a variation (easier/harder) or an exercise using different or no equipment. Provide the name of the alternative and brief instructions (under 50 words).`;
    const alternative = await callGeminiAPI(prompt);
    setAlternativeExercise(alternative);
    setIsFetchingAlternative(false);
  };

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mb-6"></div>
        <p className="text-gray-600 text-xl font-semibold">Loading workout...</p>
      </div>
    );
  }
  
  const progressPercentage = activePlan.length > 0 ? ((currentIndex + 1) / activePlan.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 truncate" title={currentExercise.name}>
              {currentExercise.name}
            </h1>
            <span className="text-sm md:text-base text-gray-600 whitespace-nowrap bg-white px-3 py-1 rounded-lg border border-gray-200">
              {currentExercise.overallProgress}
            </span>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-4">{currentExercise.setInfo} • {currentExercise.exerciseProgressInBlock}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
      </div>

      {/* Exercise Display */}
      <div className="flex-1 flex flex-col">
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-6 flex-1 flex items-center justify-center border border-gray-200">
          <ExerciseImageDisplay exerciseKey={currentExercise.image} altText={currentExercise.name} />
          
          {/* Timer Display */}
          <div className="absolute bottom-6 right-6 bg-gray-900 text-white rounded-xl p-4 shadow-lg">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-1">
                {isResting ? String(restTimer).padStart(2, '0') : String(timer).padStart(2, '0')}
              </div>
              <div className="text-sm font-semibold text-gray-300">
                {isResting ? 'REST' : 'SECONDS'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Rest Period Info */}
        {isResting && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-900 rounded-xl text-center border border-blue-200">
            <p className="font-bold text-lg mb-1">🧘‍♀️ Rest Time</p>
            <p className="text-sm mb-3">
              Next: {currentIndex + 1 < activePlan.length ? activePlan[currentIndex + 1].name : "Workout Complete!"}
            </p>
            <button 
              onClick={fetchFitnessTip} 
              disabled={isFetchingTip}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm inline-flex items-center gap-2 disabled:opacity-70 transition-colors duration-200"
            >
              <Sparkles size={16} /> 
              {isFetchingTip ? 'Getting Tip...' : '✨ Fitness Tip'}
            </button>
            {aiFitnessTip && !isFetchingTip && (
              <p className="mt-3 text-sm italic text-blue-800 bg-blue-50 p-3 rounded-lg">{aiFitnessTip}</p>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="space-y-4">
          {/* Action Row 1 */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => { setShowInfoModal(true); setAlternativeExercise("");}} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-3 rounded-xl flex flex-col items-center justify-center text-sm transition-colors duration-200 shadow-md"
            > 
              <Info size={20} className="mb-1"/> 
              <span>Info</span>
            </button>
            <button 
              onClick={() => setShowQueueModal(true)} 
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-3 rounded-xl flex flex-col items-center justify-center text-sm transition-colors duration-200 shadow-md"
            > 
              <ListChecks size={20} className="mb-1"/> 
              <span>Queue</span>
            </button>
            <button 
              onClick={handleRestartCurrentExercise} 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-3 rounded-xl flex flex-col items-center justify-center text-sm transition-colors duration-200 shadow-md"
            > 
              <Repeat size={20} className="mb-1"/> 
              <span>Restart</span>
            </button>
          </div>

          {/* Action Row 2 - Main Controls */}
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={handlePreviousExercise} 
              disabled={currentIndex === 0} 
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-bold py-4 px-3 rounded-xl flex items-center justify-center text-base transition-colors duration-200 disabled:opacity-50 shadow-md"
            > 
              <ChevronLeft size={24} className="mr-1"/> 
              <span>Prev</span>
            </button>
            
            <button 
              onClick={handlePlayPause} 
              className={`font-bold py-4 px-3 rounded-xl flex items-center justify-center text-lg transition-colors duration-200 shadow-md ${
                isPaused 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              {isPaused ? <Play size={28} className="mr-2"/> : <Pause size={28} className="mr-2"/>}
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>
            
            <button 
              onClick={handleNextExercise} 
              disabled={currentIndex >= activePlan.length - 1 && !isResting && timer <=0 } 
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-bold py-4 px-3 rounded-xl flex items-center justify-center text-base transition-colors duration-200 disabled:opacity-50 shadow-md"
            > 
              <span>Next</span>
              <ChevronRight size={24} className="ml-1"/> 
            </button>
          </div>
          
          {/* Quit Button */}
          <button 
            onClick={onQuitWorkout} 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-base shadow-md"
          > 
            Quit Workout 
          </button>
        </div>
      </div>

      {/* Enhanced Modals */}
      <Modal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} title={currentExercise.name}>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2">
              <Target size={20} className="text-red-600" />
              Targeted Muscles
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentExercise.targetedMuscles.map((muscle, i) => (
                <span key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {muscle}
                </span>
              ))}
            </div>
            <MuscleDiagram targetedMuscles={currentExercise.targetedMuscles} />
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-3 text-gray-900">Instructions</h4>
            <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-xl leading-relaxed">{currentExercise.instructions}</p>
          </div>
          
          <button 
            onClick={fetchAlternativeExercise} 
            disabled={isFetchingAlternative} 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-70 transition-colors duration-200 shadow-md"
          >
            <Lightbulb size={18} /> 
            {isFetchingAlternative ? 'Suggesting...' : '✨ Alternative Exercise'}
          </button>
          
          {isFetchingAlternative && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent mx-auto mb-2"></div>
              <p className="text-sm text-purple-600">Finding alternatives...</p>
            </div>
          )}
          
          {alternativeExercise && !isFetchingAlternative && (
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h5 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
                <Lightbulb size={18} />
                Alternative Suggestion
              </h5>
              <p className="text-purple-700 whitespace-pre-line leading-relaxed">{alternativeExercise}</p>
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={showQueueModal} onClose={() => setShowQueueModal(false)} title="Workout Queue">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {activePlan.map((ex, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-red-100 ring-2 ring-red-500' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            > 
              <p className={`font-bold ${index === currentIndex ? 'text-red-800' : 'text-gray-800'}`}>
                {ex.name}
              </p> 
              <p className="text-sm text-gray-600 mt-1">
                {ex.setInfo} • {ex.exerciseProgressInBlock} • {ex.duration}s
              </p> 
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const WorkoutCompleteScreen = ({ workout, onGoHome }) => {
    const [aiSummary, setAiSummary] = useState("");
    const [isFetchingSummary, setIsFetchingSummary] = useState(false);

    const fetchWorkoutSummary = async () => {
        if (!workout) return;
        setIsFetchingSummary(true);
        setAiSummary("");
        let sampleExercises = "";
        if (workout.structure && workout.structure.length > 0 && workout.structure[0].exercises.length > 0) {
            sampleExercises = workout.structure.flatMap(block => block.exercises.map(ex => ex.name)).slice(0,3).join(', ');
        }
        const prompt = `I just completed a workout called '${workout.name}' (category: ${workout.category || 'general fitness'}). It included exercises like ${sampleExercises || 'various movements'}. Provide a brief, encouraging summary of the potential benefits (around 30-40 words) and suggest one complementary activity or focus for my next session (around 20-30 words). Format the response clearly, perhaps with headings for 'Benefits Summary' and 'Next Session Idea'.`;
        const summary = await callGeminiAPI(prompt);
        setAiSummary(summary);
        setIsFetchingSummary(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
            <div className="text-center max-w-2xl bg-white rounded-2xl p-8 shadow-lg">
                {/* Success Icon */}
                <div className="mb-8">
                  <CheckCircle size={80} className="text-green-500 mx-auto animate-bounce" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Workout Complete! 🎉
                </h1>
                <p className="text-xl text-gray-600 mb-8 bg-green-50 px-6 py-3 rounded-xl">
                  Great job finishing <span className="font-bold text-green-600">{workout?.name || 'your workout'}</span>!
                </p>
                
                <button
                    onClick={fetchWorkoutSummary}
                    disabled={isFetchingSummary}
                    className="mb-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-3 disabled:opacity-70 transition-colors duration-200 shadow-md"
                >
                    <Brain size={20} /> 
                    {isFetchingSummary ? 'Analyzing...' : '✨ Get AI Insights'}
                </button>

                {isFetchingSummary && (
                  <div className="mb-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Analyzing your workout...</p>
                  </div>
                )}
                
                {aiSummary && !isFetchingSummary && (
                    <div className="mb-8 p-6 bg-blue-50 rounded-xl text-left border border-blue-200">
                        <h5 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                          <Sparkles className="text-blue-600" size={20} />
                          AI Insights
                        </h5>
                        <pre className="text-blue-700 whitespace-pre-wrap font-sans leading-relaxed">{aiSummary}</pre>
                    </div>
                )}

                <button
                    onClick={onGoHome}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center gap-3 mx-auto shadow-md"
                >
                    <Award size={20} />
                    Back to Workouts
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---
function App() {
  const [currentScreen, setCurrentScreen] = useState('list'); 
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workoutsData] = useState(initialWorkouts); 

  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
    setCurrentScreen('detail');
  };

  const handleStartWorkout = (workout) => {
    setSelectedWorkout(workout); 
    setCurrentScreen('inProgress');
  };

  const handleGoBack = () => {
    setCurrentScreen('list');
    setSelectedWorkout(null);
  };
  
  const handleFinishWorkout = () => {
    setCurrentScreen('complete');
  };

  const handleQuitWorkout = () => {
    setCurrentScreen('list');
    setSelectedWorkout(null);
  };

  if (currentScreen === 'list') {
    return <WorkoutListScreen workouts={workoutsData} onSelectWorkout={handleSelectWorkout} />;
  }
  if (currentScreen === 'detail' && selectedWorkout) {
    return <WorkoutDetailScreen workout={selectedWorkout} onStartWorkout={handleStartWorkout} onGoBack={handleGoBack} />;
  }
  if (currentScreen === 'inProgress' && selectedWorkout) {
    return <WorkoutInProgressScreen workout={selectedWorkout} onFinishWorkout={handleFinishWorkout} onQuitWorkout={handleQuitWorkout} />;
  }
  if (currentScreen === 'complete') {
    return <WorkoutCompleteScreen workout={selectedWorkout} onGoHome={handleGoBack} />;
  }

  return <WorkoutListScreen workouts={workoutsData} onSelectWorkout={handleSelectWorkout} />;
}

export default App;