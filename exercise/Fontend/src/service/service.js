import apisauce from 'apisauce';
export const apikey = "AIzaSyBOUoei0Qj1pgTtB--_UntzknpoAdRPkDw";
export const ip = 'https://data-base-demo.herokuapp.com/api/v1'
const api = apisauce.create({
    baseURL: ip,
    headers: {
        "Content-Type": "application/json"
    },
})
export const POST = (path, obj) =>
    new Promise((resolve, reject) => {
        api.post(path, obj)
            .then(response => {
                if (response.ok) {
                    resolve(response.data)
                } else {
                    response.data ? reject(response.data) : reject({ success: false, message: response.problem })
                }

            }).catch(err => reject(err))
    })
export const GET = (path) =>
    new Promise((resolve, reject) => {
        api.get(path)
            .then(response => {
                if (response.ok) {
                    resolve(response.data)
                } else {
                    response.data ? reject(response.data) : reject({ success: false, message: response.problem })
                }

            }).catch(err => reject(err))
    })
export const LOGIN = '/user_login/user_login'
export const INSERT = '/user_insert/user_insert'