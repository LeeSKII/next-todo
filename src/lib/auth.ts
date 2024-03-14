import type { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify, decodeJwt } from "jose";
import type { JWTPayload } from "jose";
import { USER_TOKEN, getJwtSecretKey } from "./constants";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

type JWTPayloadWithUserId = JWTPayload & { userId: string; userName: string };

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get(USER_TOKEN)?.value;

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(payload: any = {}) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  cookies().set(USER_TOKEN, token, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });
}

export function decryptUserToken(token: string): JWTPayloadWithUserId {
  return decodeJwt(token);
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, secure: false, maxAge: 0 });
  return res;
}
