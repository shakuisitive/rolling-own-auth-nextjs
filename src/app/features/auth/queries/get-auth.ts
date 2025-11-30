"use server";

import { cookies } from "next/headers";
import { verifyAccessToken } from "../utils/session";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }

  try {
    const payload = verifyAccessToken(session.value) as { id: string };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    // Invalid token
    return null;
  }
});
