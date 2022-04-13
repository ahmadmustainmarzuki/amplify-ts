<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input ref="el" @input="tes" v-model="tesInput" />
    <p>{{ tesInput }}</p>
    <HelloWorld :msg="msg" />
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { ref, onMounted } from "vue";

const el = ref<HTMLInputElement | null>(null);
const msg = "Welcome to Your Vue.js + TypeScript App";
const tesInput = ref();

onMounted(() => {
  el.value?.focus();
});

function tes() {
  console.log(tesInput.value);
}
</script>
