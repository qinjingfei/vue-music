import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data) // 如果url中有?的话, ?. 没有的话 &

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) resolve(data)
      else reject(err)
    })
  })
}

// @param {Object} data
// @return {String} url
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '' // 如果data[k]为undefined, 让它等于''. 否则等于自己
    url += '&' + k + '=' + encodeURIComponent(value) // 例子“&g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp”
  }
  return url ? url.substring(1) : '' // 如果url不为空的话，去掉开头的&. 否则，让url等于''
}
