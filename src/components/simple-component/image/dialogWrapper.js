import dialog from "./dialog.vue"
export default {
  name:'toast-wrapper',
  template:"<dialog ref='dialog'></dialog>",
  components:{
    dialog
  }
}
