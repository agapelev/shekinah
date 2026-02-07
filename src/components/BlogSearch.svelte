<script>
  import { Search } from 'lucide-svelte'; // Новые иконки
  import PostCard from './PostCard.svelte'; // Убедись, что PostCard тоже .svelte

  // Пропсы в Svelte 5
  let { posts = [] } = $props();

  // Состояние (State)
  let searchQuery = $state('');
  let activePage = $state(1);
  const itemsPerPage = 9;

  // Производные данные (Derived) - автоматически пересчитываются
  let filteredPosts = $derived(
    posts.filter((post) => {
      const query = searchQuery.toLowerCase();
      const title = post.data.title.toLowerCase();
      const description = (post.data.description || '').toLowerCase();
      return title.includes(query) || description.includes(query);
    })
  );

  let totalPages = $derived(Math.ceil(filteredPosts.length / itemsPerPage));

  let currentPosts = $derived(
    filteredPosts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
  );

  // Сброс страницы при поиске
  $effect(() => {
    if (searchQuery) activePage = 1;
  });
</script>

<div class="space-y-8 w-full">
  <!-- Поле поиска (Вместо TextInput из Mantine) -->
  <div class="relative group">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
    <input
      type="text"
      placeholder="Найти статью..."
      bind:value={searchQuery}
      class="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus:ring-2
focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
    />
  </div>

  <!-- Сетка постов (Вместо SimpleGrid) -->
  {#if filteredPosts.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each currentPosts as post, idx (post.id || idx)}
        <PostCard
          index={((activePage - 1) * itemsPerPage) + idx}
          post={{
            slug: post.data.slug || post.slug,
            title: post.data.title,
            description: post.data.description,
            publishDate: post.data.publishDate,
            author: 'Лев Дессатых'
          }}
        />
      {/each}
    </div>
  {:else}
    <div class="text-center py-20 text-slate-500 italic">
      По вашему запросу ничего не найдено.
    </div>
  {/if}

  <!-- Пагинация (Вместо Pagination из Mantine) -->
  {#if totalPages > 1}
    <div class="flex justify-center gap-2 mt-8">
      {#each Array(totalPages) as _, i}
        <button
          onclick={() => activePage = i + 1}
          class="w-10 h-10 rounded-lg font-medium transition-all
            {activePage === i + 1
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}"
        >
          {i + 1}
        </button>
      {/each}
    </div>
  {/if}
</div>
