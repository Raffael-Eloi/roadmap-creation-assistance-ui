import RoadmapRequest from "../models/roadmapRequest";
import RoadmapResponse from "../models/RoadmapResponse";

export default interface IRoadmapService {
  create(request: RoadmapRequest): Promise<RoadmapResponse>;
}
