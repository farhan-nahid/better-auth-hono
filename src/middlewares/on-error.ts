import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { httpStatusCodes } from "@/constants";

export const onError: ErrorHandler = (err, c) => {
  let currentStatus: keyof typeof httpStatusCodes = "INTERNAL_SERVER_ERROR";

  if ("status" in err && typeof err.status === "string" && err.status in httpStatusCodes) {
    currentStatus = err.status as keyof typeof httpStatusCodes;
  }

  const statusCode = httpStatusCodes[currentStatus] as ContentfulStatusCode;

  return c.json({ message: err.message, error: err }, statusCode);
};
