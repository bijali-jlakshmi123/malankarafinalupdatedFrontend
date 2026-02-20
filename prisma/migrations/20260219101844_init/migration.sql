-- CreateTable
CREATE TABLE "hero_slides" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "link" TEXT,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_items" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "navigation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "siteName" TEXT NOT NULL DEFAULT 'Malankara Palace',
    "siteTagline" TEXT NOT NULL DEFAULT 'LAKE VIEW RESORT & SPA',
    "bookNowUrl" TEXT,
    "whatsappNumber" TEXT,
    "logoUrl" TEXT,
    "phoneNumbers" TEXT NOT NULL DEFAULT '04862 204400,+91 75102 00444,+91 80862 00404',

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "hero_slides_order_idx" ON "hero_slides"("order");

-- CreateIndex
CREATE INDEX "navigation_items_order_idx" ON "navigation_items"("order");
