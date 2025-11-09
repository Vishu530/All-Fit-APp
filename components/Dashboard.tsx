import React from 'react';
import { FoodEntry, WorkoutEntry } from '../types';
import CircularProgress from './CircularProgress';
import FlameIcon from './icons/FlameIcon';
import DumbbellIcon from './icons/DumbbellIcon';

interface DashboardProps {
  totalCalories: number;
  caloriesBurned: number;
  steps: { current: number; goal: number };
  foodLog: FoodEntry[];
  workoutLog: WorkoutEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ totalCalories, caloriesBurned, steps, foodLog, workoutLog }) => {
  const netCalories = totalCalories - caloriesBurned;
  const calorieGoal = 2000;

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-teal-400">Today's Summary</h1>
        <p className="text-gray-400">Hello! Here's your progress for today.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
            <CircularProgress 
                value={netCalories} 
                max={calorieGoal} 
                label="Net Calories" 
                unit="kcal"
                color="text-teal-400"
            />
             <div className="text-center mt-2 text-sm text-gray-400">
                {totalCalories} consumed - {caloriesBurned} burned
            </div>
        </div>
        <div className="flex flex-col items-center">
            <CircularProgress 
                value={steps.current} 
                max={steps.goal} 
                label="Steps" 
                unit="steps"
                color="text-indigo-400"
            />
             <div className="text-center mt-2 text-sm text-gray-400">
                Goal: {steps.goal}
            </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 flex items-center"><FlameIcon className="w-6 h-6 mr-2 text-orange-400" />Recent Meals</h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {foodLog.length > 0 ? foodLog.slice(-5).reverse().map(entry => (
              <li key={entry.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <span className="text-gray-300">{entry.name}</span>
                <span className="font-semibold text-orange-400">{entry.calories} kcal</span>
              </li>
            )) : <p className="text-gray-500 text-center py-4">No meals logged yet.</p>}
          </ul>
        </section>

        <section className="bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 flex items-center"><DumbbellIcon className="w-6 h-6 mr-2 text-sky-400" />Recent Workouts</h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {workoutLog.length > 0 ? workoutLog.slice(-5).reverse().map(entry => (
              <li key={entry.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                <div>
                  <p className="text-gray-300">{entry.name}</p>
                  <p className="text-xs text-gray-400">{entry.duration} mins</p>
                </div>
                <span className="font-semibold text-sky-400">{entry.caloriesBurned || 'N/A'} kcal</span>
              </li>
            )) : <p className="text-gray-500 text-center py-4">No workouts logged yet.</p>}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
