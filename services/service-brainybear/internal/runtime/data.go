package runtime

import (
	"os"
	"strings"

	"github.com/imroc/req/v3"
)

type DataRequest struct {
	URL          string      `json:"url"`
	Error        bool        `json:"error"`
	ErrorMessage string      `json:"error_message"`
	Response     interface{} `json:"response"`
}

func HandleRequest(request string) DataRequest {
	// remove GET or DISPLAY
	request = strings.Replace(request, "GET ", "", 1)
	request = strings.Replace(request, "DISPLAY ", "", 1)

	// make request
	response, requestError := MakeRequest(request)
	errorMessage := ""
	if requestError != nil {
		errorMessage = requestError.Error()
	}

	return DataRequest{
		URL:          request,
		Error:        requestError != nil,
		ErrorMessage: errorMessage,
		Response:     string(response),
	}
}

func MakeRequest(path string) ([]byte, error) {
	url := os.Getenv("CONTENT_API_URL") + path

	result := req.MustGet(url)

	return result.Bytes(), nil
}
