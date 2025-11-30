"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Workout,
  updateWorkoutAction,
  WorkoutFormState,
} from "@/app/features/workouts/action/workoutsAction";

interface EditWorkoutFormProps {
  workout: Workout;
}

const initialState: WorkoutFormState = {
  success: false,
  message: "",
  errors: {},
};

export function EditWorkoutForm({ workout }: EditWorkoutFormProps) {
  const [state, formAction, isPending] = useActionState(
    (prevState: WorkoutFormState, formData: FormData) =>
      updateWorkoutAction(workout.id, prevState, formData),
    initialState
  );
  const router = useRouter();

  // Redirect on successful update
  useEffect(() => {
    if (state.success) {
      router.push("/workouts");
    }
  }, [state.success, router]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Workout</h2>

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
              defaultValue={workout.name}
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
              defaultValue={workout.description || ""}
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
              defaultValue={workout.reps}
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
              defaultValue={workout.sets}
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
              defaultValue={workout.weight || ""}
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
              defaultValue={workout.duration || ""}
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

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Updating Workout..." : "Update Workout"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/workouts")}
            className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
