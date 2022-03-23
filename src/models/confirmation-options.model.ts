import { globalI18n } from '@/i18n';

type StoreOperationType = 'commit' | 'dispatch';
type ConfirmationSeverityType = 'danger' | 'primary';

export interface ConfirmationOptionsModel<T = unknown> {
  type: string;
  payload?: T;
  operation: StoreOperationType;
  severity: ConfirmationSeverityType;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
}

export function createCancelOptions<T>(operation: StoreOperationType,
  type: string, payload?: T): ConfirmationOptionsModel<T> {
  return {
    type,
    payload,
    operation,
    message: globalI18n.t('common.confirmation.cancel'),
    confirmLabel: globalI18n.t('common.yes'),
    cancelLabel: globalI18n.t('common.no'),
    severity: 'danger'
  };
}

export function createDeleteOptions<T>(operation: StoreOperationType,
  type: string, payload?: T): ConfirmationOptionsModel<T> {
  return {
    type,
    payload,
    operation,
    message: globalI18n.t('common.confirmation.delete'),
    confirmLabel: globalI18n.t('common.yes'),
    cancelLabel: globalI18n.t('common.no'),
    severity: 'danger'
  };
}
