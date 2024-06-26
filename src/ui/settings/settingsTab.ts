import type HackerNewsPlugin from "src/main";

import { App, PluginSettingTab, Setting } from "obsidian";
import t from "src/l10n/helpers";

export default class SettingsTab extends PluginSettingTab {
    plugin: HackerNewsPlugin;

    constructor(app: App, plugin: HackerNewsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl, plugin } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: t('HackerNews Settings') });

        new Setting(containerEl)
            .setName(t('Refresh Interval'))
            .setDesc(t('The time interval in seconds after which the next top story will be fetched. Default and invalid values will be reverted to 60 seconds.'))
            .addText(text => text
                .setPlaceholder('60')
                .setValue(plugin.settings.defaultRefreshInterval)
                .onChange(async (value) => {
                    let refreshInterval = parseInt(value)
                    if (Number.isNaN(refreshInterval) || refreshInterval <= 0) { refreshInterval = 60 }
                    plugin.settings.defaultRefreshInterval = `${refreshInterval}`;
                    await this.save();
                }));
        new Setting(containerEl)
            .setName(t('Stories Folder'))
            .setDesc(t('The folder that holds the saved HackerNews stories. The folder will be created if it does not exist.'))
            .addText(text => text
                .setPlaceholder('stories folder')
                .setValue(plugin.settings.storiesFolder)
                .onChange(async (value) => {
                    plugin.settings.storiesFolder = value;
                    await this.save();
                }));
        new Setting(containerEl)
            .setName(t('Story Template'))
            .setDesc(t('Specify how the HackerNews story is saved; available attributes: title, url, date.'))
            .addTextArea(text => text
                .setPlaceholder('stories folder')
                .setValue(plugin.settings.storyTemplate)
                .onChange(async (value) => {
                    plugin.settings.storyTemplate = value;
                    await this.save();
                }));
        new Setting(containerEl)
            .setName(t('Number of Stories'))
            .setDesc(t('The number of top stories to fetch from HackerNews. Default and invalid values will be reverted to 10.'))
            .addText(text => text
                .setPlaceholder('10')
                .setValue(plugin.settings.defaultNumStories)
                .onChange(async (value) => {
                    let numStories = parseInt(value)
                    if (Number.isNaN(numStories) || numStories <= 0) { numStories = 10 }
                    plugin.settings.defaultNumStories = `${numStories}`;
                    await this.save();
                }));
        new Setting(containerEl)
            .setName(t('Donate'))
            .setDesc(t('If you found this plugin helpful, consider donating to support continued development.'))
            .setClass("extra")
            .addButton((bt) => {
                bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/arpitbhayani"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=arpitbhayani&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
            });
    }

    private async save() {
        await this.plugin.saveSettings();
    }
}
