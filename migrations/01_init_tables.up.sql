CREATE TABLE posts (
    id            TEXT PRIMARY KEY,
    title         TEXT NOT NULL,
    html          TEXT,
    created       DATETIME NOT NULL,
    updated       DATETIME NOT NULL,
    published     DATETIME,
    featured_image TEXT,
    status        TEXT NOT NULL
);