import { useEffect, useState } from 'preact/hooks'

import WindowFrame from '../WindowFrame'
import type { WindowProps } from '../types'
import { formatDateWithYear } from '@utils/date'
import BlogPost from './BlogPost'
import client from 'src/api'

interface BlogListProps extends WindowProps {
}

const BlogList = (props: BlogListProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [posts, setPosts] = useState<{
    title: string;
    slug: string;
    published: string;
  }[]>([])

  const openWindow = props.openWindow

  const loadPosts = async () => {
    const { data, error } = await client.api.posts.get()

    if (error === null) {
      setPosts(data)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <WindowFrame
      title="Blog"
      initialSize={{ width: 500, height: 650 }}
      initialPosition={{ x: 550, y: 20 }}
      {...props}
    >
      <div class="flex flex-col h-full">
        <ul>
          {posts.map((post) => (
            <li class="flex mb-2 pb-2 border-b border-black last:border-transparent items-center">
              <div class="bg-red-100 w-14 h-14 mr-4" />

              <button
                class={`text-left p-1 border border-dotted border-transparent ${selectedPost === post.slug ? 'bg-black text-white border-white' : ''}`}
                onClick={() => {
                  openWindow({
                    title: 'Blog Post',
                    component: BlogPost,
                    postSlug: post.slug,
                    type: 'blogPost',
                    id: `blog-${post.slug}`,
                    meta: {
                      title: post.title,
                      description: 'A blog post',
                      path: `/blog/${post.slug}`,
                    },
                  })
                }}
              >
                <span class="text-xl leading-none">{post.title}</span>
                <p class="font-sans-alt text-[0.65rem]">
                  {formatDateWithYear(new Date(post.published))}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <div class="flex-1 w-full" onClick={() => setSelectedPost(null)} />
      </div>
    </WindowFrame>
  )
}

export default BlogList
