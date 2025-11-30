"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createAccessToken } from "../utils/session";
import { workoutsPath } from "@/paths";

export interface SignupState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}

export async function signupAction(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  // Get form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simple validation
  const errors: SignupState["errors"] = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters long"];
  }

  if (!email || !email.includes("@")) {
    errors.email = ["Please enter a valid email address"];
  }

  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters long"];
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
    // In a real app, you would:
    // 1. Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return {
        success: false,
        message: "You already have an account with this email.",
      };
    }

    // 2. Hash the password
    const hashedPw = await bcrypt.hash(password, 10);
    // 3. Save to database
    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPw,
      },
    });

    await createAccessToken({
      id: createdUser.id,
    });
    redirect(workoutsPath());
  } catch (error) {
    // Re-throw redirect errors - Next.js uses these internally for redirects
    if (error instanceof Error) {
      throw error;
    }

    console.error("Signup error:", error);
    return {
      success: false,
      message: "An error occurred during signup. Please try again.",
    };
  }
}
