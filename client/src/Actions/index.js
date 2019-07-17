import axios from 'axios';


export const authenticate = () =>{
    return dispatch=> axios.get('http://localhost:4000/vacations/authenticated').then(()=>{
        dispatch(Authenticate())
    }).catch(()=>{dispatch(Unauthenticate())})
};

export const Authenticate = () => {
    return {
        type: 'AUTHENTICATE_USER'
    }
};


export const Unauthenticate = () => {
    return {
        type: 'UNAUTHENTICATE_USER'
    }
};


export const checkUsername = (username) =>{
    return dispatch => axios.post('http://localhost:4000/vacations/check-username',username).then(({data})=>{
        dispatch(UsernameAvail())
    }).catch(()=>{dispatch(UsernameNotAvail())})
};


export const UsernameAvail = () => {
    return {
        type: 'AVAILABLE_USERNAME'
    }
};


export const UsernameNotAvail = () => {
    return {
        type: 'UNAVAILABLE_USERNAME'
    }
};


export const signUp = (user) =>{
    return dispatch => axios.put('http://localhost:4000/vacations/sign-up',user).then(()=>{
        dispatch(Authenticate())
    })
};


export const login = (userDetails) =>{
    return async dispatch => axios.post('http://localhost:4000/vacations/login',userDetails).then(()=>{
        dispatch(Authenticate())
    })
};


export const fetchVacations = () =>{
    return dispatch=> axios.get('http://localhost:4000/vacations/per-user').then(({data}) => {
        dispatch(VacationsData(data))
    }).catch(()=>{dispatch(Unauthenticate())})
};

export const VacationsData = vacations =>{
    return {
        type:'FETCH_VACATIONS',
        payload: vacations
    }
};


export const updateFollow = (vacationID, status) =>{
        return dispatch=> axios.put(`http://localhost:4000/vacations/follow/${vacationID}`).then(()=>{
            dispatch(UpdateFollow(vacationID, status))
        })
};

export const UpdateFollow = (vacationId, status) =>{
    return {
        type:'UPDATE_FOLLOW',
        payload: [{vacationId, status}]
    }
};


export const updateUnfollow = (vacationID, status) =>{
    return dispatch=> axios.patch(`http://localhost:4000/vacations/unfollow/${vacationID}`).then(()=>{
        dispatch(UpdateUnFollow(vacationID, status))
    })
};

export const UpdateUnFollow = (vacationId, status) =>{
    return {
        type:'UPDATE_UNFOLLOW',
        payload: [{vacationId, status}]
    }
};


export const deleteVacation = (vacationID) =>{
    return dispatch=> axios.patch(`http://localhost:4000/vacations/delete/${vacationID}`).then(()=>{
        dispatch(DeleteVacation(vacationID))
    })
};

export const DeleteVacation = (vacationId) =>{
    return {
        type:'DELETE_VACATION',
        payload: [{vacationId}]
    }
};


export const addVacation = (vacation) =>{
    return dispatch=> axios.put('http://localhost:4000/vacations/add', vacation, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(()=>{
        dispatch(fetchVacations())
    })
};

export const editVacation = (vacationID, vacation) =>{
    return dispatch=> axios.patch(`http://localhost:4000/vacations/update/${vacationID}`, vacation, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(()=>{
        dispatch(fetchVacations())
    })
};
