export type SuccessResponse<T> = {
  status: string;
  message: string;
  data: T[];
};

export type ErrorResponse = {
  status: string;
  message: string;
  error: any;
};
