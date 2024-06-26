import type HackerNewsPlugin from "src/main";

import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE, VIEW_DISPLAY_TEXT, VIEW_ICON } from "src/_constants";
import HackerNewsComponent from "./hackernewsView.svelte";

export default class HackerNewsView extends ItemView {

    plugin: HackerNewsPlugin;
    private _view: HackerNewsComponent;

    constructor(leaf: WorkspaceLeaf, plugin: HackerNewsPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string {
        return VIEW_TYPE;
    }

    getDisplayText(): string {
        return VIEW_DISPLAY_TEXT;
    }

    getIcon(): string {
        return VIEW_ICON;
    }

    onClose(): Promise<void> {
        this._view.$destroy();
        return super.onClose();
    }

    onOpen(): Promise<void> {
        this._view = new HackerNewsComponent({
            target: this.contentEl,
            props: {
                manager: this.plugin.manager,
            }
        });
        this._view.$set({
            refreshInterval: this.plugin.settings.defaultRefreshInterval,
            numStories: this.plugin.settings.defaultNumStories,
        });
        return super.onOpen();
    }

}
