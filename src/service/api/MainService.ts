import { ajax } from 'react-basc'
import { CurrentUserAPIResponse, HomeAPIResponse } from 'type/api'

export class MainService {
  static fetchCurrentUser (): Promise<HomeAPIResponse<CurrentUserAPIResponse>> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          name: null,
          avatar: ''
        },
      })
    })
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
    } */
}
