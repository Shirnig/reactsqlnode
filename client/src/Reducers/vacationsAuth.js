const isAuthenticated = (state=null,action)=>{
    switch(action.type){
        case 'AUTHENTICATE_USER':
            return true;
        case 'UNAUTHENTICATE_USER':
            return false;
        default:
            return state
    }
};

export default isAuthenticated;



