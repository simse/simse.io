package server

import (
	"context"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/etag"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/template/jet"
	"github.com/jfyne/live"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/livefiber"
	"github.com/simse/simse.io/internal/meta"
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

var TimeoutTracker = time.NewTimer(5 * time.Minute)
var TimeoutEnabled = true

func shouldIndex() bool {
	if meta.CurrentMeta.Environment == "prod" && meta.CurrentMeta.App == "simse-prod" {
		return true
	}

	return false
}

func StartServer() {
	// load templates
	engine := jet.NewFileSystem(http.FS(templates.Files), ".jet")
	engine.Debug(true)
	engine.AddFunc("formatDate", func(date time.Time) string {
		return date.Format("January 2, 2006")
	})
	engine.AddFunc("currentRegion", func() string {
		return meta.CurrentMeta.HumanReadableRegion
	})
	engine.AddFunc("shouldIndex", shouldIndex)

	hosts := map[string]*Host{}

	rootApp := fiber.New(fiber.Config{
		Views:        engine,
		ErrorHandler: errorHandler,
	})
	rootApp.Use(recover.New())

	// routes
	/*rootApp.Get("/", func(c *fiber.Ctx) error {
		posts, err := database.GetPosts()
		if err != nil {
			return err
		}

		return c.Render("pages/index", fiber.Map{
			"pageTitle":       "Simon Sorensen — Classically Trained Software Engineer",
			"pageDescription": "Simon Sorensen is a classically trained software engineer based out of London. He loves everything Artificial Intelligence and Machine Learning.",
			"posts":           posts,
		}, "layouts/content")
	})*/
	frontpageHandler.HandleMount(func(ctx context.Context, s live.Socket) (interface{}, error) {
		// This will initialise the counter if needed.
		return newChat(s), nil
	})
	rootApp.Get("/", livefiber.NewHandler(session.New(), frontpageHandler).Handlers()...)

	rootApp.Get("/sitemap", func(c *fiber.Ctx) error {
		return c.Render("pages/sitemap", fiber.Map{
			"pageTitle": "Sitemap — Simon Sorensen",
		}, "layouts/container")
	})

	rootApp.Get("/design-system", func(c *fiber.Ctx) error {
		return c.Render("pages/design-system", fiber.Map{
			"pageTitle": "Design System for simse.io — Simon Sorensen",
		}, "layouts/container")
	})

	rootApp.Get("/projects", func(c *fiber.Ctx) error {
		return c.Render("pages/projects", fiber.Map{
			"pageTitle":       "My Projects — Simon Sorensen",
			"pageDescription": "All of my projects I have created over the years. Big and small, good and bad, it's here!",
		}, "layouts/container")
	})

	rootApp.Get("/posts", PostsIndex)
	rootApp.Get("/posts/:slug", PostRoute)

	rootApp.Get("/sitemap.xml", sitemapHandler)

	rootApp.Get("/_image", imageHandler)

	rootApp.Get("/webhook/wordpress", func(c *fiber.Ctx) error {
		go tasks.SyncWordpress()

		return c.SendString("OK")
	})
	rootApp.Post("/webhook/wordpress", func(c *fiber.Ctx) error {
		go tasks.SyncWordpress()

		return c.SendString("OK")
	})

	hosts[os.Getenv("SIMSE_IO_HOST")] = &Host{Fiber: rootApp}

	log.Info().Str("address", "0.0.0.0").Int("port", 3000).Msg("server started")
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
		ErrorHandler:          errorHandler,
		ProxyHeader:           "Fly-Client-IP",
	})
	app.Use(favicon.New(favicon.Config{
		File: "./static/favicon.ico",
		URL:  "/favicon.ico",
	}))
	app.Use(requestid.New())

	// enable ETag
	rootApp.Use(etag.New())
	rootApp.Static("/static", "./static", fiber.Static{
		Compress: true,
	})
	rootApp.Static("/", "./static", fiber.Static{
		Compress: true,
	})
	rootApp.Get("/static/live.js", adaptor.HTTPHandler(live.Javascript{}))
	rootApp.Get("/static/auto.js.map", adaptor.HTTPHandler(live.JavascriptMap{}))

	// enable logging
	app.Use(func(c *fiber.Ctx) error {
		if strings.Contains(c.Path(), "static") || strings.Contains(c.Path(), "_image") {
			return c.Next()
		}

		requestid := c.Locals("requestid").(string)

		log.Info().Str("method", c.Method()).Str("path", c.Path()).Str("ip", c.IP()).Str("request_id", requestid).Msg("request")
		return c.Next()
	})

	// enable compression
	app.Use(compress.New())

	// handle hostname routing
	app.Use(func(c *fiber.Ctx) error {
		host := hosts[c.Hostname()]
		if host == nil {
			return c.SendStatus(fiber.StatusNotFound)
		} else {
			// reset timeout if method is not HEAD
			if c.Method() != "HEAD" {
				TimeoutTracker.Reset(1 * time.Minute)
			}

			host.Fiber.Handler()(c.Context())
			return nil
		}
	})

	// start timeout listener
	if TimeoutEnabled {
		go func() {
			<-TimeoutTracker.C
			log.Info().Str("timeout", "1m").Msg("server timeout reached, shutting down")
			os.Exit(0)
		}()
	} else {
		log.Info().Msg("server timeout disabled")
	}

	// start server
	app.Listen(":3000")
}
