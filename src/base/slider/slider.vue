
<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
            <div class="dots"> </div>
        </div>
    </div>
</template>

<script>
// import BScroll from 'better-scroll'
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
    mounted() {
        this.$nextTick(() => {
            this._setSliderWidth()
            this._initSlider()
        })
    },
    methods: {
        _setSliderWidth() {
            this.children = this.$refs.sliderGroup.children // this.$refs.sliderGroup 是一个DOM对象
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth // sliderGroup 是跟 slider的宽度相同
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item') // 执行这一步的时候，要确保DOM元素是存在的，才能操作DOM
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop) width += 2 * sliderWidth
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {

        }
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