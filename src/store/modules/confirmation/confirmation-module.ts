import { Module } from 'vuex';
import { StoreState } from '@/store/store.model';
import { confirmationMutations } from '@/store/modules/confirmation/confirmation-mutations';
import { confirmationGetters } from '@/store/modules/confirmation/confirmation-getters';
import { confirmationState, ConfirmationState } from '@/store/modules/confirmation/confirmation-state';

export const confirmationModule: Module<ConfirmationState, StoreState> = {
  namespaced: true,
  state: confirmationState,
  mutations: confirmationMutations,
  getters: confirmationGetters
};
