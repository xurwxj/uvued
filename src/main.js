import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import './plugins/element.js'
import './plugins/meta.js'
import createI18n from './i18n'
import NoSSR from 'vue-no-ssr'
Vue.component('no-ssr', NoSSR)

if (process.client) {
  require('./plugins/uploader.js')
}

Vue.config.productionTip = false

export default () => {
  const router = createRouter()
  const i18n = createI18n()
  return new Vue({
    router,
    i18n,
    render: h => h(App)
  })
}
