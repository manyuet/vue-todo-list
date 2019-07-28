import Vue from 'vue'
import App from './views/TodoList.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'
Vue.prototype._ = _
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
