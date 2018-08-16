/**
 * 把src/api/config.js 中的配置数据，传给jsonp function
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

/**
 * @return {function} jsonp
 */
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, { // merge multiple sources
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}