import AdRadio from './Radio.vue'
import AdRadioGroup from './RadioGroup.vue'
import AdRadioGroupItem from './RadioGroupItem.vue'

export type { RadioProps } from './Radio.vue'
export type { RadioGroupProps, RadioOptionType, RadioValueType } from './RadioGroup.vue'
export type { RadioGroupItemProps } from './RadioGroupItem.vue'

// 将 RadioGroupItem 作为 RadioGroup 的静态属性
AdRadioGroup.Item = AdRadioGroupItem

export { AdRadio, AdRadioGroup, AdRadioGroupItem }
export default AdRadio