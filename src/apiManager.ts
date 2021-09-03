import { Notice } from 'obsidian';
import path from 'path';
import moment from 'moment';
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

        let stat = await this.plugin.app.vault.adapter.stat(dir)
        if (!stat) {
            await this.plugin.app.vault.createFolder(dir)
        }

        stat = await this.plugin.app.vault.adapter.stat(filePath)
        if (!stat) {
            await this.plugin.app.vault.create(filePath, this.getStoryFileContent(hnItem))
            new Notice(`Story saved: ${hnItem.title}`)
        }
    }

    getStoryFileContent(hnItem: HNItem): string {
        let data = this.plugin.settings.storyTemplate;
        return data.replace(/{{title}}/g, hnItem.title)
            .replace(/{{url}}/g, hnItem.url)
            .replace(/{{date}}/g, moment().format('LLLL'))
    }
}
