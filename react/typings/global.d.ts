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

interface Controllers {
  chosenAppName?: string
  endDate?: Moment
  startDate?: Moment
  region: string
  production: string
  chosenMajor: string
  chosenMinor: string
  chosenPatch: string
}
