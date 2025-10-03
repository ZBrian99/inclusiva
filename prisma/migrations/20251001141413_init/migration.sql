-- CreateEnum
CREATE TYPE "Category" AS ENUM ('eventos', 'servicios', 'productos', 'usados', 'cursos', 'pedidos');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('presencial', 'online', 'hibrido');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('principiante', 'intermedio', 'avanzado');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('nuevo', 'reacondicionado', 'usado');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'debit', 'credit', 'transfer', 'mercadopago', 'crypto', 'barter', 'all');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorAvatar" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER,
    "priceLabel" TEXT,
    "rating" DOUBLE PRECISION,
    "ratingCount" INTEGER,
    "tags" TEXT[],
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3),
    "payment" "PaymentMethod"[],
    "barterAccepted" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "venue" TEXT,
    "mode" "Mode",
    "capacity" INTEGER,
    "organizer" TEXT,
    "experienceYears" INTEGER,
    "availability" TEXT,
    "serviceArea" TEXT,
    "condition" "Condition",
    "stock" INTEGER,
    "warranty" TEXT,
    "usageTime" TEXT,
    "duration" TEXT,
    "schedule" TEXT,
    "level" "Level",
    "neededBy" TEXT,
    "budgetRange" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'approved',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "Post"("category");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- CreateIndex
CREATE INDEX "SocialLink_postId_idx" ON "SocialLink"("postId");

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
