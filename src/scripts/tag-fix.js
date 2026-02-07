<script>
  // Fix for tag links
  document.addEventListener('astro:page-load', () => {
    const tagLinks = document.querySelectorAll('a[href*="/blog/tags/"]');
    tagLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        console.log('Tag clicked:', link.href);
      });
    });
  });
</script>
