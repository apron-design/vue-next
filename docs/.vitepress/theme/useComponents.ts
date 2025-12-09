import { App } from 'vue'
// 导入实际 UI 组件 - 直接从 .vue 文件导入
import { AdButton } from '../../../src/components/Button'
import { AdDivider } from '../../../src/components/Divider'
import { AdAlert } from '../../../src/components/Alert'
import { AdAvatar } from '../../../src/components/Avatar'
import { AdBadge } from '../../../src/components/Badge'
import { AdTag } from '../../../src/components/Tag'
import { AdEmpty } from '../../../src/components/Empty'
import { AdCard, AdCardHeader, AdCardBody, AdCardFooter } from '../../../src/components/Card'
import { AdCascader } from '../../../src/components/Cascader'
import { AdCheckbox } from '../../../src/components/Checkbox'
import { AdCollapse, AdCollapseItem } from '../../../src/components/Collapse'
import { AdDatePicker } from '../../../src/components/DatePicker'
import { AdSpace } from '../../../src/components/Space'
import { AdSkeleton, AdSkeletonElement, AdSkeletonAvatar, AdSkeletonTitle, AdSkeletonParagraph, AdSkeletonButton, AdSkeletonImage } from '../../../src/components/Skeleton'
import { AdRadio, AdRadioGroup } from '../../../src/components/Radio'
import { AdInput } from '../../../src/components/Input'
import { AdLink } from '../../../src/components/Link'
import { AdDrawer } from '../../../src/components/Drawer'
import { AdForm, AdFormItem } from '../../../src/components/Form'
import { AdRow, AdCol } from '../../../src/components/Grid'
import { AdImage } from '../../../src/components/Image'
import { AdInputOtp } from '../../../src/components/InputOtp'
import { AdModal } from '../../../src/components/Modal'
import { AdPagination } from '../../../src/components/Pagination'
import { AdPopover } from '../../../src/components/Popover'
import { AdRate } from '../../../src/components/Rate'
import { AdResponsiveModal } from '../../../src/components/ResponsiveModal'
import { AdSelect } from '../../../src/components/Select'
import { AdSpin } from '../../../src/components/Spin'
import { AdSteps } from '../../../src/components/Steps'
import { AdSwitch } from '../../../src/components/Switch'
import { AdTabs, AdTabList, AdTab, AdTabPanel } from '../../../src/components/Tabs'
import { AdTimeline, AdTimelineItem } from '../../../src/components/Timeline'
// 导入 demoblock 内部组件
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export function useComponents(app: App) {
  // 注册实际的 UI 组件
  app.component('AdButton', AdButton)
  app.component('AdDivider', AdDivider)
  app.component('AdAlert', AdAlert)
  app.component('AdAvatar', AdAvatar)
  app.component('AdBadge', AdBadge)
  app.component('AdTag', AdTag)
  app.component('AdEmpty', AdEmpty)
  app.component('AdCard', AdCard)
  app.component('AdCardHeader', AdCardHeader)
  app.component('AdCardBody', AdCardBody)
  app.component('AdCardFooter', AdCardFooter)
  app.component('AdCascader', AdCascader)
  app.component('AdCheckbox', AdCheckbox)
  app.component('AdCollapse', AdCollapse)
  app.component('AdCollapseItem', AdCollapseItem)
  app.component('AdDatePicker', AdDatePicker)
  app.component('AdSpace', AdSpace)
  app.component('AdSkeleton', AdSkeleton)
  app.component('AdSkeletonElement', AdSkeletonElement)
  app.component('AdSkeletonAvatar', AdSkeletonAvatar)
  app.component('AdSkeletonTitle', AdSkeletonTitle)
  app.component('AdSkeletonParagraph', AdSkeletonParagraph)
  app.component('AdSkeletonButton', AdSkeletonButton)
  app.component('AdSkeletonImage', AdSkeletonImage)
  app.component('AdRadio', AdRadio)
  app.component('AdRadioGroup', AdRadioGroup)
  app.component('AdInput', AdInput)
  app.component('AdLink', AdLink)
  app.component('AdDrawer', AdDrawer)
  app.component('AdForm', AdForm)
  app.component('AdFormItem', AdFormItem)
  app.component('AdRow', AdRow)
  app.component('AdCol', AdCol)
  app.component('AdImage', AdImage)
  app.component('AdInputOtp', AdInputOtp)
  app.component('AdModal', AdModal)
  app.component('AdPagination', AdPagination)
  app.component('AdPopover', AdPopover)
  app.component('AdRate', AdRate)
  app.component('AdResponsiveModal', AdResponsiveModal)
  app.component('AdSelect', AdSelect)
  app.component('AdSpin', AdSpin)
  app.component('AdSteps', AdSteps)
  app.component('AdSwitch', AdSwitch)
  app.component('AdTabs', AdTabs)
  app.component('AdTabList', AdTabList)
  app.component('AdTab', AdTab)
  app.component('AdTabPanel', AdTabPanel)
  app.component('AdTimeline', AdTimeline)
  app.component('AdTimelineItem', AdTimelineItem)
  
  // 注册 demoblock 内部组件
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}