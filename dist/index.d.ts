import { Auth } from './lib/Auth';
import { Account } from './lib/Account';
import { Misc } from './lib/Misc';
import { User } from './lib/User';
export declare class Mono {
    apiURL: string;
    auth: Auth;
    account: Account;
    misc: Misc;
    user: User;
    constructor(options: {
        secretKey: string;
    });
}
