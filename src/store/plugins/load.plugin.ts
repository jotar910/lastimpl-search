import { Store } from 'vuex'
import { StoreState } from '@/store/store.model'

export default function createLoadStorePlugin() {
  return (store: Store<StoreState>): void => {
    store.dispatch('changeDarkMode', store.getters.darkMode)
  }
}
