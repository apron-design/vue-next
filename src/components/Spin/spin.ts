import { createApp, h, ref, type App, type Component } from 'vue'
import SpinComponent from './Spin.vue'

export interface SpinOptions {
  text?: string
  icon?: Component
}

let spinInstance: App | null = null
let spinContainer: HTMLDivElement | null = null

const visible = ref(false)
const currentOptions = ref<SpinOptions>({})

const createSpin = () => {
  if (spinInstance) return

  spinContainer = document.createElement('div')
  document.body.appendChild(spinContainer)

  spinInstance = createApp({
    render() {
      return h(SpinComponent, {
        loading: visible.value,
        fullscreen: true,
        text: currentOptions.value.text,
        icon: currentOptions.value.icon
      })
    }
  })

  spinInstance.mount(spinContainer)
}

const show = (options?: SpinOptions | string) => {
  createSpin()
  
  if (typeof options === 'string') {
    currentOptions.value = { text: options }
  } else {
    currentOptions.value = options || {}
  }
  
  visible.value = true
}

const close = () => {
  visible.value = false
}

export const SpinService = {
  show,
  close
}

export default SpinService

