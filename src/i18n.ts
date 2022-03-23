import { createI18n, I18n, LocaleMessageDictionary, VueI18n, VueMessageType } from 'vue-i18n';
import messagesUS from '@/locales/messages-en-US';
import messagesPT from '@/locales/messages-pt-PT';

const i18n: I18n<Record<string, LocaleMessageDictionary<VueMessageType>>, unknown, unknown> = createI18n({
  silentTranslationWarn: true,
  globalInjection: true,
  legacy: true,
  locale: 'en-US',
  messages: {
    'en-US': messagesUS,
    'pt-PT': messagesPT
  }
});

const globalI18n: VueI18n<Record<string, LocaleMessageDictionary<VueMessageType>>, unknown, unknown> = i18n.global;

export { globalI18n };
export default i18n;
