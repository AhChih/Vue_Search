<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/all";

</style>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
    const api = 'https://run.mocky.io/v3/9d5f33ec-0d2f-4743-aac9-5aef32f7badf'
    this.$http.get(api).then((res) => {
      console.log(res)
    })
  }
}
</script>
