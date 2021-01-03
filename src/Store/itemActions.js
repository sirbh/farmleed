import * as actions from './actions'
import axios from '../Components/Utility/axios'
import mainAxios from 'axios'

export const loadItem = (items)=>{
    return {type:actions.LOAD_ITEMS,payload:{items}}
}

export const sendReq = ()=>{
    return {type:actions.SEND_REQ}
}

export const setError = (message)=>{
    return {type:actions.SET_ERROR,payload:{message}}
}

let cancal;
export const fetchItems = (query)=>{
   return dispatch =>{
       
       if(cancal)
       {
        
           cancal()
       }
       dispatch(sendReq());
       axios.post('/queryproducts',{
           query:query||""
       },{
           cancelToken: new mainAxios.CancelToken(c=>cancal = c)
       })
            .then(data=>{
               
                dispatch(loadItem(data.data))
            })
            .catch(error=>{
                if(mainAxios.isCancel(error)) return
                if(error.response)
                {
                    dispatch(setError(error.response.data.message))

                }
                dispatch(setError('Something Went Wrong'))
            })
   }
}