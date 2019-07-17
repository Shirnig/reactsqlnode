const _ = require('lodash');
const vacationAdminService = require('../services/vacation.admin-service.js');


const isNotAdmin = async(req,res,next) => {
    const {username} = req;
    try{
        const user = await vacationAdminService.isAdmin(username);
        if(user.length > 0) {
            if(!user[0]['is_admin']){
                return next()
            }
            else{
                return res.status(401).send('Not allowed, you are the admin')
            }
        }
    }
    catch {
        return res.sendStatus(400)
    }
};


module.exports = {
    isNotAdmin
}
