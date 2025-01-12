import { Request, Response } from "express";
import { statusCode } from "../config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../utility/customResponse";
/**
 * Handles a basic get request and sends a response with a status, message..
 * @param {object} req - The request object containing information about the HTTP request.
 * @param {object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the status, message and empty data array.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const init = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["Welcome"]
   * #swagger.summary = 'Welcome to the system!!'
   */
  try {
    const message = `Welcome to Quiz App.`;
    const response = createSuccessResponse(message, [{}]);
    return res.status(statusCode.OK).send(response);
  } catch (error) {
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};

/**
 * Handles a health check request and sends a response with a success message and the current date.
 * @param {object} req - The request object containing information about the HTTP request.
 * @param {object} res - The response object used to send the HTTP response.
 * @returns { { status: string; message: string; data: Array<any> | null } } - The HTTP response with the status, message and UNIX time stamp in milliseconds in data array.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const healthCheck = async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ["Health Check"]
   * #swagger.summary = 'Checks the health of the system (Up or down)'
   */
  try {
    const obj = {
      upTime: process.uptime(),
      date: Date.now(),
    };
    const message = `Success.`;
    const response = createSuccessResponse(message, [obj]);
    return res.status(statusCode.OK).send(response);
  } catch (error) {
    const message = `Internal Server Error`;
    const response = createErrorResponse(message);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response);
  }
};
export { init, healthCheck };
