"use client";

import {
  Workout,
  deleteWorkoutAction,
} from "@/app/features/workouts/action/workoutsAction";

import Link from "next/link";

interface WorkoutListProps {
  workouts: Workout[];
}

// Format date consistently to avoid hydration mismatches
function formatDate(date: Date | string): string {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hoursStr = String(hours).padStart(2, "0");
  
  return `${month}/${day}/${year} at ${hoursStr}:${minutes}:${seconds} ${ampm}`;
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  const handleDelete = async (workoutId: string) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      await deleteWorkoutAction(workoutId);
      // The page will re-render due to revalidatePath in the server action
    }
  };

  if (workouts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">
          No workouts yet. Add your first workout to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Your Workouts</h2>
      <div className="grid gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {workout.name}
                </h3>
                {workout.description && (
                  <p className="text-gray-600 mt-1">{workout.description}</p>
                )}
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Reps:</span>{" "}
                    {workout.reps}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Sets:</span>{" "}
                    {workout.sets}
                  </div>
                  {workout.weight && (
                    <div>
                      <span className="font-medium text-gray-700">Weight:</span>{" "}
                      {workout.weight} kg/lbs
                    </div>
                  )}
                  {workout.duration && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Duration:
                      </span>{" "}
                      {workout.duration} min
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(workout.date)}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Link
                  href={`/workouts/${workout.id}/edit`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
