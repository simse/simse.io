---
title: How I got my Github username
published: 2023-12-19
tags: 
    - Yapping
---
My username on Github and everywhere else I can get is `simse`. It's a nickname from my childhood I'm very fond of. The only problem is that it wasn't available on Github.

I was devastated... I think. This was 9 years ago. What was a 13 year old lad to do?

I reached out to Github Support, hat in hand, and I asked if I could have the username. The owner at the time did not seem to be using his Github profile, so I thought maybe there was a chance.

They said they couldn't give it to me outright, because it didn't meet the inactivity requirements. However, they would forward exactly one message from me if I was interested.

And I _was_ interested. So I crafted a message, pleading for the username. And it worked! The guy who had it before me, wished me luck and hoped I would publish lots of projects.

It's a short and relatively straightforward story. But it's one I cherish. Not only because I succeeded, but because of Github Support.

It's rare to reach real humans that aren't just responding using a script. At least that's what it feels like to me. Maybe Github is the same nowadays? I don't know, I haven't needed help since then.

```js
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  integrations: [
    tailwind(), 
    mdx(), 
    markdoc(), 
    icon(), 
    preact(),
  ],
  image: {
    service: passthroughImageService()
  },
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
```