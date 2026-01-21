import { AppDataSource } from "../../database/data-source.js";
import { Worker } from "../../database/entities/Worker.js";
import { User } from "../../database/entities/User.js";
import { CreateWorkerDto } from "./create-worker.dto.js";

const workerRepo = AppDataSource.getRepository(Worker);
const userRepo = AppDataSource.getRepository(User);

export async function onboardWorker(userId: string, data: CreateWorkerDto) {
  const user = await userRepo.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const workerExists = await workerRepo.findOne({
    where: { user: { id: userId } },
  });

  if (workerExists) {
    throw new Error("User already has a worker profile");
  }

  const worker = workerRepo.create({
    bio: data.bio,
    skills: data.skills,
    location: data.location,
    certifications: data.certifications,
    // approvalStatus: WorkerApprovalStatus.PENDING,
    isActive: false,
    user,
  });

  await workerRepo.save(worker);

  const findWorker = await workerRepo.findOne({
    where: { id: worker.id },
    relations: ["user"],
  });

  return {
    message: "Worker profile created and pending approval",
    worker: findWorker,
  };
}

export async function editOnboardWorker(
  userId: string,
  data: Partial<CreateWorkerDto>,
) {
  const worker = await workerRepo.findOne({
    where: { user: { id: userId } },
  });

  if (!worker) {
    throw new Error("Worker profile not found");
  }

  if (data.bio !== undefined) {
    worker.bio = data.bio;
  }
  if (data.skills !== undefined) {
    worker.skills = data.skills;
  }
  if (data.location !== undefined) {
    worker.location = data.location;
  }
  if (data.certifications !== undefined) {
    worker.certifications = data.certifications;
  }

  await workerRepo.save(worker);

  const updatedWorker = await workerRepo.findOne({
    where: { id: worker.id },
    relations: ["user"],
  });

  return {
    message: "Worker profile updated successfully",
    worker: updatedWorker,
  };
}

export async function getWorkerByUserId(userId: string) {
  const worker = await workerRepo.findOne({
    where: { user: { id: userId } },
    relations: ["user"],
  });

  if (!worker) {
    throw new Error("Worker profile not found");
  }

  return worker;
}

export async function getWorkerById(workerId: string) {
  const worker = await workerRepo.findOne({
    where: { id: workerId },
    relations: ["user"],
  });

  if (!worker) {
    throw new Error("Worker profile not found");
  }

  return worker;
}

export async function getWorkerByUsername(username: string) {
  const worker = await workerRepo.findOne({
    where: { user: { username } },
    relations: ["user"],
  });

  if (!worker) {
    throw new Error("Worker profile not found");
  }

  return worker;
}

export async function listAllWorkers() {
  const workers = await workerRepo.find({
    relations: ["user"],
  });

  return workers;
}
