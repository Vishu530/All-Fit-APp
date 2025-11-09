import React, { useState } from 'react';
import { WorkoutEntry } from '../types';

interface WorkoutTrackerProps {
  workoutLog: WorkoutEntry[];
  addWorkoutEntry: (entry: WorkoutEntry) => void;
}

const workoutOptions = [
  "Running", "Weightlifting", "Yoga", "Cycling", "Swimming", "Walking", "HIIT"
];

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ workoutLog, addWorkoutEntry }) => {
  const [workoutName, setWorkoutName] = useState(workoutOptions[0]);
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (workoutName && duration) {
      addWorkoutEntry({
        id: new Date().toISOString(),
        name: workoutName,
        duration: parseInt(duration, 10),
        caloriesBurned: calories ? parseInt(calories, 10) : undefined,
        timestamp: new Date(),
      });
      setDuration('');
      setCalories('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-teal-400">Workout Tracker</h1>

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Log a New Workout</h2>
        <form onSubmit={handleAddWorkout} className="space-y-3">
          <div>
            <label htmlFor="workout-type" className="block text-sm font-medium text-gray-400 mb-1">Workout Type</label>
            <select
              id="workout-type"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {workoutOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-400 mb-1">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 30"
              required
              className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="calories" className="block text-sm font-medium text-gray-400 mb-1">Calories Burned (optional)</label>
            <input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g., 250"
              className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Log Workout
          </button>
        </form>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Today's Workouts</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {workoutLog.length > 0 ? workoutLog.map(entry => (
            <li key={entry.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
              <div>
                <p className="font-semibold text-gray-200">{entry.name}</p>
                <p className="text-sm text-gray-400">{entry.duration} minutes</p>
              </div>
              {entry.caloriesBurned && (
                <span className="font-semibold text-sky-400">{entry.caloriesBurned} kcal</span>
              )}
            </li>
          )).reverse() : <p className="text-gray-500 text-center py-4">No workouts logged today.</p>}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutTracker;
