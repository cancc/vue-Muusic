import originJsonp from 'jsonp'

export default function _jsonp(url, data, option) {
  // 判断'?'出现的位置 (就是判断加'?'还是'&'的过程)
  url += (indexOf('?') < 0 ? '?' : '&') + param(data)
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

// data 相当于一个连接'?'后面的数据
export function param(data) {
  let url = ''
  // 遍历key,value值，再拼接
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
