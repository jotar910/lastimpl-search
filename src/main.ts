import { createApp } from 'vue'
// eslint-disable-next-line import/no-named-default
import App from './App.vue'
import router from './router'
import store from './store'

// Tailwind
import '@/styles/tailwind.scss'
import '@/styles/abstract.scss'

// Font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// i18n
import { createI18n } from 'vue-i18n'
import messagesPT from '@/locales/messages-pt-PT'

const app = createApp(App)

library.add(faSearch)

app.component('fa-icon', FontAwesomeIcon)

const i18n = createI18n({
  silentTranslationWarn: true,
  globalInjection: true,
  legacy: false,
  locale: 'pt-PT',
  messages: {
    'pt-PT': messagesPT
  }
})

app.use(store).use(router).use(i18n)
  .mount('#app')
