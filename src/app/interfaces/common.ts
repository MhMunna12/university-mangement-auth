import { IGenericErrorMessage } from './error';

export type IGenericResponses<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
};
export type IGenericResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
