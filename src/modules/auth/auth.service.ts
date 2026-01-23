import { AppDataSource } from "../../database/data-source.js";
import { User } from "../../database/entities/User.js";
import { RegisterDto, LoginDto } from "./auth.dto.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
import { generateToken } from "../../utils/token.js";
import { getExpiryDate } from "../../utils/getExpiryDate.js";
import { AuthToken, TokenType } from "../../database/entities/AuthToken.js";

const userRepo = AppDataSource.getRepository(User);
const tokenRepo = AppDataSource.getRepository(AuthToken);

export async function registerUserService(data: RegisterDto) {
  const { email, phone, username, password, role } = data;

  if (!email && !phone) {
    throw new Error("Email or phone number is required");
  }

  if (phone) {
    const existingUserPhone = await userRepo.findOne({
      where: { phone },
    });

    if (existingUserPhone) {
      throw new Error("User with phone number already exists");
    }
  }

  if (email) {
    const existingUserEmail = await userRepo.findOne({
      where: { email },
    });

    if (existingUserEmail) {
      throw new Error("User with email already exists");
    }
  }

  if (username) {
    const existingUsername = await userRepo.findOne({
      where: { username },
    });

    if (existingUsername) {
      throw new Error("User with username already exists");
    }
  }

  const user = userRepo.create({
    email,
    phone,
    username,
    password: await hashPassword(password),
    role,
  });

  await userRepo.save(user);

  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

export async function loginUserService(data: LoginDto, req: any) {
  const { email, password } = data;
  let userDetails: User | null;

  //@ts-ignore
  const { ipAddress, userAgent } = req.context;
  const deviceId = req.headers["x-device-id"] as string | undefined;

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

    const generatedToken = generateToken({
      userId: userDetails.id,
      role: userDetails.role,
    });

    const token = tokenRepo.create({
      token: generatedToken,
      tokenType: TokenType.ACCESS,
      expiresAt: getExpiryDate(7),
      user: userDetails,
      ipAddress,
      userAgent,
      deviceId,
    });

    await tokenRepo.save(token);

    return {
      id: userDetails.id,
      email: userDetails.email,
      phone: userDetails.phone,
      role: userDetails.role,
      token: generatedToken,
    };
  }
}

export async function passwordUserResetService(data: {
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
