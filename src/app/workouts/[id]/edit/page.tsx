import { redirect } from "next/navigation";
import Link from "next/link";
import { getWorkoutById } from "@/app/features/workouts/action/workoutsAction";
import { EditWorkoutForm } from "@/app/features/workouts/components/edit-workout-form";

interface EditWorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditWorkoutPage({
  params,
}: EditWorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    redirect("/workouts");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/workouts"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-4"
          >
            ← Back to Workouts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Workout</h1>
          <p className="text-gray-600 mt-2">Update your workout details</p>
        </div>

        {/* Edit Form */}
        <EditWorkoutForm workout={workout} />
      </div>
    </div>
  );
}
