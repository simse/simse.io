-- Create a new table with the desired schema
CREATE TABLE posts_new (
    id            TEXT PRIMARY KEY,
    title         TEXT NOT NULL,
    html          TEXT,
    created       DATETIME NOT NULL,
    updated       DATETIME NOT NULL,
    published     DATETIME NOT NULL,
    featured_image TEXT,
    status        TEXT NOT NULL
);

-- Copy the data from the old table to the new one
INSERT INTO posts_new (id, title, html, created, updated, published, featured_image, status)
SELECT id, title, html, created, updated, published, featured_image, status
FROM posts
WHERE published IS NOT NULL;

-- Drop the old table
DROP TABLE posts;

-- Rename the new table to the original name
ALTER TABLE posts_new RENAME TO posts;