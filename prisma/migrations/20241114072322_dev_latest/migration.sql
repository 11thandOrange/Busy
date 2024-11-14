-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admin_language" TEXT,
    "lazY_load_images" BOOLEAN NOT NULL DEFAULT false,
    "change_setting" BOOLEAN NOT NULL DEFAULT false,
    "color_theme" TEXT NOT NULL DEFAULT 'light',
    "global_customizations" TEXT
);
