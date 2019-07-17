const vacationAdminService = require('../services/vacation.admin-service.js');

const checkCookieQuery = 'SELECT * FROM `cookies` where cookie_value = ?';

const fetchVacationsSortedQuery = "SELECT v.id, v.description, v.destination," +
    " v.img_url, v.from_date, v.to_date, v.price, v.updated_date," +
    "v.deleted_date, uv.is_follow\n" +
    "FROM vacations as v\n" +
    "left join users_vacations as uv\n" +
    "on v.id = uv.vacation_id\n" +
    " and uv.user_name = ?\n" +
    " where v.deleted_date is null\n" +
    "order by uv.is_follow desc, v.updated_date desc";

const vacationExistsByIdQuery = 'SELECT * FROM `vacations` where id = ?';


const checkCookie = (cookie) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results] = await global.mysql.query(
                checkCookieQuery, [cookie]);
            return resolve(results);
        }
        catch(err){
            return reject(err)
        }
    })
};



const fetchVacationsSorted = (username) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results, fields] = await global.mysql.query(
                fetchVacationsSortedQuery, [username]);
            const user = await vacationAdminService.isAdmin(username);
            const data = [{
                metadata: [user],
                data: results
            }];
            return resolve(data);
        }
        catch(err){
            return reject(err)
        }
    })
};



const vacationExistsById = (id) => {
    return new Promise(async(resolve,reject) => {
        try{
            const [results, fields] = await global.mysql.query(
                vacationExistsByIdQuery, [id]);
            return resolve(results);
        }
        catch(err){
            return reject(err)
        }
    })
};



module.exports = {
    checkCookie,
    fetchVacationsSorted,
    vacationExistsById
};
