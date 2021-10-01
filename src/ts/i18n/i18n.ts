import Vue from "vue";
import { createI18n } from 'vue-i18n'

import { zh_cn } from "./lang/zh_cn"
import { en_us } from "./lang/en_us"


export const i18n = createI18n({
  locale: localStorage.getItem("locale") || "zh",
  messages: {
    zh: zh_cn, 
    en: en_us, 
  }
});

export default i18n;

