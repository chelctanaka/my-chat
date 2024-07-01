import { PrismaClient } from "@prisma/client";

// TypeScriptの型定義を追加して、globalオブジェクトにprismaプロパティを追加
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient({ log: ["query"] });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
