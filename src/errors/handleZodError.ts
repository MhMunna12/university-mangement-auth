import { ZodError, ZodIssue } from 'zod';
import { IGenericResponse } from '../app/interfaces/common';
import { IGenericErrorMessage } from '../app/interfaces/error';

const handleZodError = (error: ZodError): IGenericResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
