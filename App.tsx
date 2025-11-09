import React, { useState, useMemo } from 'react';
import { FoodEntry, WorkoutEntry, View } from './types';
import Dashboard from './components/Dashboard';
import CalorieTracker from './components/CalorieTracker';
import StepTracker from './components/StepTracker';
import WorkoutTracker from './components/WorkoutTracker';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [foodLog, setFoodLog] = useState<FoodEntry[]>([]);
  const [workoutLog, setWorkoutLog] = useState<WorkoutEntry[]>([]);
  const [steps, setSteps] = useState({ current: 6200, goal: 10000 });

  const totalCalories = useMemo(() => {
    return foodLog.reduce((sum, entry) => sum + entry.calories, 0);
  }, [foodLog]);

  const caloriesBurned = useMemo(() => {
    return workoutLog.reduce((sum, entry) => sum + (entry.caloriesBurned || 0), 0);
  }, [workoutLog]);

  const addFoodEntry = (entry: FoodEntry) => {
    setFoodLog(prevLog => [...prevLog, entry]);
  };

  const addWorkoutEntry = (entry: WorkoutEntry) => {
    setWorkoutLog(prevLog => [...prevLog, entry]);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard 
                  totalCalories={totalCalories} 
                  caloriesBurned={caloriesBurned} 
                  steps={steps} 
                  foodLog={foodLog} 
                  workoutLog={workoutLog} />;
      case View.Calories:
        return <CalorieTracker foodLog={foodLog} addFoodEntry={addFoodEntry} />;
      case View.Steps:
        return <StepTracker steps={steps} setSteps={setSteps} />;
      case View.Workouts:
        return <WorkoutTracker workoutLog={workoutLog} addWorkoutEntry={addWorkoutEntry} />;
      default:
        return <Dashboard 
                  totalCalories={totalCalories} 
                  caloriesBurned={caloriesBurned} 
                  steps={steps} 
                  foodLog={foodLog} 
                  workoutLog={workoutLog} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <main className="flex-grow container mx-auto p-4 pb-24">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
