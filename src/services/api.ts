import { WorkoutFormData, WorkoutPlanResponse } from '../types';
import { exerciseLibrary, workoutSplits } from './workoutData';

const DAYS_OF_WEEK = ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday', 'Tuesday', 'Thursday'];

const getExercisesForMuscleGroup = (
  muscleGroup: string,
  preferences: string[],
  level: string,
  count = 2
) => {
  const exercises = exerciseLibrary[muscleGroup as keyof typeof exerciseLibrary] || [];
  
  return exercises
    .filter(exercise => 
      exercise.level.includes(level) &&
      exercise.type.some(type => preferences.includes(type))
    )
    .slice(0, count)
    .map(exercise => ({
      name: exercise.name,
      duration: exercise.duration,
      repetitions: exercise.defaultReps,
      sets: exercise.defaultSets,
      equipment: exercise.equipment
    }));
};

export const generateWorkoutPlan = async (formData: WorkoutFormData): Promise<WorkoutPlanResponse> => {
  try {
    const {
      goal,
      fitness_level,
      preferences,
      days_per_week,
      session_duration,
      plan_duration_weeks
    } = formData;

    // Get the appropriate split based on days per week
    const split = workoutSplits[Math.min(6, Math.max(3, days_per_week)) as keyof typeof workoutSplits];
    
    // Generate exercises for each day
    const workoutDays = split.map((muscleGroups, index) => {
      const dayExercises = muscleGroups.flatMap(group => 
        getExercisesForMuscleGroup(group, preferences, fitness_level)
      );

      return {
        day: DAYS_OF_WEEK[index],
        exercises: dayExercises
      };
    });

    // Create the response
    const response: WorkoutPlanResponse = {
      status: 'success',
      message: 'Workout plan generated successfully',
      result: {
        goal,
        fitness_level,
        total_weeks: plan_duration_weeks,
        schedule: {
          days_per_week,
          session_duration
        },
        exercises: workoutDays,
        seo_title: `${fitness_level} ${goal} Workout Plan`,
        seo_content: `Follow this structured workout plan to ${goal.toLowerCase()} as a ${fitness_level.toLowerCase()}. Engage in ${preferences.join(', ')} ${days_per_week} times a week.`,
        seo_keywords: `${goal.toLowerCase()}, ${fitness_level.toLowerCase()} workout, ${preferences.join(', ')}`
      },
      cacheTime: Date.now()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return response;
  } catch (error) {
    throw new Error('Failed to generate workout plan. Please try again.');
  }
};