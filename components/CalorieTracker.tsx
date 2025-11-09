import React, { useState } from 'react';
import { FoodEntry } from '../types';
import { searchFoodCalories } from '../services/geminiService';
import FlameIcon from './icons/FlameIcon';

interface CalorieTrackerProps {
  foodLog: FoodEntry[];
  addFoodEntry: (entry: FoodEntry) => void;
}

interface SearchResult {
    name: string;
    calories: number;
    servingSize: string;
}

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ foodLog, addFoodEntry }) => {
  const [manualName, setManualName] = useState('');
  const [manualCalories, setManualCalories] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualName && manualCalories) {
      addFoodEntry({
        id: new Date().toISOString(),
        name: manualName,
        calories: parseInt(manualCalories, 10),
        timestamp: new Date(),
      });
      setManualName('');
      setManualCalories('');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    try {
      const result = await searchFoodCalories(searchQuery);
      if (result) {
        setSearchResult(result);
      } else {
        setError('Could not find information for that food.');
      }
    } catch (err) {
      setError('An error occurred while searching.');
    } finally {
      setIsLoading(false);
    }
  };

  const addSearchedFood = () => {
    if (searchResult) {
      addFoodEntry({
        id: new Date().toISOString(),
        name: `${searchResult.name} (${searchResult.servingSize})`,
        calories: searchResult.calories,
        timestamp: new Date(),
      });
      setSearchResult(null);
      setSearchQuery('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-teal-400">Calorie Tracker</h1>

      {/* AI Food Search */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">AI Food Search</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., '1 medium apple'"
            className="flex-grow bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            disabled={isLoading}
          />
          <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200" disabled={isLoading}>
            {isLoading ? '...' : 'Search'}
          </button>
        </form>
        {error && <p className="text-red-400 mt-2">{error}</p>}
        {searchResult && (
          <div className="mt-4 bg-gray-700 p-3 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold">{searchResult.name}</p>
              <p className="text-sm text-gray-400">{searchResult.calories} kcal ({searchResult.servingSize})</p>
            </div>
            <button onClick={addSearchedFood} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-200">
              Add
            </button>
          </div>
        )}
      </div>

      {/* Manual Entry */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Manual Entry</h2>
        <form onSubmit={handleManualAdd} className="space-y-3">
          <input
            type="text"
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            placeholder="Food Name"
            className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <input
            type="number"
            value={manualCalories}
            onChange={(e) => setManualCalories(e.target.value)}
            placeholder="Calories"
            className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Add Manually
          </button>
        </form>
      </div>

      {/* Barcode Scanner (Simulated) */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-3">Barcode Scanner</h2>
        <p className="text-gray-400 mb-3 text-sm">Web barcode scanning is simulated. Please use search or manual entry.</p>
        <label htmlFor="barcode-upload" className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
          Upload Barcode Image
        </label>
        <input id="barcode-upload" type="file" accept="image/*" className="hidden" />
      </div>

      {/* Daily Food Log */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Today's Log</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {foodLog.length > 0 ? foodLog.map(entry => (
            <li key={entry.id} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <span className="text-gray-300">{entry.name}</span>
              <span className="font-semibold text-orange-400">{entry.calories} kcal</span>
            </li>
          )).reverse() : <p className="text-gray-500 text-center py-4">Log your first meal.</p>}
        </ul>
      </div>
    </div>
  );
};

export default CalorieTracker;
