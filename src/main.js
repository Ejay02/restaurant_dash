import './main.css'

import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { apolloClient } from '../apollo-client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueApolloComponents from '@vue/apollo-components'
import vue3GoogleLogin from "vue3-google-login";
import { useUserStore } from './stores/userStore'



const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(VueApolloComponents)
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
});

const userStore = useUserStore();
userStore.init();

app.mount('#app')
