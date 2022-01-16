import { ActionContext, ActionTree } from 'vuex'
import searchApi from '@/api/search.api'
import { SearchState } from '@/store/modules/search/search-state'
import { StoreState } from '@/store/store.model'
import { ProjectListModel } from '@/models/project/project-list.model'

interface SearchActions {
  query: (context: ActionContext<SearchState, StoreState>, query: string) => Promise<void>
}

export const searchActions: ActionTree<SearchState, StoreState> & SearchActions = {
  async query (store: ActionContext<SearchState, StoreState>, query: string): Promise<void> {
    if (store.state.querying) {
      store.state.controller.abort()
    }
    store.commit('querying')
    try {
      const projects: ProjectListModel = await searchApi.search(query, store.state.controller)
      store.commit('results', projects)
    } catch (e) {
      // TODO: log the error
      store.commit('error', e)
    }
  }
}
