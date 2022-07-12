import { ActionContext, createLogger, createStore, Store } from 'vuex';
import storeState, { StoreState } from '@/store/store.model';
import createStoragePlugin from '@/store/plugins/storage.plugin';
import createLoadStorePlugin from '@/store/plugins/load.plugin';
import { projectsModule } from '@/store/modules/projects/projects-module';
import { searchModule } from '@/store/modules/search/search-module';
import { confirmationModule } from '@/store/modules/confirmation/confirmation-module';
import { toastModule } from '@/store/modules/toast/toast-module';

const storePlugins: ((store: Store<StoreState>) => void)[] = [
  createStoragePlugin({
    localStorageKeys: [
      'darkMode',
      'projects.editingProjectDetails',
      'projects.editingProjectFiles'
    ],
    sessionStorageKeys: []
  }),
  createLoadStorePlugin()
];

if (process.env.NODE_ENV === 'development') {
  storePlugins.push(createLogger());
}

const store: Store<StoreState> = createStore<StoreState>({
  strict: process.env.NODE_ENV !== 'production',
  state: storeState(),
  mutations: {
    setDarkMode (state: StoreState, value: boolean): void {
      state.darkMode = value;
    }
  },
  actions: {
    changeDarkMode (store: ActionContext<StoreState, StoreState>, value: boolean): void {
      const html = document.querySelector('html');
      if (html) {
        value ? html.classList.add('dark') : html.classList.remove('dark');
      }
      store.commit('setDarkMode', value);
    }
  },
  getters: {
    darkMode: (state: StoreState): boolean => state.darkMode
  },
  modules: {
    confirmation: confirmationModule,
    projects: projectsModule,
    search: searchModule,
    toast: toastModule
  },
  plugins: storePlugins
});

export default store;
