const express = require('express');
const router = express.Router();
const vacationSignUpService = require('../services/vacation.signup-service.js');
const vacationSignUpValidation = require('../validations/vacation.signup-validation.js');
const vacationLoginService = require('../services/vacation.login-service.js');
const vacationLoginValidation = require('../validations/vacation.login-validation.js');
const vacationAdminService = require('../services/vacation.admin-service.js');
const vacationAdminValidation = require('../validations/vacation.admin-validation.js');
const vacationUsersService = require('../services/vacation.users-service.js');
const vacationUsersValidation = require('../validations/vacation.users-validation.js');
const vacationGeneralService = require('../services/vacation.general-service.js');
const vacationGeneralValidation = require('../validations/vacation.general-validation.js');


const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const ERROR_CODE = 400;
const UNAUTHENTICATED_CODE = 401;

const handleSuccessResponse = (res, code, data) => res.status(code).send(data);
const handleFailureResponse = (res, code, err) => res.status(code).send(err);


router.put('/sign-up', vacationSignUpValidation.userNameExists, vacationSignUpValidation.allFields, vacationSignUpValidation.allFieldsStrings, vacationGeneralValidation.validateEmptyFields, async(req,res) => {
    try{
        const cookie = req.cookies['connect.sid'];
        const {user_name} = req.body;
        await vacationSignUpService.addUser(req.body);
        await vacationLoginService.addCookie(user_name, cookie);
        return handleFailureResponse(res, CREATED_CODE, 'User added successfully and is logged in')
    }
    catch(e){
        return handleFailureResponse(res, ERROR_CODE, e)
    }
});



router.post('/check-username', vacationSignUpValidation.userNameExists, async(req,res) => {
    try{
        return handleSuccessResponse(res, SUCCESS_CODE, 'username available')
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE, 'username exists')
    }
});


router.post('/login', vacationLoginValidation.loginFields ,vacationGeneralValidation.validateEmptyFields, vacationLoginValidation.verifyUser, async(req,res) => {
    try{
        const cookie = req.cookies['connect.sid'];
        const {username} = req.body;
        await vacationLoginService.addCookie(username, cookie);
        return handleSuccessResponse(res, SUCCESS_CODE, 'you are logged in:)')

    }
    catch{
        return handleFailureResponse(res, UNAUTHENTICATED_CODE, 'login failed')
    }
});


//authentication
router.use(vacationGeneralValidation.checkCookie);


//users + admin
router.get('/authenticated', (req,res) => {
    try{
        return handleSuccessResponse(res, SUCCESS_CODE)
    }
    catch(e){
        return handleFailureResponse(res, UNAUTHENTICATED_CODE, e)
    }
});


//users + admin
router.get('/per-user', async(req,res) => {
    try{
        const {username} = req;
        const vacations = await vacationGeneralService.fetchVacationsSorted(username);
        return handleSuccessResponse(res, SUCCESS_CODE, vacations)
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE,'failed')
    }
});


//only admin
router.put('/add', vacationAdminValidation.isAdmin, vacationAdminValidation.allFields, vacationAdminValidation.allTypesCorrect, vacationAdminValidation.datesCorrect,  async(req,res) => {
    try{
        await vacationAdminService.addVacation(Object.values(JSON.parse(req.body.vacation)),req.files);
        return handleSuccessResponse(res, CREATED_CODE, 'Vacation Added Successfully')
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE,'failed')
    }
});


//only admin
router.patch('/update/:vacationId', vacationAdminValidation.isAdmin, vacationGeneralValidation.vacationExistsById, async(req,res) => {
    try{
        await vacationAdminService.updateVacation(req.vacationId,JSON.parse(req.body.vacation),req.files);
        return handleSuccessResponse(res, SUCCESS_CODE, 'Updated Successfully')
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE, 'failed')
    }
});


//only admin
router.patch('/delete/:vacationId', vacationAdminValidation.isAdmin, vacationGeneralValidation.vacationExistsById, async(req,res) => {
    try{
        vacationAdminService.deleteVacation(req.vacationId);
        return handleSuccessResponse(res, SUCCESS_CODE, 'Deleted Successfully')
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE, 'failed')
    }
});


//only admin
router.get('/chart', vacationAdminValidation.isAdmin, async(req,res) => {
    try{
        const followers = await vacationAdminService.fetchFollowers();
        return handleSuccessResponse(res, SUCCESS_CODE, followers)
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE, 'failed')
    }
});


//only users
router.put('/follow/:vacationId', vacationUsersValidation.isNotAdmin, vacationGeneralValidation.vacationExistsById, async(req,res) => {
    try{
        const {username, vacationId} = req;
        const followed = await vacationUsersService.checkFollow(username, vacationId);
        if(followed) {
            await vacationUsersService.reFollow(username, vacationId);
        }
        else {
            await vacationUsersService.follow(username, vacationId);
        }
        return handleSuccessResponse(res, CREATED_CODE, 'Another follower on a vacation:)')
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE,'failed')
    }
});


//only users
router.patch('/unfollow/:vacationId', vacationUsersValidation.isNotAdmin, vacationGeneralValidation.vacationExistsById, async(req,res) => {
    try{
        await vacationUsersService.unFollow(req.username,req.vacationId);
        return handleSuccessResponse(res, SUCCESS_CODE, 'Lost follower on a vacation:(')
    }
    catch{
        return handleFailureResponse(res, ERROR_CODE, 'failed')
    }
});




module.exports = router;
