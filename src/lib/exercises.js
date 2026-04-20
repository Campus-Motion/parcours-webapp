export const exercises = {
  "1": "Push Ups (20 reps)",
  "2": "Squats (30 reps)",
  "3": "Pull Ups (10 reps)",
  "4": "Burpees (15 reps)",
  "5": "Plank (60 seconds)"
};

export function getExerciseForStation(stationId) {
  return exercises[stationId] || "Rest & Hydrate";
}
