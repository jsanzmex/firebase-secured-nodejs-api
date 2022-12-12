import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

// Careful here. The signature of the method MUST MATCH.
// I was sending error, req, res and next in the register auth controller
// but in this middleware I did not have the next parameter and it wasn't executing.
// You can use Union Types
export default (error: TypeError | CustomError, req: Request , res: Response, next: NextFunction) => {
  console.log(error);
  if ((error instanceof CustomError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    const code = error.code || 'default';
    res.status(statusCode).json({ error: { message, data, code } });
  }
  res.status(500).send("Nothing");
}