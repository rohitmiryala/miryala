/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

/**
 * BigInt serializer middleware for JSON responses
 * Handles BigInt values by converting them to strings during JSON serialization
 * This prevents errors when BigInt values are included in response bodies
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
export function bigIntSerializer(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Store the original json method
  const originalJson = res.json;
  
  // Override the json method
  res.json = function (body: any): Response {
    // Define a replacer function to handle BigInt values
    const replacer = (key: string, value: any): any => {
      // Convert BigInt to string
      if (typeof value === 'bigint') {
        return value.toString();
      }
      // Return other values unchanged
      return value;
    };
    
    // Serialize the body with the replacer
    const serializedBody = JSON.stringify(body, replacer);
    
    // Parse it back to an object and send it using the original method
    return originalJson.call(this, JSON.parse(serializedBody));
  };
  
  // Continue to the next middleware
  next();
}
