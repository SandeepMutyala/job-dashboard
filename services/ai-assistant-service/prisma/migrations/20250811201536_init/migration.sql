-- CreateTable
CREATE TABLE "public"."resume_analysis" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "resume_id" INTEGER NOT NULL,
    "skills_detected" TEXT,
    "score" INTEGER,
    "analyzed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_match" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "match_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_match_pkey" PRIMARY KEY ("id")
);
