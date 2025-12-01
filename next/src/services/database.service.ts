import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const options = {
  accelerateUrl: process.env.DATABASE_URL as string,
}

export const database = new PrismaClient(options).$extends(withAccelerate());