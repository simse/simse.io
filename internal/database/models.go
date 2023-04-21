package database

import "time"

type Post struct {
	ID            string
	Slug          string
	Title         string
	HTML          string
	Excerpt       string
	Tags          []string
	Created       time.Time
	Updated       time.Time
	Published     time.Time
	FeaturedImage string
	Status        string
}

type PostCategory struct {
	ID          string
	Name        string
	Slug        string
	Description string
	Created     time.Time
	Updated     time.Time
}
