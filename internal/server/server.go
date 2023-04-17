package server

import (
	"net/http"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/jet"
	"github.com/jfyne/live"
	"github.com/simse/simse.io/internal/templates"
)

/*
func handler(c ) {
	w.Header().Set("Content-Type", "text/html")

	// Fprintf formats the string to a writer
	if err := templates["index.html"].Execute(w, nil); err != nil {
		log.Println(err)
	}

	fmt.Println("Hello World")
}*/

func StartServer() {
	// load templates
	engine := jet.NewFileSystem(http.FS(templates.Files), ".jet")
	engine.Debug(true)

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("pages/index", fiber.Map{})
	})

	app.Static("/static", "./static", fiber.Static{
		Compress: true,
	})
	app.Get("/static/live.js", adaptor.HTTPHandler(live.Javascript{}))
	app.Get("/static/auto.js.map", adaptor.HTTPHandler(live.JavascriptMap{}))

	app.Listen(":3000")
}
