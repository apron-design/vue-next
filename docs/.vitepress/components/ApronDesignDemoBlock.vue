<template>
  <div class="demo-block" ref="demoBlockRef">
    <div class="demo-block-demo">
      <slot></slot>
    </div>
    <div class="demo-block-code">
      <div class="demo-block-code-header">
        <span>代码</span>
        <button class="demo-block-code-btn" @click="showCode = !showCode">
          {{ showCode ? '收起' : '展开' }}
        </button>
        <button class="demo-block-code-btn" @click="copyCode">
          {{ copySuccess ? '已复制' : '复制' }}
        </button>
      </div>
      <div v-if="showCode" class="demo-block-code-content">
        <pre><code>{{ code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const demoBlockRef = ref(null)
const code = ref('')
const showCode = ref(false)
const copySuccess = ref(false)

onMounted(() => {
  // 从隐藏元素中提取代码
  const rawCodeElement = demoBlockRef.value?.querySelector('.demo-block-raw-code')
  if (rawCodeElement) {
    code.value = rawCodeElement.textContent
  }
})

const copyCode = () => {
  navigator.clipboard.writeText(code.value)
  copySuccess.value = true
  setTimeout(() => {
    copySuccess.value = false
  }, 2000)
}
</script>

<style scoped>
.demo-block {
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-block-demo {
  padding: 24px;
  background-color: #fff;
}

.demo-block-code {
  background-color: #f9f9f9;
}

.demo-block-code-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #eaeaea;
  cursor: pointer;
}

.demo-block-code-header span {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.demo-block-code-btn {
  margin-left: 12px;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.demo-block-code-btn:hover {
  background-color: #1890ff;
  color: #fff;
}

.demo-block-code-content {
  padding: 16px;
  overflow-x: auto;
}

pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

code {
  color: #333;
}
</style>