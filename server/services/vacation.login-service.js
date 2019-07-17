const _ = require('lodash');

const addCookieQuery = 'INSERT INTO `cookies`(`user_name`, `cookie_value`) VALUES (?)';

const verifyUserQuery = 'SELECT * FROM `users` where user_name = ? and password = ?';


const addCookie = (userName, cookie) => {
    return new Promise(async (resolve, reject) => {
        try{
            const [results, fields] = await global.mysql.query(
                addCookieQuery, [[userName,cookie]]);
            return resolve();
        }
        catch (err) {
            return reject(err)
        }
    })
};


const verifyUser = (username,password) => {
    return new Promise(async (resolve, reject) => {
        try{
            const [results, fields] = await global.mysql.query(
                verifyUserQuery,
                [username,password]);
            return resolve(results);
        }
        catch (err) {
            return reject(err)
        }
    })
};



module.exports = {
    verifyUser,
    addCookie
};
