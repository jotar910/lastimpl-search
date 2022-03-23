import { Module } from 'vuex';
import { StoreState } from '@/store/store.model';
import { projectsState, ProjectsState } from '@/store/modules/projects/projects-state';
import { projectsMutations } from '@/store/modules/projects/projects-mutations';
import { projectsActions } from '@/store/modules/projects/projects-actions';
import { projectsGetters } from '@/store/modules/projects/projects-getters';

export const projectsModule: Module<ProjectsState, StoreState> = {
  namespaced: true,
  state: projectsState,
  mutations: projectsMutations,
  actions: projectsActions,
  getters: projectsGetters
};
