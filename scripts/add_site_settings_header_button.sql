-- One-off: add header button columns to an existing site_settings table.
-- Run BEFORE restarting the server (sequelize.sync() does not alter existing tables).
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS header_button_text VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS header_button_link VARCHAR(255) NOT NULL DEFAULT '';
