<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper"> <!--当recommends存在时，在渲染slider-wrapper-->
                    <slider>  <!--slider元素里的内容会插入到slider.vue中slot元素中-->
                        <div v-for= "(item, index) in recommends" :key="index">
                            <a :href="item.linkUrl">
                                <!-- 图片加载完成后，better-scroll 重新计算高度（避免better-scorll 先于轮播图加载，高度出现问题） -->
                                <img class="needsClick" @load="loadImage"  :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="(item, index) in discList" class="item" :key="index">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name">{{item.creator.name}}</h2>
                                <p class="desc">{{item.dissname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import Slider from '@/base/slider/slider'
import {getRecommend, getDiscList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import Scroll from '@/base/scroll/scroll'

export default {
  data() {
    return {
        recommends: [],
        discList: []
    }
  },
  created() {
      this._getRecommend()
      this._getDiscList()
  },
  methods: {
      /**
       * 把请求的slider数据传给数组 this.recommends
       */
    _getRecommend() {
        getRecommend().then((res) => {
            this.recommends = res.code === ERR_OK ? res.data.slider : []
        })
    },
    _getDiscList() {
        getDiscList().then((res) => {
           this.discList = res.code === ERR_OK ? res.data.list : []
        })
    },
    loadImage() {
        if (!this.checkLoaded) {
            this.$refs.scroll.refresh() // better-sroll 重新计算高度
            this.checkLoaded = true
        }
    }
  },
  components: {
      Slider,
      Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
        height: 100%
        overflow: hidden
        .slider-wrapper
            position: relative
            width: 100%
            overflow: hidden
        .recommend-list
            .list-title
                height: 65px
                line-height: 65px
                text-align: center
                font-size: $font-size-medium
                color: $color-theme
            .item // flex 布局， 左面固定宽度， 右边自适应
                display: flex
                box-sizing: border-box
                align-items: center
                padding: 0 20px 20px 20px
                .icon
                    flex: 0 0 60px
                    width: 60px
                    padding-right: 20px
                .text
                    display: flex
                    flex-direction: column
                    justify-content: center
                    flex: 1
                    line-height: 20px
                    overflow: hidden
                    font-size: $font-size-medium
                    .name
                        margin-bottom: 10px
                        color: $color-text
                    .desc
                        color: $color-text-d
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>