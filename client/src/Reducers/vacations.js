const _ = require('lodash');


const vacations = (state=[],action)=>{
    switch(action.type){
        case 'FETCH_VACATIONS':
            return action.payload;
        case 'UPDATE_FOLLOW':
            const updateFollow = _.cloneDeep(state);
            const idx = _.findIndex(updateFollow[0].data, function(v) { return v.id === action.payload[0].vacationId });
            updateFollow[0].data[idx]['is_follow'] = action.payload[0].status;
            return updateFollow;
        case 'UPDATE_UNFOLLOW':
            const updatedUnfollow = _.cloneDeep(state);
            const i = _.findIndex(updatedUnfollow[0].data, function(v) { return v.id === action.payload[0].vacationId });
            updatedUnfollow[0].data[i]['is_follow'] = action.payload[0].status;
            return updatedUnfollow;
        case 'DELETE_VACATION':
            const deleted = _.cloneDeep(state);
            const index = _.findIndex(deleted[0].data, function(v) { return v.id === action.payload[0].vacationId });
            deleted[0].data.splice(index,1);
            return deleted;
        default:
            return state
    }
};

export default vacations;



