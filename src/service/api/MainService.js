import { ajax } from 'react-basc'

export class MainService {
  static fetchCurrentUser () {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          name: "ui",
          avatar: ''
        },
      })
    })
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
    } */
}
