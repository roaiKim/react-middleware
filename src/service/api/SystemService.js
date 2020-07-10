import { ajax } from 'react-basc'

export class SystemService {
  static fetchSystemManagement () {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 900
      setTimeout(resolve, delay, {
        code: 0,
        message: 'ok',
        data: {
          list: [
            {
              id: '1',
              name: '雅典娜',
              url: 'roos ',
              accessToken: 'New York No. 1 Lake Park',
              valid: 1,
              UsersGroup: [{ roleCode: "1", email: "2", nickname: "3", phone: "4" }],
            },
            {
              id: '2',
              name: '雅典娜2',
              url: 'roos ',
              accessToken: 'New York No. 1 Lake Park 2',
              valid: 2,
              UsersGroup: [{ roleCode: "1", email: "2", nickname: "6", phone: "4" }],
            },
            {
              id: '3',
              name: '雅典娜3',
              url: 'roos 3',
              accessToken: 'New York No. 1 Lake Park 3',
              valid: 3,
              UsersGroup: [{ roleCode: "1", email: "2", nickname: "9", phone: "4" }],
            }
          ]
        },
      })
    })
  }

  static userFreeze (id){
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
