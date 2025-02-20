// API Request Types
export interface WorkoutPlanRequest {
  goal: string;
  fitness_level: string;
  preferences: string[];
  health_conditions: string[];
  schedule: {
    days_per_week: number;
    session_duration: number;
  };
  plan_duration_weeks: number;
  custom_goals?: string[];
  lang: string;
}

export interface WorkoutPlanResponse {
  status: string;
  message: string;
  result: {
    goal: string;
    fitness_level: string;
    total_weeks: number;
    schedule: {
      days_per_week: number;
      session_duration: number;
    };
    exercises: DayWorkout[];
    seo_title: string;
    seo_content: string;
    seo_keywords: string;
  };
  cacheTime: number;
}

export interface DayWorkout {
  day: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  name: string;
  duration: string;
  repetitions: string;
  sets: string;
  equipment: string;
}

export interface NutritionAdviceRequest {
  goal: string;
  dietary_restrictions: string[];
  current_weight: number;
  target_weight: number;
  daily_activity_level: string;
  lang: string;
}

export interface ExerciseDetailsRequest {
  exercise_name: string;
  lang: string;
}

export interface FoodPlateRequest {
  imageUrl: string;
  lang: string;
}

// Form Types
export interface WorkoutFormData {
  goal: string;
  fitness_level: string;
  preferences: string[];
  health_conditions: string[];
  days_per_week: number;
  session_duration: number;
  plan_duration_weeks: number;
  custom_goals?: string[];
}

export interface NutritionFormData {
  goal: string;
  dietary_restrictions: string[];
  current_weight: number;
  target_weight: number;
  daily_activity_level: string;
}

// Constants
export const FITNESS_GOALS = [
  'Build muscle',
  'Lose weight',
  'Improve overall fitness',
  'Increase strength',
  'Enhance endurance',
  'Improve flexibility'
] as const;

export const FITNESS_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced'
] as const;

export const WORKOUT_PREFERENCES = [
  'Weight training',
  'Cardio',
  'HIIT',
  'Yoga',
  'Bodyweight exercises',
  'Pilates'
] as const;

export const ACTIVITY_LEVELS = [
  'Sedentary',
  'Light',
  'Moderate',
  'Very active',
  'Extra active'
] as const;

export const DIETARY_RESTRICTIONS = [
  'None',
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Keto',
  'Paleo'
] as const;