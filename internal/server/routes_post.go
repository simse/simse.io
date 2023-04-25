package server

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/simse/simse.io/internal/database"
)

func PostsIndex(c *fiber.Ctx) error {
	posts, err := database.GetPosts()
	if err != nil {
		return err
	}

	fmt.Println(posts)

	return c.Render("pages/posts", fiber.Map{
		"pageTitle": "Posts — Simon Sorensen",
		"posts":     posts,
	}, "layouts/content")
}

func PostRoute(c *fiber.Ctx) error {
	post, err := database.GetPostBySlug(c.Params("slug"))
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.Render("pages/post", fiber.Map{
		"pageTitle": post.Title + " — Simon Sorensen",
		"post":      post,
	}, "layouts/content")
}
