import type { NotFoundHandler } from "hono";

import { httpStatusCodes, httpStatusPhrases } from "@/constants";

export const notFound: NotFoundHandler = (c) => {
  const message = `${httpStatusPhrases.NOT_FOUND} - ${c.req.path}` as const;

  return c.json({ message }, httpStatusCodes.NOT_FOUND);
};
