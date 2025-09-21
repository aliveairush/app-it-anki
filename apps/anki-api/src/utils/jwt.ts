import jwt, { Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';

const ACCESS_TTL = process.env.ACCESS_TTL || '15m';
const REFRESH_TTL = process.env.REFRESH_TTL || '7d';

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET as Secret;
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as Secret;

export function signAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_TTL as StringValue,
  });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_TTL as StringValue,
  });
}

export function verifyAccess(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as any;
}

export function verifyRefresh(token: string): any {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as any;
}
