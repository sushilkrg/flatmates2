import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod/v3";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        error: "Validation failed",
        details: err?.errors ?? err?.message,
      });
    }
  };
