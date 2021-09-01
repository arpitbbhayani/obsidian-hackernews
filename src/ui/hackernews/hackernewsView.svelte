<script lang="ts">
  import { onDestroy } from 'svelte';
  import type APIManager from "src/apiManager";
  import type { HNItem } from "src/integrations/types";
  
  export let manager: APIManager;
  export let refreshInterval: string;

  let dataHN: HNItem;

  export async function fetchTopHN() {
    console.log('fetching top story from HackerNews');
    dataHN = await manager.requestTopHN();
  }

  addEventListener("obsidian-hackernews-fetchTopHN", fetchTopHN);

  onDestroy(() => {
    removeEventListener('obsidian-hackernews-fetchTopHN', fetchTopHN)
  })
</script>

<div class="main">
  {#if dataHN}
    <div class="results">
      <div class="container">
        <a href="{ dataHN.url }" target="_blank" class="hn-link">{ dataHN.title }</a>
        <br />
        <p class="hn-read">
          <a href="{ dataHN.url }" target="_blank">Read more →</a>
        </p>
        <p class="hn-meta">
          Refreshes every { refreshInterval } seconds.
        </p>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .hn-link {
    font-size: 1em;
    text-decoration: none;
  }

  .hn-read {
    font-size: 0.75em;
    text-align: right;
    margin-top: 0.5em;
  }

  .hn-meta {
    font-size: 0.7em;
    color: #aaa;
  }

  .results {
    display: flex;
    flex-wrap: wrap;
  }

  .container {
    max-width: 30vw;
    width: 100%;
    margin: auto;
    background-color: var(--background-primary-alt);
    padding: 1rem 1rem; 
    margin-top: 0.2rem;
    border-radius: 0.3rem;
  }
</style>
