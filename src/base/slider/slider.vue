
<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}" :key="index">
            </span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data() {
      return {
          dots: [],
          currentPageIndex: 0
      }
    },
    /**
     * 在vue moutned的时候，初始化一些数据
     */
    mounted() {
        this.$nextTick(() => { // 确保DOM加载完成
            this._setSliderWidth()
            this._initDots()
            this._initSlider()
            if (this.autoPlay) this._play()
        })
        /**
         * 监听窗口的大小是否变化，如果变化，重新计算slider大小
         */
        window.addEventListener('resize', () => {
            if (!this.slider) return // 如果slider还没有渲染的话， return
            this._setSliderWidth()
            this.slider.refresh()
        })
    },
    methods: {
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _setSliderWidth() {
            this.children = this.$refs.sliderGroup.children // this.$refs.sliderGroup 是一个DOM对象
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth // sliderGroup 是跟 slider的宽度相同
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item') // 执行这一步的时候，要确保DOM元素是存在的，才能操作DOM(给DOM元素添加CSS样式)
                child.style.width = sliderWidth + 'px' // 子元素宽度跟父元素相同
                width += sliderWidth // 计算总宽度
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, { // 传入DOM对象 和 一个配置对象
                scrollX: true, // 横向滚动
                scrollY: false, // 纵向滚动
                momentum: false, // 惯性
                snap: true,
                snapLoop: this.loop,
                sanpThreshold: 0.3,
                snapSpeed: 400,
                click: true
            })
            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX // 获取第几个子元素
                if (pageIndex > this.children.length) this.currentPageIndex = 0
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                clearInterval(this.timer) // 滑动的时候，需要停止自动播放
                this._play()
                }
            })
        },
        _play() {
            this.timer = setInterval(() => {
                if (this.currentPageIndex >= 4 || this.currentPageIndex < 0) this.currentPageIndex = -1 // 处理数组边界问题
                this.slider.goToPage(this.currentPageIndex++, 0, 400)
            }, this.interval)
        }
    },
    /**
     * 在vue销毁的时候，清除timer
     */
    destroyed() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

@import '~common/stylus/variable'

.slider
    min-height: 1px
    .slider-group
        position: relative
        overflow: hidden
        white-space: nowrap
        .slider-item
            float: left
            box-sizing: border-box
            overflow: hidden
            text-align: center
            a
                display: block
                width: 100%
                overflow: hidden
                text-decoration: none
            img
                display: block
                width: 100%
    .dots
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        text-align: center
        font-size: 0
        .dot
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
                width: 20px
                border-radius: 5px
                background: $color-text-ll
</style>