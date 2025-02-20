import React from 'react';
import { WorkoutFormData, FITNESS_GOALS, FITNESS_LEVELS, WORKOUT_PREFERENCES } from '../types';

interface WorkoutFormProps {
  onSubmit: (data: WorkoutFormData) => void;
  isLoading: boolean;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: WorkoutFormData = {
      goal: formData.get('goal') as string,
      fitness_level: formData.get('fitness_level') as string,
      preferences: Array.from(formData.getAll('preferences') as string[]),
      health_conditions: [formData.get('health_conditions') as string],
      days_per_week: parseInt(formData.get('days_per_week') as string),
      session_duration: parseInt(formData.get('session_duration') as string),
      plan_duration_weeks: parseInt(formData.get('plan_duration_weeks') as string),
      custom_goals: formData.get('custom_goals') ? [formData.get('custom_goals') as string] : undefined
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
            Fitness Goal
          </label>
          <select
            name="goal"
            id="goal"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {FITNESS_GOALS.map((goal) => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fitness_level" className="block text-sm font-medium text-gray-700">
            Fitness Level
          </label>
          <select
            name="fitness_level"
            id="fitness_level"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {FITNESS_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workout Preferences
          </label>
          <div className="space-y-2">
            {WORKOUT_PREFERENCES.map((preference) => (
              <div key={preference} className="flex items-center">
                <input
                  type="checkbox"
                  name="preferences"
                  value={preference}
                  id={`preference-${preference}`}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`preference-${preference}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {preference}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="health_conditions" className="block text-sm font-medium text-gray-700">
            Health Conditions
          </label>
          <input
            type="text"
            name="health_conditions"
            id="health_conditions"
            placeholder="e.g., None, Back pain, etc."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="days_per_week" className="block text-sm font-medium text-gray-700">
              Days per Week
            </label>
            <input
              type="number"
              name="days_per_week"
              id="days_per_week"
              required
              min="1"
              max="7"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="session_duration" className="block text-sm font-medium text-gray-700">
              Session Duration (minutes)
            </label>
            <input
              type="number"
              name="session_duration"
              id="session_duration"
              required
              min="15"
              max="120"
              step="15"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="plan_duration_weeks" className="block text-sm font-medium text-gray-700">
            Plan Duration (weeks)
          </label>
          <input
            type="number"
            name="plan_duration_weeks"
            id="plan_duration_weeks"
            required
            min="1"
            max="12"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="custom_goals" className="block text-sm font-medium text-gray-700">
            Custom Goals (optional)
          </label>
          <input
            type="text"
            name="custom_goals"
            id="custom_goals"
            placeholder="e.g., Increase flexibility, Improve core strength"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Workout Plan'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;