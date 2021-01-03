import * as actions from './actions'

const initialState = {
    Items:[],
    loading:false,
    error:{hasError:false,message:undefined}
}

const reducer = (state=initialState,action)=>{

    switch(action.type)
    {
        case actions.LOAD_ITEMS:{
            return {
                Items:action.payload.items,
                loading:false,
                error:{hasError:false,message:null}
            }
        }
        case actions.SEND_REQ:{
            return {
                ...state,
                error:{hasError:false,message:undefined},
                loading:true
            }
        }
        case actions.SET_ERROR:{
            return {
                ...state,
                Items:[],
                loading:false,
                error:{hasError:true,message:action.payload.message},
            }
        }
        default:{
            return state
        }
    }

}

export default reducer