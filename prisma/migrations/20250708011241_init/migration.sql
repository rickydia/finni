-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('INQUIRY', 'ONBOARDING', 'ACTIVE', 'CHURNED');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "status" "PatientStatus" NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
