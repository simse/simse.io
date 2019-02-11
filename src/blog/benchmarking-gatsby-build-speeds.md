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
