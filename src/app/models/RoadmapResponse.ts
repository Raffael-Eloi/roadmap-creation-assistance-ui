export default class RoadmapResponse {
  message: string;
  status: number;
  errors: Record<string, string[]>;
  projectId?: string;
  milestonesCreatedCount?: number;
  issuesCreatedCount?: number;
  readmeCreated?: boolean;

  constructor(
    message: string,
    status: number,
    errors: Record<string, string[]>,
    projectId?: string,
    milestonesCreatedCount?: number,
    issuesCreatedCount?: number,
    readmeCreated?: boolean,
  ) {
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.projectId = projectId;
    this.milestonesCreatedCount = milestonesCreatedCount;
    this.issuesCreatedCount = issuesCreatedCount;
    this.readmeCreated = readmeCreated;
  }
}
