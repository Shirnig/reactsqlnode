const _ = require('lodash');
const vacationSignUpService = require('../services/vacation.signup-service.js');

const ERROR_CODE = 400;

const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);


const userNameExists = async(req,res,next) => {
    const {user_name} = req.body;
    try{
        const user = await vacationSignUpService.userNameExists(user_name);
        if(user.length > 0) {
            return handleFailureResponse(res, 'Username already exists')
        }
        else{
            return next()
        }
    }
    catch (e) {
        return handleFailureResponse(res, e)
    }
};


const allFields = (req, res, next) => {
    if(_.isEqual(_.keysIn(req.body),['first','last','user_name','password'])){
        return next()
    }
    return handleFailureResponse(res, 'Please insert all fields')
};


const allFieldsStrings = (req, res, next) => {
    if (_.every(req.body, field => _.isString(field))) {
        return next()
    }
    return handleFailureResponse(res, 'Not all fields are strings')
};



module.exports = {
    allFields,
    userNameExists,
    allFieldsStrings
}
