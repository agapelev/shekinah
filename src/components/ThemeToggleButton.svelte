<script>
  /**
   * Theme toggle button that syncs with Mantine's data-mantine-color-scheme attribute
   * The ColorSchemeScript in BaseLayout handles initial state to prevent flash
   */
  import { onMount } from 'svelte';
  
  let computedColorScheme = 'light';
  let mounted = false;

  onMount(() => {
    mounted = true;
    // Get current color scheme from Mantine's attribute
    const htmlEl = document.documentElement;
    const current = htmlEl.getAttribute('data-mantine-color-scheme') || 'light';
    computedColorScheme = current;
  });

  function handleToggle() {
    const htmlEl = document.documentElement;
    const current = htmlEl.getAttribute('data-mantine-color-scheme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    
    // Update Mantine's attribute (this triggers Mantine components to re-render)
    htmlEl.setAttribute('data-mantine-color-scheme', next);
    
    // Store in localStorage so ColorSchemeScript can restore it on page reload
    localStorage.setItem('mantine-color-scheme', next);
    
    computedColorScheme = next;
  }

  const icons = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>`,
  ];
</script>

<div class="theme-toggle">
  {#if mounted}
    <button
      class="toggle-btn"
      on:click={handleToggle}
      title={`Switch to ${computedColorScheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${computedColorScheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {#if computedColorScheme === 'dark'}
        {@html icons[0]}
      {:else}
        {@html icons[1]}
      {/if}
    </button>
  {:else}
    <div class="some-class"></div>
  {/if}
</div>

<style>
  .theme-toggle {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    color: currentColor;
    font-size: 0;
  }

  .toggle-btn:hover {
    background-color: var(--bg-offset);
    border-color: var(--border-color);
  }

  .toggle-btn:active {
    transform: scale(0.95);
  }

  .placeholder {
    cursor: default;
  }
</style>
