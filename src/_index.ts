import Axios from 'axios'

import {Account} from './lib/Account'
import {User} from "./lib/User";

export default class Mono {
    public account: Account
    public user: User

    constructor(privateKey: string) {

        const axios = Axios.create({
            baseURL: "https://api.withmono.com/",
            headers: {
                'mono-sec-key': privateKey
            }
        })

        this.account = new Account(axios)
        this.user = new User(axios)
    }
}

