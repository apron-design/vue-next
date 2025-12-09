import { h, type VNode, type RendererNode, type RendererElement } from 'vue'

export type AlertType = 'info' | 'success' | 'warning' | 'error'

// 图标组件类型
type IconComponent = {
  name: string;
  setup(): () => VNode<RendererNode, RendererElement, { [key: string]: any }>;
}

// 图标组件
const InfoIcon: IconComponent = {
  name: 'InfoIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#4C9EEA'
      }),
      h('text', {
        x: '12',
        y: '16',
        'text-anchor': 'middle',
        fill: 'white',
        'font-size': '14',
        'font-weight': '600'
      }, 'i')
    ])
  }
}

const SuccessIcon: IconComponent = {
  name: 'SuccessIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#22c55e'
      }),
      h('path', {
        d: 'M8 12L11 15L16 9',
        stroke: 'white',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ])
  }
}

const WarningIcon: IconComponent = {
  name: 'WarningIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#f59e0b'
      }),
      h('path', {
        d: 'M12 8V13',
        stroke: 'white',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      }),
      h('circle', {
        cx: '12',
        cy: '16',
        r: '1',
        fill: 'white'
      })
    ])
  }
}

const ErrorIcon: IconComponent = {
  name: 'ErrorIcon',
  setup() {
    return () => h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('circle', {
        cx: '12',
        cy: '12',
        r: '10',
        fill: '#ef4444'
      }),
      h('path', {
        d: 'M9 9L15 15M15 9L9 15',
        stroke: 'white',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      })
    ])
  }
}

export const iconMap: Record<AlertType, IconComponent> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
}