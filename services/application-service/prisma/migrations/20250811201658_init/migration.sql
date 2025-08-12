-- CreateEnum
CREATE TYPE "public"."application_status" AS ENUM ('pending', 'interview', 'rejected', 'hired');

-- CreateTable
CREATE TABLE "public"."application" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "status" "public"."application_status" NOT NULL DEFAULT 'pending',
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);
