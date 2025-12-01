import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const options = {
    accelerateUrl: process.env.DATABASE_URL as string,
}

export const Database = new PrismaClient(options).$extends(withAccelerate());