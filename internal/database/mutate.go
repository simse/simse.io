package database

import gonanoid "github.com/matoous/go-nanoid/v2"

func InsertPost(post Post) error {
	id, _ := gonanoid.New()

	if post.ID == "" {
		post.ID = id
	}

	if post.Published.IsZero() {
		post.Published = post.Created
	}

	_, err := Conn.Exec(`
		INSERT INTO posts (id, slug, title, html, excerpt, created, updated, published, status, featured_image)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET
			slug = excluded.slug,
			title = excluded.title,
			html = excluded.html,
			excerpt = excluded.excerpt,
			created = excluded.created,
			updated = excluded.updated,
			published = excluded.published,
			status = excluded.status,
			featured_image = excluded.featured_image;
	`, post.ID, post.Slug, post.Title, post.HTML, post.Excerpt, post.Created, post.Updated, post.Published, post.Status, post.FeaturedImage)

	return err
}
