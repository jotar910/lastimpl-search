import { createApp } from 'vue';
// eslint-disable-next-line import/no-named-default
import App from './App.vue';
import router from './router';
import store from './store';

import '@/styles/tailwind.scss'; // Tailwind's Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // Editor's Style
import '@/styles/toast-ui.scss';
import '@/styles/abstract.scss';

// Font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// i18n
import i18n from '@/i18n';

const app = createApp(App);

library.add(faChevronDown);
library.add(faChevronUp);
library.add(faPencilAlt);
library.add(faPlus);
library.add(faSave);
library.add(faSearch);
library.add(faXmark);

app.component('fa-icon', FontAwesomeIcon);

app.use(store).use(router).use(i18n);

app.mount('#app');
