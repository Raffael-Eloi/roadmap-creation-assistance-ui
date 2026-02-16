"use server";

import RoadmapRequest from "../models/roadmapRequest";
import RoadmapService from "../services/roadmapService";

export interface CreateRoadmapState {
  message: string;
  status: number;
  errors: Record<string, string[]>;
}

export async function createRoadmap(
  prevState: CreateRoadmapState,
  formData: FormData,
): Promise<CreateRoadmapState> {
  const request = new RoadmapRequest();
  request.gitHubOwner = formData.get("gitHubOwner") as string;
  request.gitHubRepositoryName = formData.get("gitHubRepositoryName") as string;
  request.gitHubToken = formData.get("gitHubToken") as string;
  request.apiDomainDefinition = formData.get("apiDomainDefinition") as string;
  request.openAIKey = formData.get("openAIKey") as string;

  const service = new RoadmapService();
  const response = await service.create(request);

  return {
    message: response.message,
    status: response.status,
    errors: response.errors,
  };
}