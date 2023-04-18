package server

import (
	"net/http"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/jet"
	"github.com/jfyne/live"
	"github.com/simse/simse.io/internal/templates"
)

func StartServer() {
	// load templates
	engine := jet.NewFileSystem(http.FS(templates.Files), ".jet")
	engine.Debug(true)

	app := fiber.New(fiber.Config{
		Views: engine,
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
		return c.Render("pages/article", fiber.Map{
			"pageTitle": "Article — Simon Sorensen",
			"article": map[string]interface{}{
				"title":    "We are now in AI terminology hell",
				"subtitle": "I suppose we always were, given that impressive AIs like GPT-4 is really \"just\" machine learning.",
			},
		}, "layouts/content")
	})

	app.Static("/static", "./static", fiber.Static{
		Compress: true,
	})
	app.Get("/static/live.js", adaptor.HTTPHandler(live.Javascript{}))
	app.Get("/static/auto.js.map", adaptor.HTTPHandler(live.JavascriptMap{}))
	app.Get("/_image", imageHandler)

	app.Listen(":3000")
}
