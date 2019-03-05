---
date: 2019-02-11T12:15:57.926Z
title: Benchmarking Gatsby build speeds
subtitle: 'They say it''s "blazing fast", but how fast can it be?'
category: Javascript
tags:
  - Gatsy
  - react
  - static site generator
image: /assets/space_shuttle.jpeg
type: blog
---
[Gatsby](https://www.gatsbyjs.org/) is a static site generator that's powered by React. It's extremely fast, and just great. One of the upsides with using a static site, is that you can host them on CDNs and often for free. This very site is built using Gatsby and hosted on Netlify, and it doesn't cost me a penny. To top it off, the site is quick as a cheetah.

To generate a static site, Gatsby has a build process. During this process, a lot of things happen. JS and CSS is compiled. You can use SASS, LESS, PostCSS CSS-in-JS, really whatever floats your boat, and Gatsby will compile it. It can also compress and generate different sizes for all your images. It will run GraphQL queries, if you have something like a blog on your website. But this raises the question; how well does Gatsby scale?

Well, since the site is static, the size is irelevant for the speed of the site. But the build time, must increase as the size does. I wanted to put this to the test, so I took this site, and benchmarked the build times as the blog post increased in numbers. The reason this is interesting, is first of all, Netlify and many other hosting providers have build time limits. And if your site takes 4 hours to build, is it really worth it? Alright, enough rambling, let's see how Gatsby scales!

To test this out, I wrote a small script in Python, to generate blog posts pulling an image from Unsplash, and generating some text. I ran it on my Windows 10 machine with no background processes running. The system config is not very relevant, because it's not neccesarily about how _fast_ it is, but about how much _slower_ it gets, as it scales.

## Baseline performance

On average, it takes 32 seconds to build simse.io without any blog posts or image processing. Nice.

## Performance with blog posts

Let's see how well Gatsby scales with an increasing amount of posts, with **no** image processing.

![Linear growth; as blog post increases, so does build time](/assets/graph.png "Build time graphed against blog post number")

This graph is mighty interesting. It shows that Gatsby build times is indeed linear. What that means, is that as blog post amount increases, so does build time, and that they're proportional. This is fantastic, because that means that there is no point where the Gatsby build process is no longer efficient.

However, it looks like images are about to spoil our fun.

## Performance with blog posts _and_ featured images

Unfortunately, I can't present the same graph for this set of data, because it's actually quite different. You'll find that the growth is still linear, such that the more picture there are, the longer it takes to build. However, the slope of the graph is much, much steeper. Once you have around 50 very large images, the build time is about 10 minutes (very much depending on image size and processing involved).

As I was looking at the bad news, I noticed something incredible. Gatsby has an absolutely fantastic cache. While building, Gatsby won't process old pictures again, meaning that build times will remain low, as long as you only a couple of new pictures per post (or any other update).

So yes, if you have 1000 high resolution images that needs to be processed for fluid implementation, the build could easily take an hour to complete. But writing 1000 posts with high resolution images over the span of a year, won't drag down the build time.

The fact of the matter is, that it seems there is no particular size where Gatsby hits a breaking point. A point where it can no longer build fast enough to be useful. This is in part due to it being legimately fast (2000+ pages in one minute, _not bad_) and its fantastic cache.

If you want to implement the caching when using Netlify, check out [this plugin](https://github.com/axe312ger/gatsby-plugin-netlify-cache).
