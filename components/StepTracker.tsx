import React, { useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

interface StepTrackerProps {
  steps: { current: number; goal: number };
  setSteps: React.Dispatch<React.SetStateAction<{ current: number; goal: number }>>;
}

const StepTracker: React.FC<StepTrackerProps> = ({ steps, setSteps }) => {
  const location = useGeolocation();
  const [manualSteps, setManualSteps] = useState<string>('');

  const handleAddSteps = (e: React.FormEvent) => {
    e.preventDefault();
    const newSteps = parseInt(manualSteps, 10);
    if (!isNaN(newSteps)) {
      setSteps(prev => ({ ...prev, current: prev.current + newSteps }));
      setManualSteps('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-teal-400">Step Tracker</h1>

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Today's Progress</h2>
        <p className="text-4xl font-bold text-indigo-400">{steps.current.toLocaleString()}</p>
        <p className="text-gray-400">Goal: {steps.goal.toLocaleString()} steps</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
          <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${Math.min((steps.current / steps.goal) * 100, 100)}%` }}></div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Manual Step Entry</h2>
        <form onSubmit={handleAddSteps} className="flex gap-2">
          <input
            type="number"
            value={manualSteps}
            onChange={(e) => setManualSteps(e.target.value)}
            placeholder="Enter steps"
            className="flex-grow bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Add
          </button>
        </form>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Location-Based Activity</h2>
        <p className="text-sm text-gray-500 mb-3">
          This feature uses GPS to track movement as a proxy for activity. It is not a precise step counter.
          For accurate tracking, please enter your steps manually.
        </p>
        {location.loading && <p>Getting location data...</p>}
        {location.error && <p className="text-red-400">Error: {location.error}</p>}
        {location.latitude && location.longitude && (
          <div className="text-center bg-gray-700 p-3 rounded-lg">
            <p className="text-gray-300">
              <span className="font-semibold">Latitude:</span> {location.latitude.toFixed(4)}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Longitude:</span> {location.longitude.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepTracker;
