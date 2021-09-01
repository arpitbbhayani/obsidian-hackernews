import { addIcon } from 'obsidian';

export const icons: Record<string, string> = {
    hackernews: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" fill="none" fill-opacity="0.0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M21.27,0c-1.174,2.021-5.5,9.464-5.532,9.499h-0.11C15.595,9.464,11.424,2.073,10.253,0H3.148l9.253,15.034v15.927h6.157 V15.034L27.812,0H21.27z"/></svg>`,
};

export const addIcons = (): void => {
    Object.keys(icons).forEach((key) => {
        addIcon(key, icons[key]);
    });
};
