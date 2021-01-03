import * as actions from './actions'

export const showMessage = (message)=>{
    return {type:actions.SHOWMESSAGE,payload:{message}}
}


export const hideMessage = ()=>{
    return {type:actions.HIDEMESSAGE}
}

export const setModal = (heading,products,totalPrice,header,clickHandler,btnType,points)=>{
    return {type:actions.SET_MODAL,payload:{
        heading,products,totalPrice,header,clickHandler,points,btnType
    }}
}
// export const decrItem = (objId)=>{
//     return {type:actions.DECR_ITEM,payload:{objectID:objId}}
// }