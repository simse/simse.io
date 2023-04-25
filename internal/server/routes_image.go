package server

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

type imageHandlerInput struct {
	URL     string `query:"url"`
	Width   int    `query:"width"`
	Height  int    `query:"height"`
	Quality int    `query:"quality"`
}

func imageHandler(c *fiber.Ctx) error {
	input := new(imageHandlerInput)
	if err := c.QueryParser(input); err != nil {
		return err
	}

	if input.URL == "" {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if input.Quality == 0 {
		input.Quality = 80
	}

	// create temporary file
	file, err := os.CreateTemp("", "image")
	if err != nil {
		fmt.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer os.Remove(file.Name())

	// download image
	resp, err := http.Get(fmt.Sprintf("https://image.sorensen.cloud/unsafe/%dx%d/smart/filters:format(webp):quality(%d)/%s", input.Width, input.Height, input.Quality, input.URL))
	if err != nil {
		fmt.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer resp.Body.Close()

	// write image to file
	_, err = io.Copy(file, resp.Body)
	if err != nil {
		fmt.Println(err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.SendFile(file.Name(), true)
}
