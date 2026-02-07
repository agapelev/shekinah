<script>
import PostCard from './PostCard.svelte';
let { posts = [] } = $props(); // Svelte 5 пропсы
</script>

{#if posts.length > 0}
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{#each posts as post, idx}
<PostCard
index={idx}
post={{
  slug: post.slug,
  author: 'Лев Дессатых',
  ...post.data
}}
/>
{/each}
</div>
{:else}
<p class="text-center text-slate-500 dark:text-slate-400 py-12 italic">
Постов не найдено
</p>
{/if}
