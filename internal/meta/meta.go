package meta

import (
	"errors"
	"os"
)

type Meta struct {
	App                 string
	AllocationID        string
	Region              string
	HumanReadableRegion string
	Primary             bool
	Environment         string
}

var CurrentMeta Meta

var regionToCity = map[string]string{
	"ams": "Amsterdam, Netherlands",
	"arn": "Stockholm, Sweden",
	"bog": "Bogotá, Colombia",
	"bos": "Boston, Massachusetts",
	"cdg": "Paris, France",
	"den": "Denver, Colorado",
	"dfw": "Dallas, Texas",
	"ewr": "Secaucus, New Jersey",
	"fra": "Frankfurt, Germany",
	"gdl": "Guadalajara, Mexico",
	"gig": "Rio de Janeiro, Brazil",
	"gru": "Sao Paulo, Brazil",
	"hkg": "Hong Kong",
	"iad": "Ashburn, Virginia",
	"jnb": "Johannesburg, South Africa",
	"lax": "Los Angeles, California",
	"lhr": "London, United Kingdom",
	"maa": "Chennai, India",
	"mad": "Madrid, Spain",
	"mia": "Miami, Florida",
	"nrt": "Tokyo, Japan",
	"ord": "Chicago, Illinois",
	"otp": "Bucharest, Romania",
	"qro": "Querétaro, Mexico",
	"scl": "Santiago, Chile",
	"sea": "Seattle, Washington",
	"sin": "Singapore",
	"sjc": "San Jose, California",
	"syd": "Sydney, Australia",
	"waw": "Warsaw, Poland",
	"yul": "Montreal, Canada",
	"yyz": "Toronto, Canada",
	"kut": "Kingston upon Thames, United Kingdom",
}

func init() {
	CurrentMeta.App = os.Getenv("FLY_APP_NAME")
	CurrentMeta.AllocationID = os.Getenv("FLY_ALLOC_ID")
	CurrentMeta.Region = os.Getenv("FLY_REGION")
	CurrentMeta.Environment = "prod"
	CurrentMeta.Primary = IsPrimary()

	if os.Getenv("FLY_REGION") == "kut" {
		CurrentMeta.AllocationID = "dev"
		CurrentMeta.Environment = "dev"
		CurrentMeta.Primary = true
	}

	// set human readable region, fallback to region if not found
	if val, ok := regionToCity[CurrentMeta.Region]; ok {
		CurrentMeta.HumanReadableRegion = val
	} else {
		CurrentMeta.HumanReadableRegion = CurrentMeta.Region
	}
}

func IsPrimary() bool {
	return CurrentMeta.Region == "lhr"

	// if /litefs does not exist, return false
	if _, err := os.Stat("/litefs"); errors.Is(err, os.ErrNotExist) {
		return false
	}

	// return true if /litefs/.primary does not exist
	if _, err := os.Stat("/litefs/.primary"); errors.Is(err, os.ErrNotExist) {
		return true
	}

	return false
}
