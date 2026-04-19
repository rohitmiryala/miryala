import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interfaces/errors';

/**
 * Handle Mongoose ValidationError
 * @param err - Mongoose ValidationError instance
 * @returns Formatted error response
 */
const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSource[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message
      };
    }
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources
  };
};

export default handleMongooseValidationError;
