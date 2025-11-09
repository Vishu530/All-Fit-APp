export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  timestamp: Date;
}

export interface WorkoutEntry {
  id: string;
  name: string;
  duration: number; // in minutes
  caloriesBurned?: number;
  timestamp: Date;
}

export enum View {
  Dashboard = 'DASHBOARD',
  Calories = 'CALORIES',
  Steps = 'STEPS',
  Workouts = 'WORKOUTS',
}
