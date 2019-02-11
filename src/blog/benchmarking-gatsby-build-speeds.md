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
