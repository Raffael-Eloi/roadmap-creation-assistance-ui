import { AxiosError, AxiosResponse } from "axios";
import IRoadmapService from "../contracts/iRoadmapService";
import RoadmapRequest from "../models/roadmapRequest";
import { api } from "../utils/api";
import RoadmapResponse from "../models/RoadmapResponse";

export default class RoadmapService implements IRoadmapService {
  public async create(request: RoadmapRequest): Promise<RoadmapResponse> {
    try {
      const response: AxiosResponse<RoadmapResponse> = await api.post(
        "/api/RoadMapGenerator",
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = response.data;
      return new RoadmapResponse(
        "Roadmap successfully created",
        response.status,
        {},
        data.projectId,
        data.milestonesCreatedCount,
        data.issuesCreatedCount,
        data.readmeCreated,
      );
    } catch (e: unknown) {
      const error = e as AxiosError<any>;
      console.log("error", error);
      console.log("error.response", error.response);
      console.log("error.response?.data", error.response?.data);

      if (error.response?.data) {
        return new RoadmapResponse(
          error.response.data.title ?? error.response.data.message,
          error.response.status,
          error.response.data.errors,
        );
      }
      return new RoadmapResponse(
        "An error ocurred.",
        error.response?.status ?? 422,
        {},
      );
    }
  }
}
