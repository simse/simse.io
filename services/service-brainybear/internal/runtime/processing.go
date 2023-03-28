package runtime

import (
	"encoding/json"
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

			// marshal to json
			var jsonResult []byte
			jsonResult, _ = json.Marshal(result)

			// replace data request with result
			message.Message = strings.Replace(message.Message, match, string(jsonResult), 1)
		}
	}

	return message
}
