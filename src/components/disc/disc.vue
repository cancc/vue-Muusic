<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/_song'
  import { getPlayVkey } from 'api/singer'

  export default {
    data(){
        return {
            songs: [],
            vkey: ''
        }
    },
    computed: {
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created(){
        this._getSongList()
    },
    methods:{
        _getSongList(){
            if(!this.disc.dissid){
                this.$router.push('/recommend')
                return
            }
            getSongList(this.disc.dissid).then((res) => {
                if(res.code === ERR_OK){
                    // console.log(res.cdlist[0].songlist)
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist) 
                   // console.log(this.songs)
                }
            })
        },
        _normalizeSongs(list){
            let ret = []
            list.forEach((musicData) => {
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
        }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>