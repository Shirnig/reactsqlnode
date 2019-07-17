const _ = require('lodash');
const vacationGeneralService = require('../services/vacation.general-service.js');

const ERROR_CODE = 400;
const UNAUTHENTICATED_CODE = 401;

const handleFailureResponse = (res, code, err) => res.status(code).send(err);


const validateEmptyFields = (req, res, next) => {
    if (_.every(_.map(req.body), field => !_.isEmpty(field)) && _.every(_.map(req.body), field => !field.includes(' '))) {
        return next()
    }
    return handleFailureResponse(res, ERROR_CODE, 'fields cannot be empty or include space')
};


const checkCookie = async(req,res,next) => {
    const cookieValue = req.cookies['connect.sid'];
    try{
        const cookie = await vacationGeneralService.checkCookie(cookieValue);
        if(cookie.length > 0) {
            req.username = cookie[0]['user_name'];
            req.userId = cookie[0]['id'];
            return next()
        }
        else {
            return handleFailureResponse(res, UNAUTHENTICATED_CODE, 'unauthenticated')
        }
    }
    catch(e){
        return handleFailureResponse(res, ERROR_CODE, e)
    }
};


const vacationExistsById = async(req,res,next) => {
    const {vacationId} = req.params;
    try{
        const vacation = await vacationGeneralService.vacationExistsById(vacationId);
        if(vacation.length > 0) {
            req.vacationId = vacationId;
            return next()
        }
        else{
            return handleFailureResponse(res, ERROR_CODE, 'Vacation not exists')
        }
    }
    catch (e) {
        return handleFailureResponse(res, ERROR_CODE, e)
    }
};


module.exports = {
    validateEmptyFields,
    checkCookie,
    vacationExistsById
};
