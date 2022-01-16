/* eslint-disable */
import { Store } from 'vuex'
import { StoreState } from '@/store/store.model'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StoreState>;
  }
}
