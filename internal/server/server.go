package server

import (
	"net/http"
	"os"
	"time"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/template/jet"
	"github.com/jfyne/live"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/tasks"
	"github.com/simse/simse.io/internal/templates"
)

type ServerInfo struct {
	Region string
}

type (
	Host struct {
		Fiber *fiber.App
	}
)

func StartServer() {
	// load templates
	engine := jet.NewFileSystem(http.FS(templates.Files), ".jet")
	engine.Debug(true)
	engine.AddFunc("formatDate", func(date time.Time) string {
		return date.Format("January 2, 2006")
	})

	hosts := map[string]*Host{}

	rootApp := fiber.New(fiber.Config{
		Views:        engine,
		ServerHeader: "Microsoft-IIS/7.5",
	})

	// routes
	rootApp.Get("/", func(c *fiber.Ctx) error {
		return c.Render("pages/index", fiber.Map{
			"pageTitle": "Simon Sorensen — Classically Trained Software Engineer",
		}, "layouts/content")
	})

	rootApp.Get("/sitemap", func(c *fiber.Ctx) error {
		return c.Render("pages/sitemap", fiber.Map{
			"pageTitle": "Sitemap — Simon Sorensen",
		}, "layouts/container")
	})

	rootApp.Get("/projects", func(c *fiber.Ctx) error {
		return c.Render("pages/projects", fiber.Map{
			"pageTitle": "My Projects — Simon Sorensen",
		}, "layouts/container")
	})

	rootApp.Get("/posts", PostsIndex)
	rootApp.Get("/posts/:slug", PostRoute)

	rootApp.Static("/static", "./static", fiber.Static{
		Compress:      true,
		CacheDuration: 30 * 24 * time.Hour,
	})
	rootApp.Get("/static/live.js", adaptor.HTTPHandler(live.Javascript{}))
	rootApp.Get("/static/auto.js.map", adaptor.HTTPHandler(live.JavascriptMap{}))
	rootApp.Get("/_image", imageHandler)

	rootApp.Get("/webhook/wordpress", func(c *fiber.Ctx) error {
		tasks.AddTask(tasks.NewSyncWordpressTask())

		return c.SendString("OK")
	})

	hosts[os.Getenv("SIMSE_IO_HOST")] = &Host{Fiber: rootApp}

	log.Info().Str("address", "0.0.0.0").Int("port", 3000).Msg("server started")
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
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
	app.Use(func(c *fiber.Ctx) error {
		host := hosts[c.Hostname()]
		if host == nil {
			return c.SendStatus(fiber.StatusNotFound)
		} else {
			host.Fiber.Handler()(c.Context())
			return nil
		}
	})
	app.Listen(":3000")
}
