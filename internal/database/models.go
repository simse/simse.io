package database

import (
	"database/sql/driver"
	"fmt"
	"strings"
	"time"
)

type Post struct {
	ID            string
	Slug          string
	Title         string
	HTML          string
	Excerpt       string
	Tags          TagSlice
	Created       time.Time
	Updated       time.Time
	Published     time.Time
	FeaturedImage string
	Status        string
}

type TagSlice []string

func (ts *TagSlice) Scan(value interface{}) error {
	if value == nil {
		*ts = []string{}
		return nil
	}

	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("invalid type for tags")
	}

	tags := strings.Split(str, ",")
	*ts = tags
	return nil
}

func (ts TagSlice) Value() (driver.Value, error) {
	return strings.Join(ts, ","), nil
}

type PostCategory struct {
	ID          string
	Name        string
	Slug        string
	Description string
	Created     time.Time
	Updated     time.Time
}

type Project struct {
	ID                   string
	Slug                 string
	Name                 string
	Subtitle             string
	Markdown             string
	SourceCode           string
	Demo                 string
	Status               string
	ProgrammingLanguages string
	DownloadsStat        string
}
