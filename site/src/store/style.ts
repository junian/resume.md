import { defineStore } from "pinia";
import { updateStyles, DEFAULT_STYLES } from "~/utils";
import type { ResumeStyles } from "~/types";

const fontLoader = (fonts: string | Array<string>) => {
  const observers = [];

  for (const font of typeof fonts === "string" ? [fonts] : fonts)
    observers.push(document.fonts.load(`12px ${font}`));

  return Promise.all(observers);
};

export const useStyleStore = defineStore("style", () => {
  const copiedStyles = JSON.parse(JSON.stringify(DEFAULT_STYLES));
  const styles = reactive<ResumeStyles>(copiedStyles);

  const setStyle = <T extends keyof ResumeStyles>(
    key: T,
    value: ResumeStyles[T]
  ) => {
    styles[key] = value;
    // vue-smart-pages will handle margins, height and width
    if (!["marginV", "marginH"].includes(key)) updateStyles();
  };

  const onFontLoaded = () =>
    fontLoader([
      styles.fontEN.fontFamily || styles.fontEN.name,
      styles.fontCN.fontFamily || styles.fontCN.name
    ]);

  return {
    styles,
    setStyle,
    onFontLoaded
  };
});
