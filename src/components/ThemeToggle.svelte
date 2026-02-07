<script>
  import { Sun, Moon } from 'lucide-svelte';

  let isDark = $state(false);

  // Инициализация
  $effect(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggle() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>

<button
  onclick={toggle}
  class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-orange-500 transition-all"
>
  {#if isDark}
    <Sun class="w-5 h-5 text-orange-400" />
  {:else}
    <Moon class="w-5 h-5 text-slate-600" />
  {/if}
</button>
