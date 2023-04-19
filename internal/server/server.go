package server

import (
	"net/http"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/jet"
	"github.com/jfyne/live"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/templates"
	"github.com/simse/simse.io/internal/wordpress"
)

func StartServer() {
	// load templates
	engine := jet.NewFileSystem(http.FS(templates.Files), ".jet")
	engine.Debug(true)

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	// enable logging
	app.Use(func(c *fiber.Ctx) error {
		log.Info().Str("method", c.Method()).Str("path", c.Path()).Str("ip", c.IP()).Msg("request")
		return c.Next()
	})

	// routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("pages/index", fiber.Map{
			"pageTitle": "Simon Sorensen — Classically Trained Software Engineer",
		}, "layouts/content")
	})

	app.Get("/sitemap", func(c *fiber.Ctx) error {
		return c.Render("pages/sitemap", fiber.Map{
			"pageTitle": "Sitemap — Simon Sorensen",
		}, "layouts/container")
	})

	app.Get("/article/:slug", func(c *fiber.Ctx) error {
		post, _ := wordpress.GetPostByID(21)

		return c.Render("pages/article", fiber.Map{
			"pageTitle": "Article — Simon Sorensen",
			"article":   post,
		}, "layouts/content")
	})

	app.Static("/static", "./static", fiber.Static{
		Compress: true,
	})
	app.Get("/static/live.js", adaptor.HTTPHandler(live.Javascript{}))
	app.Get("/static/auto.js.map", adaptor.HTTPHandler(live.JavascriptMap{}))
	app.Get("/_image", imageHandler)

	log.Info().Str("address", "0.0.0.0").Int("port", 3000).Msg("server started")
	app.Listen(":3000")
}
