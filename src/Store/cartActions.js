import * as actions from './actions'

export const addItem = (payload)=>{
    return {type:actions.ADD_ITEM,payload}
}

export const setCart = (cart)=>{
    return {type:actions.SET_CART,payload:cart}
}

export const removeItem = (objId)=>{
    return {type:actions.DELETE_ITEM,payload:{objectID:objId}}
}
export const incrItem = (objId)=>{
    return {type:actions.INCR_ITEM,payload:{objectID:objId}}
}
export const decrItem = (objId)=>{
    return {type:actions.DECR_ITEM,payload:{objectID:objId}}
}