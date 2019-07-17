const _ = require('lodash');
const vacationLoginService = require('../services/vacation.login-service.js');

const ERROR_CODE = 400;
const UNAUTHENTICATED_CODE = 401;

const handleFailureResponse = (res, code, err) => res.status(code).send(err);


const verifyUser = async(req,res,next) => {
    const {username,password} = req.body;
    try{
        const user = await vacationLoginService.verifyUser(username,password);
        if(user.length > 0) {
            return next()
        }
        else{
            return handleFailureResponse(res, UNAUTHENTICATED_CODE, 'Login failed! Please try again')
        }
    }
    catch (e) {
        return handleFailureResponse(res, ERROR_CODE, e)

    }
};

const loginFields = (req, res, next) => {
    if(_.isEqual(_.keysIn(req.body),['username','password'])){
        return next()
    }
    return handleFailureResponse(res, ERROR_CODE, 'Please insert all fields')
};


module.exports = {
    loginFields,
    verifyUser
}
