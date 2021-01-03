import * as actions from './actions'

const initialState = {
    showDrawer : false
}

const reducer = (state=initialState, action)=>{
    switch(action.type)
    {
        case(actions.SHOWDRAWER):
        {
            return {
                showDrawer: true
            }
        }
        case(actions.HIDEDRAWER):
        {
            return {
                showDrawer: false
            }
        }
        default:{
            return {
                showDrawer:false
            }
        }
    }
}

export default reducer