// Styles
import './styles/index.less'

// Components
export * from './components'

// Types
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button'
export type { AlertProps, AlertType } from './components/Alert'
export type { AvatarProps, AvatarSize, AvatarGroupProps } from './components/Avatar'
export type { BadgeProps } from './components/Badge'
export type { CardProps, CardHeaderProps } from './components/Card'
export type { CascaderProps, CascaderOption } from './components/Cascader'
export type { CheckboxProps, CheckboxGroupProps, CheckboxOption, CheckboxDirection } from './components/Checkbox'
export type { CollapseProps, CollapseItemProps } from './components/Collapse'
export type { DatePickerProps, DateValue } from './components/DatePicker'
export type { DividerProps, DividerAlign } from './components/Divider'
export type { DrawerProps, DrawerPlacement } from './components/Drawer'
export type { EmptyProps } from './components/Empty'
export type { FormProps, FormItemProps, FormRule, FormInstance, FormLayout, LabelAlign } from './components/Form'
export type { RowProps, ColProps, Gutter, Justify, Align, ColSize } from './components/Grid'
export type { ImageProps, ImageFit } from './components/Image'
export type { InputProps, InputType, TextareaProps } from './components/Input'
export type { InputOtpProps } from './components/InputOtp'
export type { LinkProps, LinkVariant, LinkUnderline } from './components/Link'
export type { MessageType, MessageOptions } from './components/Message'
export type { ModalProps } from './components/Modal'
export type { PaginationProps } from './components/Pagination'
export type { PopoverProps, PopoverMode, PopoverConfirmProps } from './components/Popover'
export type { RadioProps, RadioGroupProps, RadioOption, RadioDirection } from './components/Radio'
export type { RateProps } from './components/Rate'
export type { ResponsiveModalProps } from './components/ResponsiveModal'
export type { SelectProps, SelectOption } from './components/Select'
export type { SkeletonProps, SkeletonElementProps, SkeletonVariant } from './components/Skeleton'
export type { SpaceProps, SpaceAlign, SpaceOrientation, SpaceSize } from './components/Space'
export type { SpinProps, SpinPlacement, SpinOptions } from './components/Spin'
export type { StepsProps, StepItem, StepStatus, LabelPlacement } from './components/Steps'
export type { SwitchProps, SwitchSize, SwitchVariant } from './components/Switch'
export type { TabsProps, TabListProps, TabProps, TabPanelProps } from './components/Tabs'
export type { TagProps, TagVariant } from './components/Tag'
export type { TimelineProps, TimelineSide, TimelineItemProps } from './components/Timeline'
export type { ToastProps, ToastType, ToastOptions } from './components/Toast'
export type { TooltipProps } from './components/Tooltip'

// Version
export const version = '1.0.0'

// Plugin install
import type { App } from 'vue'
import { Alert } from './components/Alert'
import { Avatar, AvatarGroup } from './components/Avatar'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card, CardHeader, CardBody, CardFooter } from './components/Card'
import { Cascader } from './components/Cascader'
import { Checkbox, CheckboxGroup } from './components/Checkbox'
import { Collapse, CollapseItem } from './components/Collapse'
import { DatePicker } from './components/DatePicker'
import { Divider } from './components/Divider'
import { Drawer } from './components/Drawer'
import { Empty } from './components/Empty'
import { Form, FormItem } from './components/Form'
import { Row, Col } from './components/Grid'
import { Image } from './components/Image'
import { Input, Textarea } from './components/Input'
import { InputOtp } from './components/InputOtp'
import { Link } from './components/Link'
import { Modal } from './components/Modal'
import { Pagination } from './components/Pagination'
import { Popover, PopoverConfirm } from './components/Popover'
import { Radio, RadioGroup } from './components/Radio'
import { Rate } from './components/Rate'
import { ResponsiveModal } from './components/ResponsiveModal'
import { Select } from './components/Select'
import { Skeleton, SkeletonElement } from './components/Skeleton'
import { Space } from './components/Space'
import { Spin } from './components/Spin'
import { Steps } from './components/Steps'
import { Switch } from './components/Switch'
import { Tabs, TabList, Tab, TabPanel } from './components/Tabs'
import { Tag } from './components/Tag'
import { Timeline, TimelineItem } from './components/Timeline'
import { Tooltip } from './components/Tooltip'

const components = [
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  DatePicker,
  Divider,
  Drawer,
  Empty,
  Form,
  FormItem,
  Row,
  Col,
  Image,
  Input,
  Textarea,
  InputOtp,
  Link,
  Modal,
  Pagination,
  Popover,
  PopoverConfirm,
  Radio,
  RadioGroup,
  Rate,
  ResponsiveModal,
  Select,
  Skeleton,
  SkeletonElement,
  Space,
  Spin,
  Steps,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Tag,
  Timeline,
  TimelineItem,
  Tooltip
]

export const install = (app: App) => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  version,
  install
}

