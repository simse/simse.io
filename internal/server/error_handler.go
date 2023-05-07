package server

import (
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog/log"
)

var errorCodeToTitle = map[int]string{
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Page Not Found",
	405: "Method Not Allowed",
	408: "Request Timeout",
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
}

var errorCodeToDescription = map[int]string{400: "Oops! I can't understand your alien language; seems like a syntax hiccup.", 401: "Hold up! I need to see some ID; authentication is missing here.", 403: "I get what you're asking for, but I just can't let you have it.", 404: "This is like finding a needle in a haystack that isn't there.", 405: "You're trying to use a hammer on a screw! That method isn't allowed.", 408: "You took too long, and I got tired of waiting.", 500: "Yikes! I stumbled upon something unexpected and couldn't fulfill your request.", 501: "I'm sorry, but I can't do that; the required functionality is missing.", 502: "As a gateway or proxy, I got a weird response from the upstream server.", 503: "I'm swamped right now; please try again after a short break.", 504: "As a gateway or proxy, I didn't get a timely response from the upstream server."}

func errorHandler(ctx *fiber.Ctx, err error) error {
	// Status code defaults to 500
	code := fiber.StatusInternalServerError

	// Retrieve the custom status code if it's a *fiber.Error
	var e *fiber.Error
	if errors.As(err, &e) {
		code = e.Code
	}

	log.Info().Int("error_code", code).Str("path", ctx.Path()).Msg("error handler triggered")

	// find error title and description, fallback to default
	title, ok := errorCodeToTitle[code]
	if !ok {
		title = errorCodeToTitle[500]
	}
	description, ok := errorCodeToDescription[code]
	if !ok {
		description = errorCodeToDescription[500]
	}

	// Send custom error page
	err = ctx.Status(code).Render("pages/error", fiber.Map{
		"pageTitle":        title + " — Simon Sorensen",
		"error":            title,
		"errorCode":        code,
		"errorDescription": description,
	}, "layouts/error")
	if err != nil {
		log.Error().Err(err).Msg("failed to render error page")

		errorMessage := fmt.Sprintf("The error code was %d, but rendering the error page failed, so now it's 500.", code)
		if code == 500 {
			errorMessage = "Rendering the error page failed, it's 500."
		}

		// In case the SendFile fails
		return ctx.Status(fiber.StatusInternalServerError).SendString(errorMessage)
	}

	// Return from handler
	return nil
}
