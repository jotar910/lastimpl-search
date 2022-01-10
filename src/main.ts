import { App, createApp } from 'vue'
// eslint-disable-next-line import/no-named-default
import { default as MyApp } from './App.vue'
import router from './router'
import store from './store'

// Tailwind
import '@/styles/tailwind.scss'

// Font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app: App<Element> = createApp(MyApp)

library.add(faSearch)

app.component('fa-icon', FontAwesomeIcon)

app.use(store).use(router)
  .mount('#app')
