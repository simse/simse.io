-- Create a new table with the original schema
CREATE TABLE posts_original (
    id            TEXT PRIMARY KEY,
    title         TEXT NOT NULL,
    html          TEXT,
    created       DATETIME NOT NULL,
    updated       DATETIME NOT NULL,
    published     DATETIME,
    featured_image TEXT,
    status        TEXT NOT NULL
);

-- Copy the data from the current table to the new one
INSERT INTO posts_original (id, title, html, created, updated, published, featured_image, status)
SELECT id, title, html, created, updated, published, featured_image, status
FROM posts;

-- Drop the current table
DROP TABLE posts;

-- Rename the new table to the original name
ALTER TABLE posts_original RENAME TO posts;