// ============================================
// Tabs Context
// ============================================
export interface TabsContextValue {
  activeKey: string
  setActiveKey: (key: string) => void
  capsule: boolean
}

// ============================================
// Tabs
// ============================================
export interface TabsProps {
  /** 默认选中的 Tab key */
  defaultActiveKey?: string
  /** 是否为胶囊形 */
  capsule?: boolean
  /** 右侧额外内容 */
  extra?: any
  /** 自定义类名 */
  className?: string
}

// ============================================
// TabList
// ============================================
export interface TabListProps {
  /** 右侧额外内容（由 Tabs 传入） */
  extra?: any
  /** 自定义类名 */
  className?: string
}

// ============================================
// Tab
// ============================================
export interface TabProps {
  /** Tab 的唯一标识 */
  tabKey: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  className?: string
}

// ============================================
// TabPanel
// ============================================
export interface TabPanelProps {
  /** 对应的 Tab key */
  tabKey: string
  /** 自定义类名 */
  className?: string
}