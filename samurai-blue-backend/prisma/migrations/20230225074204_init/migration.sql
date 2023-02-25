-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "stripeAccount" TEXT,
    "from_name" TEXT,
    "from_phone_number" TEXT,
    "from_email" TEXT,
    "from_address_postcode" TEXT,
    "from_address_address1" TEXT,
    "from_address_country" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "weightInGrams" INTEGER,
    "SKU" TEXT,
    "imageurl" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "productId" INTEGER,
    "status" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NinjavanOrder" (
    "id" SERIAL NOT NULL,
    "service_type" TEXT NOT NULL,
    "service_level" TEXT NOT NULL,
    "merchant_order_number" TEXT NOT NULL,
    "ordersId" INTEGER,
    "to_name" TEXT NOT NULL,
    "to_phone_number" TEXT NOT NULL,
    "to_email" TEXT NOT NULL,
    "to_address_postcode" TEXT NOT NULL,
    "to_address_address1" TEXT NOT NULL,
    "to_address_country" TEXT NOT NULL,
    "collection_point" TEXT NOT NULL,
    "parcel_job_delivery_start_date" TEXT NOT NULL,
    "parcel_job_delivery_timeslot" TEXT NOT NULL,
    "parcel_job_is_pickup_required" BOOLEAN NOT NULL,

    CONSTRAINT "NinjavanOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NinjavanOrder" ADD CONSTRAINT "NinjavanOrder_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
