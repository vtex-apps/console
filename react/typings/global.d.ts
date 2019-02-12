interface RenderContext {
  account: RenderRuntime['account']
  components: RenderRuntime['components']
  culture: RenderRuntime['culture']
  device: ConfigurationDevice
  emitter: RenderRuntime['emitter']
  extensions: RenderRuntime['extensions']
  fetchComponent: (component: string) => Promise<void>
  getSettings: (app: string) => any
  history: any | null
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

interface NavigateOptions {
  page?: string
  params?: any
  query?: any
  to?: string
  scrollOptions?: RenderScrollOptions
  fallbackToWindowLocation?: boolean
}

interface AppController {
  appName?: string
  appVersion?: string
  region?: string
  production?: string
}

interface TimeController {
  startDate?: Date
  endDate?: Date
  rangeStep?: string
  mode?: TimeRange
}

type TimeRange = 'absolute' | 'relative'

type SetTimeControllers = (timeControllers: TimeController) => void

type SetAppControllers = (appControllers: AppController) => void

