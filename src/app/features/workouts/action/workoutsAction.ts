"use server";

import { getAuth as getCurrentUser } from "./../../auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface WorkoutFormState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    description?: string[];
    reps?: string[];
    sets?: string[];
    weight?: string[];
    duration?: string[];
  };
}

export interface Workout {
  id: string;
  name: string;
  description: string | null;
  reps: number;
  sets: number;
  weight: number | null;
  duration: number | null;
  date: Date;
  userId: string;
}

// Create a new workout
export async function createWorkoutAction(
  prevState: WorkoutFormState,
  formData: FormData
): Promise<WorkoutFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Get form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const reps = parseInt(formData.get("reps") as string);
  const sets = parseInt(formData.get("sets") as string);
  const weight = formData.get("weight")
    ? parseFloat(formData.get("weight") as string)
    : null;
  const duration = formData.get("duration")
    ? parseInt(formData.get("duration") as string)
    : null;

  // Validation
  const errors: WorkoutFormState["errors"] = {};

  if (!name || name.trim().length < 1) {
    errors.name = ["Workout name is required"];
  }

  if (!reps || reps < 1) {
    errors.reps = ["Reps must be at least 1"];
  }

  if (!sets || sets < 1) {
    errors.sets = ["Sets must be at least 1"];
  }

  if (weight !== null && weight < 0) {
    errors.weight = ["Weight cannot be negative"];
  }

  if (duration !== null && duration < 1) {
    errors.duration = ["Duration must be at least 1 minute"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Please fix the errors below",
    };
  }

  try {
    await prisma.workout.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        reps,
        sets,
        weight,
        duration,
        userId: user.id,
        date: new Date(),
      },
    });

    revalidatePath("/workouts");
    return {
      success: true,
      message: "Workout created successfully!",
    };
  } catch (error) {
    console.error("Create workout error:", error);
    return {
      success: false,
      message:
        "An error occurred while creating the workout. Please try again.",
    };
  }
}

// Get all workouts for current user
export async function getUserWorkouts(): Promise<Workout[]> {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return workouts;
  } catch (error) {
    console.error("Get workouts error:", error);
    return [];
  }
}

// Get single workout by ID
export async function getWorkoutById(
  workoutId: string
): Promise<Workout | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  try {
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: user.id,
      },
    });

    return workout;
  } catch (error) {
    console.error("Get workout by ID error:", error);
    return null;
  }
}

// Delete a workout
export async function deleteWorkoutAction(
  workoutId: string
): Promise<{ success: boolean; message: string }> {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Verify the workout belongs to the current user
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: user.id,
      },
    });

    if (!workout) {
      return { success: false, message: "Workout not found" };
    }

    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });

    revalidatePath("/workouts");
    return { success: true, message: "Workout deleted successfully" };
  } catch (error) {
    console.error("Delete workout error:", error);
    return {
      success: false,
      message: "An error occurred while deleting the workout",
    };
  }
}

// Update a workout
export async function updateWorkoutAction(
  workoutId: string,
  prevState: WorkoutFormState,
  formData: FormData
): Promise<WorkoutFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Get form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const reps = parseInt(formData.get("reps") as string);
  const sets = parseInt(formData.get("sets") as string);
  const weight = formData.get("weight")
    ? parseFloat(formData.get("weight") as string)
    : null;
  const duration = formData.get("duration")
    ? parseInt(formData.get("duration") as string)
    : null;

  // Validation (same as create)
  const errors: WorkoutFormState["errors"] = {};

  if (!name || name.trim().length < 1) {
    errors.name = ["Workout name is required"];
  }

  if (!reps || reps < 1) {
    errors.reps = ["Reps must be at least 1"];
  }

  if (!sets || sets < 1) {
    errors.sets = ["Sets must be at least 1"];
  }

  if (weight !== null && weight < 0) {
    errors.weight = ["Weight cannot be negative"];
  }

  if (duration !== null && duration < 1) {
    errors.duration = ["Duration must be at least 1 minute"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Please fix the errors below",
    };
  }

  try {
    // Verify the workout belongs to the current user
    const existingWorkout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: user.id,
      },
    });

    if (!existingWorkout) {
      return {
        success: false,
        message: "Workout not found",
      };
    }

    await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        reps,
        sets,
        weight,
        duration,
      },
    });

    revalidatePath("/workouts");
    return {
      success: true,
      message: "Workout updated successfully!",
    };
  } catch (error) {
    console.error("Update workout error:", error);
    return {
      success: false,
      message:
        "An error occurred while updating the workout. Please try again.",
    };
  }
}
