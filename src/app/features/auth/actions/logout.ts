"use server";

import { logout } from "../utils/session";

export async function logoutAction() {
  await logout();
}

