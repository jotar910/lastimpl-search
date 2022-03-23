import { MutationTree } from 'vuex';
import { ToastState } from '@/store/modules/toast/toast-state';
import { ToastOptionsModel } from '@/models/toast-options.model';

interface ToastMutations {
  add(state: ToastState, toast: ToastOptionsModel): void;

  remove(state: ToastState, toast: ToastOptionsModel): void;
}

type ToastMutationTree = MutationTree<ToastState> & ToastMutations;

export const toastMutations: ToastMutationTree = {
  add(state: ToastState, toast: ToastOptionsModel): void {
    state.toasts = [...state.toasts, toast];
  },
  remove(state: ToastState, toast: ToastOptionsModel): void {
    state.toasts = state.toasts.filter((t: ToastOptionsModel) => toast !== t);
  }
};
