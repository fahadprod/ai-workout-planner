import React from 'react';
import { WorkoutPlanResponse, DayWorkout } from '../types';
import { Clock, Dumbbell, RotateCcw, Calendar } from 'lucide-react';

interface WorkoutPlanProps {
  plan: WorkoutPlanResponse | null;
  isLoading: boolean;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ plan, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!plan || !plan.result) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Dumbbell className="h-12 w-12 mb-4" />
        <p className="text-lg">Fill out your details to generate a personalized workout plan</p>
      </div>
    );
  }

  const { result } = plan;

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 rounded-lg p-4 flex flex-wrap gap-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="text-sm">
            <strong>{result.total_weeks}</strong> weeks
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="text-sm">
            <strong>{result.schedule.session_duration}</strong> min sessions
          </span>
        </div>
        <div className="flex items-center">
          <RotateCcw className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="text-sm">
            <strong>{result.schedule.days_per_week}</strong> days/week
          </span>
        </div>
      </div>

      {result.exercises.map((dayWorkout: DayWorkout, dayIndex: number) => (
        <div key={dayIndex} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-indigo-600 text-white px-6 py-3">
            <h3 className="text-lg font-semibold">{dayWorkout.day}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {dayWorkout.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{exercise.name}</h4>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {exercise.equipment}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>{exercise.sets} sets</span>
                  </div>
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>{exercise.repetitions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlan;