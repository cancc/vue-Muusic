import { commonParams} from './config'
import axios from 'axios'

export function getPlayVkey(mid) {
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