<script lang="ts">
  import type APIManager from "src/apiManager";
  import type { DictionaryWord, HNItem } from "src/integrations/types";
  
  import PhoneticComponent from "./phoneticComponent.svelte";
  import MeaningComponent from "./meaningComponent.svelte";
  import ErrorComponent from "./errorComponent.svelte";
  import OriginComponent from "./originComponent.svelte";
  import t from "src/l10n/helpers";

  export let manager: APIManager;

  export let query: string = "";
  let promise: Promise<DictionaryWord>;
  let dataHN: HNItem;

  function search() {
    if (query.trim()) {
      promise = manager.requestDefinitions(query);
    }
  }

  async function fetchTopHN() {
    dataHN = await manager.requestTopHN();
  }

  function languageModal() {
    dispatchEvent(new Event("dictionary-open-language-switcher"));
  }

  addEventListener("obsidian-dictionary-plugin-search", () => {
    search();
  });

  addEventListener("obsidian-hackernews-fetchTopHN", () => {
    fetchTopHN();
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      search();
    }
  }
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

  .center {
    margin: auto;
    width: 100%;
    margin-top: 2rem;
  }

  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }

  .spinner {
    // The height here is just for demo purposes
    height: 3rem;
    opacity: 1;
    position: relative;
    transition: opacity linear 0.1s;
    &::before {
      animation: 2s linear infinite spinner;
      border: solid 3px var(--background-modifier-border);
      border-bottom-color: var(--interactive-accent);
      border-radius: 50%;
      content: "";
      height: 40px;
      left: 50%;
      opacity: inherit;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      transform-origin: center;
      width: 40px;
      will-change: transform;
    }
  }
</style>
