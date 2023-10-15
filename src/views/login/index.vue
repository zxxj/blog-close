<template>
	<div class="login">login
		<button @click="tokenClick">token</button>
	</div>
</template>

<script setup lang="ts">
import { Auth } from '@/enums/auth'
import { setAuth } from '@/utils/auth';


const tokenClick = () => {
	setAuth(Auth.TOKEN,'tokena')
}
</script>

<style scoped lang="scss"></style>
