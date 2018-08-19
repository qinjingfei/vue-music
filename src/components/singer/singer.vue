<template>
    <h1>this is singer component</h1>
</template>
<script>
import {getSingerList} from '@/api/singer'
import {ERR_OK} from '@/api/config'

export default {
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList() {
            getSingerList().then(res => {
                if (res.code === ERR_OK) this.singers = res.data.list
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.singer
    position: fixed
    top: 88px
    bottom: 100%
    width: 100%
</style>
