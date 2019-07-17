const _ = require('lodash');

const userNameExistsQuery = 'SELECT * FROM `users` where user_name = ?';

const addUserQuery = 'INSERT INTO `users`(`first`, `last`, `user_name`, `password`)' +
    ' VALUES (?)';


const userNameExists = (userName) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results, fields, err] = await global.mysql.query(
                userNameExistsQuery, [userName]);
            return resolve(results);
        }
        catch(err){
            return reject(err)
        }
    })
};


const addUser = (body) => {
    return new Promise(async (resolve, reject) => {
        const user = Object.values(body);
        //const user = Object.values(req.body);
        try{
            const [err, results, fields] = await global.mysql.query(
                addUserQuery, [user]);
            return resolve();
        }
        catch (err) {
            return reject(err)
        }
    })
};


module.exports = {
    addUser,
    userNameExists
};
