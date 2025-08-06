/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "public".cartitem_id_seq;
ALTER TABLE "public"."CartItem" ALTER COLUMN "id" SET DEFAULT nextval('"public".cartitem_id_seq');
ALTER SEQUENCE "public".cartitem_id_seq OWNED BY "public"."CartItem"."id";

-- AlterTable
CREATE SEQUENCE "public".product_id_seq;
ALTER TABLE "public"."Product" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('"public".product_id_seq');
ALTER SEQUENCE "public".product_id_seq OWNED BY "public"."Product"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");
