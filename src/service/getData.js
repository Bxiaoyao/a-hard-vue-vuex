import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取用户信息
 */
export const getUser = () => fetch('/apis/v1/user', {user_id: getStore('user_id')})

/**
 * 检测账号是否存在
 */
export const checkExsis = (checkNumber, type) => fetch('/apis/v1/users/exists', {
  [type]: checkNumber,
  type
})

/**
 * 获取短信验证码
 */
export const mobileCode = phone => fetch('/apis/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST')

/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('/apis/v1/captchas', {}, 'POST')

/**
 * 手机号登录
 */
export const sendLogin = (code, mobile, validate_token) => fetch('/apis/login/app_mobile', {
  code,
  mobile,
  validate_token
}, 'POST')

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/apis/v2/login', {
  username,
  password,
  captcha_code
}, 'POST')

/**
 * 修改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/apis/v2/changepassword', {
  username,
  oldpassWord,
  newpassword,
  confirmpassword,
  captcha_code
}, 'POST')

/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('/apis/v1/cities', {
  type: 'guess'
})

/**
 * 获取首页热门城市
 */
export const hotcity = () => fetch('/apis/v1/cities', {
  type: 'hot'
})

/**
  * 获取首页所有城市
  */
export const groupcity = () => fetch('/apis/v1/cities', {
  type: 'group'
})

/**
  * 获取当前所在城市
  */
export const currentcity = number => fetch('/apis/v1/cities/' + number)

/**
 * 获取搜索地址
 */
export const searchplace = (cityid, value) => fetch('/apis/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
})

/**
 * 获取msite页面食品分类列表
 */
export const msiteAddress = geohash => fetch('/apis/v2/pois/' + geohash)

/**
 * 获取msite页面食品分类列表
 */
export const msiteFoodTypes = geohash => fetch('/apis/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

/**
 * 获取msite商铺列表
 */
export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activeties',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  }
  return fetch('/apis/shopping/restaurants', data)
}
