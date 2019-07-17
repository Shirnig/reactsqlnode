const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const isAdminQuery = 'SELECT * FROM `users` where user_name = ?';

const addQuery = 'INSERT INTO `vacations`' +
    '(`description`, `destination`, `img_url`, `from_date`, ' +
    '`to_date`,' + '`price`, `created_date`, `updated_date`) ' +
    'VALUES (?,UNIX_TIMESTAMP(),UNIX_TIMESTAMP())';

const deleteVacationQuery = 'UPDATE `vacations` SET deleted_date = UNIX_TIMESTAMP() WHERE id = ?';


const fetchFollowersQuery = 'SELECT v.id, v.destination, count(*)' +
    'FROM `users_vacations` as uv ' +
    'left join `vacations` as v ' +
    'on uv.vacation_id = v.id ' +
    'where uv.is_follow = 1 ' +
    'and v.deleted_date is null ' +
    'group by v.destination ' +
    'ORDER BY `count(*)` DESC';


const isAdmin = (userName) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results] = await global.mysql.query(
                isAdminQuery, [userName]);
            return resolve(results);
        }
        catch(err){
            return reject(err)
        }
    })
};


function uploadImg(files) {
    if (!files)
        console.log('No files were uploaded');
    const sampleFile = files.img;
    console.log(sampleFile, 'img');
    fs.writeFile(__dirname + '../../../client/my-app/build/uploads/' + sampleFile.name, sampleFile.data, err => {
        console.log('#################', err);
    });
}


const addVacationToDB = (vacationValues) => {
    return new Promise(async (resolve, reject) => {
        try{
            const [results, fields] = await global.mysql.query(
                addQuery,[vacationValues]);
            return resolve()
        }
        catch (err) {
            return reject(err)
        }
    })
};

const addVacation = async(vacationValues, req) => {
    try {
        uploadImg(req);
        await addVacationToDB(vacationValues);
    } catch (e) {
        console.log(e)
    }
};


const updateVacationToDB = (id,body) => {
    return new Promise(async (resolve, reject) => {
        const fieldKeys = Object.keys(body);
        const fieldValues = Object.values(body);
        const keysForUpdating = fieldKeys.map(k => `${k}=?`);
        const query = "UPDATE vacations set " + keysForUpdating.join(" ,") + ",updated_date = UNIX_TIMESTAMP() WHERE `id`=? ";
        try{
            const [results, fields] = await global.mysql.query(
                query,fieldValues.concat([id]));
            return resolve()
        }
        catch (err) {
            return reject(err)
        }
    })
};


const updateVacation = (id,body,files) => {
    return new Promise(async(resolve,reject)=> {
        try{
            if (!files){
                await updateVacationToDB(id,body);
            }
            else if (files){
                uploadImg(files);
                await updateVacationToDB(id,body);
            }
            return resolve()
        }
        catch (err) {
            return reject(err)
        }
    })

};



const deleteVacation = (id) => {
    return new Promise(async(resolve,reject) => {
        try{
            await global.mysql.query(
                deleteVacationQuery, [id]);
            return resolve();
        }
        catch(err){
            return reject(err)
        }
    })
};



const fetchFollowers = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results, fields] = await global.mysql.query(fetchFollowersQuery);
            return resolve(results)
        }
        catch (e) {
            return reject(e)
        }
    })
};



module.exports = {
    isAdmin,
    addVacation,
    updateVacation,
    deleteVacation,
    fetchFollowers
};
