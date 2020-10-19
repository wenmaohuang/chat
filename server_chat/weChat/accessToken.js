const {appID, appsecret} = require('../config')
const rp = require('request-promise-native')
const {writeFile, readFile} = require('fs')

class Wechat {
    constructor() {
    }

    getAccessToken() {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`


        return new Promise((resolve, reject) => {
            rp({method: 'GET', url: url, json: true})
                .then(res => {
                    console.log(res)
                    res.expires_in = Date.now() + (res.expires_in + 300) * 1000
                    resolve(res)

                }).catch(err => {
                console.log(err)
                reject('get access_token err')
            })
        })
    }

    saveAccessToken(accessToken) {
        accessToken = JSON.stringify(accessToken)
        return new Promise((resolve, reject) => {
            writeFile('./accessToken', accessToken, err => {
                if (!err) {
                    console.log('保存成功')
                    resolve()
                } else {
                    reject('save access_token arr')
                }
            })
        })
    }

    readAccessToken() {
        // accessToken = JSON.stringify(accessToken)
        return new Promise((resolve, reject) => {
            readFile('./accessToken', (err, data) => {
                if (!err) {
                    data = JSON.parse(data)
                    console.log('读取成功')
                    resolve(data)
                } else {
                    reject('read access_token arr')
                }
            })
        })
    }

    isValidAccessToken(data) {
        if (data && data.access_token && !data.expires_in) {
            return false
        }
        // if(data.expires_in < Date.now()){
        //     return true
        // }else{
        //     return false
        // }

        return data.expires_in > Date.now()
    }

    fetchAccessToken() {
        if(this.access_token && this.expires_in && this.isValidAccessToken(this)){
            return Promise({
                access_token:this.access_token,
                expires_in:this.expires_in
            })
        }


        return this.readAccessToken()
            .then(async res => {
                if (this.isValidAccessToken(res)) {
                    // resolve(res)
                    return Promise.resolve(res)
                } else {
                    const res = await this.getAccessToken()
                    await this.saveAccessToken(res)
                    // resolve(res)
                    return Promise.resolve(res)
                }

            })
            .catch(async err => {
                const res = await this.getAccessToken()
                await this.saveAccessToken(res)
                // resolve(res)
                return Promise.resolve(res)
            })
            .then(res => {
                this.access_token = res.access_token
                this.expires_in = res.expires_in
                return Promise.resolve(res)
            })


    }


}

// const w = new Wechat()
// w.fetchAccessToken()
// w.getAccessToken()

// new Promise((resolve, reject) => {
//
//     w.readAccessToken()
//         .then(res => {
//             if (w.isValidAccessToken(res)) {
//                 resolve(res)
//             } else {
//                 w.getAccessToken()
//                     .then(res => {
//                         w.saveAccessToken(res)
//                             .then(() => {
//                                 resolve(res)
//                             })
//                     })
//             }
//
//         })
//         .catch(err => {
//             w.getAccessToken()
//                 .then(res => {
//                     w.saveAccessToken(res)
//                         .then(() => {
//                             resolve(res)
//                         })
//                 })
//         })
//
// })
//     .then(res => {
//         console.log(res)
//     })

