import { App } from 'vue'
// 导入实际 UI 组件 - 直接从 .vue 文件导入
import Button from '../../../src/components/Button/Button.vue'
import Divider from '../../../src/components/Divider/Divider.vue'
import Alert from '../../../src/components/Alert/Alert.vue'
import Avatar from '../../../src/components/Avatar/Avatar.vue'
import Badge from '../../../src/components/Badge/Badge.vue'
import Tag from '../../../src/components/Tag/Tag.vue'
import Empty from '../../../src/components/Empty/Empty.vue'
import Card from '../../../src/components/Card/Card.vue'
import CardHeader from '../../../src/components/Card/CardHeader.vue'
import CardBody from '../../../src/components/Card/CardBody.vue'
import CardFooter from '../../../src/components/Card/CardFooter.vue'
import Cascader from '../../../src/components/Cascader/Cascader.vue'
import Checkbox from '../../../src/components/Checkbox/Checkbox.vue'
import Collapse from '../../../src/components/Collapse/Collapse.vue'
import CollapseItem from '../../../src/components/Collapse/CollapseItem.vue'
import DatePicker from '../../../src/components/DatePicker/DatePicker.vue'
import Space from '../../../src/components/Space/Space.vue'
import Skeleton from '../../../src/components/Skeleton/Skeleton.vue'
import SkeletonElement from '../../../src/components/Skeleton/SkeletonElement.vue'
import SkeletonAvatar from '../../../src/components/Skeleton/SkeletonAvatar.vue'
import SkeletonTitle from '../../../src/components/Skeleton/SkeletonTitle.vue'
import SkeletonParagraph from '../../../src/components/Skeleton/SkeletonParagraph.vue'
import SkeletonButton from '../../../src/components/Skeleton/SkeletonButton.vue'
import SkeletonImage from '../../../src/components/Skeleton/SkeletonImage.vue'
import Radio from '../../../src/components/Radio/Radio.vue'
import RadioGroup from '../../../src/components/Radio/RadioGroup.vue'
import Input from '../../../src/components/Input/Input.vue'
import Link from '../../../src/components/Link/Link.vue'
import Drawer from '../../../src/components/Drawer/Drawer.vue'
import Form from '../../../src/components/Form/Form.vue'
import FormItem from '../../../src/components/Form/FormItem.vue'
import Row from '../../../src/components/Grid/Row.vue'
import Col from '../../../src/components/Grid/Col.vue'
import Image from '../../../src/components/Image/Image.vue'
import InputOtp from '../../../src/components/InputOtp/InputOtp.vue'
import Modal from '../../../src/components/Modal/Modal.vue'
import Pagination from '../../../src/components/Pagination/Pagination.vue'
import Popover from '../../../src/components/Popover/Popover.vue'
import Rate from '../../../src/components/Rate/Rate.vue'
import ResponsiveModal from '../../../src/components/ResponsiveModal/ResponsiveModal.vue'
import Select from '../../../src/components/Select/Select.vue'
import Spin from '../../../src/components/Spin/Spin.vue'
import Steps from '../../../src/components/Steps/Steps.vue'
import Switch from '../../../src/components/Switch/Switch.vue'
import Tabs from '../../../src/components/Tabs/Tabs.vue'
import TabList from '../../../src/components/Tabs/TabList.vue'
import Tab from '../../../src/components/Tabs/Tab.vue'
import TabPanel from '../../../src/components/Tabs/TabPanel.vue'
import Timeline from '../../../src/components/Timeline/Timeline.vue'
import TimelineItem from '../../../src/components/Timeline/TimelineItem.vue'
// 导入 demoblock 内部组件
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export function useComponents(app: App) {
  // 注册实际的 UI 组件
  app.component('Button', Button)
  app.component('Divider', Divider)
  app.component('Alert', Alert)
  app.component('Avatar', Avatar)
  app.component('Badge', Badge)
  app.component('Tag', Tag)
  app.component('Empty', Empty)
  app.component('Card', Card)
  app.component('CardHeader', CardHeader)
  app.component('CardBody', CardBody)
  app.component('CardFooter', CardFooter)
  app.component('Cascader', Cascader)
  app.component('Checkbox', Checkbox)
  app.component('Collapse', Collapse)
  app.component('CollapseItem', CollapseItem)
  app.component('DatePicker', DatePicker)
  app.component('Space', Space)
  app.component('Skeleton', Skeleton)
  app.component('SkeletonElement', SkeletonElement)
  app.component('SkeletonAvatar', SkeletonAvatar)
  app.component('SkeletonTitle', SkeletonTitle)
  app.component('SkeletonParagraph', SkeletonParagraph)
  app.component('SkeletonButton', SkeletonButton)
  app.component('SkeletonImage', SkeletonImage)
  app.component('Radio', Radio)
  app.component('RadioGroup', RadioGroup)
  app.component('Input', Input)
  app.component('Link', Link)
  app.component('Drawer', Drawer)
  app.component('Form', Form)
  app.component('FormItem', FormItem)
  app.component('Row', Row)
  app.component('Col', Col)
  app.component('Image', Image)
  app.component('InputOtp', InputOtp)
  app.component('Modal', Modal)
  app.component('Pagination', Pagination)
  app.component('Popover', Popover)
  app.component('Rate', Rate)
  app.component('ResponsiveModal', ResponsiveModal)
  app.component('Select', Select)
  app.component('Spin', Spin)
  app.component('Steps', Steps)
  app.component('Switch', Switch)
  app.component('Tabs', Tabs)
  app.component('TabList', TabList)
  app.component('Tab', Tab)
  app.component('TabPanel', TabPanel)
  app.component('Timeline', Timeline)
  app.component('TimelineItem', TimelineItem)
  
  // 注册 demoblock 内部组件
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}