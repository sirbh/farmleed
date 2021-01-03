import * as actions from './actions';

export const login = (token)=>{
    return {type:actions.LOGIN,payload:{token}}
}

export const logout = ()=>{
    return {type:actions.LOGOUT}
}

export const checkAuthTimeOut =(expirationTime)=>
{
    return dispatch => {
        setTimeout(()=>{
           dispatch(logout());
        },expirationTime*1000)
    }
}

// export const decrItem = (objId)=>{
//     return {type:actions.DECR_ITEM,payload:{objectID:objId}}
// }