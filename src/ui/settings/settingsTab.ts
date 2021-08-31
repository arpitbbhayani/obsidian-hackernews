import type DictionaryPlugin from "src/main";

import { App, Modal, Notice, PluginSettingTab, Setting } from "obsidian";
import { DEFAULT_SETTINGS, LANGUAGES } from "src/_constants";
import InfoModalComponent from './infoModal.svelte'
import t from "src/l10n/helpers";

export default class SettingsTab extends PluginSettingTab {
    plugin: DictionaryPlugin;

    constructor(app: App, plugin: DictionaryPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl, plugin } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: t('HackerNews Settings') });

        new Setting(containerEl)
            .setName(t('Refresh Interval'))
            .setDesc(t('The time interval in seconds after which the next top story will be fetched. Default and invalid values will be considered as 60 seconds.'))
            .addText(text => text
                .setPlaceholder('60')
                .setValue(plugin.settings.defaultRefreshInterval)
                .onChange(async (value) => {
                    plugin.settings.defaultRefreshInterval = value;
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

class InfoModal extends Modal {
    plugin: DictionaryPlugin;
    private _view: InfoModalComponent;

    constructor(plugin: DictionaryPlugin) {
        super(plugin.app);
        this.plugin = plugin;
    }

    onOpen() {
        this.contentEl.parentElement.style.padding = "10px 12px";
        this._view = new InfoModalComponent({
            target: this.contentEl,
            props: {
                synonymAPIs: this.plugin.manager.synonymProvider,
                definitionAPIs: this.plugin.manager.definitionProvider,
                partOfSpeechAPIs: this.plugin.manager.partOfSpeechProvider,
            }
        });
    }

    onClose() {
        this._view.$destroy();
        this.contentEl.empty();
    }
}