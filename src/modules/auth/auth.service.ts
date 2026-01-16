import { AppDataSource } from "../../database/data-source.js";
import { User } from "../../database/entities/User.js";
import { RegisterDto } from "./auth.dto.js";
import { hashPassword } from "../../utils/password.js";

const userRepo = AppDataSource.getRepository(User);

export async function registerUser(data: RegisterDto) {
  if (!data.email && !data.phone) {
    throw new Error("Email or phone number is required");
  }

  const existingUser = await userRepo.findOne({
    where: [
      { email: data.email },
      { phone: data.phone },
    ],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = userRepo.create({
    email: data.email,
    phone: data.phone,
    username: data.username,
    password: await hashPassword(data.password),
  });

  await userRepo.save(user);

  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}
