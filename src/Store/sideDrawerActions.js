import * as actions from './actions'

export const showSideDrawer =  ()=>{
   return {type:actions.SHOWDRAWER}
}

export const hideSideDrawer =  ()=>{
   return {type:actions.HIDEDRAWER}
}