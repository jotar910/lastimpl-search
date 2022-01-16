import { ActionContext, createLogger, createStore, Store } from 'vuex'
import { StoreState } from '@/store/store.model'
import createStoragePlugin from '@/store/plugins/storage.plugin'
import createLoadStorePlugin from '@/store/plugins/load.plugin'
import { searchModule } from '@/store/modules/search/search-module'

const storePlugins: ((store: Store<StoreState>) => void)[] = [
  createStoragePlugin({
    localStorageKeys: ['darkMode'],
    sessionStorageKeys: []
  }),
  createLoadStorePlugin()
]

if (process.env.NODE_ENV === 'development') {
  storePlugins.push(createLogger())
}

const store: Store<StoreState> = createStore<StoreState>({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    darkMode: false
  },
  mutations: {
    setDarkMode (state: StoreState, value: boolean): void {
      state.darkMode = value
    }
  },
  actions: {
    changeDarkMode (store: ActionContext<StoreState, StoreState>, value: boolean): void {
      const html = document.querySelector('html')
      if (html) {
        value ? html.classList.add('dark') : html.classList.remove('dark')
      }
      store.commit('setDarkMode', value)
    }
  },
  getters: {
    darkMode: (state: StoreState): boolean => state.darkMode
  },
  modules: {
    search: searchModule
  },
  plugins: storePlugins
})

export default store
