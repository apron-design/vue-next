<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <div class="apron-card__footer" v-bind="attrs">
    <slot />
  </div>
</template>

<style lang="less">
@import './Card.less';
</style>

