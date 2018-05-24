<template>
  <div class="singer" ref="singer">
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  mixins:[playlistMixin],
  data(){
    return{
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods:{
        // 定义mixin方法
        handlePlaylist(playlist){
            const bottom = playlist.length>0? '60px': ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
    // 跳转到singer-detail页面路由
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    // 获得歌手对象信息
    _getSingerList(){
      getSingerList().then((res)=>{
        if(res.code ===ERR_OK){
          this.singers = this._normalizeSinger(res.data.list)
         // console.log(this.singers)
          /*this.singers = res.data.list
          console.log(res.data.list)
          console.log(this._normalizeSinger(this.singers))*/
        }
      })
    },
    _normalizeSinger(list){
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 遍历
      list.forEach((item, index) => {
        // 如果index小于HOT_SINGER_LEN就push到 map.hot 中
        if(index < HOT_SINGER_LEN ){
          map.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar:`//y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        // 将item.Findex设为map的key，title也设置为item.Findex
        const key = item.Findex
        if(!map[key]){
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar:`//y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      // 无序列表map
     // console.log(map)
      // 将获得的数据按所需排列，有序列表的形式
      // 分为两个数组，'热门' '非热门'，最后合并为一个数组
      let ret = []
      let hot = []
      // 遍历map
      for(let key in map) {
        let val = map[key]
        // 检索val.title
        if(val.title.match(/[a-zA-Z]/)) {
          // 符合的push到ret，否则push到hot
          ret.push(val)
        }else if (val.title ===HOT_NAME) {
          hot.push(val)
        }
      }
      // 正序排列
      ret.sort((a,b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 用concat()方法可以连接两个或多个数组
      return hot.concat(ret)
    },
    // 写入数据
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })

  },
  components: {
    ListView
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
.singer
   position: fixed
   top: 88px
   bottom: 0
   width: 100%
</style>
