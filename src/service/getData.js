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