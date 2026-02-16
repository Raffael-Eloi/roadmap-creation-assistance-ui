export default class RoadmapResponse {
  message: string;
  status: number;
  errors: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    errors: Record<string, string[]>,
  ) {
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  public isSuccess() {
    return this.errors.value.length == 0;
  }
}
