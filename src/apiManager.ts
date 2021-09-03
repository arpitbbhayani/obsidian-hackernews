import { Notice } from 'obsidian';
import path from 'path';
import type {
    HNItem,
} from "src/integrations/types";

import type HackerNewsPlugin from "src/main";

export default class APIManager {
    plugin: HackerNewsPlugin;

    constructor(plugin: HackerNewsPlugin) {
        this.plugin = plugin;
    }

    public async requestTopHN(): Promise<HNItem> {
        let itemIds: Array<Number>;
        try {
            const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
            const response = await fetch(url);
            itemIds = (await response.json()) as Array<Number>
        } catch (error) {
            return Promise.reject(error);
        }

        const itemId = itemIds[Math.floor(Math.random() * itemIds.slice(0, 25).length)]
        const itemResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`);
        const hnItem = (await itemResponse.json()) as HNItem

        return hnItem;
    }

    public async saveHNItem(hnItem: HNItem) {
        const dir = this.plugin.settings.storiesFolder
        const filePath = path.join(dir, `${hnItem.title}.md`)

        let stat = this.plugin.app.vault.adapter.stat(dir)
        if (!stat) {
            this.plugin.app.vault.createFolder(dir)
        }

        stat = this.plugin.app.vault.adapter.stat(filePath)
        if (!stat) {
            this.plugin.app.vault.create(filePath, `[${hnItem.title}](${hnItem.url})`)
            new Notice(`Story saved: ${hnItem.title}`)
        }
    }
}
