import jsPDF from 'jspdf';
import { WorkoutPlanResponse } from '../types';

export const generatePDF = (workoutPlan: WorkoutPlanResponse) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.width;

  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(75, 85, 99); // Gray-700
  pdf.text(workoutPlan.result.seo_title, margin, yPosition);
  yPosition += 15;

  // Add plan overview
  pdf.setFontSize(12);
  pdf.setTextColor(107, 114, 128); // Gray-500
  const overview = [
    `Goal: ${workoutPlan.result.goal}`,
    `Fitness Level: ${workoutPlan.result.fitness_level}`,
    `Duration: ${workoutPlan.result.total_weeks} weeks`,
    `Sessions: ${workoutPlan.result.schedule.days_per_week} days per week`,
    `Session Duration: ${workoutPlan.result.schedule.session_duration} minutes`
  ];

  overview.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 8;
  });
  yPosition += 10;

  // Add each day's workout
  workoutPlan.result.exercises.forEach((dayWorkout, index) => {
    // Check if we need a new page
    if (yPosition > pdf.internal.pageSize.height - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    // Day header
    pdf.setFontSize(16);
    pdf.setTextColor(79, 70, 229); // Indigo-600
    pdf.text(dayWorkout.day, margin, yPosition);
    yPosition += 10;

    // Exercises
    pdf.setFontSize(12);
    pdf.setTextColor(31, 41, 55); // Gray-800

    dayWorkout.exercises.forEach((exercise) => {
      // Check if we need a new page
      if (yPosition > pdf.internal.pageSize.height - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      // Exercise name and equipment
      pdf.setFont(undefined, 'bold');
      const exerciseText = `${exercise.name} (${exercise.equipment})`;
      pdf.text(exerciseText, margin + 5, yPosition);
      yPosition += 7;

      // Exercise details
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(107, 114, 128); // Gray-500
      const details = [
        `Duration: ${exercise.duration}`,
        `Sets: ${exercise.sets}`,
        `Reps: ${exercise.repetitions}`
      ];

      details.forEach(detail => {
        pdf.text(`• ${detail}`, margin + 10, yPosition);
        yPosition += 7;
      });
      yPosition += 3;
    });

    yPosition += 10;
  });

  // Add footer with generation date
  const footerText = `Generated on ${new Date().toLocaleDateString()}`;
  pdf.setFontSize(10);
  pdf.setTextColor(156, 163, 175); // Gray-400
  pdf.text(
    footerText,
    pageWidth - margin - pdf.getTextWidth(footerText),
    pdf.internal.pageSize.height - 10
  );

  return pdf;
};