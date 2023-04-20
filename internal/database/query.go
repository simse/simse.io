package database

func GetPosts() ([]Post, error) {
	rows, err := Conn.Query("SELECT id, title, COALESCE(html, ''), created, updated, published, COALESCE(featured_image, ''), status FROM posts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var post Post
		err = rows.Scan(&post.ID, &post.Title, &post.HTML, &post.Created, &post.Updated, &post.Published, &post.FeaturedImage, &post.Status)
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
