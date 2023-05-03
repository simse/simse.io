package server

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/simse/simse.io/internal/database"
)

func PostsIndex(c *fiber.Ctx) error {
	posts, err := database.GetPosts()
	if err != nil {
		return err
	}

	return c.Render("pages/posts", fiber.Map{
		"pageTitle":       "Posts — Simon Sorensen",
		"pageDescription": "A collection of whimsical posts about artifical intelligence, machine learning and building fast software.",
		"posts":           posts,
	}, "layouts/content")
}

func PostRoute(c *fiber.Ctx) error {
	post, err := database.GetPostBySlug(c.Params("slug"))
	if err != nil {
		return fiber.ErrNotFound
	}

	return c.Render("pages/post", fiber.Map{
		"pageTitle":       post.Title + " — Simon Sorensen",
		"pageDescription": strings.Replace(post.Excerpt, "[…]", "", 1),
		"post":            post,
	}, "layouts/content")
}
