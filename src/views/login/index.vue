<template>
	<div class="login">
		<Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

		<div class="content">
			<Form class="form">
				<FormItem label="账号">
					<Input />
				</FormItem>
				
				<FormItem label="密码">
					<Input />
				</FormItem>

				<Button class="loginBtn">登 录</Button>
			</Form>
	</div>
	</div>
</template>

<script setup lang="ts">
import { options, particlesInit} from "./particle"
import { Form, FormItem, Input, Button } from "ant-design-vue"
</script>

<style scoped lang="scss">
.content {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;

	.form {
		position: relative;
		box-sizing: border-box;
		background-color: ghostwhite;
		padding: 40px 50px;
		width: 400px;
		border-radius: 20px;

		.loginBtn {
			display: flex;
			justify-content: center;
			margin: 0 auto;
			width: 180px;
		}
	}
}
</style>