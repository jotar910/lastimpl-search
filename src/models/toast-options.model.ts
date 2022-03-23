import { globalI18n } from '@/i18n';

export interface ToastOptionsModel {
  title: string;
  message: string;
}

export function newToastError(titleKey: string, messageKey: string): ToastOptionsModel {
  return {
    title: globalI18n.t(titleKey),
    message: globalI18n.t(messageKey)
  };
}
