import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  plainPassword: string,
  hash: string,
): Promise<boolean> {
  // Implementation to be added
  return bcrypt.compare(plainPassword, hash);
}
