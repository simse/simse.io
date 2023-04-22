package wordpress

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestGetPostsForStatus(t *testing.T) {
	// Set up a mock HTTP server to respond to requests
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check that the request URL and query parameters are correct
		if r.URL.Path != "/posts" {
			t.Errorf("unexpected path %q", r.URL.Path)
		}
		if r.URL.Query().Get("per_page") != "100" {
			t.Errorf("unexpected per_page value %q", r.URL.Query().Get("per_page"))
		}
		if r.URL.Query().Get("status") != "publish" {
			t.Errorf("unexpected status value %q", r.URL.Query().Get("status"))
		}

		// Respond with some example data
		fmt.Fprintln(w, `[{"id":21,"date":"2023-04-19T00:20:05","date_gmt":"2023-04-18T23:20:05","guid":{"rendered":"http:\/\/simse-wp.internal.sorensen.cloud\/?p=21"},"modified":"2023-04-19T00:20:05","modified_gmt":"2023-04-18T23:20:05","slug":"rebuilding-my-personal-website-is-my-vice","status":"publish","type":"post","link":"https:\/\/simse-wp.sorensen.cloud\/post\/rebuilding-my-personal-website-is-my-vice\/","title":{"rendered":"Rebuilding my personal website is my vice"},"content":{"rendered":"\n<p>It&#8217;s an addiction. Guilty pleasure?<\/p>\n\n\n\n<p>I can&#8217;t off the top of my head remember how many versions of this website exists. But I&#8217;ve had a look through the git history, and I&#8217;ve rebuilt simse.io 3 times before.<\/p>\n\n\n\n<p>I thougt it would be more than that. Probably because I&#8217;ve written maybe 10 or so blog posts\/articles in the previous 4 years. I just don&#8217;t have time to write, when I&#8217;m constantly working on either building the next version, or improving the current one.<\/p>\n\n\n\n<p>Asking around, it doesn&#8217;t seem so uncommon.<\/p>\n\n\n\n<pre class=\"wp-block-code\"><code lang=\"rust\" class=\"language-rust\"><\/code><\/pre>\n\n\n\n<p><\/p>\n","protected":false},"excerpt":{"rendered":"<p>It&#8217;s an addiction. Guilty pleasure? I can&#8217;t off the top of my head remember how many versions of this website exists. But I&#8217;ve had a look through the git history, and I&#8217;ve rebuilt simse.io 3 times before. I thougt it would be more than that. Probably because I&#8217;ve written maybe 10 or so blog posts\/articles [&hellip;]<\/p>\n","protected":false},"author":1,"featured_media":0,"comment_status":"closed","ping_status":"closed","sticky":false,"template":"","format":"standard","meta":[],"categories":[1],"tags":[5,4],"_links":{"self":[{"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/posts\/21"}],"collection":[{"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/posts"}],"about":[{"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/types\/post"}],"author":[{"embeddable":true,"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/users\/1"}],"replies":[{"embeddable":true,"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/comments?post=21"}],"version-history":[{"count":2,"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/posts\/21\/revisions"}],"predecessor-version":[{"id":26,"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/posts\/21\/revisions\/26"}],"wp:attachment":[{"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/media?parent=21"}],"wp:term":[{"taxonomy":"category","embeddable":true,"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/categories?post=21"},{"taxonomy":"post_tag","embeddable":true,"href":"https:\/\/simse-wp.sorensen.cloud\/wp-json\/wp\/v2\/tags?post=21"}],"curies":[{"name":"wp","href":"https:\/\/api.w.org\/{rel}","templated":true}]}}]`)
	}))
	defer server.Close()

	// Set the WORDPRESS_URL environment variable to the mock server URL
	os.Setenv("WORDPRESS_URL", server.URL)

	// Call the function with the "published" status
	posts, err := getPostsForStatus("publish")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	// Check that the returned posts are as expected
	if len(posts) != 1 {
		t.Fatalf("unexpected number of posts: %d", len(posts))
	}
	if posts[0].Title.Rendered != "Rebuilding my personal website is my vice" {
		t.Errorf("unexpected post data: %v", posts[0])
	}
	/*if posts[1].ID != 2 || posts[1].Title.Rendered != "Second post" {
		t.Errorf("unexpected post data: %v", posts[1])
	}*/
}
