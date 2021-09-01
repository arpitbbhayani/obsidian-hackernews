<script lang="ts">
  import { onMount } from "svelte";

  export let error: string;

  onMount(() => {
    console.error(error)
  })
</script>

<div class="main">
  <p class="error">Waiting for the internet</p>
</div>

<style>
  .error {
    text-align: center;
    width: 100%;
    color: var(--text-muted);
  }
</style>
