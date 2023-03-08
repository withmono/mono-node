"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mono = void 0;
const axios_1 = __importDefault(require("axios"));
const Auth_1 = require("./lib/Auth");
const Account_1 = require("./lib/Account");
const Misc_1 = require("./lib/Misc");
const User_1 = require("./lib/User");
const Payment_1 = require("./lib/Payment");
class Mono {
    constructor(options) {
        this.apiURL = 'https://api.withmono.com';
        const axios = axios_1.default.create({
            baseURL: this.apiURL,
            headers: {
                'mono-sec-key': options.secretKey,
            },
        });
        this.auth = new Auth_1.Auth(axios);
        this.account = new Account_1.Account(axios);
        this.misc = new Misc_1.Misc(axios);
        this.user = new User_1.User(axios);
        this.payment = new Payment_1.Payment(axios);
    }
}
exports.Mono = Mono;
