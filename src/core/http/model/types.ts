export type HttpError = {
  statusCode: number;
  message: string | string[];
  error: string;
};

export type HttpResponse<T> = Promise<T | HttpError>;
