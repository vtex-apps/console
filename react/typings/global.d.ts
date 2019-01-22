interface RenderContext {
  account: RenderRuntime['account']
  components: RenderRuntime['components']
  culture: RenderRuntime['culture']
  device: ConfigurationDevice
  emitter: RenderRuntime['emitter']
  extensions: RenderRuntime['extensions']
  fetchComponent: (component: string) => Promise<void>
  getSettings: (app: string) => any
  history: History | null
  navigate: (options: NavigateOptions) => boolean
  onPageChanged: (location: Location) => void
  page: RenderRuntime['page']
  pages: RenderRuntime['pages']
  prefetchPage: (name: string) => Promise<void>
  production: RenderRuntime['production']
  setDevice: (device: ConfigurationDevice) => void
  updateComponentAssets: (availableComponents: Components) => void
  updateExtension: (name: string, extension: Extension) => void
  updateRuntime: (options?: PageContextOptions) => Promise<void>
  workspace: RenderRuntime['workspace']
}

interface EnvController {
  chosenAppName?: string
  chosenMajor: string
  chosenMinor: string
  chosenPatch: string
  region: string
  production: string
}

interface TimeController {
  startDate: Moment
  endDate: Moment
  rangeStep: string
}

interface LayoutWithSpecsContainer {
  cacheId: String
  layoutWithSpecs: LayoutWithSpecs[]
}

interface LayoutWithSpecs {
  spec: String
  specLocator: SpecLocator
}

interface SpecLocator {
  appId: string
  specName: string
}

declare module 'vtex.styleguide' {
  import { ReactElement } from 'react'

  const Badge: ReactElement
  const Button: ReactElement
  const Checkbox: ReactElement
  const DatePicker: ReactElement
  const Dropdown: ReactElement
  const EmptyState: ReactElement
  const IconCaretRight: ReactElement
  const Input: ReactElement
  const Layout: ReactElement
  const NumericStepper: ReactElement
  const Tab: ReactElement
  const Tabs: ReactElement
  const Textarea: ReactElement
  const Radio: ReactElement
  const RadioGroup: ReactElement
  const Spinner: ReactElement
  const PageHeader: ReactElement
  const PageBlock: ReactElement

  export { Button, Dropdown, DatePicker, EmptyState, Input, Layout, NumericStepper, Tab, Tabs, Radio, RadioGroup, Spinner, PageBlock, PageHeader }
}


