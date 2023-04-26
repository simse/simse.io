package database

func GetPosts() ([]Post, error) {
	rows, err := GetActiveConn().Query("SELECT id, slug, title, COALESCE(html, ''), excerpt, created, updated, published, COALESCE(featured_image, ''), status FROM posts WHERE status = 'publish' ORDER BY published DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var post Post
		err = rows.Scan(&post.ID, &post.Slug, &post.Title, &post.HTML, &post.Excerpt, &post.Created, &post.Updated, &post.Published, &post.FeaturedImage, &post.Status)
		if err != nil {
			return nil, err
		}

		posts = append(posts, post)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}

func GetPostBySlug(slug string) (Post, error) {
	var post Post
	err := GetActiveConn().QueryRow("SELECT id, slug, title, COALESCE(html, ''), excerpt, created, updated, published, COALESCE(featured_image, ''), status FROM posts WHERE slug = ?", slug).Scan(&post.ID, &post.Slug, &post.Title, &post.HTML, &post.Excerpt, &post.Created, &post.Updated, &post.Published, &post.FeaturedImage, &post.Status)
	if err != nil {
		return Post{}, err
	}

	return post, nil
}
