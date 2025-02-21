<script lang="ts">
import CompactBubble from '@components/common/CompactBubble.svelte'
import type { Post } from '@lib/cms/posts'

const { post }: { post: Post } = $props()

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-gb', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<li class="my-8">
  <CompactBubble
    title={post.title}
    description={post.excerpt || ""}
    image={post.image}
    smallText={formatDate(post.published)}
    href={`/${post.slug}`}
  />
</li>
