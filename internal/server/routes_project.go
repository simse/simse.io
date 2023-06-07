package server

import "github.com/simse/simse.io/internal/database"

var projects = map[string]database.Project{
	"pymitv": {
		ID:       "pymitv",
		Slug:     "pymitv",
		Name:     "pymitv",
		Subtitle: "A Python library for controlling your Xiaomi Mi TV",
		Markdown: `## Introduction
This package was developed to interface with the Xiaomi TV 3 series through their local HTTP API using Python. The package has both the ability to discover TVs and control them. The TV lineup in question is this [one.](http://www.mi.com/en/mitv3s/65/) It should be noted, that all the TV logic and hardware is in the soundbar. Thus, if you have a soundbar that looks identical to the one in the picture, you should be golden with this library.

##### Supported models
- Mi TV 3s (all sizes)

##### Not sure if supported models
- Mi TV 4A (all sizes)
- Mi TV 4c (all sizes)`,
		SourceCode:           "https://github.com/simse/pymitv",
		Status:               "Archived",
		ProgrammingLanguages: "Python",
		DownloadsStat:        "pypi:pymitv",
	},
	"chronos": {
		ID:                   "chronos",
		Slug:                 "chronos",
		Name:                 "Chronos",
		Subtitle:             "An application to schedule Python scripts",
		Markdown:             `# pymitv`,
		SourceCode:           "https://github.com/simse/chronos",
		Status:               "Archived",
		ProgrammingLanguages: "Python & Javascript",
		DownloadsStat:        "dockerhub:chronos",
	},
	"sussex-cli": {
		ID:                   "sussex-cli",
		Slug:                 "sussex-cli",
		Name:                 "Sussex Direct CLI",
		Subtitle:             "CLI to show grades and attendance at the University of Sussex",
		Markdown:             `# pymitv`,
		SourceCode:           "https://github.com/simse/sussex",
		Status:               "Archived",
		ProgrammingLanguages: "Python",
		DownloadsStat:        "pypi:sussex",
	},
}
