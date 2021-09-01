import { moment } from "obsidian";

import en from "./locale/en";

const localeMap: { [k: string]: Partial<typeof en> } = {
    en,
};

const locale = localeMap[moment.locale()];

export default function t(str: keyof typeof en): string {
    if (!locale) {
        return en[str];
    }

    return (locale && locale[str]) || en[str];
}
