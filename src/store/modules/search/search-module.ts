import { Module } from 'vuex';
import { StoreState } from '@/store/store.model';
import { searchState, SearchState } from '@/store/modules/search/search-state';
import { searchMutations } from '@/store/modules/search/search-mutations';
import { searchActions } from '@/store/modules/search/search-actions';
import { searchGetters } from '@/store/modules/search/search-getters';

export const searchModule: Module<SearchState, StoreState> = {
  namespaced: true,
  state: searchState,
  mutations: searchMutations,
  actions: searchActions,
  getters: searchGetters
};
