import React, { useState } from 'react';
import { Dumbbell, Download, ArrowRight, Activity } from 'lucide-react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutPlan from './components/WorkoutPlan';
import { WorkoutFormData, WorkoutPlanResponse } from './types';
import { generateWorkoutPlan } from './services/api';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateWorkoutPlan = async (formData: WorkoutFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateWorkoutPlan(formData);
      if (!response || response.status !== 'success') {
        throw new Error('Failed to generate workout plan. Please try again.');
      }
      setWorkoutPlan(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate workout plan. Please try again.';
      setError(errorMessage);
      setWorkoutPlan(null);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!workoutPlan) return;
    const pdf = generatePDF(workoutPlan);
    pdf.save('workout-plan.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Workout Generator</h1>
          </div>
          <Activity className="h-6 w-6 text-indigo-600" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span>Your Details</span>
              <ArrowRight className="h-5 w-5 ml-2 text-indigo-600" />
            </h2>
            <WorkoutForm onSubmit={handleGenerateWorkoutPlan} isLoading={isLoading} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Workout Plan</h2>
              {workoutPlan && (
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              )}
            </div>
            <WorkoutPlan plan={workoutPlan} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;