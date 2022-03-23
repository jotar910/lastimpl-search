import { Module } from 'vuex';
import { StoreState } from '@/store/store.model';
import { toastMutations } from '@/store/modules/toast/toast-mutations';
import { toastGetters } from '@/store/modules/toast/toast-getters';
import { toastState, ToastState } from '@/store/modules/toast/toast-state';

export const toastModule: Module<ToastState, StoreState> = {
  namespaced: true,
  state: toastState,
  mutations: toastMutations,
  getters: toastGetters
};
