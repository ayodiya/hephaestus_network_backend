import { AppDataSource } from "../../database/data-source.js";
import { User } from "../../database/entities/User.js";
import { RegisterDto, LoginDto } from "./auth.dto.js";
import { comparePassword, hashPassword } from "../../utils/password.js";

const userRepo = AppDataSource.getRepository(User);

export async function registerUser(data: RegisterDto) {
  if (!data.email && !data.phone) {
    throw new Error("Email or phone number is required");
  }

  const existingUser = await userRepo.findOne({
    where: [{ email: data.email }, { phone: data.phone }],
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

export async function loginUser(data: LoginDto) {
  const { email, password } = data;
  let userDetails: User | null;

  const userEmailExists = await userRepo.findOne({
    where: { email },
  });

  const userUsernameExists = await userRepo.findOne({
    where: { username: email },
  });

  if (!userEmailExists && !userUsernameExists) {
    throw new Error("Invalid email/username or password");
  }

  if (userUsernameExists) {
    userDetails = userUsernameExists;
  } else {
    userDetails = userEmailExists;
  }

  if (!userDetails) {
    throw new Error("Invalid email or password");
  } else {
    // Password verification logic to be implemented
    const isPasswordValid = await comparePassword(
      password,
      userDetails.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return {
      id: userDetails.id,
      email: userDetails.email,
      phone: userDetails.phone,
      role: userDetails.role,
    };
  }
}

export async function passwordUserReset(data: {
  email: string;
  newPassword: string;
}) {
  const { email, newPassword } = data;

  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    throw new Error("User with the given email does not exist");
  }

  // Further implementation for password reset (e.g., sending email) goes here
  user.password = await hashPassword(newPassword);
  await userRepo.save(user);
  return { message: "Password reset successful" };
}
