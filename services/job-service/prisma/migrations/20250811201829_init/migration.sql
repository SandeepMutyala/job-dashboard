-- CreateEnum
CREATE TYPE "public"."job_status" AS ENUM ('open', 'closed');

-- CreateTable
CREATE TABLE "public"."job" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "salary_range" TEXT,
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."job_status" NOT NULL DEFAULT 'open',

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_update" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER NOT NULL,
    "changes" TEXT,

    CONSTRAINT "job_update_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."job_update" ADD CONSTRAINT "job_update_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
