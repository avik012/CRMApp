export const dashboardReducer = (state = {dashboard:{}}, action )=>{
    switch (action.type) {
        
        case 'dashboardSuccess':
            return {  
                carts:action.payload.carts,
                users:action.payload.users
                
            }
        case 'dashboardFail':
            return {
                ...state,
                error:action.payload
            }    
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error:null
            }  
        default:
            return state;
    }
}