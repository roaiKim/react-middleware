import { Module, register, Lifecycle, Loading } from 'core'
import Main from './component'
import { RouteParam, State, TabType } from './type'
import { HomeService } from 'service/api/HomeService'

const initialState: State = {
  type: undefined,
  homeExploreHero: null,
  homePlansHero: null,
  homeClaimsHero: null,
}

class MainModule extends Module<State, RouteParam> {
    @Lifecycle()
    @Loading()
  async onRender (routeParameters: RouteParam) {
    const { type } = routeParameters
    this.setState({ type: type || 'explore' })
    if (type === 'claims') {
      const response = await HomeService.getClaimsAccountInfo()
      this.setState({ homeClaimsHero: response.data })
    } else if (type === 'plans') {
      const response = await HomeService.getPlanAccountInfo()
      this.setState({ homePlansHero: response.data })
    } else {
      const response = await HomeService.getExploreAccountInfo()
      this.setState({ homeExploreHero: response.data })
    }
  }

    pushHomeTypeInHistory (type: TabType) {
      this.setHistory(`/${type}`)
    }
}

const module = register(new MainModule('home', initialState))
export const actions = module.getActions()
export const MainComponent = module.attachLifecycle(Main)
