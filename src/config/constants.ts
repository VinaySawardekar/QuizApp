export const PORT: number = 8081;

export const apiPath: { PATH: string; VERSION: string } = {
  PATH: "/api",
  VERSION: "/v1",
};

export const URLs: Array<string> = ["http://localhost:4200"];

export const statusCode: {
  OK: number;
  CREATED: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  NOT_FOUND: number;
  INTERNAL_SERVER_ERROR: number;
  BAD_GATEWAY: number;
  SERVICE_UNAVAILABLE: number;
  UNPROCESSABLE_ENTITY: number;
} = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  UNPROCESSABLE_ENTITY: 422,
};

export const statusText: { SUCCESS: string; ERROR: string; WARNING: string } = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

export const maxLimit: string =
  "Too many requests, please try again after 20 minutes.";
