const axios = require('axios');
const apiURL = "https://api.withmono.com/";

/**
 * getWalletBalance - This resource allows you to check the available balance in your Mono wallet
 * @param {string} token - Access Token
 * @param {function} callback
 */
const getWalletBalance = (token, callback) => {
    const url = `${apiURL}users/stats/wallet`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * getAccountId - This resource allows you request for account id (that identifies the authenticated account)
 * after successful enrolment on the Mono connect widget.
 * @param {string} token - Access Token
 * @param {string} body - {code} - Code returned from Mono connect ID.
 * @param {function} callback
 */
const getAccountId = (token, body, callback) => {
    const url = `${apiURL}account/auth`;
    return request = axios({
        method: "POST",
        url,
        data: body,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * getAccountInformation - This resource allows you to retrieve account details with the financial institution.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID.
 * @param {function} callback
 */
const getAccountInformation = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};


/**
 * getAccountInformation - This resource allows you to retrieve the bank statement of the connected financial account.
 * @param {string} token - Access Token
 * @param {object} {accountId, period, output} - Account ID, Period, Output.
 * @param {function} callback
 */
const getAccountStatement = (token, {accountId, period, output}, callback) => {
    let query = "?";
    query += (period ? `period=${period}&` : '');
    query += (output ? `output=${output}&` : '');

    const url = `${apiURL}accounts/${accountId}/statement${query}`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * getAccountInformation - This resource allows you to poll the PDF status of the bank statement of the connected financial account.
 * @param {string} token - Access Token
 * @param {object} {accountId, jobId} - Account ID, Job Id
 * @param {function} callback
 */
const pollAccountStatementPdf = (token, {accountId, jobId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/statement/jobs/${jobId}`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * getAccountTransactions - This resource allows you to retrieve the known transactions on the connected financial account.
 * @param {string} token - Access Token
 * @param {object} {accountId,start,end,narration,type,paginate,limit} - Account ID,Start,End,Narration,Type,Paginate,Limit
 * @param {function} callback
 */
const getAccountTransactions = (token, {accountId,start,end,narration,type,paginate,limit}, callback) => {
    let query = "?";
    query += (start ? `start=${start}&` : '');
    query += (end ? `end=${end}&` : '');
    query += (narration ? `narration=${narration}&` : '');
    query += (type ? `type=${type}&` : '');
    query += (paginate ? `paginate=${paginate}&` : '');
    query += (limit ? `limit=${limit}&` : '');

    const url = `${apiURL}accounts/${accountId}/transactions${query}`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};


/**
 * getCustomerCredit - This resource allows you to retrieve the credit transactions on the connected financial account.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const getCustomerCredit = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/credits`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};


/**
 * getCustomerDebit - This resource allows you to retrieve the debit transactions on the connected financial account.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const getCustomerDebit = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/debits`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * getIncomeInformation - This resource allows you to retrieve the income information on the connected financial account.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const getIncomeInformation = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/income`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * getIdentity - This resource allows you to retrieve a high level overview of an account identity data.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const getIdentity = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/identity`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * syncData - This resource allows you to sync data manually.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const syncData = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/sync`;
    return request = axios({
        method: "POST",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};


/**
 * getReauthCode - This resource allows you to re-authenticate the user's account and notify your server.
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const getReauthCode = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/reauthorise`;
    return request = axios({
        method: "POST",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};


/**
 * getInstitutions - This resource allows you to retrieve available institutions on Mono.
 * @param {string} token - Access Token
 * @param {function} callback
 */
const getInstitutions = (token, callback) => {
    const url = `${apiURL}coverage`;
    return request = axios({
        method: "GET",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * bvnLookup - This resource allows you to lookkup BVN data.
 * @param {string} token - Access Token
 * @param {object} {body} - bvn
 * @param {function} callback
 */
const bvnLookup = (token, body, callback) => {
    const url = `${apiURL}v1/lookup/bvn/identity`;
    return request = axios({
        method: "POST",
        url,
        data: body,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

/**
 * unlinkAccount - This resource allows your customers to unlink their financial account(s).
 * @param {string} token - Access Token
 * @param {object} {accountId} - Account ID
 * @param {function} callback
 */
const unlinkAccount = (token, {accountId}, callback) => {
    const url = `${apiURL}accounts/${accountId}/unlink`;
    return request = axios({
        method: "POST",
        url,
        headers: { 'mono-sec-key': token }
    }).then(response=>{
        return callback(null, response.data);
    }).catch(error=>{
        return callback(error.response.data, null);
    });

};

module.exports =  {
    getWalletBalance,
    getAccountId,
    getAccountInformation,
    getAccountStatement,
    pollAccountStatementPdf,
    getAccountTransactions,
    getCustomerCredit,
    getCustomerDebit,
    getIncomeInformation,
    getIdentity,
    syncData,
    getReauthCode,
    getInstitutions,
    bvnLookup,
    unlinkAccount,
};