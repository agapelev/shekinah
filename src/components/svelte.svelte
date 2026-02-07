<script>
  import { Button } from "bits-ui"; // Или просто используй классы
  import { Rocket } from "lucide-svelte";
  import { toast } from "svelte-sonner";

  let count = $state(0); // Это Svelte 5 Rune!
</script>

<div class="p-8 border border-gray-200 rounded-xl shadow-sm bg-white flex flex-col items-center gap-4">
  <Rocket class="text-orange-500 w-12 h-12" />

  <h1 class="text-2xl font-bold italic text-gray-800">
    Покоряем вершины!
  </h1>

  <p class="text-gray-600">Нажато: {count}</p>

  <button
    onclick={() => {
      count++;
      toast.success("Вершина всё ближе!");
    }}
    class="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
  >
    Вперёд!
  </button>
</div>
