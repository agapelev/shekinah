<script>
  let { post, index } = $props();

  // Было: const formattedDate = ...
  // Стало: (используем $derived для Svelte 5)
  let formattedDate = $derived(new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.publishDate)));
</script>

<a
  href={`/blog/${post.slug}`}
  class="group block h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm
hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>
  <!-- Визуальная часть (заглушка или картинка) -->
  <div class="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 relative overflow-hidden">
    <!-- Декоративный элемент, который оживает при наведении -->
    <div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
      <div class="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-orange-500 blur-2xl"></div>
      <div class="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-blue-500 blur-2xl"></div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center">
       <span class="text-4xl">📖</span>
    </div>

    <div class="absolute bottom-4 left-4">
      <span class="px-2 py-1 bg-white/50 dark:bg-black/50 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold rounded-md">
        Статья №{index + 1}
      </span>
    </div>
  </div>

  <!-- Текстовая часть -->
  <div class="p-6 flex flex-col h-[calc(100%-12rem)]">
    <time class="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2">
      {formattedDate}
    </time>

    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors leading-tight">
      {post.title}
    </h3>

    <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed italic">
      {post.description}
    </p>

    <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px]">
          {post.author.charAt(0)}
        </div>
        <span class="text-xs font-medium text-slate-500">
          {post.author}
        </span>
      </div>
      <span class="text-orange-500 font-black text-lg group-hover:translate-x-1 transition-transform">
        →
      </span>
    </div>
  </div>
</a>
