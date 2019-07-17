const _ = require('lodash');

const followQuery = 'INSERT INTO `users_vacations`' +
    '(`user_name`, `vacation_id`, `is_follow`, `updated_date`)' +
    ' VALUES (?,true,UNIX_TIMESTAMP())';

const unfollowQuery = 'UPDATE `users_vacations` ' +
    'SET is_follow = NULL,updated_date = UNIX_TIMESTAMP()' +
    'WHERE user_name = ? ' +
    'AND vacation_id = ?';

const reFollowQuery = 'UPDATE `users_vacations` ' +
    'SET is_follow=true,updated_date = UNIX_TIMESTAMP() ' +
    'WHERE user_name = ? ' +
    'AND vacation_id = ?';

const checkFollowQuery = 'SELECT * FROM `users_vacations` ' +
    'WHERE user_name = ? ' +
    'AND vacation_id = ?';

const follow = (username,vacationId) => {
    return new Promise(async(resolve,reject) => {
        try{
            await global.mysql.query(
                followQuery, [[username,vacationId]]);
            return resolve();
        }
        catch(err){
            return reject(err)
        }
    })
};


const unFollow = (username,vacationId) => {
    return new Promise(async(resolve,reject) => {
        try{
            await global.mysql.query(
                unfollowQuery, [username,vacationId]);
            return resolve();
        }
        catch(err){
            return reject(err)
        }
    })
};


const reFollow = (username,vacationId) => {
    return new Promise(async(resolve,reject) => {
        try{
            await global.mysql.query(
                reFollowQuery,
                [username,vacationId]);
            return resolve();
        }
        catch(err){
            return reject(err)
        }
    })
};


const checkFollow = (username,vacationId) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results,fields] = await global.mysql.query(
                checkFollowQuery,
                [username,vacationId]);
            if(results.length > 0) {
                return resolve(true);
            }
            return resolve(false)
        }
        catch(err){
            return reject(err)
        }
    })
};




module.exports = {
    follow,
    unFollow,
    reFollow,
    checkFollow
};
