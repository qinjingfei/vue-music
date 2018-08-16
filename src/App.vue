<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- 用keep-alive 把他们的dom缓存在内存中 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable'

#app
  color: $color-theme
</style>
