import { ajax } from 'core'
import { HomeAPIResponse, HomeHeroInfo } from 'type/api'

export class HomeService {
  static getExploreAccountInfo (): Promise<HomeAPIResponse<HomeHeroInfo>> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 200
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          title: '死亡如风 常伴吾身',
          subtitle: '且随疾风前行 身后亦须留心',
          description: '生命中有三件必经之事：荣誉、死亡、还有宿醉。',
          img: 'https://pic.downk.cc/item/5ed50fa1c2a9a83be5408638.png',
        },
      })
    })
  }

  static getPlanAccountInfo (): Promise<HomeAPIResponse<HomeHeroInfo>> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 200
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          title: '无形之刃 最为致命',
          subtitle: '我的影子就足够击败你了',
          description: '他并不是潜藏于阴影的刺客——他就是阴影。所以他们毫无胜算',
          img: 'https://pic.downk.cc/item/5ed50fa2c2a9a83be5408641.png',
        },
      })
    })
  }

  static getClaimsAccountInfo (): Promise<HomeAPIResponse<HomeHeroInfo>> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 200
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          title: '黑玫瑰将会再次绽放！',
          subtitle: '我会骗你么？',
          description: '接下来我要表演的是：将他们的血条弄消失~',
          img: 'https://pic.downk.cc/item/5ed50fa1c2a9a83be540862f.png',
        },
      })
    })
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
    } */
}
