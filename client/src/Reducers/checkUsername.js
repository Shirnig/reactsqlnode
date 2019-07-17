const usernameAvailable = (state=null,action)=>{
    switch(action.type){
        case 'AVAILABLE_USERNAME':
            return true;
        case 'UNAVAILABLE_USERNAME':
            return false;
        default:
            return state
    }
};

export default usernameAvailable;



