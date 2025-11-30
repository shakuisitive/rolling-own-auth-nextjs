"use client";

import { useActionState } from "react";
import {
  createWorkoutAction,
  WorkoutFormState,
} from "../action/workoutsAction";
// import { createWorkoutAction, WorkoutFormState } from "../actions/workouts";

const initialState: WorkoutFormState = {
  success: false,
  message: "",
  errors: {},
};

interface WorkoutFormProps {
  onSuccess?: () => void;
}

export function WorkoutForm({ onSuccess }: WorkoutFormProps) {
  const [state, formAction, isPending] = useActionState(
    createWorkoutAction,
    initialState
  );

  // Reset form on successful submission
  if (state.success && onSuccess) {
    onSuccess();
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Workout</h2>

      {state.message && (
        <div
          className={`p-3 mb-4 rounded ${
            state.success
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Workout Name */}
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Workout Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Bench Press, Squats, Running"
            />
            {state.errors?.name && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional workout notes..."
            />
            {state.errors?.description && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Reps */}
          <div>
            <label
              htmlFor="reps"
              className="block text-sm font-medium text-gray-700"
            >
              Reps *
            </label>
            <input
              type="number"
              id="reps"
              name="reps"
              required
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
            />
            {state.errors?.reps && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.reps[0]}
              </p>
            )}
          </div>

          {/* Sets */}
          <div>
            <label
              htmlFor="sets"
              className="block text-sm font-medium text-gray-700"
            >
              Sets *
            </label>
            <input
              type="number"
              id="sets"
              name="sets"
              required
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="3"
            />
            {state.errors?.sets && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.sets[0]}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg/lbs)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              min="0"
              step="0.5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="50.5"
            />
            {state.errors?.weight && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.weight[0]}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="30"
            />
            {state.errors?.duration && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.duration[0]}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Adding Workout..." : "Add Workout"}
        </button>
      </form>
    </div>
  );
}
