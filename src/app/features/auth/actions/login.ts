"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createAccessToken } from "../utils/session";
import { workoutsPath } from "@/paths";

export interface LoginState {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // Get form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simple validation
  const errors: LoginState["errors"] = {};

  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid email address"];
  }

  if (!password || password.length < 1) {
    errors.password = ["Please enter your password"];
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Please fix the errors below",
    };
  }

  try {
    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // 3. Create JWT token and session
    await createAccessToken({
      id: user.id,
    });

    // 4. Redirect to workouts page
    redirect(workoutsPath());
  } catch (error) {
    // Re-throw redirect errors - Next.js uses these internally for redirects
    if (error instanceof Error) {
      throw error;
    }

    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
}
