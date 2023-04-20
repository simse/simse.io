CREATE TABLE posts (
    id            TEXT PRIMARY KEY,
    slug          TEXT NOT NULL,
    title         TEXT NOT NULL,
    html          TEXT,
    excerpt       TEXT NOT NULL,
    tags            TEXT,
    created       DATETIME NOT NULL,
    updated       DATETIME NOT NULL,
    published     DATETIME NOT NULL,
    featured_image TEXT,
    status        TEXT NOT NULL
);

CREATE TABLE post_categories (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    slug          TEXT NOT NULL,
    description   TEXT,
    created       DATETIME NOT NULL,
    updated       DATETIME NOT NULL
);

CREATE TABLE post_to_categories (
    post_id       TEXT NOT NULL,
    category_id   TEXT NOT NULL,
    PRIMARY KEY (post_id, category_id)
);