import { ajax } from 'react-basc'

export class UserService {
  static fetchUserManagement () {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          list: [
            {
              id: '1',
              name: 'John Brown ty',
              email: 'roos ',
              nickName: 'New York No. 1 Lake Park',
              phone: 'devel---oper',
            },
            {
              id: '2',
              name: 'John Bro wnds ',
              email: 'roos ',
              nickName: 'New Ydsa ork No. 1 Lake Park',
              phone: 'devel---oper',
            },
            {
              id: '4',
              name: 'John Brown',
              email: 'roos ',
              nickName: 'New York No. 1 Lake Park',
              phone: 'devel---oper',
            },
          ]
        },
      })
    })
  }

  static userFreeze (id) {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          id
        }
      })
    })
  }

  /* static changeMoneyPassword(request: ChangePasswordAPIRequest): Promise<void> {
        return ajax("POST", "/account/money-password", {}, request);
    } */
}
