<template>
	<div
		class="form scrollbar-none overflow-x-auto p-6 text-sm leading-snug language-html text-gray-800 bg-whiite bg-opacity-75 ">
		<input type="text" class="mb-6 w-64 leading-8 h-8 bg-white border-gray-500 border text-center" placeholder="请输入片段名"
			v-model="formData.name" />
		<input v-model="formData.prefix" type="text"
			class=" mb-6 w-64 leading-8 h-8 bg-white border-gray-500 border text-center" placeholder="简写" />

		<textarea ref="textarea" v-model="formData.body" class=" bg-white w-3/4 border height mb-6" rows="25"></textarea>
		<button class="p-2 flex items-center justify-center rounded-md bg-blue-500 text-white mb-6 appearance-none"
			@click.prevent="clearFormData">清空</button>
		<button class="p-2 flex items-center justify-center rounded-md bg-blue-500 text-white mb-6 appearance-none"
			@click.prevent="emitcopy">复制配置</button>


			<div class="text-gray-600">ctrl+i 可快速插入占位光标 如${0:example}</div>
	</div>
</template>

<script  setup lang="ts">
import { reactive, watch, ref, nextTick } from "vue";
import { emitter } from "../emitt"
import { Icontent, insertAtCursor } from "../utils"
let textarea = ref(null)
const formData = reactive<Icontent>({
	name: "",
	prefix: "",
	body: "",
})
watch(formData, (updateData: Icontent) => {
	emitter.emit('change', updateData)
})
let number = 0;
nextTick(() => {
	let element: HTMLTextAreaElement = textarea.value!
	element.addEventListener('keypress', function (e: KeyboardEvent) {

		if (e.key === 'i') {
			insertAtCursor(element, '${' + number + ':example}')
			number++;
			formData.body = element.value;
		}
	})
})
function emitcopy() {
	emitter.emit('copy')
}
function clearFormData() {
	number = 0;
	formData.name = "";
	formData.prefix = "";
	formData.body = "";
}
</script>

<style  scoped>
.form {
	height: 100%;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	height: 100%;
	color: #333;
}
</style>