import { User } from "../../database/entities/User.js";
import { Job } from "../../database/entities/Job.js";
import { CreateJobDto } from "./dtos/create-job.dto.js";
import { AppDataSource } from "../../database/data-source.js";

const jobRepo = AppDataSource.getRepository(Job);
const userRepo = AppDataSource.getRepository(User);

export async function createJobService(userId: string, data: CreateJobDto) {
  const user = await userRepo.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  const job = jobRepo.create({
    title: data.title,
    description: data.description,
    requiredSkills: data.requiredSkills,
    location: data.location,
    isRemote: data.isRemote,
    budget: data.budget,
    jobType: data.jobType,
    postedBy: user,
  });

  await jobRepo.save(job);

  return {
    message: "Job created successfully",
    job,
  };
}

export async function editJobService(
  jobId: string,
  data: Partial<CreateJobDto>,
) {
  const job = await jobRepo.findOne({ where: { id: jobId } });

  if (!job) {
    throw new Error("Job not found");
  }

  Object.assign(job, data);

  await jobRepo.save(job);

  return {
    message: "Job updated successfully",
    job,
  };
}

export async function deleteJobService(jobId: string) {
  const job = await jobRepo.findOne({ where: { id: jobId } });

  if (!job) {
    throw new Error("Job not found");
  }

  await jobRepo.remove(job);

  return {
    message: "Job deleted successfully",
  };
}

export async function getJobByIdService(jobId: string) {
  const job = await jobRepo.findOne({ where: { id: jobId } });

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
}

export async function getAllJobsService() {
  const jobs = await jobRepo.find();
  return jobs;
}
