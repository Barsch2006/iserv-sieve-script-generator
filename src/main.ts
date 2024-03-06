import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import './styles/base.css';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
    },
    ssr: false,
});

createApp(App).use(vuetify).mount('#app');
