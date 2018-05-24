// 引入jsonp
import originJsonp from 'jsonp'

// 自定义一个jsonp方法
export default function jsonp(url, data, option) {
  // 判断'?'出现的位置 (就是判断加'?'还是'&'的过程)
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  // 遍历data里的key与value
  // data 相当于一个连接'?'后面的数据
// https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&

  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ""
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
