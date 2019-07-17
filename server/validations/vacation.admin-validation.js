const _ = require('lodash');
const vacationAdminService = require('../services/vacation.admin-service.js');

const ERROR_CODE = 400;
const UNAUTHENTICATED_CODE = 401;

const handleFailureResponse = (res, code, err) => res.status(code).send(err);

const allFields = (req,res,next) => {
    req.vacation = JSON.parse(req.body.vacation);
    if(_.isEqual(_.keysIn(req.vacation),[`description`, `destination`, `img_url`, `from_date`, `to_date`, `price`])){
        return next()
    }
    return handleFailureResponse(res, ERROR_CODE, 'Please insert all fields')
};


const allTypesCorrect = (req,res,next) => {
    const strings = _.omit(req.vacation,['price','from_date','to_date']);
    const ints = _.omit(req.vacation,['description', 'destination', 'img_url']);
    if (_.every(strings, field => _.isString(field))
    && _.every(ints, field => _.isNumber(field))) {
        return next()
    }
    return handleFailureResponse(res, ERROR_CODE, 'Types of fields are incorrect')
};


const datesCorrect = (req,res,next) => {
    const {from_date, to_date} = req.vacation;
    if(from_date < to_date) {
        return next()
    }
    return handleFailureResponse(res, ERROR_CODE, 'Please fix the dates')
};



const isAdmin = async(req,res,next) => {
    const {username} = req;
    try{
        const user = await vacationAdminService.isAdmin(username);
        if(user.length > 0) {
            if(user[0]['is_admin']){
                return next()
            }
            else{
                return handleFailureResponse(res, UNAUTHENTICATED_CODE, 'Not allowed, not the admin')
            }
        }
    }
    catch (e) {
        return handleFailureResponse(res, ERROR_CODE, e)
    }
};


module.exports = {
    allFields,
    allTypesCorrect,
    datesCorrect,
    isAdmin
};
