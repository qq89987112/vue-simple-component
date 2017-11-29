import Vue from "vue"
import loading from "./plugins/loading"
import validator from "./plugins/validator"
import toast from "./plugins/toast"

Vue.use(toast);
Vue.use(loading);
Vue.use(validator);
