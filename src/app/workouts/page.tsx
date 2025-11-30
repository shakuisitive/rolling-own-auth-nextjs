// import { getUserWorkouts } from "../actions/workouts";
// import WorkoutForm from "../components/WorkoutForm";
// import WorkoutList from "../components/WorkoutList";
// import { logout } from "../utils/session";

import { logout } from "../features/auth/utils/session";
import { getUserWorkouts } from "../features/workouts/action/workoutsAction";
import { WorkoutForm } from "../features/workouts/components/workout-form";
import { WorkoutList } from "../features/workouts/components/workout-list";

export default async function WorkoutsPage() {
  const workouts = await getUserWorkouts();

  const handleLogout = async () => {
    "use server";
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Workout Tracker
            </h1>
            <p className="text-gray-600 mt-2">Track your fitness journey</p>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Form */}
          <div className="lg:col-span-1">
            <WorkoutForm />
          </div>

          {/* Workout List */}
          <div className="lg:col-span-2">
            <WorkoutList workouts={workouts} />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Workouts
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {workouts.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">Total Reps</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {workouts.reduce(
                (total, workout) => total + workout.reps * workout.sets,
                0
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900">This Week</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {
                workouts.filter((workout) => {
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return new Date(workout.date) > oneWeekAgo;
                }).length
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
