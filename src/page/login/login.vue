<template>
	<div class="loginContainer">
		<head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
			
		</head-top>
	</div>
</template>

<script type="text/javascript">
	import headTop from '../../components/header/head'
	export default {
    	data(){
			return {
				loginWay: false, //登录方式，默认短信登录
			}
		},
		created(){

		},
		components:{
			headTop
		},
		computed:{

		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.loginContainer{
		padding-top: 1.95rem;
	}
</style>