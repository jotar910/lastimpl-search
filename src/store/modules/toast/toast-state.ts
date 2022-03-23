import { ToastOptionsModel } from '@/models/toast-options.model';

export interface ToastState {
  toasts: ToastOptionsModel[];
}

export const toastState = (): ToastState => ({
  toasts: []
});
