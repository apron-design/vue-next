import { App } from 'vue'
import { Button } from '../../../src/components/Button'
import { Divider } from '../../../src/components/Divider'
import { Alert } from '../../../src/components/Alert'

export function useComponents(app: App) {
  // Register components with their direct names for use in templates
  app.component('Button', Button)
  app.component('Divider', Divider)
  app.component('Alert', Alert)
}