<template>
	<div class="restContainer">
		<head-top head-title="重置密码" goBack="true"></head-top>
		<form class="restForm">
			<section class="input_container phone_number">
				<input type="text" name="phone" placeholder="账号" maxlength="11" v-model="phoneNumber" @input="inputPhone">
			</section>
			<section class="input_container">
				<input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
			</section>
			<section class="input_container">
				<input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
			</section>
			<section class="input_container">
				<input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
			</section>
			<section class="input_container captcha_code_container">
				<input type="text" placeholder="验证码" maxlength="6" v-model="mobileCode">
				<div class="img_change_img">
					<img v-show="captchaCodeImg" :src="captchaCodeImg">
					<div class="change_img" @click="getCaptchaCode">
						<p>看不清</p><p>换一张</p>
					</div>
				</div>
			</section>
		</form>
		<div class="login_container" @click="resetButton">确认修改</div>
		<alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'
	import {getcaptchas, changePassword} from '../../service/getData'

	export default {
		data() {
			return {
				showAlert: false, //显示提示组件
				alertText: null, //提示的内容
				phoneNumber: null, //电话号码
				oldPassWord: null, //旧密码
				newPassWord: null, //新密码
				confirmPassWord: null, //确认密码 
				mobileCode: null, //短信验证码
				captchaCodeImg: null, //验证码地址

			}
		},
		components: {
			headTop,
			alertTip
		},
		created() {
			this.getCaptchaCode()
		},
		methods: {
			closeTip() {
				this.showAlert = false
			},
			inputPhone() {//判断输入的电话号码
				if(/.+/gi.test(this.phoneNumber)){
					this.rightPhoneNumber = true
				}else{
					this.rightPhoneNumber = false
				}
			},
			async getCaptchaCode() {//获取图片验证码
				let res = await getcaptchas()
				this.captchaCodeImg = res.code
			},
			async resetButton() {//重置密码
				if(!this.phoneNumber){
					this.showAlert = true
					this.alertText = '请输入正确的账号'
					return
				}else if(!this.oldPassWord){
					this.showAlert = true
					this.alertText = '请输入旧密码'
					return
				}else if(!this.newPassWord){
					this.showAlert = true
					this.alertText = '请输入新密码'
					return
				}else if(!this.confirmPassWord){
					this.showAlert = true
					this.alertText = '请输入确认密码'
					return
				}else if(!this.newPassWord !== this.confirmPassWord){
					this.showAlert = true
					this.alertText = '两次输入的密码不一致'
					return
				}else if(!this.mobileCode){
					this.showAlert = true
					this.alertText = '请输入验证码'
					return
				}
				//发送重置信息
				let res = await changePassword(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode)
				if(res.message){
					this.showAlert = true
					this.alertText = res.message
					this.getCaptchaCode()
					return
				}else{
					this.showAlert = true
					this.alertText = '密码修改成功'
				}
			}
		}
	}

</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';

	.restContainer{
		padding-top: 1.95rem;
	}
	.restForm{
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
		}
		.phone_number{
			padding: .3rem .8rem;
		}
	}
	.captcha_code_container{
		height: 2.2rem;
		.img_change_img{
			display: flex;
			align-items: center;
			img{
				@include wh(3.5rem, 1.5rem);
				margin-right: .2rem;
			}
			.change_img{
				display: flex;
				flex-direction: 'column';
				flex-wrap: wrap;
				width: 2rem;
				justify-content: center;
				p{
					@include sc(.55rem, #666);
				}
				p:nth-of-type(2){
					color: #3b95e9;
					margin-top: .2rem;
				}
			}
		}
	}
	.login_container{
		margin: 0 .5rem 1rem;
		@include sc(.7rem, #fff);
		background-color: #4cd964;
		padding: .5rem 0;
		border: 1px;
		border-radius: 0.15rem;
		text-align: center;
	}
</style>