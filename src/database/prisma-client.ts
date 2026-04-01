import { PrismaClient } from "@prisma/client/extension";

//O código do database será referenciado via const prisma
export const prisma = new PrismaClient()