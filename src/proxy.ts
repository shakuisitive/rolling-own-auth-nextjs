import { getAuth } from "./app/features/auth/queries/get-auth";
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./app/features/auth/utils/session";

const privateRoutes = ["/workouts", "/add-workout"];
const publicOnlyRoutes = ["/signin", "/signup"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Get session cookie from request
  const sessionCookie = req.cookies.get("session");
  const authenticated = await getAuth();
  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isPrivateRoute && !authenticated) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isPublicOnlyRoute && authenticated) {
    return NextResponse.redirect(new URL("/workouts", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workouts", "/add-workout", "/signin", "/signup"],
};
