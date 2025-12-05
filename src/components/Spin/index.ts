import Spin from './Spin.vue'
import { SpinService } from './spin'

// Attach static methods to component
const SpinWithService = Spin as typeof Spin & {
  show: typeof SpinService.show
  close: typeof SpinService.close
}
SpinWithService.show = SpinService.show
SpinWithService.close = SpinService.close

export { Spin, SpinService }
export type { SpinProps, SpinPlacement } from './Spin.vue'
export type { SpinOptions } from './spin'
export default SpinWithService

