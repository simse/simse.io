package server

import (
	"net/http"
	"time"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/template/jet"
	"github.com/jfyne/live"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/templates"
)

type ServerInfo struct {
	Region string
}

func StartServer() {
	// load templates
	engine := jet.NewFileSystem(http.FS(templates.Files), ".jet")
	engine.Debug(true)
	engine.AddFunc("formatDate", func(date time.Time) string {
		return date.Format("January 2, 2006")
	})

	app := fiber.New(fiber.Config{
		Views:                 engine,
		DisableStartupMessage: true,
		ServerHeader:          "Microsoft-IIS/7.5",
	})

	app.Use(requestid.New())

	// enable logging
	app.Use(func(c *fiber.Ctx) error {
		requestid := c.Locals("requestid").(string)

		log.Info().Str("method", c.Method()).Str("path", c.Path()).Str("ip", c.IP()).Str("request_id", requestid).Msg("request")
		return c.Next()
	})

	// enable compression
	app.Use(compress.New())

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

	app.Get("/posts", PostsIndex)
	app.Get("/posts/:slug", PostRoute)

	app.Static("/static", "./static", fiber.Static{
		Compress: true,
	})
	app.Get("/static/live.js", adaptor.HTTPHandler(live.Javascript{}))
	app.Get("/static/auto.js.map", adaptor.HTTPHandler(live.JavascriptMap{}))
	app.Get("/_image", imageHandler)

	log.Info().Str("address", "0.0.0.0").Int("port", 3000).Msg("server started")
	app.Listen(":3000")
}
