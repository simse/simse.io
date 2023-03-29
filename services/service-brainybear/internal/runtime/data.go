package runtime

import (
	"encoding/json"
	"os"
	"strings"

	"github.com/imroc/req/v3"
	"github.com/simse/simse.io/services/service-brainybear/internal/types"
)

type DataRequest struct {
	URL          string      `json:"url"`
	Error        bool        `json:"error"`
	ErrorMessage string      `json:"error_message"`
	Response     interface{} `json:"response"`
}

func HandleRequest(request string) []types.Card {
	// remove GET or DISPLAY
	request = strings.Replace(request, "GET ", "", 1)
	request = strings.Replace(request, "DISPLAY ", "", 1)

	// make request
	response, requestError := MakeRequest(request)
	if requestError != nil {
		return []types.Card{
			{
				Title: "Error fetching data",
				Body:  "Error: " + requestError.Error(),
			},
		}
	}

	var cards []types.Card
	json.Unmarshal(response, &cards)

	return cards
}

func MakeRequest(path string) ([]byte, error) {
	url := os.Getenv("CONTENT_API_URL") + path

	result := req.MustGet(url)

	return result.Bytes(), nil
}
