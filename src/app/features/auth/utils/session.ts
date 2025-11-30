import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { signinPath } from "@/paths";
import { redirect } from "next/navigation";

export const createAccessToken = async (payload: Record<string, string>) => {
  const session = jwt.sign(payload, "2424244adsfasd", {
    expiresIn: 1000 * 1 * 120,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 120,
  });
};

export const verifyAccessToken = (token: string) => {
  const verifiedToken = jwt.verify(token, "2424244adsfasd");
  console.log({ verifiedToken });
  return verifiedToken;
};

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");

  redirect(signinPath());
};
