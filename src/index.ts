const Axios = require('axios');
import {Auth} from './lib/Auth'
import {Account} from './lib/Account'
import {Misc} from './lib/Misc'
import {User} from './lib/User'

export class Mono {
    public apiURL = "https://api.withmono.com";
    public auth: Auth
    public account: Account
    public misc: Misc
    public user: User

    constructor(options: {secretKey: string}) {
        const axios = Axios.create({
            baseURL: this.apiURL,
            headers: {
                'mono-sec-key': options.secretKey
            }
        })

        this.auth = new Auth(axios);
        this.account = new Account(axios);
        this.misc = new Misc(axios);
        this.user = new User(axios);
    }
}