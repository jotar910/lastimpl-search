import { GetterTree } from 'vuex';
import { SearchState } from '@/store/modules/search/search-state';
import { StoreState } from '@/store/store.model';
import { ErrorModel } from '@/models/error.model';
import { ProjectListModel } from '@/models/project/project-list.model';

interface SearchGetters {
  query(state: SearchState): string | null;
  querying(state: SearchState): boolean;
  error(state: SearchState): ErrorModel | null;
  results(state: SearchState): ProjectListModel | null;
}

export const searchGetters: GetterTree<SearchState, StoreState> & SearchGetters = {
  query: (state: SearchState): string | null => state.query,
  querying: (state: SearchState): boolean => state.querying,
  error: (state: SearchState): ErrorModel | null => state.error,
  results: (state: SearchState): ProjectListModel | null => state.results
};
