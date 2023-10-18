<template>
	<div class="NotFound">
		<Empty image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original">
			<template #description>
				<span>
					404NotFound
      	</span>
			</template>
			<Button type="primary" @click="handleClick">点击返回</Button>
		</Empty>
	</div>
</template>


<script setup lang="ts">
	import { Empty, Button } from "ant-design-vue"
	import { useRouter } from "vue-router"

	const router = useRouter()
	const handleClick = () => {
		router.back()
	}	
</script>

<style scoped lang="scss">
.NotFound {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
</style>
