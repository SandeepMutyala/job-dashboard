-- CreateTable
CREATE TABLE "public"."user_profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "preferences" TEXT,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."resume" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "resume_url" TEXT NOT NULL,
    "title" TEXT,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "public"."user_profile"("user_id");

-- AddForeignKey
ALTER TABLE "public"."resume" ADD CONSTRAINT "resume_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
