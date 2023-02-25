/*
  Warnings:

  - A unique constraint covering the columns `[product_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_product_code_key" ON "Product"("product_code");
