import jsonp from 'common/js/jsonp'
import { commonParams, options} from './config'
import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg"

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}


export function getPlayVkey(songmid) {
  const url = "/getK"
  //const a = "MusicJsonCallback"+(Math.random()+"").replace("0.","")

  const data = Object.assign({}, commonParams, {
    g_tk:'905526633',
    loginUin:0,
    hostUin:0,
    format:'json',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    cid:'205361747',
    uin:0,
    songmid:songmid,
    filename:`C400${songmid}.m4a`,
    guid:'381496156',
    //callback: a
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}