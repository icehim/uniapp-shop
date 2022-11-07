<template>
  <view>
    <my-login v-if="!getToken"/>

    <my-userinfo v-else/>
  </view>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  components: {},

  computed: {
    ...mapGetters('user', ['getToken'])
  }
}
</script>

<style scoped>

</style>
