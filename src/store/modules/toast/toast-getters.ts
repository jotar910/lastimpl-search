import { GetterTree } from 'vuex';
import { StoreState } from '@/store/store.model';
import { ToastState } from '@/store/modules/toast/toast-state';
import { ToastOptionsModel } from '@/models/toast-options.model';

interface ToastGetters {
 toasts (state: ToastState): ToastOptionsModel[];
}

export const toastGetters: GetterTree<ToastState, StoreState> & ToastGetters = {
  toasts: (state: ToastState): ToastOptionsModel[] => state.toasts
};
