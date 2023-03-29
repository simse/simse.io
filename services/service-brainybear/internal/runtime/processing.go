package runtime

import (
	"regexp"
	"strings"

	"github.com/simse/simse.io/services/service-brainybear/internal/types"
)

func ProcessMessage(message types.Message) types.Message {
	// user messages are not processed
	if message.Entity == "user" {
		return message
	}

	// look for fully formed data request
	r, _ := regexp.Compile(`(DISPLAY|GET) (\/[a-zA-Z0-9&?=_-]*)`)
	matches := r.FindAllString(message.Message, -1)

	if len(matches) > 0 {
		for _, match := range matches {
			// process data request
			result := HandleRequest(match)

			// replace data request with result
			message.Message = strings.Replace(message.Message, match, "", 1)

			// add result to message
			message.Cards = append(message.Cards, result...)
		}
	}

	// look for partially formed data request and remove
	r, _ = regexp.Compile(`(GET\s|GE\s|G\s)`)

	message.Message = r.ReplaceAllString(message.Message+" ", "")

	return message
}
