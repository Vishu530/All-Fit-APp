import React from 'react';
import { View } from '../types';
import HomeIcon from './icons/HomeIcon';
import FlameIcon from './icons/FlameIcon';
import FootstepsIcon from './icons/FootstepsIcon';
import DumbbellIcon from './icons/DumbbellIcon';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'text-teal-400' : 'text-gray-400';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ease-in-out hover:text-teal-300 ${activeClass}`}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-700 shadow-lg flex justify-around items-center z-50">
      <NavItem
        icon={<HomeIcon className="h-6 w-6" />}
        label="Dashboard"
        isActive={currentView === View.Dashboard}
        onClick={() => setCurrentView(View.Dashboard)}
      />
      <NavItem
        icon={<FlameIcon className="h-6 w-6" />}
        label="Calories"
        isActive={currentView === View.Calories}
        onClick={() => setCurrentView(View.Calories)}
      />
      <NavItem
        icon={<FootstepsIcon className="h-6 w-6" />}
        label="Steps"
        isActive={currentView === View.Steps}
        onClick={() => setCurrentView(View.Steps)}
      />
      <NavItem
        icon={<DumbbellIcon className="h-6 w-6" />}
        label="Workouts"
        isActive={currentView === View.Workouts}
        onClick={() => setCurrentView(View.Workouts)}
      />
    </nav>
  );
};

export default BottomNav;
