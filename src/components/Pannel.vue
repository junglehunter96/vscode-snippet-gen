<template>
	<div class="pannel">
		<textarea readonly class="p-6 w-full leading-snug text-green-500 font-mono" style="height:100% "
			v-model="transData"></textarea>
	</div>
</template>

<script  setup lang="ts">
import { ref } from "vue"
import { emitter } from "../emitt";
import { generatorCodeSnippet, Icontent } from "../utils"
const transData = ref("")
emitter.on("change", (data) => {
	transData.value = generatorCodeSnippet(data as Icontent)!
})
emitter.on("copy", () => {


	if (!transData.value) {

	} else {
		navigator.clipboard.writeText(transData.value).then(() => {

			console.log("复制成功")
		})
	}
})
</script>

<style  scoped>
.pannel {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	position: relative;
	height: 100%;
	background: rgb(30, 41, 59);
}
</style>