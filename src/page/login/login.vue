<template>
	<div class="loginContainer">
		<head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
			
		</head-top>
		<form class="loginForm" v-if="loginWay">
			<section class="input_container phone_number">
				<input type="text" name="phone" placeholder="账号密码" maxlength="11" v-model="phoneNumber">
				<button @click.prevent="getVerifyCode" :class="{right_phone_number:rightRhoneNumber}" v-show="!computedTime">获取验证码</button>
				<button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
			</section>
			<section class="input_container">
				<input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
			</section>
		</form>
		<form class="loginForm" v-else>
			<section class="input_container">
				<input type="text" name="" placeholder="账号" v-model.lazy="userAccount">
			</section>
			<section class="input_container">
				<input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
				<input v-else type="text" placeholder="密码" v-model="passWord">
				<!-- <div class="button_switch" :class="{change_to_text:showPassword}">
					
				</div> -->
			</section>
		</form>
	</div>
</template>

<script type="text/javascript">
	import headTop from '../../components/header/head'
	import {checkExsis, mobileCode} from '../../service/getData'
	export default {
    	data(){
			return {
				loginWay: false, //登录方式，默认短信登录
				phoneNumber: null, //电话号码
				mobileCode: null, //短信验证码
				computedTime: 0, //倒数计时
				validate_token: null, //获取短信时返回的验证值，用于登录
				showPassword: false, //是否显示密码
				userAccount: null, //用户名
				passWord: null, //密码
			}
		},
		created(){

		},
		components:{
			headTop
		},
		computed:{
			//判断手机号码
			rightRhoneNumber: function (){
				return /^1\d{10}$/gi.test(this.phoneNumber)
			}
		},
		methods:{
			//获取短信验证码
			async getVerifyCode(){
				if(this.rightRhoneNumber){
					this.computedTime = 30;
					this.timer = setInterval(() => {
						this.computedTime --
						if (this.computedTime == 0) {
							clearInterval(this.timer)
						}
					},1000)
					//判断用户是否存在
					// let exsis = await checkExsis(this.phoneNumber, 'mobile')
					// if(exsis.message) {
					// 	this.showAlert = true
					// 	this.alertText = exsis.message
					// 	return
					// }else if(!exsis.is_exists){
					// 	this.showAlert = true
					// 	this.alertText = '您输入的手机号尚未绑定'
					// 	return
					// }
					//发送短信验证码
					// let res = await mobileCode(this.phoneNumber)
					// if (res.message) {
					// 	this.showAlert = true
					// 	this.alertText = res.message
					// 	return
					// }
					// this.validate_token = res.validate_token
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.loginContainer{
		padding-top: 1.95rem;
	}
	.loginForm{
		background-color: #fff;
		margin-top: .6rem;
		.input_container{
			display: flex;
			justify-content: space-between;
			padding: .6rem .8rem;
			border-bottom: 1px solid #f1f1f1;
			input{
				@include sc(.7rem, #666);
			}
			button{
				@include sc(.65rem, #fff);
				font-family: Helvetica Neue, Tahoma, Arial;
				padding: .28rem .4rem;
				border: 1px;
				border-radius: 0.15rem;
			}
			.right_phone_number{
				background-color: #4cd964;
			}
		}
		.phone_number{
			padding: .3rem .8rem;
		}
	}
</style>