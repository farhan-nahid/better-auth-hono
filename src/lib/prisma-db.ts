import { PrismaClient } from "@prisma/client";

import env from "@/env";

function prismaClientSingleton() {
  return new PrismaClient();
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>; // eslint-disable-next-line no-restricted-globals
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export { prisma };
