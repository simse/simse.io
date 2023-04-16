package server

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
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
	engine := html.NewFileSystem(http.FS(templates.Files), ".html")
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

	app.Listen(":3000")
}
