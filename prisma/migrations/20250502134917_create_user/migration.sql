-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MASCULINO', 'FEMININO');

-- CreateEnum
CREATE TYPE "PhysicalActivity" AS ENUM ('SEDENTARIO', 'MODERADO', 'INTENSO');

-- CreateEnum
CREATE TYPE "Objective" AS ENUM ('EMAGRECER', 'MANTER', 'GANHAR_MASSA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "sex" "Sex",
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "age" INTEGER,
    "PhysicalActivity" "PhysicalActivity",
    "Objective" "Objective",
    "BMR" DOUBLE PRECISION,
    "TDEE" DOUBLE PRECISION,
    "RCI" DOUBLE PRECISION,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
