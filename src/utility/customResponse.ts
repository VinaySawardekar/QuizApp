import { ErrorResponse, SuccessResponse } from "../types/customResponse";
import { statusText } from "../config/constants";

/**
 * Gets Success Response for the api.
 *
 * @param {String} message - The message used to send the HTTP response.
 * @param {Array} data - The data array used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
function createSuccessResponse<T>(
  message: string,
  data: T[],
): SuccessResponse<T> {
  return {
    status: statusText.SUCCESS,
    message,
    data,
  };
}

/**
 * Gets Error Response for the api.
 *
 * @param {String} message - The message used to send the HTTP response.
 * @param {any} error - The data array used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the success or error message.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
function createErrorResponse(message: string, error?: any): ErrorResponse {
  return {
    status: statusText.ERROR,
    message,
    error,
  };
}

export { createErrorResponse, createSuccessResponse };
