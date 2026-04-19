import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interfaces/errors';

/**
 * Handle Mongoose CastError (invalid ObjectId format)
 * @param err - Mongoose CastError instance
 * @returns Formatted error response
 */
const handleMongooseCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSource[] = [
    {
      path: err.path,
      message: `Invalid value '${err.value}' for field '${err.path}'`
    }
  ];

  return {
    statusCode: 400,
    message: 'Invalid ID format',
    errorSources
  };
};

export default handleMongooseCastError;
