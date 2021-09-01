/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HackerNewsSettings } from 'src/types';

import { Plugin } from 'obsidian';
import SettingsTab from 'src/ui/settings/settingsTab';
import HackerNewsView from 'src/ui/hackernews/hackernewsView';
import { DEFAULT_SETTINGS, VIEW_TYPE } from 'src/_constants';
import APIManager from 'src/apiManager';
import { addIcons } from 'src/ui/icons';
import t from 'src/l10n/helpers';

export default class HackerNewsPlugin extends Plugin {
    settings: HackerNewsSettings;
    manager: APIManager;
    
    async onload(): Promise<void> {
        console.log('loading hackernews');

        await Promise.all([this.loadSettings()]);

        addIcons();

        this.addSettingTab(new SettingsTab(this.app, this));

        this.manager = new APIManager(this);

        this.registerView(VIEW_TYPE, (leaf) => {
            return new HackerNewsView(leaf, this);
        });

        if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length == 0) {
            await this.app.workspace.getRightLeaf(false).setViewState({
                type: VIEW_TYPE,
            });
        }
        this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE).first());

        this.addCommand({
            id: 'hackernews-open-view',
            name: t('Open HackerNews'),
            callback: async () => {
                if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length == 0) {
                    await this.app.workspace.getRightLeaf(false).setViewState({
                        type: VIEW_TYPE,
                    });
                }
                this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE).first());
            },
        });

        let refreshInterval = parseInt(this.settings.defaultRefreshInterval)
        if (Number.isNaN(refreshInterval) || refreshInterval <= 0) { refreshInterval = 60 }

        dispatchEvent(new Event('obsidian-hackernews-fetchTopHN'))
        this.registerInterval(window.setInterval(() => {
            dispatchEvent(new Event('obsidian-hackernews-fetchTopHN'))
        }, refreshInterval * 1000))

        console.log('refreshInterval', refreshInterval, 'seconds');
    }

    onunload(): void {
        console.log('unloading hackernews');
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length) {
            this.app.workspace.getLeavesOfType(VIEW_TYPE)[0].detach();
        }
    }

    async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}
