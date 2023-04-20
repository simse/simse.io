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
		INSERT INTO posts (id, title, html, created, updated, published, status)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, post.ID, post.Title, post.HTML, post.Created, post.Updated, post.Published, post.Status)

	return err
}
