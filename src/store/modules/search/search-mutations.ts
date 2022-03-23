import { MutationTree } from 'vuex';
import { SearchState } from '@/store/modules/search/search-state';
import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';

interface SearchMutations {
  query(state: SearchState, query: string): void;
  querying(state: SearchState): void;
  error(state: SearchState, error: ErrorModel): void;
  results(state: SearchState, data: ProjectListModel): void;
}

type SearchMutationTree = MutationTree<SearchState> & SearchMutations;

export const searchMutations: SearchMutationTree = {
  query(state: SearchState, query: string): void {
    state.query = query;
  },
  querying(state: SearchState): void {
    state.error = null;
    state.results = null;
    state.querying = true;
  },
  error(state: SearchState, error: ErrorModel): void {
    state.error = error;
    state.results = null;
    state.querying = false;
  },
  results(state: SearchState, data: ProjectListModel): void {
    state.results = data;
    state.error = null;
    state.querying = false;
  }
};
