-- CreateEnum
CREATE TYPE "public"."company_user_role" AS ENUM ('owner', 'recruiter');

-- CreateTable
CREATE TABLE "public"."company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "location" TEXT,
    "description" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company_user" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_in_company" "public"."company_user_role" NOT NULL,

    CONSTRAINT "company_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."company_user" ADD CONSTRAINT "company_user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
