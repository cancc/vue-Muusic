/*状态*/
import {playMode} from 'common/js/_config'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    //当前播放索引（歌曲）
    currentIndex: -1,
    disc: {},
    topList: {}
}

export default state