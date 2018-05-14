<template>
  <div class="calendar-page">
    <button @click="open">打开</button>
    <m-dialog ref="dialog">
      <m-calendar @result="onResult"></m-calendar>
    </m-dialog>
  </div>
</template>
<script>
  import MDialog from "../components/simple-component/dialog/dialog.vue";
  import MCalendar from "../components/simple-component/calendar/calendar.vue";

  export default {
    components: {
      MCalendar,
      MDialog
    },
    name: 'register-page',
    data() {
      return {}
    },
    methods: {
      onResult(result) {
        this.$refs.dialog.$emit("result", result);
      },
      open() {
        this.$refs.dialog.showDialogForResult().then((data) => {
          this.$toast(data);
        })
      }
    },
    created() {

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .calendar-page {

  }
</style>
