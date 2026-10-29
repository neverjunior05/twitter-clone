import { compare, hash } from "bcryptjs";

export async function hashPassword(pw: string) {
  return hash(pw, 12);
}

export async function verifyPassword(pw: string, hash: string) {
  return compare(pw, hash);
}
