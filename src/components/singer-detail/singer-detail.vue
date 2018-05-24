<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/_song'
import MusicList from 'components/music-list/music-list'
import { getPlayVkey } from 'api/singer'


/*import {mapMutations} from 'vuex'*/
// 读取写入的数据通过mapGetters 方法，这个方法在computed里执行
export default {
    data() {
        return {
            songs: [],
            vkey: ''
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created() {
        this._getDetail()
        console.log(this.singer)
    },
    methods: {
        _getDetail() {
            // 当刷新后没有歌手的id就跳到路由'/singer'
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                    console.log(this.songs)
                    //console.log(this.singer)

                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                let { musicData } = item
                getPlayVkey(musicData.songmid).then((res) => {
                    if (res.code === ERR_OK) {
                        this.vkey = res.data.items[0].vkey
                        //item.url = `http://dl.stream.qqmusic.qq.com/C400${item.mid}.m4a?vkey=${this.vkey}&guid=381496156&uin=0&fromtag=66`
                        // console.log(this.vkey)
                    }
                    if (musicData.songid && musicData.albummid) {
                        let vkey = this.vkey
                        ret.push(createSong(musicData, vkey))
                    }
                })

            })
            return ret
            // console.log(ret)
        }

    },
    components: {
        MusicList
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .slide-enter-active, .slide-leave-active
      transition: all 0.3s
    .slide-enter, .slide-leave-top
      transform: translate3d(100%, 0, 0)
</style>


