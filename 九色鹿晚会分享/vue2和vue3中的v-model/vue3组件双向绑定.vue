<template>
  <div>
    <span>孩子：{{aaa}}</span><button @click="fn">click</button>
  </div>
</template>

<script setup>
let aaa = defineModel({ default: '' })
// let aaa = defineModel('aaa',{ default: '' })
// const props = defineProps(['modelValue']); // 自动创建 prop
// const emit = defineEmits(['update:modelValue']); // 自动创建事件
function fn(){
  aaa.value = Math.random();
  // emit('update:modelValue',Math.random());
}
</script>